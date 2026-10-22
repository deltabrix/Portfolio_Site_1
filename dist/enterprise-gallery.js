// Enterprise advertising work supplied by the portfolio owner.
function appendEnterprisePortfolio(target){
  const base='assets/work/enterprise/';
  const image=(file,width,height,alt)=>({file,width,height,alt});
  const motion=(file,width,height,alt)=>({file,width,height,alt,motion:true});
  const projects=[
    {id:'siek',client:'Sony Interactive Entertainment Korea',period:'2015–2016',
      summary:'언차티드, 용과 같이, 파이널 판타지, 니드 포 스피드의 온라인 배너 광고 소재를 제작했습니다. 언차티드 모션 배너는 소니 측에서 좋은 평가를 받아 싱가포르 마케팅에도 활용되었습니다.',
      groups:[
        {id:'yakuza',title:'용과 같이 극&제로',rows:[
          {columns:3,media:[image('yakuza-01',830,466,'용과 같이 극&제로 광고 소재 1'),image('yakuza-02',830,466,'용과 같이 극&제로 광고 소재 2'),image('yakuza-03',830,466,'용과 같이 극&제로 광고 소재 3')]},
          {columns:2,media:[motion('yakuza-motion-01',740,120,'용과 같이 극&제로 모션 배너 1'),motion('yakuza-motion-02',740,120,'용과 같이 극&제로 모션 배너 2')]}
        ]},
        {id:'uncharted',title:'언차티드 4 & 네이선 드레이크 콜렉션',rows:[
          {columns:2,media:[image('uncharted-4',714,108,'언차티드 4 온라인 배너'),image('uncharted-collection',714,108,'네이선 드레이크 콜렉션 온라인 배너')]},
          {columns:1,compact:true,media:[motion('uncharted-motion',635,100,'언차티드 모션 배너 광고')]}
        ]},
        {id:'final-fantasy',title:'Final Fantasy XII & Final Fantasy World',rows:[
          {columns:2,media:[image('final-fantasy-xii',1200,628,'Final Fantasy XII 광고 소재'),image('final-fantasy-world',830,466,'Final Fantasy World 광고 소재')]}
        ]}
      ]},
    {id:'volvo',client:'Volvo Korea',period:'2014–2017',
      summary:'볼보코리아의 신차 출시 프로모션부터 시승 행사까지, 다양한 온라인 배너 광고 소재를 제작했습니다.',
      groups:[{id:'volvo-creatives',rows:[
        {columns:1,media:[image('volvo-xc60',1080,428,'Volvo XC60 신차 프로모션 광고')]},
        {columns:1,compact:true,media:[image('volvo-range',740,120,'Volvo XC90, S90 & Cross Country 온라인 배너')]},
        {columns:2,media:[motion('volvo-polestar-motion',740,120,'Volvo Polestar 모션 배너'),motion('volvo-v90-motion',740,120,'Volvo V90 Cross Country 모션 배너')]}
      ]}]}
  ];
  const videos=[];
  function addMedia(item,row){
    const media=document.createElement(item.motion?'video':'img');
    media.width=item.width;media.height=item.height;
    media.className=item.motion?'enterprise-motion reveal':'enterprise-image reveal lazy-work';
    if(item.motion){
      media.dataset.src=base+item.file+'.mp4';media.poster=base+item.file+'-poster.webp';
      media.setAttribute('aria-label',item.alt);
      media.autoplay=true;media.loop=true;media.muted=true;media.playsInline=true;media.preload='none';videos.push(media);
    }else{
      media.dataset.src=base+item.file+'.webp';media.alt=item.alt;media.loading='lazy';media.decoding='async';
      media.addEventListener('load',()=>media.classList.add('is-loaded'),{once:true});
    }
    row.append(media);
  }
  for(const project of projects){
    const section=document.createElement('section');section.className='enterprise-project';section.id='portfolio-'+project.id;
    section.setAttribute('aria-labelledby','enterprise-'+project.id+'-title');
    const header=document.createElement('header');header.className='enterprise-heading reveal';
    const identity=document.createElement('div');identity.className='enterprise-identity';
    const title=document.createElement('h3');title.id='enterprise-'+project.id+'-title';title.textContent=project.client;
    const category=document.createElement('p');category.className='enterprise-category';category.textContent='Marketing Creatives';
    const period=document.createElement('p');period.className='enterprise-period';period.textContent=project.period;
    identity.append(title,category,period);
    const summary=document.createElement('p');summary.className='enterprise-summary';summary.textContent=project.summary;
    header.append(identity,summary);section.append(header);
    for(const group of project.groups){
      const block=document.createElement('div');block.className='enterprise-group';block.dataset.enterpriseGroup=group.id;
      if(group.title){const heading=document.createElement('h4');heading.className='enterprise-group-title reveal';heading.textContent=group.title;block.append(heading)}
      for(const layout of group.rows){
        const row=document.createElement('div');row.className='enterprise-grid enterprise-grid-'+layout.columns+(layout.compact?' enterprise-grid-compact':'');
        layout.media.forEach(item=>addMedia(item,row));block.append(row);
      }
      section.append(block);
    }
    target.append(section);
    const gap=document.createElement('div');gap.className='work-gap';gap.setAttribute('aria-hidden','true');target.append(gap);
  }
  // Keep distant banners paused, and show still artwork for reduced motion.
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const nearby=new Set();
  function updateVideo(video){
    if(nearby.has(video)&&!reducedMotion.matches&&!document.hidden){
      if(!video.hasAttribute('src'))video.src=video.dataset.src;
      video.play().catch(()=>{});
    }else video.pause();
  }
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting)nearby.add(entry.target);else nearby.delete(entry.target);
      updateVideo(entry.target);
    }),{rootMargin:'250px 0px'});
    videos.forEach(video=>observer.observe(video));
  }else videos.forEach(video=>{nearby.add(video);updateVideo(video)});
  reducedMotion.addEventListener('change',()=>videos.forEach(updateVideo));
  document.addEventListener('visibilitychange',()=>videos.forEach(updateVideo));
}
