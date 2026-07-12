import sys

with open(r"d:\sathwik\jeshurun\src\app\about\page.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

who_end_idx = -1
for i, line in enumerate(lines):
    if '{activeTab === "delivery" && (' in line:
        who_end_idx = i - 2
        break

leadership_start_idx = -1
leadership_end_idx = -1
for i, line in enumerate(lines):
    if "{/* LEADERSHIP TEAM */}" in line:
        leadership_start_idx = i
for i in range(leadership_start_idx, len(lines)):
    if "        )}\n" == lines[i] or "        )}\r\n" == lines[i]:
        if '{activeTab === "delivery"' in lines[i+2] or '{activeTab === "delivery"' in lines[i+1]:
            leadership_end_idx = i - 1
            break

delivery_start_idx = who_end_idx + 2
delivery_standards_end_idx = leadership_start_idx - 1

how_we_deliver_start_idx = leadership_end_idx + 2
how_we_deliver_end_idx = -1
for i in range(how_we_deliver_start_idx, len(lines)):
    if "      </AnimatePresence>" in lines[i]:
        how_we_deliver_end_idx = i - 1
        break

print(f"who_end_idx: {who_end_idx}")
print(f"leadership_start_idx: {leadership_start_idx}")
print(f"leadership_end_idx: {leadership_end_idx}")
print(f"delivery_start_idx: {delivery_start_idx}")
print(f"delivery_standards_end_idx: {delivery_standards_end_idx}")
print(f"how_we_deliver_start_idx: {how_we_deliver_start_idx}")
print(f"how_we_deliver_end_idx: {how_we_deliver_end_idx}")

new_lines = []
new_lines.extend(lines[:who_end_idx+1])
new_lines.extend(lines[leadership_start_idx:leadership_end_idx+1])
new_lines.append("          )} // End of who tab\n\n")

new_lines.append('          {activeTab === "delivery" && (\n')
new_lines.append("            <motion.div\n")
new_lines.append('              key="delivery"\n')
new_lines.append("              initial={{ opacity: 0, y: 10 }}\n")
new_lines.append("              animate={{ opacity: 1, y: 0 }}\n")
new_lines.append("              exit={{ opacity: 0, y: -10 }}\n")
new_lines.append("              transition={{ duration: 0.2 }}\n")
new_lines.append("            >\n")

content_start = delivery_start_idx + 9
new_lines.extend(lines[content_start:delivery_standards_end_idx+1])

hwd_content_start = how_we_deliver_start_idx + 8
new_lines.extend(lines[hwd_content_start:how_we_deliver_end_idx+1])

new_lines.append("            </motion.div>\n")
new_lines.append("          )}\n")

new_lines.extend(lines[how_we_deliver_end_idx+1:])

with open(r"d:\sathwik\jeshurun\src\app\about\page.tsx", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done rewrite")
