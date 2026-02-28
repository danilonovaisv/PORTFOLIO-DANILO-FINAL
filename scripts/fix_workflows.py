
import os

workflow_dir = "/Users/danilonovais/PORTFOLIO-DANILO-FINAL/.agent/workflows"

for filename in os.listdir(workflow_dir):
    if filename.endswith(".md"):
        filepath = os.path.join(workflow_dir, filename)
        
        # Skip the garbage file created by mistake
        if filename == "*.md":
            continue

        try:
            with open(filepath, "r") as f:
                content = f.read()
            
            if not content.startswith("---"):
                description = filename.replace("-", " ").replace(".md", "").title()
                new_content = f"---\ndescription: {description}\n---\n\n{content}"
                
                with open(filepath, "w") as f:
                    f.write(new_content)
                print(f"Fixed {filename}")
            else:
                print(f"Skipped {filename} (already has frontmatter)")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
