// Authored translations. The Korean document remains the no-JavaScript fallback.
(()=>{
  const languages=['ko','en','ja','ru'];
  const rows=[
    ['.skip','Skip to profile','プロフィールへ','Перейти к профилю'],
    ['.primary-nav [href="#profile"]','PROFILE','プロフィール','ПРОФИЛЬ'],
    ['.primary-nav [href="#work"]','WORK','作品','РАБОТЫ'],
    ['.primary-nav [href="#contact"]','CONTACT ↗','お問い合わせ ↗','КОНТАКТЫ ↗'],
    ['.hero-bottom a','SCROLL TO EXPLORE <span class="down">↓</span>','スクロールして見る <span class="down">↓</span>','ЛИСТАЙТЕ ВНИЗ <span class="down">↓</span>'],
    ['.statement-line:nth-child(1)','With hands-on experience in image, print and video,','画像・印刷・映像の制作経験をもとに、','Опыт в графике, печати и видео —'],
    ['.statement-line:nth-child(2)','I bring game marketing creative together—','ゲームマーケティングの','основа моей работы'],
    ['.statement-line:nth-child(3)','from planning and production','企画から制作、マネジメントまで','с игровым маркетингом:'],
    ['.statement-line:nth-child(4)','to direction and management.','幅広く手がけています。','от концепции до производства и управления.'],
    ['.statement-summary','With a background in branding and motion graphics, I have planned and produced marketing visuals, print materials and video content for a wide range of game IPs.<br> Drawing on this hands-on experience, I shape brand direction and guide production through team management, external creative direction and quality review.','ブランディングとモーショングラフィックスを軸に、さまざまなゲームIPのマーケティングビジュアル、印刷物、映像コンテンツを企画・制作してきました。<br>実制作への理解をもとにブランドの方向性を定め、チーム運営から外部パートナーのディレクション、品質管理まで、制作全体に携わっています。','Мой опыт в брендинге и моушн-дизайне охватывает разработку и производство рекламной графики, печатных материалов и видео для самых разных игровых IP.<br> Опираясь на практические навыки, я формирую направление бренда и координирую весь процесс: от работы команды и внешних подрядчиков до контроля качества.'],
    ['.statement-skill:nth-child(1) h3','Image design','グラフィックデザイン','Графический дизайн'],
    ['.statement-skill:nth-child(1) p','Key visuals · Web · Marketing assets','キービジュアル・Web・広告ビジュアル','Ключевые визуалы · Веб · Рекламная графика'],
    ['.statement-skill:nth-child(2) h3','Motion & video','映像・モーショングラフィックス','Видео и моушн-дизайн'],
    ['.statement-skill:nth-child(2) p','Motion graphics · Video editing','モーショングラフィックス制作・映像編集','Моушн-графика · Видеомонтаж'],
    ['.statement-skill:nth-child(3) h3','Branding & management','ブランディング・マネジメント','Брендинг и управление'],
    ['.statement-skill:nth-child(3) p','Marketing planning · Team leadership · Creative direction','マーケティング企画・チーム運営・クリエイティブ統括','Маркетинговое планирование · Управление командой · Креативное руководство'],
    ['.statement-skill:nth-child(3) .skill-detail','External production planning · Direction · Quality review','外部制作の企画・ディレクション・品質管理','Планирование работы подрядчиков · Арт-дирекшн · Контроль качества'],
    ['.statement-skill:nth-child(4) h3','English communication','英語コミュニケーション','Английский язык'],
    ['.statement-skill:nth-child(4) p','Everyday conversations in English','英語での日常的なコミュニケーション','Общение на повседневные темы'],
    ['.statement-skill:nth-child(4) .skill-detail','Conversational level','日常会話レベル','Разговорный уровень'],
    ['.intro h1','DONG BUM SUH<span>서동범</span>','ソ・ドンボム<span>DONG BUM SUH</span>','СО ДОНБОМ<span>DONG BUM SUH</span>'],
    ['.intro-copy h2','Turning game worlds<br>into visual experiences.','ゲームの世界を、<br>視覚体験へ。','Миры игр —<br>в визуальном опыте.'],
    ['.intro-copy > p','From game branding to key visuals and motion graphics.<br> I understand the context of each brand and create<br class="desktop"> consistent visual experiences across its touchpoints.','ゲームのブランディングからキービジュアル、モーショングラフィックスまで。<br>ブランドの背景を理解し、さまざまな接点で<br class="desktop">一貫した視覚体験をつくります。','От игрового брендинга до ключевых визуалов и моушн-графики.<br> Понимая контекст бренда, я создаю целостный визуальный опыт<br class="desktop"> во всех точках взаимодействия с аудиторией.'],
    ['.resume-row:nth-of-type(3) > h3','Experience<span>Career history</span>','Experience<span>職務経歴</span>','Experience<span>Опыт работы</span>'],
    ['.entries:not(.projects) article:nth-child(1) time','2022 — Present','2022 — 現在','2022 — н. в.'],
    ['.entries:not(.projects) article:nth-child(1) p','Visual Communication Division · Image Content Production Team','ビジュアルコミュニケーション室・イメージコンテンツ制作チーム','Отдел визуальных коммуникаций · Команда производства графического контента'],
    ['.entries:not(.projects) article:nth-child(2) h4','JOYCITY <small>Mojito Games</small>','JOYCITY <small>Mojito Games</small>','JOYCITY <small>Mojito Games</small>'],
    ['.entries:not(.projects) article:nth-child(2) p','Strategic Business Division · Brand Marketing Team Lead','戦略事業部・ブランドマーケティングパート長','Стратегическое бизнес-подразделение · Руководитель бренд-маркетинга'],
    ['.entries:not(.projects) article:nth-child(3) h4','Madman','Madman','Madman'],
    ['.entries:not(.projects) article:nth-child(3) p','Marketing Visual & Motion Designer · Manager','広告ビジュアル／モーションデザイナー・課長','Дизайнер рекламной графики и моушн-дизайнер · Менеджер'],
    ['.entries:not(.projects) article:nth-child(4) h4','Motherbrain','Motherbrain','Motherbrain'],
    ['.entries:not(.projects) article:nth-child(4) p','Marketing Visual & Motion Designer','広告ビジュアル／モーションデザイナー','Дизайнер рекламной графики и моушн-дизайнер'],
    ['.resume-row:nth-of-type(4) > h3','Expertise<span>Core capabilities</span>','Expertise<span>主なスキル</span>','Expertise<span>Ключевые навыки</span>'],
    ['.expertise > div:nth-child(1) p','Game branding · Key visuals · Web & marketing design<br> Design review for branded print, welcome kits and spaces','ゲームブランディング・キービジュアル・Web／広告デザイン<br>ブランド印刷物、ウェルカムキット、空間デザインの監修','Игровой брендинг · Ключевые визуалы · Веб- и рекламный дизайн<br> Контроль дизайна печатных материалов, приветственных наборов и пространств'],
    ['.expertise > div:nth-child(2) p','Motion graphics · Video editing · Animation planning<br> Data-informed marketing assets & A/B test design','モーショングラフィックス・映像編集・アニメーション企画<br>データに基づく広告クリエイティブ制作とA/Bテスト設計','Моушн-графика · Видеомонтаж · Планирование анимации<br> Рекламные материалы на основе данных и разработка A/B-тестов'],
    ['.resume-row:nth-of-type(5) > h3','Selected projects<span>Key projects</span>','Selected projects<span>主なプロジェクト</span>','Selected projects<span>Избранные проекты</span>'],
    ['.projects article:nth-child(1) time','2025 – 2026<br>Present','2025 – 2026 現在','2025 – 2026<br>по наст. время'],
    ['.projects article:nth-child(2) time','2022 – 2026<br>Present','2022 – 2026 現在','2022 – 2026<br>по наст. время'],
    ['.projects article:nth-child(1) p, .projects article:nth-child(2) p','CM Azit · Livestream support · Event & social media visuals','CMアジト・ライブ配信協力・イベント画像・SNS画像制作','CM Azit · Поддержка прямых эфиров · Графика для мероприятий и соцсетей'],
    ['.projects article:nth-child(3) h4','STAR SEED <small>(JOYCITY / Com2uS)</small>','STAR SEED <small>(JOYCITY / Com2uS)</small>','STAR SEED <small>(JOYCITY / Com2uS)</small>'],
    ['.projects article:nth-child(3) p','Brand identity & faction emblem UI motion graphics','ブランドアイデンティティおよび勢力エンブレムのUIモーション制作','Айдентика и UI-анимация эмблем фракций'],
    ['.projects article:nth-child(4) h4','Comix Breaker <small>(Mojito Games / JOYCITY)</small>','Comix Breaker <small>(Mojito Games / JOYCITY)</small>','Comix Breaker <small>(Mojito Games / JOYCITY)</small>'],
    ['.projects article:nth-child(4) p','Launch UA creatives · Opening animation planning & external production management','ローンチ時のUA素材制作・オープニングアニメーションの企画および外部制作統括','UA-креативы для запуска · Планирование вступительной анимации и управление внешним производством'],
    ['.projects article:nth-child(5) h4','Game of Dice, OCEANS &amp; EMPIRES','Game of Dice, OCEANS &amp; EMPIRES','Game of Dice, OCEANS &amp; EMPIRES'],
    ['.projects article:nth-child(5) p','UA marketing assets · In-game banners · Trailers','UAマーケティング素材・ゲーム内バナー・トレーラー制作','UA-материалы · Внутриигровые баннеры · Трейлеры'],
    ['.projects article:nth-child(6) p','Advertising creative production','広告クリエイティブ制作','Производство рекламных материалов'],
    ['.play-history > h3','Game experience<span>Selected gaming history</span>','Game experience<span>主なゲームプレイ歴</span>','Game experience<span>Опыт в играх</span>'],
    ['.play-category:nth-child(1) li:nth-child(1) > span','Gladiator · Level 45','ソードウイング・レベル45','Гладиатор · Уровень 45'],
    ['.play-category:nth-child(1) li:nth-child(2) > span','Knight · Level 65 <small>Spent KRW 1,500,000</small>','騎士・レベル65 <small>課金額：150万ウォン</small>','Рыцарь · Уровень 65 <small>Покупки: 1 500 000 KRW</small>'],
    ['.play-category:nth-child(1) li:nth-child(3) strong','HOYEON','護縁','HOYEON'],
    ['.play-category:nth-child(1) li:nth-child(3) > span','Spent KRW 700,000','課金額：70万ウォン','Покупки: 700 000 KRW'],
    ['.play-category:nth-child(3) strong','Black Desert Mobile','黒い砂漠 MOBILE','Black Desert Mobile'],
    ['.play-category:nth-child(4) strong','Black Desert','黒い砂漠','Black Desert'],
    ['.play-category:nth-child(3) li > span, .play-category:nth-child(4) li > span','Spent KRW 500,000','課金額：50万ウォン','Покупки: 500 000 KRW'],
    ['.profile-contact > span','LET’S CONNECT','お問い合わせ','СВЯЗАТЬСЯ'],
    ['.work-heading h2','Graphic Portfolio','デザインポートフォリオ','Дизайн-портфолио'],
    ['.footer-name > span','서동범','ソ・ドンボム','Со Донбом'],
    ['.footer-bottom > a','BACK TO TOP ↑','トップへ ↑','НАВЕРХ ↑']
  ];
  // Cache original markup once so switching back never loses badges or line breaks.
  const fields=rows.flatMap(([selector,...translations])=>Array.from(document.querySelectorAll(selector),element=>({element,values:[element.innerHTML,...translations]})));
  const labels={
    ko:{home:'DELTABRIX 처음으로',nav:'주요 메뉴',language:'언어 선택',skills:'핵심 역량',gallery:'프로젝트 이미지 모음',symbol:'DELTABRIX 홀로그램 심볼',image:'서동범 디자인 포트폴리오',video:'DELTABRIX 모션 포트폴리오',title:'DELTABRIX — 서동범 · Graphic Designer',description:'서동범의 그래픽 디자인 포트폴리오. 게임 브랜딩, 키 비주얼, 모션그래픽과 디지털 경험.'},
    en:{home:'DELTABRIX home',nav:'Main navigation',language:'Select language',skills:'Core capabilities',gallery:'Project gallery',symbol:'DELTABRIX holographic symbol',image:'DONG BUM SUH design portfolio',video:'DELTABRIX motion portfolio',title:'DELTABRIX — DONG BUM SUH · Graphic Designer',description:'DONG BUM SUH’s graphic design portfolio. Game branding, key visuals, motion graphics and creative direction.'},
    ja:{home:'DELTABRIX トップへ',nav:'メインメニュー',language:'言語を選択',skills:'主なスキル',gallery:'プロジェクトギャラリー',symbol:'DELTABRIX ホログラフィックシンボル',image:'ソ・ドンボムのデザインポートフォリオ',video:'DELTABRIX モーションポートフォリオ',title:'DELTABRIX — ソ・ドンボム · グラフィックデザイナー',description:'ソ・ドンボムのグラフィックデザインポートフォリオ。ゲームブランディング、キービジュアル、モーショングラフィックスとクリエイティブディレクション。'},
    ru:{home:'DELTABRIX — на главную',nav:'Основная навигация',language:'Выбрать язык',skills:'Ключевые навыки',gallery:'Галерея проектов',symbol:'Голографический символ DELTABRIX',image:'Дизайн-портфолио Со Донбома',video:'Моушн-портфолио DELTABRIX',title:'DELTABRIX — Со Донбом · Графический дизайнер',description:'Портфолио графического дизайнера Со Донбома. Игровой брендинг, ключевые визуалы, моушн-графика и креативное руководство.'}
  };
  const fontURLs={
    en:'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap',
    ru:'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap',
    ja:'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap'
  };
  let current='';
  function applyLanguage(language,remember=false){
    if(!languages.includes(language)||language===current)return;
    current=language;
    document.documentElement.lang=language;
    const index=languages.indexOf(language);
    fields.forEach(({element,values})=>{element.innerHTML=values[index]});
    const copy=labels[language];
    document.title=copy.title;
    document.querySelector('meta[name="description"]').content=copy.description;
    [['.home-link,.footer-brand','home'],['.primary-nav','nav'],['.language-switch','language'],['.statement-skills','skills'],['#gallery','gallery'],['.hologram','symbol']].forEach(([selector,key])=>document.querySelectorAll(selector).forEach(element=>element.setAttribute('aria-label',copy[key])));
    document.querySelectorAll('#gallery img').forEach((image,i)=>{image.alt=`${copy.image} — ${i+1}`});
    document.querySelectorAll('#gallery iframe').forEach((frame,i)=>{frame.title=`${copy.video} ${i+1}`});
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
    const fontURL=fontURLs[language];
    if(fontURL&&!Array.from(document.querySelectorAll('link[data-language-font]')).some(link=>link.href===fontURL)){
      const link=document.createElement('link');link.rel='stylesheet';link.href=fontURL;link.dataset.languageFont='';document.head.append(link);
    }
    if(remember){
      try{localStorage.setItem('deltabrix-language',language)}catch{}
      const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);
    }
    document.dispatchEvent(new CustomEvent('languagechange',{detail:{language}}));
  }
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>applyLanguage(button.dataset.language,true)));
  let language=new URLSearchParams(location.search).get('lang');
  if(!languages.includes(language)){try{language=localStorage.getItem('deltabrix-language')}catch{}}
  applyLanguage(languages.includes(language)?language:'ko');
})();
