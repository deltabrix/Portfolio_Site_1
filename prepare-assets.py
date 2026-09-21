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
Path('dist/gallery.js').write_text('const works = '+json.dumps(items)+';\n', encoding='utf-8')
print(f'Prepared {len(items)} images, {sum(p.stat().st_size for p in out.glob("*.webp"))/1024/1024:.1f} MB')
