import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SAFE_ROOT = path.resolve(process.cwd());

function resolveSafePath(userPath: unknown): string | null {
  if (typeof userPath !== 'string' || userPath.trim() === '') {
    return null;
  }

  const resolvedPath = path.resolve(SAFE_ROOT, userPath);
  const relative = path.relative(SAFE_ROOT, resolvedPath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return null;
  }

  return resolvedPath;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, filePath, content } = body;

    const safePath = resolveSafePath(filePath);
    if (!safePath) {
      return NextResponse.json(
        { success: false, error: 'Invalid filePath' },
        { status: 400 }
      );
    }

    if (action === 'read') {
      if (!fs.existsSync(safePath)) {
        return NextResponse.json(
          { success: false, error: 'File not found' },
          { status: 404 }
        );
      }
      const data = fs.readFileSync(safePath, 'utf-8');
      return NextResponse.json({ success: true, data });
    }

    if (action === 'write') {
      const dir = path.dirname(safePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(safePath, content, 'utf-8');
      return NextResponse.json({ success: true });
    }

    if (action === 'delete') {
      if (fs.existsSync(safePath)) {
        fs.unlinkSync(safePath);
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
