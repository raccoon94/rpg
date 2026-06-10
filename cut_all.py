from rembg import remove, new_session
from PIL import Image, ImageDraw
import numpy as np
from scipy import ndimage

session = new_session("u2net")

def largest_only(arr):
    # 약한 알파(흐릿한 배경 잔여물) 제거 — 밝은 캐릭터일수록 필요
    arr[:, :, 3] = np.where(arr[:, :, 3] > 110, arr[:, :, 3], 0)
    alpha = arr[:, :, 3] > 30
    lbl, n = ndimage.label(alpha)
    if n > 0:
        sizes = ndimage.sum(np.ones_like(lbl), lbl, range(1, n+1))
        keep = lbl == (int(np.argmax(sizes)) + 1)
        arr[~keep, 3] = 0
    return arr

def save_trim(arr, out):
    o = Image.fromarray(arr, "RGBA")
    bb = o.getbbox()
    if bb:
        o = o.crop(bb)
    o.save(out)
    return o.size

def cut_main(src, out):
    im = Image.open(src).convert("RGB"); W, H = im.size
    d = ImageDraw.Draw(im)
    # SD(좌하단), 스킬(우측 띠)을 흰색으로 가려서 인물만 남김
    d.rectangle([0, int(0.58*H), int(0.25*W), H], fill=(255, 255, 255))
    d.rectangle([int(0.73*W), 0, W, H], fill=(255, 255, 255))
    res = remove(im, session=session)
    arr = largest_only(np.array(res))
    print("main", out, save_trim(arr, out))

def cut_sd(src, out):
    im = Image.open(src).convert("RGB"); W, H = im.size
    sd = im.crop((0, int(0.66*H), int(0.22*W), int(0.99*H))).convert("RGB")
    res = remove(sd, session=session)
    arr = largest_only(np.array(res))
    print("sd", out, save_trim(arr, out))

for f in ["rubia", "sapphira", "silvia"]:
    cut_main(f"character/{f}.webp", f"assets/skins/{f}.png")
    cut_sd(f"character/{f}.webp", f"assets/char/{f}_sd.png")
print("DONE")
