import re
import requests
from pathlib import Path

# Load the file
with open("SST.txt", "r") as f:
    lines = f.readlines()

# Make output folder
out_dir = Path("images")
out_dir.mkdir(exist_ok=True)

# Regex to capture start date and .png link
pattern = re.compile(r"AQUA_MODIS\.(\d{8})_\d{8}.*?\.png")

for line in lines:
    match = pattern.search(line)
    if match:
        start_date = match.group(1)  # e.g. 20050101
        # Convert to MM_DD_YY
        new_name = f"{start_date[4:6]}_{start_date[6:]}_{start_date[2:4]}.png"
        save_path = out_dir / new_name

        # Skip if already exists
        if save_path.exists():
            print(f"Skipping {new_name}, already downloaded.")
            continue

        url = line.strip()
        print(f"Downloading {new_name} ...")

        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            with open(save_path, "wb") as img_file:
                img_file.write(response.content)
        except Exception as e:
            print(f"Failed to download {new_name}: {e}")

