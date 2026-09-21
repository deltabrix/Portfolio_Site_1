// Source: https://www.behance.net/gallery/250289759/DELTABRIX-PORTFOLIO
// Image boundaries matched by original order and aspect ratios.
const videosAfter = new Map([
  [13, [['1140065214',1188],['1140081069',1400]]], // Modules 16–17
  [21, [['1098990437',1188],['1140826356',1188],['1140826334',1188],['1140826377',1188],['1140826399',1188],['1197098821',1188]]], // 30–35
  [23, [['1142505569',1188]]], // 39
  [26, [['1140725295',1188],['1112884095',958],['1112884058',958]]], // 45–47
  [31, [['CuZrJzwtxYc',1188,'youtube']]], // 55
  [34, [['1112680617',1188],['1140829530',1188]]], // 60–61
  [38, [['1167137428',1188]]] // 69, between spacer modules
]);
const gapAfter = new Set([4,8,11,13,15,18,20,22,23,25,27,30,33,34,36,38,41,45,46,47,50]);
const gallery = document.querySelector('#gallery');
function appendGap(){
  const gap=document.createElement('div');
  gap.className='work-gap';gap.setAttribute('aria-hidden','true');gallery.append(gap);
}
let videoNumber=0;
for(const item of works){
  const img=document.createElement('img');
  img.dataset.src=`assets/work/${item.number}.webp`;
  img.width=item.width;img.height=item.height;
  img.alt=`서동범 디자인 포트폴리오 — 원본 Slice ${item.number}`;
  img.className='reveal lazy-work';img.loading='lazy';img.decoding='async';
  img.addEventListener('load',()=>img.classList.add('is-loaded'),{once:true});
  gallery.append(img);
  if(item.number===38)appendGap();
  for(const [id,height,provider='vimeo'] of videosAfter.get(item.number)||[]){
    const block=document.createElement('div');
    block.className='work-video reveal';block.dataset.afterSlice=item.number;
    block.style.aspectRatio=`2112 / ${height}`;
    const frame=document.createElement('iframe');
    frame.title=`DELTABRIX 모션 포트폴리오 ${++videoNumber}`;
    frame.dataset.src=provider==='youtube'
      ?`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&rel=0`
      :`https://player.vimeo.com/video/${id}?background=1&autoplay=1&muted=1&loop=1&playsinline=1`;
    frame.allow='autoplay; fullscreen; picture-in-picture; encrypted-media';
    frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
    block.append(frame);gallery.append(block);
  }
  if(gapAfter.has(item.number))appendGap();
}
