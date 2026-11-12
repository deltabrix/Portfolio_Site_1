// Source: https://www.behance.net/gallery/250289759/DELTABRIX-PORTFOLIO
// Image boundaries matched by original order and aspect ratios.
const videosAfter = new Map([
  [13, [['lineage-m-berserker-reboot',1188,'local','리니지M 광전사 리부트 타이틀 모션'],['1140081069',1400]]], // Modules 16–17
  [21, [ // 30–35
    ['starseed-mockup',1188,'local','Starseed: Asnia Trigger — Faction emblem mockup'],
    ['starseed-asnia',1188,'local','Starseed: Asnia Trigger — Asnia emblem motion'],
    ['starseed-stings',1188,'local','Starseed: Asnia Trigger — Stings emblem motion'],
    ['starseed-autorata',1188,'local','Starseed: Asnia Trigger — Autorata emblem motion'],
    ['starseed-croniya',1188,'local','Starseed: Asnia Trigger — Croniya emblem motion'],
    ['starseed-autorata-test',1188,'local','Starseed: Asnia Trigger — Autorata motion test']
  ]],
  [23, [['1142505569',1188]]], // 39
  [26, [['1140725295',1188],['1112884095',958],['1112884058',958]]], // 45–47
  [31, [['CuZrJzwtxYc',1188,'youtube']]], // 55
  [34, [['1112680617',1188],['1140829530',1188]]], // 60–61
  [38, [['1167137428',1188]]] // 69, between spacer modules
]);
const gapAfter = new Set([4,8,11,13,15,18,20,23,25,27,30,33,34,36,38,41,44,45,46,47,50]);
const gallery = document.querySelector('#gallery');
function appendGap(){
  const gap=document.createElement('div');
  gap.className='work-gap';gap.setAttribute('aria-hidden','true');gallery.append(gap);
}
function galleryElement(tag,className,text){
  const element=document.createElement(tag);
  if(className)element.className=className;
  if(text)element.textContent=text;
  return element;
}
function galleryImage(item,alt,animated=true){
  const img=document.createElement('img');
  img.dataset.src=item.src||`assets/work/${item.number}.webp`;
  img.width=item.width;img.height=item.height;
  img.alt=alt??item.alt??`서동범 디자인 포트폴리오 — 원본 Slice ${item.number}`;
  img.className=animated?'reveal lazy-work':'lazy-work';
  img.loading='lazy';img.decoding='async';
  img.addEventListener('load',()=>img.classList.add('is-loaded'),{once:true});
  return img;
}
const captionCanvasWidth=4224;
const captionPercent=(position,length)=>`${100*position/length}%`;
const captionUnits=position=>`${100*position/captionCanvasWidth}cqi`;
function captionHeading(tag,className,[text,size,weight]){
  const element=galleryElement(tag,className,text);
  element.style.setProperty('--caption-type-size',captionUnits(size));
  element.style.fontWeight=weight;
  if(!/[가-힣]/.test(text))element.lang='en';
  return element;
}
function renderGalleryCaption(item,key,data){
  const board=galleryElement('div','work-caption-artboard reveal');
  board.id=`work-caption-${key}`;
  board.style.setProperty('--caption-inset',captionUnits(data.inset));
  if(data.copyStart)board.style.setProperty('--caption-copy-start',captionUnits(data.copyStart));

  const layout=galleryElement('div','work-caption-layout');
  const heading=galleryElement('div','work-caption-identity');
  heading.append(
    captionHeading('p','work-caption-label',data.label),
    captionHeading('h3','work-caption-heading',data.title)
  );
  for(const text of data.meta||[]){
    const meta=galleryElement('p','work-caption-meta',text);
    if(!/[가-힣]/.test(text))meta.lang='en';
    heading.append(meta);
  }
  const copy=galleryElement('div','work-caption-copy');
  copy.lang='ko';
  for(const text of data.paragraphs)copy.append(galleryElement('p','work-caption-paragraph',text));
  if(data.credits){
    const credits=galleryElement('ul','work-caption-credits');
    for(const [label,value] of data.credits){
      const credit=galleryElement('li');
      if(!/[가-힣]/.test(label+value))credit.lang='en';
      credit.append(galleryElement('strong','work-caption-credit-label',label),document.createTextNode(` | ${value}`));
      credits.append(credit);
    }
    copy.append(credits);
  }
  layout.append(heading,copy);
  board.append(layout);

  if(data.media){
    const media=galleryElement('div','work-caption-media');
    media.append(galleryImage(item,undefined,false));
    if(data.media.trimTop){
      // These full-width strips contain only the printed heading and white space.
      media.classList.add('work-caption-media--trim');
      media.style.setProperty('--caption-trim',captionPercent(-data.media.trimTop,captionCanvasWidth));
    }else{
      // Keep the entire artwork slice and cover only the old type in the side margin.
      const {height,captionTop,captionRight,masks}=data.media;
      board.classList.add('work-caption-artboard--side');
      board.style.setProperty('--caption-side-top',captionUnits(captionTop));
      board.style.setProperty('--caption-side-width',captionUnits(captionRight-data.inset));
      const maskLayer=galleryElement('div','work-caption-masks');
      maskLayer.setAttribute('aria-hidden','true');
      for(const [left,top,right,bottom] of masks){
        const mask=galleryElement('span','work-caption-mask');
        mask.style.left=captionPercent(left,captionCanvasWidth);
        mask.style.top=captionPercent(top,height);
        mask.style.width=captionPercent(right-left,captionCanvasWidth);
        mask.style.height=captionPercent(bottom-top,height);
        maskLayer.append(mask);
      }
      media.append(maskLayer);
    }
    board.append(media);
  }
  gallery.append(board);
}
let videoNumber=0;
for(const item of works){
  if(item.number===46)appendEnterprisePortfolio(gallery);
  const key=item.number??(item.src==='assets/work/starseed-initial-bi.webp'?'starseed-initial-bi':null);
  const caption=portfolioCaptions[key];
  if(caption)renderGalleryCaption(item,key,caption);
  else gallery.append(galleryImage(item));
  if(item.number===38)appendGap();
  for(const [id,height,provider='vimeo',label] of videosAfter.get(item.number)||[]){
    const block=document.createElement('div');
    block.className='work-video reveal';block.dataset.afterSlice=item.number;
    block.style.aspectRatio=`2112 / ${height}`;
    videoNumber++;
    if(provider==='local'){
      block.id=id==='lineage-m-berserker-reboot'?'work-motion-berserker-reboot':`work-motion-${id}`;
      const video=document.createElement('video');
      video.width=2112;
      video.height=height;
      video.dataset.src=`assets/work/${id}.mp4`;
      video.poster=`assets/work/${id}-poster.webp`;
      video.preload='none';
      video.defaultMuted=true;
      video.muted=true;
      video.playsInline=true;
      video.loop=true;
      video.setAttribute('aria-label',label);
      block.append(video);
      gallery.append(block);
      continue;
    }
    const frame=document.createElement('iframe');
    frame.title=`DELTABRIX 모션 포트폴리오 ${videoNumber}`;
    frame.dataset.src=provider==='youtube'
      ?`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&rel=0`
      :`https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&playsinline=1`;
    frame.allow='autoplay; fullscreen; picture-in-picture; encrypted-media';
    frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
    block.append(frame);gallery.append(block);
  }
  if(item.gapAfter||gapAfter.has(item.number))appendGap();
}
