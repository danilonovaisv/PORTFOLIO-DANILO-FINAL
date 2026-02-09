import os
import shutil
import sys

def main():
    report_file = "artifacts/conservative_report.txt"
    backup_dir = "_backup_clean"
    
    if not os.path.exists(report_file):
        print(f"Report file {report_file} not found.")
        sys.exit(1)
        
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
        
    with open(report_file, 'r') as f:
        lines = f.readlines()
        
    files_to_move = []
    # Skip header if it contains "Found"
    for line in lines:
        clean_line = line.strip()
        if not clean_line or clean_line.startswith("Found"):
            continue
        files_to_move.append(clean_line)
        
    moved_count = 0
    errors = 0
    
    print(f"Starting quarantine of {len(files_to_move)} files to {backup_dir}...")
    
    for relative_path in files_to_move:
        # Safety check: ensure path is within src
        if not relative_path.startswith("src/"):
            print(f"Skipping non-src file: {relative_path}")
            continue
            
        full_path = os.path.abspath(relative_path)
        dest_path = os.path.join(os.path.abspath(backup_dir), relative_path)
        
        if os.path.exists(full_path):
            try:
                # Create parent dirs in backup
                os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                shutil.move(full_path, dest_path)
                moved_count += 1
            except Exception as e:
                print(f"Error moving {relative_path}: {e}")
                errors += 1
        else:
            print(f"File not found (already moved?): {relative_path}")
            
    print(f"Finished. Moved: {moved_count}, Errors: {errors}")

if __name__ == "__main__":
    main()
