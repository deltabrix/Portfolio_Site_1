// Screen-space texture and ambient dust stay independent of the logo's zoom.
(()=>{
  const hero=document.querySelector('.hero');
  const stage=hero?.querySelector('.hero-sticky');
  if(!stage)return;
  const logo=stage.querySelector('.hologram');
  const arrival=stage.querySelector('.logo-arrival');
  const grain=document.createElement('div');
  grain.className='hero-grain';
  grain.setAttribute('aria-hidden','true');
  stage.querySelector('.logo-stage').after(grain);
  const canvas=document.createElement('canvas');
  canvas.className='hero-atmosphere';
  canvas.setAttribute('aria-hidden','true');
  const context=canvas.getContext('2d');
  if(!context)return;
  // Render the glow and core once, then reuse them at fractional pixel positions.
  // Keeping the two layers separate preserves their original alpha blending.
  function makeSprite(glow){
    const sprite=document.createElement('canvas');
    sprite.width=sprite.height=64;
    const paint=sprite.getContext('2d');
    if(!paint)return null;
    if(glow){
      const halo=paint.createRadialGradient(32,32,0,32,32,28);
      halo.addColorStop(0,'rgba(213,224,237,.24)');
      halo.addColorStop(1,'rgba(213,224,237,0)');
      paint.fillStyle=halo;
    }else paint.fillStyle='rgb(222,231,241)';
    paint.beginPath();
    paint.arc(32,32,glow?28:8,0,Math.PI*2);
    paint.fill();
    return sprite;
  }
  const haloSprite=makeSprite(true);
  const coreSprite=makeSprite(false);
  if(!haloSprite||!coreSprite)return;
  stage.prepend(canvas);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const pointer={active:false,x:0,y:0};
  let width=1,height=1,stageLeft=0,stageTop=0,particles=[],frame=0,grainFrame=0,last=null,elapsed=0,inView=true;
  let seed=731;
  const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
  const wrap=(value,limit)=>((value+12)%(limit+24)+(limit+24))%(limit+24)-12;
  const smooth=value=>{const t=Math.max(0,Math.min(1,value));return t*t*(3-2*t)};
  function renderGrain(){
    if(document.hidden||!inView||hero.classList.contains('is-covered'))return;
    const bounds=logo.getBoundingClientRect();
    const surface=stage.getBoundingClientRect();
    stageLeft=surface.left;stageTop=surface.top;
    // Only the mask follows the logo. The texture itself is never transformed.
    grain.style.setProperty('--grain-mask-size',`${bounds.width}px ${bounds.height}px`);
    grain.style.setProperty('--grain-mask-position',`${bounds.left-surface.left}px ${bounds.top-surface.top}px`);
    grain.style.setProperty('--grain-arrival',getComputedStyle(arrival).opacity);
  }
  function animateGrainEntrance(){
    grainFrame=0;
    renderGrain();
    if(inView&&!document.hidden&&hero.classList.contains('is-entering')&&!reduced.matches){
      grainFrame=requestAnimationFrame(animateGrainEntrance);
    }
  }
  function makeParticle(initial=false){
    const direction=random()*Math.PI*2;
    const speed=2+random()*3;
    const particle={
      // Widen the size distribution by 30%, keeping its average unchanged.
      x:random(),y:random(),radius:1.125+(random()-.5)*.85*1.3,
      opacity:(.24+random()*.24)*.8*1.25,
      vx:Math.cos(direction)*speed,vy:Math.sin(direction)*speed,
      phase:random()*Math.PI*2,sway:(12+random()*10)*1.6,
      offsetX:0,offsetY:0,recoilX:0,recoilY:0,nearPointer:false,avoidSide:1,
      life:6+random()*4
    };
    // Stagger the cycles; replacement particles begin at zero opacity elsewhere.
    particle.born=initial?elapsed-random()*particle.life:elapsed+.4+random()*1.2;
    return particle;
  }
  function draw(delta=0){
    context.clearRect(0,0,width,height);
    const opening=reduced.matches?1:smooth((elapsed-.5)/3);
    const interactive=pointer.active&&!reduced.matches;
    const cursorX=pointer.x-stageLeft;
    const cursorY=pointer.y-stageTop;
    const damping=Math.exp(-2.8*delta);
    const travel=(1-damping)/2.8;
    for(let index=0;index<particles.length;index++){
      let particle=particles[index];
      let age=elapsed-particle.born;
      if(!reduced.matches&&age>=particle.life){
        particle=particles[index]=makeParticle();
        age=elapsed-particle.born;
      }
      if(age<0)continue;
      const progress=age/particle.life;
      const lifeFade=reduced.matches?1:smooth(progress/.28)*smooth((1-progress)/.38);
      const opacity=particle.opacity*lifeFade*opening;
      if(opacity<=0)continue;
      const movement=age*1.3*1.7*1.4;
      const baseX=particle.x*width+movement*particle.vx+Math.sin(movement*.18+particle.phase)*particle.sway;
      const baseY=particle.y*height+movement*particle.vy+Math.cos(movement*.13+particle.phase)*particle.sway*.75;
      let x=wrap(baseX+particle.offsetX,width);
      let y=wrap(baseY+particle.offsetY,height);
      if(delta>0&&!reduced.matches){
        const dx=interactive?x-cursorX:0;
        const dy=interactive?y-cursorY:0;
        const separation=interactive?Math.hypot(dx,dy):Infinity;
        const reach=110;
        const near=separation<reach;
        if(near){
          const strength=smooth(1-separation/reach);
          // The fallback direction also handles a cursor exactly on the particle.
          const nx=separation>.01?dx/separation:Math.cos(particle.phase);
          const ny=separation>.01?dy/separation:Math.sin(particle.phase);
          // Pick a passing side on entry and keep it stable as the particle
          // curves around a stationary or moving cursor.
          if(!particle.nearPointer){
            const tangentMotion=-ny*particle.vx+nx*particle.vy;
            particle.avoidSide=Math.abs(tangentMotion)>.01?Math.sign(tangentMotion):(Math.cos(particle.phase)>=0?1:-1);
          }
          // Smooth acceleration fades to zero at the interaction boundary.
          // Avoid one-frame kicks, which looked jerky as particles crossed it.
          const force=strength*720*delta;
          particle.recoilX+=(nx*.65-ny*particle.avoidSide)*force;
          particle.recoilY+=(ny*.65+nx*particle.avoidSide)*force;
        }
        particle.nearPointer=near;
        // Friction eases the bounce back into drifting, without snapping home.
        particle.offsetX+=particle.recoilX*travel;
        particle.offsetY+=particle.recoilY*travel;
        particle.recoilX*=damping;
        particle.recoilY*=damping;
        x=wrap(baseX+particle.offsetX,width);
        y=wrap(baseY+particle.offsetY,height);
      }
      const diameter=particle.radius*8;
      const left=x-diameter/2,top=y-diameter/2;
      context.globalAlpha=opacity;
      context.drawImage(haloSprite,left,top,diameter,diameter);
      context.drawImage(coreSprite,left,top,diameter,diameter);
    }
    context.globalAlpha=1;
  }
  function resize(){
    width=stage.clientWidth;height=stage.clientHeight;
    const ratio=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    context.setTransform(ratio,0,0,ratio,0,0);
    seed=731;
    const count=Math.min(110,Math.max(38,Math.round(width*height/13000)));
    if(particles.length!==count)particles=Array.from({length:count},()=>makeParticle(true));
    draw();renderGrain();
  }
  function tick(now){
    // Follow every display refresh (60/90/120 Hz) with time-based motion.
    const delta=last===null?0:Math.min((now-last)/1000,.05);
    last=now;
    elapsed+=delta;
    draw(delta);
    frame=requestAnimationFrame(tick);
  }
  function update(){
    const active=inView&&!document.hidden&&!reduced.matches&&!hero.classList.contains('is-covered');
    if(!active)pointer.active=false;
    if(active&&!frame){last=null;frame=requestAnimationFrame(tick)}
    if(!active&&frame){cancelAnimationFrame(frame);frame=0;last=null}
    if(grainFrame){cancelAnimationFrame(grainFrame);grainFrame=0}
    animateGrainEntrance();
    if(reduced.matches)draw();
  }
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(stage);
  else addEventListener('resize',resize,{passive:true});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{
    inView=entries[0].isIntersecting;update();
  }).observe(stage);
  new MutationObserver(records=>{
    if(records.some(record=>record.attributeName==='class'))update();
    else renderGrain();
  }).observe(hero,{attributes:true,attributeFilter:['class','style']});
  document.addEventListener('visibilitychange',update);
  reduced.addEventListener('change',update);
  addEventListener('pointermove',event=>{
    pointer.active=(event.pointerType==='mouse'||event.pointerType==='pen')&&inView&&!reduced.matches&&!hero.classList.contains('is-covered');
    pointer.x=event.clientX;pointer.y=event.clientY;
  },{passive:true});
  const clearPointer=()=>{pointer.active=false};
  document.documentElement.addEventListener('pointerleave',clearPointer);
  addEventListener('blur',clearPointer);
  addEventListener('scroll',clearPointer,{passive:true});
  resize();update();
})();
