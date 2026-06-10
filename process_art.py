import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
from collections import deque

def remove_white_bg(inp, outp, thresh=236, maxsize=1100):
    im = Image.open(inp).convert("RGBA")
    if max(im.size) > maxsize:
        r = maxsize / max(im.size)
        im = im.resize((int(im.width*r), int(im.height*r)), Image.LANCZOS)
    arr = np.array(im)
    h, w = arr.shape[:2]
    rgb = arr[:, :, :3].astype(int)
    # "흰색 배경" 후보: 세 채널 모두 밝고, 채널 차이 작음(회색/흰색)
    bright = (rgb.min(axis=2) >= thresh)
    # 테두리에서 연결된 흰색만 배경으로 간주 (BFS flood fill)
    bg = np.zeros((h, w), dtype=bool)
    dq = deque()
    for x in range(w):
        for y in (0, h-1):
            if bright[y, x] and not bg[y, x]:
                bg[y, x] = True; dq.append((x, y))
    for y in range(h):
        for x in (0, w-1):
            if bright[y, x] and not bg[y, x]:
                bg[y, x] = True; dq.append((x, y))
    while dq:
        x, y = dq.popleft()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            if 0 <= nx < w and 0 <= ny < h and bright[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True; dq.append((nx, ny))
    arr[bg, 3] = 0
    out = Image.fromarray(arr, "RGBA")
    # 여백 잘라내기(투명 영역 crop)
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.save(outp)
    print("saved", outp, out.size)

def make_beach_bg(inp, outp):
    bg = Image.open(inp).convert("RGB")
    bg = bg.filter(ImageFilter.GaussianBlur(30))
    bg = ImageEnhance.Brightness(bg).enhance(0.82)
    bg = ImageEnhance.Color(bg).enhance(1.1)
    bg.save(outp)
    print("saved", outp, bg.size)

remove_white_bg("character/main_character.webp", "assets/skins/swim.png")
remove_white_bg("character/character_newbie.png", "assets/skins/default.png")
make_beach_bg("character/beach_gun.png", "assets/bg/home.png")
print("DONE")
