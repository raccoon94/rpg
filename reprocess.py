import numpy as np
from PIL import Image
from collections import deque

def remove_white_bg2(inp, outp, border_th=235, pure_th=249, maxsize=1100):
    im = Image.open(inp).convert("RGBA")
    if max(im.size) > maxsize:
        r = maxsize / max(im.size)
        im = im.resize((int(im.width*r), int(im.height*r)), Image.LANCZOS)
    arr = np.array(im)
    h, w = arr.shape[:2]
    mn = arr[:, :, :3].min(axis=2)
    bright = mn >= border_th
    # 1) 테두리에서 연결된 흰색 = 바깥 배경
    bg = np.zeros((h, w), bool)
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
    # 2) 갇힌 순백색(머리/팔 사이 틈)도 제거 — 옷의 흰색은 음영이 있어 pure_th 미만이라 보존됨
    pure = mn >= pure_th
    remove = bg | pure
    arr[remove, 3] = 0
    out = Image.fromarray(arr, "RGBA")
    bb = out.getbbox()
    if bb:
        out = out.crop(bb)
    out.save(outp)
    print("saved", outp, out.size, "removed%", round(100*remove.mean(),1))

remove_white_bg2("character/main_character.webp", "assets/skins/swim.png")
remove_white_bg2("character/character_newbie.png", "assets/skins/default.png")
print("DONE")
