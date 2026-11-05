# Umme Amara — original environment media

`dimension-universe.mp4` and `dimension-poster.jpg` are original procedural artwork created for this project with `scripts/render-environment.py`. No third-party stock footage, branded imagery, music, or audio is incorporated.

Permission: this original artwork may be used, modified, and redistributed with UMME AMARA, including commercial deployment, without attribution or a royalty payment. This notice concerns the original media only; existing project assets and tool dependencies retain their respective terms.

Encoding: 960 × 540, 24 fps, 8 seconds, H.264 / yuv420p, silent, fast-start MP4, an 8-frame keyframe interval and no B-frames for responsive bidirectional seeking. The still poster is a compressed JPEG of the opening composition.

The frontend serves both assets locally. On mobile, coarse-pointer, data-saving, low-memory, or reduced-motion devices, it does not mount the video; it uses the poster and restrained CSS styling instead. Video errors also leave the poster and CSS environment visible.

To regenerate, install Python's `numpy`, `Pillow`, and `imageio-ffmpeg` in a temporary environment, then run `python scripts/render-environment.py`. These tools are not frontend dependencies and are not required to build or run the site.
