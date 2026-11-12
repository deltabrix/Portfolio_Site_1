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
function renderGalleryCaption(item,key,data){
  const board=galleryElement('div','work-caption-artboard reveal');
  board.id=`work-caption-${key}`;
  const artwork=galleryImage(item,undefined,false);
  const masks=galleryElement('div','work-caption-masks');
  masks.setAttribute('aria-hidden','true');
  const copy=galleryElement('div','work-caption-overlay');
  copy.lang='ko';
  const title=galleryElement('h3','work-caption-heading');
  const body=galleryElement('p','work-caption-paragraph');
  let titleAdded=false,bodyAdded=false;

  for(const [role,x,y,size,weight,gray,[left,top,right,bottom],content] of data.lines){
    const mask=galleryElement('span','work-caption-mask');
    mask.style.left=captionPercent(left,captionCanvasWidth);
    mask.style.top=captionPercent(top,data.height);
    mask.style.width=captionPercent(right-left,captionCanvasWidth);
    mask.style.height=captionPercent(bottom-top,data.height);
    masks.append(mask);

    const line=galleryElement('span','work-caption-line',typeof content==='string'?content:null);
    line.dataset.captionRole=role;
    line.style.left=captionPercent(x,captionCanvasWidth);
    line.style.top=captionPercent(y,data.height);
    line.style.fontSize=`${100*size/captionCanvasWidth}cqi`;
    line.style.fontWeight=weight;
    line.style.color=`rgb(${gray},${gray},${gray})`;
    if(typeof content==='string'&&!/[가-힣]/.test(content))line.lang='en';
    if(Array.isArray(content)){
      for(const [text,spanWeight] of content){
        const span=galleryElement('span','',text);
        span.style.fontWeight=spanWeight;
        line.append(span);
      }
    }

    if(role==='title'){
      if(!titleAdded){copy.append(title);titleAdded=true;}
      if(title.childElementCount)title.append(document.createTextNode(' '));
      title.append(line);
    }else if(role==='body'){
      if(!bodyAdded){copy.append(body);bodyAdded=true;}
      if(body.childElementCount)body.append(document.createTextNode(' '));
      body.append(line);
    }else{
      copy.append(line);
    }
  }
  board.append(artwork,masks,copy);
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
  if(item.gapAfter||gapAfter.has(item.number))appendGap();
}
