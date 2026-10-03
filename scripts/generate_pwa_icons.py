import zlib
import struct
import math
import os

def create_png(width, height, render_func, output_path):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = render_func(x, y, width, height)
            raw_data.extend((r, g, b, a))

    compressed = zlib.compress(bytes(raw_data), 9)

    def chunk(tag, data):
        c = tag + data
        crc = zlib.crc32(c) & 0xffffffff
        return struct.pack('>I', len(data)) + c + struct.pack('>I', crc)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0))
    idat = chunk(b'IDAT', compressed)
    iend = chunk(b'IEND', b'')

    with open(output_path, 'wb') as f:
        f.write(header + ihdr + idat + iend)
    print(f"Generated: {output_path} ({width}x{height})")

def render_icon(x, y, w, h, maskable=False):
    # Normalize coords -1 to 1
    nx = (x / (w - 1)) * 2 - 1
    ny = (y / (h - 1)) * 2 - 1
    dist = math.sqrt(nx*nx + ny*ny)

    # Base background: Deep Navy gradient
    # Top left is lighter (#06223e: 6, 34, 62) to bottom right (#020f1c: 2, 15, 28)
    t = (nx + ny + 2) / 4.0
    t = max(0.0, min(1.0, t))
    bg_r = int(6 * (1 - t) + 2 * t)
    bg_g = int(34 * (1 - t) + 15 * t)
    bg_b = int(62 * (1 - t) + 28 * t)

    scale = 0.75 if maskable else 0.85
    mx = nx / scale
    my = ny / scale
    mdist = math.sqrt(mx*mx + my*my)

    # Rounded corners for non-maskable icons
    if not maskable:
        # squircle check
        corner_r = 0.25
        clamped_x = max(0.0, abs(nx) - (1.0 - corner_r))
        clamped_y = max(0.0, abs(ny) - (1.0 - corner_r))
        corner_dist = math.sqrt(clamped_x*clamped_x + clamped_y*clamped_y)
        if corner_dist > corner_r:
            return (0, 0, 0, 0)

    # Background default color
    r, g, b, a = bg_r, bg_g, bg_b, 255

    # Golden circular ring
    if 0.85 <= mdist <= 0.92:
        return (241, 163, 10, 255)
    
    # Subtle inner blue ring
    if 0.78 <= mdist <= 0.82:
        return (56, 189, 248, 180)

    # Golden Cross
    # Vertical beam: x between -0.09 and +0.09, y between -0.55 and +0.35
    in_vert = (-0.08 <= mx <= 0.08) and (-0.52 <= my <= 0.35)
    # Horizontal beam: x between -0.38 and +0.38, y between -0.28 and -0.12
    in_horiz = (-0.36 <= mx <= 0.36) and (-0.26 <= my <= -0.10)

    if in_vert or in_horiz:
        # Cross center highlight
        if in_vert and in_horiz:
            return (255, 255, 255, 255)
        # Golden gradient for cross
        return (245, 158, 11, 255)

    # Open Bible at bottom of cross
    # y between 0.18 and 0.45, x between -0.42 and 0.42
    if 0.18 <= my <= 0.46 and abs(mx) <= 0.44:
        # Bible shape
        page_curve = 0.28 + 0.12 * math.cos(mx * math.pi * 1.5)
        if my >= page_curve - 0.10 and my <= page_curve + 0.12:
            if abs(mx) <= 0.03:
                return (180, 83, 9, 255) # spine
            return (255, 255, 255, 255) # white pages

    return (r, g, b, a)

os.makedirs('public', exist_ok=True)
create_png(192, 192, lambda x,y,w,h: render_icon(x,y,w,h, False), 'public/pwa-192x192.png')
create_png(512, 512, lambda x,y,w,h: render_icon(x,y,w,h, False), 'public/pwa-512x512.png')
create_png(512, 512, lambda x,y,w,h: render_icon(x,y,w,h, True), 'public/pwa-maskable-512x512.png')
create_png(180, 180, lambda x,y,w,h: render_icon(x,y,w,h, False), 'public/apple-touch-icon.png')
create_png(64, 64, lambda x,y,w,h: render_icon(x,y,w,h, False), 'public/favicon.png')
print("All icons successfully created!")
