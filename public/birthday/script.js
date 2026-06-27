/* =========================================================
   BRUTALIST BIRTHDAY — JS
   ========================================================= */
(() => {
  'use strict';

  /* ---------- DATA ---------- */
  const PHOTOS = [
    {emoji:'🌅', cap:'First sunrise', color:'#FF4FA3'},
    {emoji:'🍜', cap:'That noodle night', color:'#FFD93D'},
    {emoji:'🎢', cap:'Theme park screams', color:'#42A5F5'},
    {emoji:'☕', cap:'Lazy coffee Sundays', color:'#7DFF8A'},
    {emoji:'🌧️', cap:'Caught in the rain', color:'#FF9F1C'},
    {emoji:'🎬', cap:'Movie marathon', color:'#FF5757'},
    {emoji:'🌊', cap:'Beach day', color:'#42A5F5'},
    {emoji:'🍕', cap:'Pizza, obviously', color:'#FFD93D'},
  ];

  const REASONS = [
    {icon:'😂', title:'Laugh', desc:'Your laugh is illegal in 4 states. It should be 50.'},
    {icon:'🧠', title:'Smart', desc:'You explain things and suddenly the universe makes sense.'},
    {icon:'💖', title:'Kind', desc:'You collect strays — people, plants, problems. All loved.'},
    {icon:'🔥', title:'Driven', desc:'You wake up and choose chaos productivity. Iconic.'},
    {icon:'🎨', title:'Creative', desc:'Your brain is a Pinterest board with WiFi.'},
    {icon:'🍳', title:'Feeds Me', desc:'Five-star service even when it\'s just toast. Especially toast.'},
    {icon:'🎤', title:'Sings', desc:'Off-key, full heart. We will not be taking questions.'},
    {icon:'🌙', title:'Patient', desc:'You wait for me. Even when I\'m wrong (read: always).'},
    {icon:'⭐', title:'Glow', desc:'Rooms get brighter. Physics has no notes.'},
    {icon:'🫶', title:'Mine', desc:'And somehow, I\'m yours. Best deal of the century.'},
  ];

  const TIMELINE = [
    {date:'Day 1', title:'First "hi"', text:'I typed it 4 times before sending. Worth it.', emoji:'👋'},
    {date:'Month 1', title:'The Long Call', text:'We talked till the sun yelled at us to log off.', emoji:'📞'},
    {date:'Month 3', title:'First Date', text:'I overdressed. You said cute. I accepted the win.', emoji:'🌹'},
    {date:'Month 6', title:'The Trip', text:'We got lost. Best wrong turn of my life.', emoji:'🗺️'},
    {date:'Year 1', title:'The Argument & The Hug', text:'We figured out we\'re a team. We won.', emoji:'🤝'},
    {date:'Today', title:'Your Birthday', text:'This whole website. For you. Happy birthday, love.', emoji:'🎂'},
  ];

  const BUBBLES = [
    "You're the best part of every ordinary day.",
    "Texting you is my favorite hobby. Don't tell GTA.",
    "If overthinking burned calories, I'd be ripped from missing you.",
    "Your hand fits mine like the universe planned ahead.",
    "I'd pick you. In every universe. Even the one where we're frogs.",
    "Marry me again on a Tuesday for fun.",
    "You make Mondays bearable. That's wizardry.",
    "I love you in past tense, present tense, and tense.",
    "Stay. Always. Even when the WiFi is bad.",
  ];

  const GIFTS = [
    {emoji:'🎁', title:'A Promise', text:'A weekend, your plan, my wallet. Pick the date.'},
    {emoji:'💌', title:'A Letter', text:'Scroll down — the long one. Tissues advised.'},
    {emoji:'🌟', title:'A Wish', text:'Make one. I\'ll spend the year quietly making it happen.'},
  ];

  const PROMISES = [
    "make you laugh, even when you don't want to.",
    "remember how you take your coffee.",
    "fight for us — never with us.",
    "say sorry first when I'm wrong.",
    "say sorry first when you're wrong (jk).",
    "celebrate your wins louder than you do.",
    "hold your hand in scary doctor waiting rooms.",
    "send dumb memes at strategic moments.",
    "grow with you, not away from you.",
    "love you on the boring days the most.",
  ];

  const LETTER = `Today the internet, the calendar, and I all agree on one thing: you should be celebrated, loudly. So here it is — a tiny corner of the web, built clumsily, with love in every line of code.\n\nThank you for being patient with my chaos. Thank you for laughing at the jokes I recycle. Thank you for being the steady, kind, ridiculous, brilliant person you are.\n\nI hope this year hands you everything you've quietly hoped for. And I hope I'm there for most of it — coffee in hand, song playing, dog hair on my hoodie.\n\nHappy birthday, my favorite human. The world got a lot less interesting before you, and a lot more fun after.`;

  const QUIZ = [
    {q:"What is my favorite thing about you?", a:["Your laugh","Your eyes","Your kindness","All of the above"], correct:3},
    {q:"What snack belongs to us?", a:["Popcorn","That weird chocolate","Fries dipped in milkshake","All edible items"], correct:3},
    {q:"Where would I drop everything to go with you right now?", a:["The moon","The corner shop","Anywhere","Tokyo"], correct:2},
    {q:"How long do I plan to love you?", a:["A while","Definitely Thursday","Forever-ish","Yes"], correct:2},
    {q:"What is the best song?", a:["Ours","The one we made up","The one you hum","All of the above"], correct:3},
  ];

  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

  /* ---------- LOADER ---------- */
  const loaderTexts = ["Polishing the confetti…","Tuning the violins…","Inflating balloons…","Counting reasons…","Wrapping gifts…","Sealing the letter…"];
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
        confetti({particleCount:80, spread:70, origin:{y:.7}});
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

    // Year + days
    $('#year').textContent = new Date().getFullYear();
    // pick a fake "since" date 400 days ago
    const start = new Date(); start.setDate(start.getDate()-487);
    const days = Math.floor((Date.now()-start)/86400000);
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
    if (window.gsap){
      gsap.from('.hero-title .line', {y:80, opacity:0, duration:.8, stagger:.12, ease:'back.out(1.6)'});
      gsap.from('.hero-kicker, .hero-sub, .hero-cta, .meta-card', {y:30, opacity:0, duration:.6, stagger:.08, delay:.6});
      gsap.to('.doodle', {y:'+=12', repeat:-1, yoyo:true, duration:2, ease:'sine.inOut', stagger:.2});
    }

    // small celebratory burst
    setTimeout(()=>confetti({particleCount:60, spread:60, origin:{y:.2}}), 400);
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
    const f=$('#floaters'); const icons=['❤','♥','★','✦','💖','✿'];
    for(let i=0;i<14;i++){
      const s=document.createElement('span');
      s.textContent=icons[i%icons.length];
      s.style.left=Math.random()*100+'%';
      s.style.fontSize=(16+Math.random()*24)+'px';
      s.style.color=['#FF4FA3','#FFD93D','#42A5F5','#7DFF8A','#FF5757'][i%5];
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
        "My favorite person ❤",
        "The reason my Spotify Wrapped is weird ♥",
        "My partner in everything ✦",
        "Happy birthday, you ⭐",
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
        if (n>=999){ n=999; clearInterval(iv); pct.textContent='∞%'; confetti({particleCount:160, spread:100, origin:{y:.6}}); heartBurst(); }
        else pct.textContent=n+'%';
      }, 30);
    };
    btn.addEventListener('click', run);
    if (window.ScrollTrigger){
      ScrollTrigger.create({trigger:'#meter', start:'top 70%', onEnter:run});
    }
  }

  function heartBurst(){
    const colors=['#FF4FA3','#FFD93D','#FF5757'];
    for(let i=0;i<24;i++){
      const h=document.createElement('span');
      h.textContent='❤';
      Object.assign(h.style,{position:'fixed', left:'50%', top:'60%', fontSize:'24px', color:colors[i%3], zIndex:9000, pointerEvents:'none'});
      document.body.appendChild(h);
      const ang=Math.random()*Math.PI*2, dist=120+Math.random()*180;
      gsap.to(h,{x:Math.cos(ang)*dist, y:Math.sin(ang)*dist - 80, opacity:0, duration:1.4, ease:'power2.out', onComplete:()=>h.remove()});
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
    const ctx=c.getContext('2d');
    const draw=()=>{
      ctx.fillStyle='#FFD93D'; ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle='#111'; ctx.font='bold 28px Bebas Neue, sans-serif'; ctx.textAlign='center';
      ctx.fillText('SCRATCH ME ★', c.width/2, c.height/2);
      ctx.font='14px Space Grotesk, sans-serif';
      ctx.fillText('(use your finger / mouse)', c.width/2, c.height/2 + 28);
    };
    draw();
    ctx.globalCompositeOperation='destination-out';
    let drawing=false;
    const pos=e=>{
      const r=c.getBoundingClientRect();
      const t=e.touches?e.touches[0]:e;
      return {x:(t.clientX-r.left)*(c.width/r.width), y:(t.clientY-r.top)*(c.height/r.height)};
    };
    const start=e=>{drawing=true; move(e);};
    const end=()=>{drawing=false; checkClear();};
    const move=e=>{
      if(!drawing) return;
      e.preventDefault();
      const {x,y}=pos(e);
      ctx.beginPath(); ctx.arc(x,y,30,0,Math.PI*2); ctx.fill();
    };
    c.addEventListener('mousedown',start); c.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
    c.addEventListener('touchstart',start,{passive:false}); c.addEventListener('touchmove',move,{passive:false}); c.addEventListener('touchend',end);
    let cleared=false;
    function checkClear(){
      if(cleared) return;
      const d=ctx.getImageData(0,0,c.width,c.height).data;
      let clear=0; for(let i=3;i<d.length;i+=400) if(d[i]===0) clear++;
      if (clear/(d.length/400) > .55){
        cleared=true;
        c.style.transition='opacity .6s'; c.style.opacity=0;
        confetti({particleCount:120, spread:80, origin:{y:.6}});
      }
    }
  }

  /* ---------- QUIZ ---------- */
  function initQuiz(){
    const box=$('#quizBox'); let i=0, score=0;
    const render=()=>{
      if (i>=QUIZ.length){
        box.innerHTML=`<div class="q-result">You got ${score}/${QUIZ.length}.<br/>Verdict: ridiculously in love.<br/><button class="btn btn-pink" id="qAgain">Play again</button></div>`;
        $('#qAgain').addEventListener('click',()=>{i=0;score=0;render();});
        confetti({particleCount:140, spread:90, origin:{y:.6}});
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
      heartBurst();
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
      confetti({particleCount:200, spread:120, origin:{y:.5}});
      setTimeout(()=>e.classList.remove('show'), 4000);
    }
  }

  /* ---------- KEYBOARD a11y ---------- */
  function initKeyboard(){
    document.addEventListener('keydown', e=>{
      if (e.key==='Tab') document.body.classList.add('kbd');
    });
  }

  // Mouse parallax for hero doodles
  window.addEventListener('mousemove', (e)=>{
    if (!window.gsap) return;
    const x=(e.clientX/window.innerWidth - .5);
    const y=(e.clientY/window.innerHeight - .5);
    $$('.doodle').forEach((d,i)=>{
      gsap.to(d,{x:x*(20+i*4), y:y*(20+i*4), duration:.6, ease:'power2.out'});
    });
  });

})();
