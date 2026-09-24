const hero=document.querySelector('.hero');
const profile=document.querySelector('.profile');
const statement=document.querySelector('.statement');
const siteHeader=document.querySelector('.site-header');
function prepareStatement(){
  let wordIndex=0;
  const japanese=document.documentElement.lang==='ja';
  const segmenter=japanese&&typeof Intl.Segmenter==='function'?new Intl.Segmenter('ja',{granularity:'word'}):null;
  document.querySelectorAll('.statement-line').forEach(line=>{
    const text=line.textContent;
    const words=segmenter?Array.from(segmenter.segment(text),part=>part.segment):japanese?Array.from(text):(text.match(/\S+|\s+/g)||[]);
    line.replaceChildren();
    words.forEach(text=>{
      if(/^\s+$/.test(text)){line.append(text);return}
      if(japanese&&/^[、。・]$/.test(text)&&line.lastElementChild){line.lastElementChild.textContent+=text;return}
      const word=document.createElement('span');
      word.className='statement-word';word.textContent=text;
      word.style.setProperty('--word-delay',`${Math.min(wordIndex++*(japanese?30:70),850)}ms`);
      line.append(word);
    });
  });
}
prepareStatement();
const browserTheme=document.querySelector('meta[name="theme-color"]');
let canvasColor='';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=value=>{const t=clamp(value);return t*t*(3-2*t)};
document.documentElement.classList.add('motion-ready');
let ticking=false;
let heroStart=0;
let distance=1;
function measure(){
  heroStart=hero.offsetTop;
  distance=Math.max(1,hero.offsetHeight-document.querySelector('.hero-sticky').offsetHeight);
  queue();
}
function renderScroll(){
  const travelled=window.scrollY-heroStart;
  const p=clamp(travelled/(distance||1));
  // Read layout before applying scroll styles, including Safari viewport changes.
  const headerHeight=siteHeader.offsetHeight;
  const onContent=reduced.matches?hero.getBoundingClientRect().bottom<=headerHeight:p>=.985;
  const onFooter=document.querySelector('#contact').getBoundingClientRect().top<=headerHeight;
  const arrival=reduced.matches?1:smooth((p-.66)/.34);
  const wash=reduced.matches?0:smooth((p-.57)/.29);
  // Safari also samples the document canvas for its status/toolbar backdrop.
  const canvasShade=Math.round(255*(reduced.matches?(travelled>=hero.offsetHeight?1:0):wash));
  const nextCanvasColor=`rgb(${canvasShade}, ${canvasShade}, ${canvasShade})`;
  if(nextCanvasColor!==canvasColor){
    canvasColor=nextCanvasColor;
    document.documentElement.style.backgroundColor=canvasColor;
    document.body.style.backgroundColor=canvasColor;
    if(browserTheme)browserTheme.content=canvasColor;
  }
  hero.style.setProperty('--zoom',reduced.matches?1:Math.exp(Math.min(p,.82)*3.8));
  hero.style.setProperty('--caption',Math.max(0,1-p*5));
  hero.style.setProperty('--wash',wash);
  hero.classList.toggle('is-covered',wash===1);
  statement.style.setProperty('--arrival',arrival);
  statement.style.setProperty('--approach',.92+.08*arrival);
  statement.classList.toggle('is-arriving',arrival>0);
  statement.classList.toggle('is-readable',arrival>.12);
  const transitioning=!reduced.matches&&p>.025&&p<.985;
  siteHeader.classList.toggle('is-light',onContent&&!onFooter);
  siteHeader.classList.toggle('is-past-hero',onContent);
  siteHeader.classList.toggle('is-transitioning',transitioning);
  siteHeader.inert=transitioning;
  siteHeader.setAttribute('aria-hidden',String(transitioning));
  ticking=false;
}
function queue(){if(!ticking){ticking=true;requestAnimationFrame(renderScroll)}}
addEventListener('scroll',queue,{passive:true});
addEventListener('resize',measure);
reduced.addEventListener('change',measure);
measure();
document.addEventListener('languagechange',()=>{prepareStatement();measure()});
document.fonts?.addEventListener('loadingdone',measure);
// A bounded duration keeps even the long journey to the footer quick and continuous.
let navigationFrame=0;
function cancelNavigation(){cancelAnimationFrame(navigationFrame);navigationFrame=0}
function scrollToSection(top){
  cancelNavigation();
  const start=window.scrollY;
  const end=Math.max(0,Math.min(top,document.documentElement.scrollHeight-innerHeight));
  if(reduced.matches){window.scrollTo({top:end,behavior:'instant'});return}
  const duration=Math.min(1100,650+Math.abs(end-start)*.008);
  const began=performance.now();
  function step(now){
    const t=Math.min(1,(now-began)/duration);
    const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    window.scrollTo({top:start+(end-start)*eased,behavior:'instant'});
    navigationFrame=t<1?requestAnimationFrame(step):0;
  }
  navigationFrame=requestAnimationFrame(step);
}
addEventListener('wheel',cancelNavigation,{passive:true});
addEventListener('touchstart',cancelNavigation,{passive:true});
addEventListener('keydown',event=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Escape'].includes(event.key))cancelNavigation()});
// The introduction is pinned; the resume is now a separate section in normal flow.
function profilePosition(){return window.scrollY+profile.getBoundingClientRect().top}
function statementPosition(){return reduced.matches?statement.parentElement.offsetTop:heroStart+distance}
document.querySelectorAll('a[href="#statement"],a[href="#profile"]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  measure();
  const hash=link.getAttribute('href');
  history.replaceState(null,'',location.pathname+location.search+hash);
  scrollToSection(hash==='#profile'?profilePosition():statementPosition());
}));
// Land on the Work title, past its blank lead-in, or the contact footer.
document.querySelectorAll('header nav a[href="#work"],header nav a[href="#contact"]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  const hash=link.getAttribute('href');
  const target=document.querySelector(hash==='#work'?'.work-heading h2':'#contact');
  history.replaceState(null,'',location.pathname+location.search+hash);
  scrollToSection(window.scrollY+target.getBoundingClientRect().top-siteHeader.offsetHeight-24);
}));
document.querySelectorAll('a[href="#top"]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  history.replaceState(null,'',location.pathname+location.search+'#top');
  scrollToSection(0);
}));
addEventListener('pageshow',()=>{
  if(['#profile','#statement'].includes(location.hash))requestAnimationFrame(()=>requestAnimationFrame(()=>{
    measure();
    window.scrollTo({top:location.hash==='#profile'?profilePosition():statementPosition(),behavior:'instant'});
  }));
});
const revealSelector='.hero-meta span,.hero-bottom>*,'+
  '.section-top span,.intro>*,.resume-row>h3,.entries article,.expertise>div,'+
  '.profile-contact>*,.play-category>h4,.play-list>li,.work-heading h2,.footer-brand,.footer-contact,.footer-bottom';
document.querySelectorAll(revealSelector).forEach(element=>element.classList.add('reveal'));
function loadImage(image){if(!image.getAttribute('src'))image.src=image.dataset.src}
const reveals=document.querySelectorAll('.reveal');
const images=document.querySelectorAll('img[data-src]');
const videos=document.querySelectorAll('.work-video');
// Arrival lives on a separate wrapper, leaving the scroll-driven logo scale intact.
const logo=document.querySelector('.hologram');
const arrivalShell=document.createElement('div');
arrivalShell.className='logo-arrival';
logo.before(arrivalShell);
arrivalShell.append(logo);
const entranceEligible=!reduced.matches&&window.scrollY<80&&(!location.hash||location.hash==='#top');
if(entranceEligible){
  hero.classList.add('is-entering');
  document.body.classList.add('intro-active');
  // Commit the zero-opacity opening frame before revealing the body and running it.
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    document.documentElement.classList.remove('intro-pending');
  }));
  const finishEntrance=()=>{
    hero.classList.remove('is-entering');
    document.body.classList.remove('intro-active');
  };
  arrivalShell.addEventListener('animationend',event=>{
    if(event.animationName==='logo-arrive')finishEntrance();
  });
  addEventListener('scroll',()=>{if(window.scrollY>80)finishEntrance()},{passive:true});
  reduced.addEventListener('change',()=>{if(reduced.matches)finishEntrance()});
  setTimeout(finishEntrance,2800);
}else document.documentElement.classList.remove('intro-pending');
if('IntersectionObserver' in window){
  const preload=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){loadImage(entry.target);preload.unobserve(entry.target)}
  }),{rootMargin:'400px 0px',threshold:0});
  images.forEach(image=>preload.observe(image));
  const entrances=new IntersectionObserver(entries=>entries.forEach(entry=>{
    entry.target.classList.toggle('is-inview',entry.isIntersecting);
  }),{threshold:0,rootMargin:'0px 0px -48px 0px'});
  reveals.forEach(element=>entrances.observe(element));
  // Release distant players instead of running sixteen videos in the background.
  const players=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const frame=entry.target.querySelector('iframe');
    if(entry.isIntersecting&&!frame.hasAttribute('src'))frame.src=frame.dataset.src;
    else if(!entry.isIntersecting&&frame.hasAttribute('src'))frame.removeAttribute('src');
  }),{rootMargin:'400px 0px',threshold:0});
  videos.forEach(video=>players.observe(video));
}else{
  images.forEach(loadImage);
  reveals.forEach(element=>element.classList.add('is-inview'));
  videos.forEach(video=>{const frame=video.querySelector('iframe');frame.loading='lazy';frame.src=frame.dataset.src});
}
