import pdfplumber
import json
import re

PDF_FILE = "PV - Dark Souls 3 Guide 100% (1).pdf"
OUTPUT_FILE = "data.json"

data = {}
current_section = None

with pdfplumber.open(PDF_FILE) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if not text:
            continue

        for line in text.split("\n"):
            line = line.strip()
            if not line:
                continue

            # Section headers (areas)
            if re.match(r"^[A-Z][A-Za-z0-9 '\\-]+$", line):
                current_section = line
                if current_section not in data:
                    data[current_section] = []
                continue

            # Checklist steps
            if current_section:
                data[current_section].append(line)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

total = sum(len(v) for v in data.values())
print(f"Created {OUTPUT_FILE} with {total} steps")
