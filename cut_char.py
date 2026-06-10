import sys, os
from rembg import remove, new_session
from PIL import Image

session = new_session("u2net")

def crop_frac(im, l, t, r, b):
    W, H = im.size
    return im.crop((int(l*W), int(t*H), int(r*W), int(b*H)))

def cut(im, box, out, pad_trim=True):
    part = crop_frac(im, *box).convert("RGBA")
    res = remove(part, session=session)
    if pad_trim:
        bb = res.getbbox()
        if bb:
            res = res.crop(bb)
    res.save(out)
    print("saved", out, res.size)

# (src, main_box, sd_box, main_out, sd_out)
JOBS = [
    ("character/lin.webp", (0.19,0.01,0.70,1.0), (0.0,0.66,0.20,0.97), "assets/skins/lin.png", "assets/char/lin_sd.png"),
]

for src, mbox, sbox, mout, sout in JOBS:
    im = Image.open(src).convert("RGB")
    print("processing", src, im.size)
    cut(im, mbox, mout)
    cut(im, sbox, sout)
print("DONE")
