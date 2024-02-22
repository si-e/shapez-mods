import time
import os
import zipfile

yyyymmdd = time.strftime("%Y%m%d")
order = 1
version = f"{yyyymmdd}_{order}"

rwd = os.path.dirname(os.path.dirname(__file__))
sprites_wd = os.path.join(rwd, "sprites")

os.chdir(sprites_wd)
import convert_sprites_to_base64
with open("resources.js", encoding="utf-8") as f:
    RESOURCES = f.read()

os.chdir(rwd)
if not os.path.exists("build"):
    os.mkdir("build")
with open("SQ-X.js", encoding="utf-8") as f:
    CODE = f.read()

CODE = CODE.replace("version: \"__dev__\"", f"version: \"{version}\"")
CODE = CODE + RESOURCES

with open(os.path.join("build", "SQ-X.js"), "w", encoding="utf-8") as f:
    f.write(CODE)

with zipfile.ZipFile(os.path.join("build", f"X模组-b{version}.zip"), "w", zipfile.ZIP_DEFLATED) as zip_file:
    zip_file.write(os.path.join("build", "SQ-X.js"), arcname="SQ-X.js")
    zip_file.write("【腾讯文档】X模组-BUG反馈.url")
