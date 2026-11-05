"""Render the original Digital Dimension environment. Not needed to run the site.
Tools: numpy, Pillow, imageio-ffmpeg. Output: silent H.264, short GOP, faststart.
"""
from pathlib import Path
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'media'
OUT.mkdir(parents=True, exist_ok=True)
W, H, FPS, FRAMES = 960, 540, 24, 192
Y, X = np.mgrid[0:H, 0:W].astype(np.float32)
rng = np.random.default_rng(37)
stars = rng.random((65, 3))

def frame(index):
    t = index / (FRAMES - 1)
    a = t * math.pi * 1.65
    cx = W * (.64 + .10 * math.sin(a))
    cy = H * (.48 + .07 * math.cos(a * .8))
    glow = np.exp(-((X-cx)**2/(W*.37)**2 + (Y-cy)**2/(H*.5)**2))
    rgb = np.empty((H,W,3), dtype=np.float32)
    for k, (base, light) in enumerate([(5,17),(5,14),(16,47)]):
        rgb[:,:,k] = base + glow * light
    im = Image.fromarray(np.uint8(rgb.clip(0,255)))
    # Camera moves through luminous, gently twisting architectural portals.
    lines = Image.new('RGB',(W,H))
    draw = ImageDraw.Draw(lines)
    for j in range(16,0,-1):
        depth = (j - t * 2.8) % 17 + .8
        scale = 1.8 / depth
        radius = W * scale
        angle = a*.18 + depth*.12
        pts=[]
        for q in range(97):
            p=q/96*math.tau
            # A softly squared toroidal tunnel with metallic highlights.
            dx=math.copysign(abs(math.cos(p))**.7,math.cos(p))*radius
            dy=math.copysign(abs(math.sin(p))**.7,math.sin(p))*radius*.57
            pts.append((cx+dx*math.cos(angle)-dy*math.sin(angle),cy+dx*math.sin(angle)+dy*math.cos(angle)))
        intensity=int(105/(1+depth*.18))
        color=(intensity//2,intensity//2+8,min(200,intensity+40))
        draw.line(pts,fill=color,width=2 if depth<4 else 1)
        if j%3==0: draw.line(pts[6:29],fill=(80,110,170),width=2)
    haze=lines.filter(ImageFilter.GaussianBlur(10))
    im=Image.fromarray(np.uint8(np.asarray(im,dtype=np.float32)+np.asarray(haze,dtype=np.float32)*.65).clip(0,255))
    im=Image.fromarray(np.maximum(np.asarray(im),np.asarray(lines)))
    # Analytically shaded chrome object: moving reflections rather than a flat disk.
    radius=H*(.175+.025*math.sin(a*.6))
    sx=(X-(cx+25*math.sin(a*1.3)))/radius
    sy=(Y-(cy-12*math.cos(a)))/radius
    r2=sx*sx+sy*sy
    mask=r2<1
    z=np.sqrt(np.maximum(0,1-r2))
    reflection=np.sin(sy*7+z*9+sx*2+a*1.1)
    stripe=np.exp(-((reflection-.72)/.17)**2)
    highlight=np.maximum(0,-sx*.45-sy*.65+z*.5)**12
    fresnel=(1-z)**3
    sphere=np.stack([14+stripe*132+highlight*150+fresnel*80,17+stripe*144+highlight*160+fresnel*105,34+stripe*166+highlight*175+fresnel*150],axis=-1)
    arr=np.asarray(im).copy()
    arr[mask]=np.uint8(sphere.clip(0,255))[mask]
    im=Image.fromarray(arr)
    draw=ImageDraw.Draw(im)
    # Small faceted structures occupy the edges, leaving text space in the center.
    for j in range(4):
        px=W*(.12+j*.25)+math.sin(a+j)*25
        py=H*(.22 if j%2 else .78)+math.cos(a*.7+j)*20
        r=12+j*5
        vertices=[(px,py-r*1.3),(px+r,py),(px,py+r*1.3),(px-r,py)]
        draw.polygon(vertices,fill=(21,26,48),outline=(92,109,162))
        draw.line([vertices[0],(px+r*.15,py),vertices[2]],fill=(161,174,206),width=1)
        draw.line([vertices[3],(px+r*.15,py),vertices[1]],fill=(61,66,110),width=1)
    for u,v,size in stars:
        px=int((u*W+t*(3+size*6))%W);py=int(v*H)
        c=int(45+size*70)
        draw.ellipse((px,py,px+size*1.5,py+size*1.5),fill=(c,c,min(c+30,255)))
    return im

encoder=imageio_ffmpeg.get_ffmpeg_exe()
cmd=[encoder,'-v','error','-nostats','-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','24','-pix_fmt','yuv420p','-g','8','-keyint_min','8','-sc_threshold','0','-bf','0','-movflags','+faststart',str(OUT/'dimension-universe.mp4')]
process=subprocess.Popen(cmd,stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
try:
    for i in range(FRAMES):
        im=frame(i)
        if i==0: im.save(OUT/'dimension-poster.jpg',quality=88,optimize=True)
        process.stdin.write(im.tobytes())
        if i%48==0: print(f'Rendered {i}/{FRAMES}',flush=True)
finally:
    process.stdin.close()
errors=process.stderr.read().decode()
if process.wait(): raise RuntimeError(errors)
print(f'Created {OUT / "dimension-universe.mp4"} ({(OUT/"dimension-universe.mp4").stat().st_size:,} bytes)',flush=True)

