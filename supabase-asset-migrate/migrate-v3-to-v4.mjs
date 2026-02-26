import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'
import { lookup as mimeLookup } from 'mime-types'

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY

const FROM_BUCKET = process.env.FROM_BUCKET || 'portfolio-media'
const FROM_PREFIX = process.env.FROM_PREFIX || 'v3'
const TO_PREFIX = process.env.TO_PREFIX || 'v4'

const CACHE_CONTROL = (process.env.CACHE_CONTROL || 'public, max-age=31536000, immutable').trim()
const CONCURRENCY = Math.max(1, Number(process.env.CONCURRENCY || 3))

if (!SUPABASE_URL || !SERVICE_ROLE) {
    console.error('Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY no .env')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false },
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUT_PATH = path.join(__dirname, 'asset-map-v4.json')

// Lista recursiva por pastas usando list()
async function listAllFiles(bucket, prefix) {
    const results = []
    const queue = [prefix]

    while (queue.length) {
        const current = queue.shift() || ''
        let offset = 0

        while (true) {
            const { data, error } = await supabase.storage
                .from(bucket)
                .list(current, { limit: 1000, offset, sortBy: { column: 'name', order: 'asc' } })

            if (error) throw error
            if (!data || data.length === 0) break

            for (const item of data) {
                const full = current ? `${current}/${item.name}` : item.name
                if (!item.metadata) queue.push(full) // pasta
                else results.push(full) // arquivo
            }

            if (data.length < 1000) break
            offset += 1000
        }
    }

    return results
}

function toV4Path(v3Path) {
    if (!v3Path.startsWith(`${FROM_PREFIX}/`)) return v3Path
    return `${TO_PREFIX}/${v3Path.slice(FROM_PREFIX.length + 1)}`
}

async function objectExists(bucket, fullPath) {
    const dir = path.posix.dirname(fullPath)
    const name = path.posix.basename(fullPath)
    const { data, error } = await supabase.storage.from(bucket).list(dir === '.' ? '' : dir, { limit: 1000 })
    if (error) return false
    return (data || []).some((x) => x.name === name)
}

async function downloadToBuffer(bucket, fullPath) {
    const { data, error } = await supabase.storage.from(bucket).download(fullPath)
    if (error) throw error
    const ab = await data.arrayBuffer()
    return Buffer.from(ab)
}

async function uploadBuffer(bucket, fullPath, buf, contentType) {
    const { error } = await supabase.storage.from(bucket).upload(fullPath, buf, {
        upsert: false,
        cacheControl: CACHE_CONTROL,
        contentType,
    })
    if (error) throw error
}

async function run() {
    console.log(`Migrando ${FROM_BUCKET}/${FROM_PREFIX}/ -> ${TO_PREFIX}/`)
    console.log(`Cache-Control: "${CACHE_CONTROL}"`)
    console.log(`Concorrência: ${CONCURRENCY}`)

    const v3Files = await listAllFiles(FROM_BUCKET, FROM_PREFIX)
    console.log(`Encontrados ${v3Files.length} arquivos em ${FROM_PREFIX}/`)

    const tasks = v3Files.map((v3Path) => async () => {
        const v4Path = toV4Path(v3Path)

        // idempotência
        const exists = await objectExists(FROM_BUCKET, v4Path)
        if (exists) {
            return { v3Path, v4Path, status: 'exists' }
        }

        // download e reupload
        const buf = await downloadToBuffer(FROM_BUCKET, v3Path)

        const contentType = mimeLookup(v3Path) || 'application/octet-stream'
        await uploadBuffer(FROM_BUCKET, v4Path, buf, contentType)

        return { v3Path, v4Path, status: 'copied', bytes: buf.length, contentType }
    })

    let idx = 0
    const out = []

    async function worker(n) {
        while (idx < tasks.length) {
            const i = idx++
            try {
                const res = await tasks[i]()
                out.push(res)
                if (res.status === 'copied') console.log(`✔ ${res.v3Path} -> ${res.v4Path}`)
                else console.log(`↷ (exists) ${res.v4Path}`)
            } catch (e) {
                const v3Path = v3Files[i]
                const v4Path = toV4Path(v3Path)
                out.push({ v3Path, v4Path, status: 'error', error: String(e?.message || e) })
                console.error(`✖ ${v3Path} -> ${v4Path}:`, e?.message || e)
            }
        }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)))

    fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2))
    console.log(`\nGerado: ${OUT_PATH}`)

    const copied = out.filter((x) => x.status === 'copied').length
    const existsCount = out.filter((x) => x.status === 'exists').length
    const errors = out.filter((x) => x.status === 'error').length
    console.log(`Resumo: copied=${copied} exists=${existsCount} errors=${errors}`)

    if (errors > 0) process.exitCode = 1
}

run().catch((e) => {
    console.error('Fatal:', e)
    process.exit(1)
})