#!python3
import base64
import json
import os

import create_blueprint_previews

# const RESOURCES = {
#     "x_miner-buildings.png":
#         "data:image/png;base64,..."}

def set_clip(text):
    import win32clipboard

    win32clipboard.OpenClipboard()
    win32clipboard.EmptyClipboard()
    win32clipboard.SetClipboardText(text)
    win32clipboard.CloseClipboard()

RESOURCES = {}
RESOURCES_KEY = []
for dir in ("buildings", "blueprints", "icons", "tutorials"):
    dn = dir[:-1]
    RESOURCES[dn] = {}
    for fn in os.listdir(dir):
        if not fn.endswith(".png"):
            continue
        image_bytes = open(os.path.join(dir, fn), "rb").read()
        base64_image_str = base64.b64encode(image_bytes).decode("utf-8")
        RESOURCES[dn][fn] = f"data:image/png;base64,{base64_image_str}"
        RESOURCES_KEY.append(f'RESOURCES["{dn}"]["{fn}"]')

RESOURCES_KEY_STR = "\n".join(RESOURCES_KEY)
print(RESOURCES_KEY_STR)
RESOURCES_STR = json.dumps(RESOURCES, indent=4, ensure_ascii=False)
R = f"/*\n{RESOURCES_KEY_STR}\n*/\nconst RESOURCES = {RESOURCES_STR};\n"
# set_clip(R)
with open("resources.js", "w") as f:
    f.write(R)
