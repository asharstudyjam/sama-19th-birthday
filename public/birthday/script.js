/* =========================================================
   BRUTALIST BIRTHDAY — JS
   ========================================================= */
(() => {
  'use strict';

  const clamp=(mn,mx,v)=>Math.max(mn,Math.min(mx,v));
  const cCount=n=>Math.max(10,Math.min(n,Math.floor(n*(window.innerWidth/1920))));

  /* ---------- DATA ---------- */
  const PHOTOS = [
    {emoji:'🌅', cap:'A bright smile', color:'#FF4FA3'},
    {emoji:'🍜', cap:'Good food times', color:'#FFD93D'},
    {emoji:'🌸', cap:'Spring vibes', color:'#42A5F5'},
    {emoji:'☕', cap:'Coffee chats', color:'#7DFF8A'},
    {emoji:'🌧️', cap:'Rainy day thoughts', color:'#FF9F1C'},
    {emoji:'🎬', cap:'Movie nights', color:'#FF5757'},
    {emoji:'🌊', cap:'Dream big', color:'#42A5F5'},
    {emoji:'✨', cap:'Just being you', color:'#FFD93D'},
  ];

  const REASONS = [
    {icon:'😊', title:'Your Smile', desc:'It lights up rooms and makes everyone around you feel better.'},
    {icon:'🧠', title:'Your Mind', desc:'You\'re sharp, curious, and the best conversationalist I know.'},
    {icon:'💖', title:'Your Kindness', desc:'You care deeply about everyone around you. It\'s beautiful.'},
    {icon:'🎨', title:'Your Creativity', desc:'The way you see the world is art. Keep creating.'},
    {icon:'😂', title:'Your Laugh', desc:'My favorite sound in the world. I\'d do anything to hear it.'},
    {icon:'🌙', title:'Your Patience', desc:'You have the patience of a saint. Truly admirable.'},
    {icon:'🔥', title:'Your Passion', desc:'When you care about something, you give it your everything. Truly inspiring.'},
    {icon:'🍳', title:'Your Cooking', desc:'You could make anything and it would taste amazing.'},
    {icon:'⭐', title:'Your Glow', desc:'There\'s something about you that draws people in. Magic.'},
    {icon:'🫶', title:'Just You', desc:'Every little thing about you makes you the awesome person you are.'},
  ];

  const TIMELINE = [
    {date:'Day 1', title:'The First Hello', text:'The day I first saw you. I didn\'t know it then, but my whole world was about to change.', emoji:'👋'},
    {date:'Month 1', title:'Getting to Know You', text:'Every conversation made me realize how awesome you are.', emoji:'💫'},
    {date:'Month 3', title:'Three Months In', text:'Three months of great conversations and knowing you were someone special.', emoji:'🌹'},
    {date:'Month 6', title:'Half a Year', text:'Six months of memories I\'ll cherish forever. You make everything better.', emoji:'🥰'},
    {date:'Year 1', title:'One Year Stronger', text:'A whole year of us. Every high, every low — I\'d do it all again.', emoji:'💍'},
    {date:'Today', title:'Sama Turns 19!', text:'Nineteen years of you in this world. Thank you for being you. You’re amazing.', emoji:'🎂'},
  ];

  const BUBBLES = [
    "Sama, you're one of the best people I know.",
    "You make every day a little brighter, Sama.",
    "Getting a message from you always makes my day.",
    "Your name means friendship and good vibes.",
    "Being around you feels so easy and natural.",
    "I'd choose you as a friend in every timeline.",
    "You make ordinary moments feel special.",
    "You're an incredible person, inside and out.",
    "You're one of the best friends anyone could ask for.",
  ];

  const GIFTS = [
    {emoji:'🎁', title:'A Promise', text:'A weekend getaway — your choice of place, my treat. Let\'s make memories.'},
    {emoji:'💌', title:'A Letter', text:'Scroll down — I wrote you something from the heart.'},
    {emoji:'🌟', title:'A Wish', text:'Make a wish. I\'ll spend the next year quietly making it come true.'},
  ];

  const PROMISES = [
    "make you laugh when you need it most.",
    "be there to listen whenever you need me.",
    "have your back, no matter what.",
    "be honest with you, always.",
    "celebrate you and every win you achieve.",
    "stand by you through the hard days.",
    "send you things that make me think of you.",
    "support your growth and cheer you on.",
    "appreciate you every day, not just the big ones.",
    "always, always be your friend, Sama.",
  ];

  const LETTER = `Dear Sama,

Happy 19th birthday! Nineteen years ago, on August 7, 2007, the world became a little brighter.

I'm grateful to have you as a friend. You're kind, brilliant, and one of the most genuine people I know. Thank you for the conversations, the laughter, and the memories we've shared.

I hope 19 is your best year yet. May it bring you everything you've quietly wished for — new adventures, growth, and moments that take your breath away.

Happy birthday, Sama. The world is better with you in it.

— Syed Ashar 🌟`;

  const QUIZ = [
    {q:"What is Sama's favorite color?", a:["Pink","Blue","Black","Purple"], correct:0},
    {q:"What's her go-to comfort food?", a:["Pasta","Ice cream","Ramen","Chocolate"], correct:2},
    {q:"What animal reminds people of Sama?", a:["A cat","A bunny","A puppy","A fox"], correct:1},
    {q:"If Sama could travel anywhere, she'd go to?", a:["Paris","Tokyo","Bali","New York"], correct:0},
    {q:"What's the name of the guy who made this for you?", a:["Ali","Syed Ashar","Ahmed","Someone random"], correct:1},
  ];

  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* ---------- LOADER ---------- */
  const loaderTexts = ["Wrapping Sama's gifts…","Polishing every pixel…","Counting 19 reasons…","Writing love notes…","Inflating balloons…","Making it perfect for you…"];
  const loader = $('#loader'), loaderBar = $('#loaderBar'), loaderPct = $('#loaderPercent'), loaderText = $('#loaderText');
  let p = 0;
  const lt = setInterval(()=>{ loaderText.textContent = loaderTexts[Math.floor(Math.random()*loaderTexts.length)]; }, 500);
  const lp = setInterval(()=>{
    p += Math.random()*8 + 3;
    if (p >= 100){ p = 100; clearInterval(lp); clearInterval(lt);
      setTimeout(()=>{
        loader.style.transition='opacity .5s, transform .5s';
        loader.style.opacity=0; loader.style.transform='translateY(-30px)';
        setTimeout(()=>{ loader.style.display='none'; initAfterLoad(); }, 500);
      }, 350);
    }
    loaderBar.style.width = p+'%';
    loaderPct.textContent = Math.floor(p)+'%';
  }, 120);

  /* ---------- BUILD DOM ---------- */
  function buildAll(){
    // Photos
    const pg = $('#polaroidGrid');
    PHOTOS.forEach((p,i)=>{
      const el = document.createElement('div');
      el.className = 'polaroid';
      el.setAttribute('data-aos','zoom-in');
      el.setAttribute('data-aos-delay', (i*60).toString());
      el.innerHTML = `
        <div class="polaroid-img" style="background:${p.color}">${p.emoji}</div>
        <div class="polaroid-caption">${p.cap}</div>
        ${i%3===0?'<div class="sticker">★ FAV</div>':''}`;
      pg.appendChild(el);
    });

    // Reasons
    const rg = $('#reasonsGrid');
    REASONS.forEach((r,i)=>{
      const el = document.createElement('div');
      el.className = 'reason';
      el.setAttribute('data-aos','flip-up');
      el.setAttribute('data-aos-delay', (i*40).toString());
      el.innerHTML = `
        <div class="face front">
          <div class="num">${String(i+1).padStart(2,'0')}</div>
          <div class="icon">${r.icon}</div>
          <div class="title">${r.title}</div>
        </div>
        <div class="face back">
          <div class="title">${r.title}</div>
          <div class="desc">${r.desc}</div>
        </div>`;
      rg.appendChild(el);
    });

    // Timeline
    const tl = $('#timelineList');
    TIMELINE.forEach((t,i)=>{
      const el = document.createElement('li');
      el.className = 'tl-item';
      el.setAttribute('data-aos', i%2 ? 'fade-left' : 'fade-right');
      el.innerHTML = `<div class="tl-card">
        <div class="tl-date">${t.date} ${t.emoji}</div>
        <div class="tl-title">${t.title}</div>
        <div class="tl-text">${t.text}</div>
      </div>`;
      tl.appendChild(el);
    });

    // Bubbles
    const bg = $('#bubbleGrid');
    BUBBLES.forEach((b,i)=>{
      const el = document.createElement('div');
      el.className='bubble';
      el.style.transform=`rotate(${(Math.random()*6-3).toFixed(2)}deg)`;
      el.setAttribute('data-aos','zoom-in');
      el.setAttribute('data-aos-delay', (i*60).toString());
      el.textContent = b;
      bg.appendChild(el);
    });

    // Gifts
    const gg = $('#giftGrid');
    GIFTS.forEach((g,i)=>{
      const el = document.createElement('button');
      el.className='gift';
      el.setAttribute('data-aos','flip-left');
      el.setAttribute('data-aos-delay', (i*100).toString());
      el.innerHTML=`<div class="gift-box">${g.emoji}</div>
        <div class="gift-content">
          <div class="gift-title">${g.title}</div>
          <div class="gift-text">${g.text}</div>
        </div>`;
      el.addEventListener('click',()=>{
        if (el.classList.contains('open')) return;
        el.classList.add('open');
        confetti({particleCount:cCount(80), spread:70, origin:{y:.7}});
      });
      gg.appendChild(el);
    });

    // Promises
    const pl = $('#promiseList');
    PROMISES.forEach((p,i)=>{
      const el = document.createElement('li');
      el.className='promise';
      el.setAttribute('data-aos','fade-up');
      el.setAttribute('data-aos-delay', (i*40).toString());
      el.innerHTML=`<span class="check"></span><span>I'll always ${p}</span>`;
      pl.appendChild(el);
    });

    // Letter
    $('#letterBody').textContent = LETTER;

    // Year + days since Sama was born (July 8, 2006)
    $('#year').textContent = new Date().getFullYear();
    const samaBirth = new Date(2007, 7, 7);
    const days = Math.floor((Date.now()-samaBirth)/86400000);
    $('#daysLoved').textContent = days.toLocaleString();
  }

  /* ---------- AFTER LOAD ---------- */
  function initAfterLoad(){
    buildAll();
    initCursor();
    initFloaters();
    initLenis();
    initAOS();
    initTyped();
    initSplit();
    initScrollProgress();
    initTheme();
    initNav();
    initMeter();
    initCounter();
    initPlayer();
    initScratch();
    initQuiz();
    initCelebrate();
    initTop();
    initEaster();
    initKeyboard();
    initPromises();

    // Hero entrance
    if (window.gsap && !matchMedia('(prefers-reduced-motion: reduce)').matches){
      gsap.from('.hero-title .line', {y:80, opacity:0, duration:.8, stagger:.12, ease:'back.out(1.6)'});
      gsap.from('.hero-kicker, .hero-sub, .hero-cta, .meta-card', {y:30, opacity:0, duration:.6, stagger:.08, delay:.6});
      gsap.to('.doodle', {y:'+=12', repeat:-1, yoyo:true, duration:2, ease:'sine.inOut', stagger:.2});
    }

    // small celebratory burst
    setTimeout(()=>confetti({particleCount:cCount(60), spread:60, origin:{y:.2}}), 400);
  }

  /* ---------- CURSOR ---------- */
  function initCursor(){
    if (matchMedia('(hover:none)').matches) return;
    const c=$('#cursor'), d=$('#cursorDot');
    let x=0,y=0,tx=0,ty=0;
    window.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;d.style.left=tx+'px';d.style.top=ty+'px';});
    const tick=()=>{ x+=(tx-x)*.18; y+=(ty-y)*.18; c.style.left=x+'px'; c.style.top=y+'px'; requestAnimationFrame(tick); };
    tick();
    document.addEventListener('mouseover',e=>{
      if (e.target.closest('a,button,.gift,.polaroid,.reason,.bubble')) c.classList.add('hover');
      else c.classList.remove('hover');
    });
  }

  /* ---------- FLOATERS ---------- */
  function initFloaters(){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const f=$('#floaters'); const icons=['★','✦','✿','✺','⭐','✨'];
    const count=Math.min(14,Math.max(6,Math.floor(window.innerWidth/60)));
    for(let i=0;i<count;i++){
      const s=document.createElement('span');
      s.textContent=icons[i%icons.length];
      s.style.left=Math.random()*100+'%';
      s.style.fontSize=clamp(14,20,window.innerWidth/30)+'px';
      s.style.color=['#FFD93D','#42A5F5','#7DFF8A','#FF9F1C','#FF5757'][i%5];
      s.style.animationDuration=(10+Math.random()*14)+'s';
      s.style.animationDelay=(-Math.random()*20)+'s';
      f.appendChild(s);
    }
  }

  /* ---------- LENIS ---------- */
  function initLenis(){
    if (!window.Lenis) return;
    const lenis = new Lenis({lerp:.1, smoothWheel:true});
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger){
      lenis.on('scroll', ScrollTrigger.update);
    }
    window._lenis = lenis;
  }

  /* ---------- AOS ---------- */
  function initAOS(){ if(window.AOS) AOS.init({once:true, duration:700, easing:'ease-out-cubic'}); }

  /* ---------- TYPED ---------- */
  function initTyped(){
    if(!window.Typed) return;
    new Typed('#typed', {
      strings:[
        "Sama — one of a kind ⭐",
        "The girl who makes every day better ✨",
        "Nineteen years of being amazing 🌟",
        "Happy birthday, Sama 🎉",
        "You're an incredible person, Sama 💫",
      ],
      typeSpeed:55, backSpeed:30, backDelay:1600, loop:true
    });
  }

  /* ---------- SPLIT TEXT ---------- */
  function initSplit(){
    if(!window.SplitType || !window.gsap) return;
    gsap.registerPlugin(ScrollTrigger);
    $$('[data-split]').forEach(el=>{
      const s = new SplitType(el, {types:'chars'});
      gsap.from(s.chars, {
        opacity:0, y:40, rotate:6, stagger:.02, duration:.6, ease:'back.out(1.4)',
        scrollTrigger:{trigger:el, start:'top 85%'}
      });
    });
  }

  /* ---------- SCROLL PROGRESS ---------- */
  function initScrollProgress(){
    const bar=$('#scrollProgress');
    const upd=()=>{ const h=document.documentElement; const p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100; bar.style.width=p+'%'; };
    window.addEventListener('scroll', upd, {passive:true}); upd();
  }

  /* ---------- THEME ---------- */
  function initTheme(){
    const t=$('#themeToggle');
    const set=v=>{ document.documentElement.setAttribute('data-theme',v); t.textContent = v==='dark'?'☀️':'🌙'; localStorage.setItem('bd-theme',v); };
    set(localStorage.getItem('bd-theme')||'light');
    t.addEventListener('click',()=> set(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark'));
  }

  /* ---------- NAV ---------- */
  function initNav(){
    const b=$('#menuBtn'), l=$('.nav-links');
    b.addEventListener('click',()=>l.classList.toggle('open'));
    l.addEventListener('click',e=>{ if(e.target.tagName==='A') l.classList.remove('open'); });
  }

  /* ---------- METER ---------- */
  function initMeter(){
    const fill=$('#meterFill'), pct=$('#meterPercent'), btn=$('#meterBtn');
    let done=false;
    const run=()=>{
      if (done) return; done=true;
      fill.style.width='100%';
      let n=0; const iv=setInterval(()=>{
        n+=Math.ceil(Math.random()*9);
        if (n>=999){ n=999; clearInterval(iv); pct.textContent='∞%'; confetti({particleCount:cCount(160), spread:100, origin:{y:.6}}); starBurst(); }
        else pct.textContent=n+'%';
      }, 30);
    };
    btn.addEventListener('click', run);
    if (window.ScrollTrigger){
      ScrollTrigger.create({trigger:'#meter', start:'top 70%', onEnter:run});
    }
  }

  function starBurst(){
    const colors=["#FFD93D","#FF9F1C","#42A5F5","#FF5757"];
    for(let i=0;i<24;i++){
      const s=document.createElement("span");
      s.textContent="✨";
      Object.assign(s.style,{position:"fixed", left:"50%", top:"60%", fontSize:"24px", color:colors[i%4], zIndex:9000, pointerEvents:"none"});
      document.body.appendChild(s);
      const ang=Math.random()*Math.PI*2, dist=120+Math.random()*180;
      if(window.gsap) gsap.to(s,{x:Math.cos(ang)*dist, y:Math.sin(ang)*dist - 80, opacity:0, duration:1.4, ease:"power2.out", onComplete:()=>s.remove()});
      else setTimeout(()=>s.remove(), 1500);
    }
  }

  /* ---------- COUNTER ---------- */
  function initCounter(){
    const el=$('#bigNum');
    let ran=false;
    const run=()=>{
      if (ran) return; ran=true;
      const target=108; let cur=0;
      const iv=setInterval(()=>{ cur+=2; if(cur>=target){cur=target; clearInterval(iv); el.textContent=target+'+';} else el.textContent=cur; }, 30);
    };
    if (window.ScrollTrigger) ScrollTrigger.create({trigger:'#counter', start:'top 70%', onEnter:run});
    else run();
  }

  /* ---------- PLAYER ---------- */
  function initPlayer(){
    const audio=$('#bgAudio'), play=$('#playBtn'), vinyl=$('#vinyl'), vol=$('#volume'), bar=$('#playerBarFill'), viz=$('#viz');
    for(let i=0;i<5;i++) viz.appendChild(document.createElement('i'));
    audio.volume=.6;
    play.addEventListener('click', async ()=>{
      try{
        if (audio.paused){ await audio.play(); play.textContent='⏸'; vinyl.classList.add('playing'); }
        else { audio.pause(); play.textContent='▶'; vinyl.classList.remove('playing'); }
      }catch(e){ play.textContent='♫'; vinyl.classList.add('playing'); /* no file */ }
    });
    vol.addEventListener('input', ()=> audio.volume = vol.value/100);
    audio.addEventListener('timeupdate', ()=>{
      if (audio.duration) bar.style.width = (audio.currentTime/audio.duration*100)+'%';
    });
    audio.addEventListener('ended', ()=>{ play.textContent='▶'; vinyl.classList.remove('playing'); });
  }

  /* ---------- SCRATCH ---------- */
  function initScratch(){
    const c=$('#scratchCanvas'); if(!c) return;
    const wrap=c.parentElement;
    let ctx=null, w=0, h=0, dpr=1, drawing=false, cleared=false;
    const radius=()=>matchMedia('(hover:none)').matches?Math.max(24,w/12):Math.max(16,w/20);
    function resize(){
      const rect=wrap.getBoundingClientRect();
      dpr=window.devicePixelRatio||1;
      w=Math.round(rect.width); h=Math.round(rect.height);
      c.width=w*dpr; c.height=h*dpr;
      c.style.width=w+'px'; c.style.height=h+'px';
      ctx=c.getContext('2d');
      ctx.scale(dpr,dpr);
      ctx.fillStyle='#FFD93D'; ctx.fillRect(0,0,w,h);
      ctx.fillStyle='#111'; ctx.font='bold '+Math.max(18,Math.min(28,w/20))+'px Bebas Neue, sans-serif'; ctx.textAlign='center';
      ctx.fillText('SCRATCH ME ★', w/2, h/2);
      ctx.font=Math.max(11,Math.min(14,w/40))+'px Space Grotesk, sans-serif';
      ctx.fillText('(use your finger / mouse)', w/2, h/2+Math.max(20,Math.min(40,h/6)));
      ctx.globalCompositeOperation='destination-out';
    }
    resize();
    const pos=e=>{
      const r=c.getBoundingClientRect();
      const t=e.touches?e.touches[0]:e;
      return {x:(t.clientX-r.left), y:(t.clientY-r.top)};
    };
    const start=e=>{drawing=true; move(e);};
    const end=()=>{drawing=false; checkClear();};
    const move=e=>{
      if(!drawing) return;
      e.preventDefault();
      const p=pos(e);
      ctx.beginPath(); ctx.arc(p.x,p.y,radius(),0,Math.PI*2); ctx.fill();
    };
    c.addEventListener('mousedown',start); c.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
    c.addEventListener('touchstart',start,{passive:false}); c.addEventListener('touchmove',move,{passive:false}); c.addEventListener('touchend',end);
    if(window.ResizeObserver) new ResizeObserver(()=>{const p=cleared; resize(); if(p)cleared=true;}).observe(wrap);
    function checkClear(){
      if(cleared) return;
      const d=ctx.getImageData(0,0,c.width,c.height).data;
      let clear=0; for(let i=3;i<d.length;i+=400) if(d[i]===0) clear++;
      if(clear/(d.length/400)>.55){
        cleared=true;
        c.style.transition='opacity .6s'; c.style.opacity=0;
        confetti({particleCount:cCount(120), spread:80, origin:{y:.6}});
      }
    }
  }

  /* ---------- QUIZ ---------- */
  function initQuiz(){
    const box=$('#quizBox'); let i=0, score=0;
    const render=()=>{
      if (i>=QUIZ.length){
        box.innerHTML=`<div class="q-result">You got ${score}/${QUIZ.length}.<br/>Verdict: world's best friend.<br/><button class="btn btn-pink" id="qAgain">Play again</button></div>`;
        $('#qAgain').addEventListener('click',()=>{i=0;score=0;render();});
        confetti({particleCount:cCount(140), spread:90, origin:{y:.6}});
        return;
      }
      const q=QUIZ[i];
      box.innerHTML = `
        <div class="q-progress">QUESTION ${i+1} / ${QUIZ.length}</div>
        <div class="q-question">${q.q}</div>
        <div class="q-options">${q.a.map((a,idx)=>`<button class="q-opt" data-i="${idx}">${a}</button>`).join('')}</div>`;
      $$('.q-opt', box).forEach(b=>{
        b.addEventListener('click',()=>{
          const idx=+b.dataset.i;
          if (idx===q.correct){ b.classList.add('right'); score++; }
          else { $$('.q-opt',box)[q.correct].classList.add('right'); }
          setTimeout(()=>{ i++; render(); }, 700);
        });
      });
    };
    render();
  }

  /* ---------- PROMISES tick ---------- */
  function initPromises(){
    if (!window.ScrollTrigger) { $$('.promise').forEach(p=>p.classList.add('in')); return; }
    $$('.promise').forEach((el,i)=>{
      ScrollTrigger.create({trigger:el, start:'top 85%', onEnter:()=>setTimeout(()=>el.classList.add('in'), i*80)});
    });
  }

  /* ---------- CELEBRATE ---------- */
  function initCelebrate(){
    const btn=$('#celebrateBtn');
    const fire=()=>{
      const end=Date.now()+1500;
      (function frame(){
        confetti({particleCount:5,angle:60,spread:55,origin:{x:0},colors:['#FF4FA3','#FFD93D','#42A5F5']});
        confetti({particleCount:5,angle:120,spread:55,origin:{x:1},colors:['#7DFF8A','#FF5757','#FF9F1C']});
        if (Date.now()<end) requestAnimationFrame(frame);
      })();
      starBurst();
    };
    btn.addEventListener('click', fire);
    if (window.ScrollTrigger) ScrollTrigger.create({trigger:'#celebrate', start:'top 60%', onEnter:fire});
  }

  /* ---------- TOP ---------- */
  function initTop(){
    $('#topBtn').addEventListener('click',()=>{
      if (window._lenis) window._lenis.scrollTo(0); else window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  /* ---------- EASTER (Konami) ---------- */
  function initEaster(){
    const code=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let i=0;
    window.addEventListener('keydown', e=>{
      const k=e.key;
      if (k.toLowerCase()===code[i].toLowerCase() || k===code[i]) { i++; if(i===code.length){ trigger(); i=0; } }
      else i=0;
    });
    function trigger(){
      const e=$('#easter'); e.classList.add('show');
      confetti({particleCount:cCount(200), spread:120, origin:{y:.5}});
      setTimeout(()=>e.classList.remove('show'), 4000);
    }
  }

  /* ---------- KEYBOARD a11y ---------- */
  function initKeyboard(){
    document.addEventListener('keydown', e=>{
      if (e.key==='Tab') document.body.classList.add('kbd');
    });
  }

  // Mouse parallax for hero doodles (skip if reduced motion)
  const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(!prefersReduced.matches){
    window.addEventListener('mousemove', (e)=>{
      if (!window.gsap) return;
      const x=(e.clientX/window.innerWidth - .5);
      const y=(e.clientY/window.innerHeight - .5);
      $$('.doodle').forEach((d,i)=>{
        gsap.to(d,{x:x*(20+i*4), y:y*(20+i*4), duration:.6, ease:'power2.out'});
      });
    });
  }


  /* ---------- COUNTDOWN ---------- */
  function initCountdown(){
    const target = new Date(2026, 7, 7, 0, 0, 0);
    const el = (id) => document.getElementById(id);
    function tick(){
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const set = (id, v) => { const e = el(id); if(e) e.textContent = v; };
      set('cdDays', d);
      set('cdHours', h.toString().padStart(2,'0'));
      set('cdMins', m.toString().padStart(2,'0'));
      set('cdSecs', s.toString().padStart(2,'0'));
    }
    tick();
    setInterval(tick, 1000);
  }

})();
