from pathlib import Path
from PIL import Image
import json

out = Path('dist/assets/work')
out.mkdir(parents=True, exist_ok=True)
items = []
for source in sorted(Path('Public/Behance').glob('*.png'), key=lambda p: int(p.stem.split()[-1])):
    number = int(source.stem.split()[-1])
    im = Image.open(source).convert('RGB')
    im.resize((1920, round(im.height * 1920 / im.width)), Image.Resampling.LANCZOS).save(out / f'{number}.webp', quality=88, method=4)
    items.append({'number': number, 'width': im.width, 'height': im.height})
Path('dist/gallery.js').write_text('const works = '+json.dumps(items)+';\nconst gapAfter = new Set([4,8,11,13,15,18,20,22,23,25,27,30,33,34,36,38,41,45,46,47,50]);\nconst gallery=document.querySelector("#gallery");\nfor(const item of works){const img=document.createElement("img");img.src=`assets/work/${item.number}.webp`;img.width=item.width;img.height=item.height;img.alt=`서동범 디자인 포트폴리오 — 원본 Slice ${item.number}`;img.loading="lazy";img.decoding="async";gallery.append(img);if(gapAfter.has(item.number)){const gap=document.createElement("div");gap.className="work-gap";gap.setAttribute("aria-hidden","true");gallery.append(gap);}}\n', encoding='utf-8')
print(f'Prepared {len(items)} images, {sum(p.stat().st_size for p in out.glob("*.webp"))/1024/1024:.1f} MB')
