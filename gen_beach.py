import numpy as np
from PIL import Image, ImageFilter

W, H = 1600, 900
hor = int(H * 0.60)  # 수평선

def lerp(a, b, t):
    a = np.array(a, dtype=np.float32); b = np.array(b, dtype=np.float32)
    return a + (b - a) * t

sky_top  = (120, 195, 240)
sky_hor  = (205, 236, 250)
sea_far  = (70, 175, 205)
sea_near = (40, 140, 180)
sand_far = (224, 198, 142)
sand_near= (240, 220, 170)

img = np.zeros((H, W, 3), dtype=np.float32)
sea_top = int(hor - H * 0.07)
for y in range(H):
    if y < sea_top:
        img[y, :] = lerp(sky_top, sky_hor, y / sea_top)
    elif y < hor:
        img[y, :] = lerp(sea_far, sea_near, (y - sea_top) / (hor - sea_top))
    else:
        img[y, :] = lerp(sand_far, sand_near, (y - hor) / (H - hor))

# 햇살(상단 중앙 부드러운 빛)
yy, xx = np.mgrid[0:H, 0:W]
cx, cy = W * 0.5, H * 0.12
d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
glow = np.clip(1 - d / (W * 0.5), 0, 1) ** 2
img += (np.dstack([glow] * 3) * np.array([60, 50, 30]))

# 모래 반짝/물결 약간의 노이즈
img += (np.random.rand(H, W, 1) - 0.5) * 8

img = np.clip(img, 0, 255).astype(np.uint8)
out = Image.fromarray(img, "RGB").filter(ImageFilter.GaussianBlur(2))
out.save("assets/bg/home.png")
print("beach bg saved", out.size)
