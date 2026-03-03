import os
import shutil

skills_dir = '/Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agent/skills'
archive_dir = os.path.join(skills_dir, 'archive')

essential_skills = {
    '3d-web-experience',
    'admin-realtime',
    'canvas-design',
    'nextjs-app-router-patterns',
    'nextjs-best-practices',
    'nextjs-react-expert',
    'nextjs-supabase-auth',
    'r3f-animation',
    'r3f-fundamentals',
    'r3f-geometry',
    'r3f-interaction',
    'r3f-lighting',
    'r3f-loaders',
    'r3f-materials',
    'r3f-physics',
    'r3f-postprocessing',
    'r3f-shaders',
    'r3f-textures',
    'shader-lab',
    'scroll-experience',
    'supabase-auth-storage-realtime-core',
    'supabase-automation',
    'supabase-postgres-best-practices',
    'tailwind-design-system',
    'tailwind-patterns',
    'threejs-skills',
    'webgl-optimizer',
    'webgl-performance',
    'ui-ux-pro-max',
    'clean-code',
    'react-best-practices',
    'frontend-design',
    'typescript-expert',
    'testing-patterns',
    'webapp-testing',
    'systematic-debugging',
    'seo-fundamentals',
    'performance-profiling',
    'deployment-procedures',
    'firebase',
    'app-builder',
    'architecture',
    'brainstorming',
    'plan-writing',
    'loki-mode',
    'loki-orchestrator'
}

if not os.path.exists(archive_dir):
    os.makedirs(archive_dir)

items = os.listdir(skills_dir)
count = 0

for item in items:
    full_path = os.path.join(skills_dir, item)
    if os.path.isdir(full_path):
        if item not in essential_skills and item != 'archive' and not item.startswith('.') and not item.startswith('SKILL-'):
            try:
                shutil.move(full_path, os.path.join(archive_dir, item))
                count += 1
            except Exception as e:
                print(f"Error moving {item}: {e}")

print(f"Moved {count} skills to archive.")
