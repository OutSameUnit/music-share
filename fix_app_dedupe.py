from pathlib import Path
import re

path = Path(r'd:\Projects\playlist\src\app.js')
text = path.read_text(encoding='utf-8')

pattern = re.compile(
    r'\nconst client = getSupabaseClient\(\);\nif \(client\) \{\n\s*client\.auth\.onAuthStateChange\(async \(event, session\) => \{.*?\n\s*\}\);\n\s*\}\n',
    re.S,
)
matches = list(pattern.finditer(text))
if matches:
    parts = []
    last = 0
    for i, m in enumerate(matches):
        if i == 0:
            parts.append(text[last:m.start()])
            parts.append(m.group(0))
            last = m.end()
    parts.append(text[last:])
    text = ''.join(parts)

func_pattern = re.compile(r'function\s+([A-Za-z0-9_$]+)\s*\(')
positions = []
pos = 0
while True:
    m = func_pattern.search(text, pos)
    if not m:
        break

    name = m.group(1)
    start = m.start()
    brace_index = text.find('{', m.end())
    if brace_index == -1:
        break

    depth = 0
    in_single = False
    in_double = False
    in_template = False
    escape = False
    end = None

    for i in range(brace_index, len(text)):
        ch = text[i]

        if in_single:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == "'":
                in_single = False
            continue

        if in_double:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == '"':
                in_double = False
            continue

        if in_template:
            if escape:
                escape = False
            elif ch == '\\':
                escape = True
            elif ch == '`':
                in_template = False
            continue

        if ch == "'":
            in_single = True
            continue
        if ch == '"':
            in_double = True
            continue
        if ch == '`':
            in_template = True
            continue
        if ch == '{':
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    if end is None:
        break

    positions.append((name, start, end))
    pos = end

seen = set()
out = []
last = 0
for name, start, end in positions:
    out.append(text[last:start])
    if name not in seen:
        out.append(text[start:end])
        seen.add(name)
    last = end
out.append(text[last:])
text = ''.join(out)
text = re.sub(r'\n{3,}', '\n\n', text)
path.write_text(text, encoding='utf-8')
print('deduplicated app.js')
