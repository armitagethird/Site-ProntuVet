// Sections: Nav, Hero, How, Features, Desktop, Security, Testimonials, Pricing, FAQ, CTA, Footer

// Animated number counter powered by anime.js v4
const StatCounter = ({ value, label }) => {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [display, setDisplay] = useState(value);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!inView || fired || !window.anime || !window.anime.animate) return;
    setFired(true);
    const match = value.match(/^(\d+)(.*)/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const obj = { val: 0 };
    window.anime.animate(obj, {
      val: target,
      duration: 1600,
      ease: 'outExpo',
      onUpdate() { setDisplay(Math.round(obj.val) + suffix); },
    });
  }, [inView, fired, value]);

  return (
    <div ref={ref}>
      <div className="text-2xl md:text-3xl font-black tracking-tighter brand-gradient">{display}</div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{label}</div>
    </div>
  );
};

// --- Nav ---
const Nav = ({ lang, setLang, dark, setDark, tweaksOn, setTweaksOn }) => {
  const t = window.I18N[lang];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-auto max-w-6xl px-4 transition-all`}>
        <div className={`flex items-center justify-between rounded-2xl px-4 md:px-5 h-14 transition-all ${scrolled ? 'glass shadow-lg shadow-black/5' : ''}`}>
          <a href="#" className="shrink-0"><Logo size="sm"/></a>
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-700 dark:text-slate-300 mx-auto">
            <a href="#features" className="link-underline hover:text-teal-600">{t.nav_features}</a>
            <a href="#how" className="link-underline hover:text-teal-600">{t.nav_how}</a>
            <a href="#security" className="link-underline hover:text-teal-600">{t.nav_security}</a>
            <a href="#pricing" className="link-underline hover:text-teal-600">{t.nav_pricing}</a>
            <a href="#faq" className="link-underline hover:text-teal-600">{t.nav_faq}</a>
            <span className="w-px h-4 bg-slate-200 dark:bg-white/10"/>
            <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="link-underline hover:text-teal-600 font-bold uppercase tracking-widest">
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <button onClick={() => setDark(!dark)}
              className="inline-flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              aria-label="toggle theme">
              <window.Icon name={dark ? 'sun' : 'moon'} className="w-4 h-4"/>
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="hidden sm:inline-flex lg:hidden h-9 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:border-teal-500/40">
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <button onClick={() => setDark(!dark)}
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/40"
              aria-label="toggle theme">
              <window.Icon name={dark ? 'sun' : 'moon'} className="w-4 h-4"/>
            </button>
            <Button variant="primary" size="sm" iconRight={<window.Icon name="arrow_right" className="w-4 h-4"/>}>
              {t.cta_start}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Hero ---
const Hero = ({ lang }) => {
  const t = window.I18N[lang];
  return (
    <section id="hero" className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-x-hidden">
      <div className="absolute inset-0 dot-grid opacity-70"/>
      <div className="absolute inset-0 noise-bg"/>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
          <div className="animate-[fade-in-up_0.8s_ease-out] flex flex-col items-center lg:items-start text-center lg:text-left">
            <Eyebrow className="mb-6">{t.hero_badge}</Eyebrow>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6" style={{textWrap:'balance'}}>
              <span className="block">{t.hero_title_a}</span>
              <span className="block brand-gradient">{t.hero_title_b}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-8 font-medium mx-auto lg:mx-0" style={{textWrap:'pretty'}}>
              {t.hero_sub}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              <Button size="lg" iconRight={<window.Icon name="arrow_right" className="w-5 h-5"/>}>{t.hero_cta_primary}</Button>
              <a href="#how"><Button size="lg" variant="secondary" icon={<window.Icon name="play" className="w-4 h-4 fill-current"/>}>{t.hero_cta_secondary}</Button></a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <window.Icon name="check_circle" className="w-4 h-4 text-emerald-500"/>
              {t.hero_trust}
            </div>

            {/* Stat strip — animated counters via anime.js */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-xs sm:max-w-md mx-auto lg:mx-0">
              <StatCounter value="28s"   label={lang==='pt'?'por prontuário':'per record'}/>
              <StatCounter value="100%"  label={lang==='pt'?'RLS auditado':'audited RLS'}/>
              <StatCounter value="30min" label={lang==='pt'?'de áudio/consulta':'audio/visit'}/>
            </div>
          </div>

          <div className="relative">
            <window.DemoPhone lang={lang}/>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- How it works ---
const HowItWorks = ({ lang }) => {
  const t = window.I18N[lang];
  const steps = [
    { icon: 'mic', num: '01', title: t.how_step1_t, desc: t.how_step1_d, from: 'from-teal-500', to: 'to-teal-600' },
    { icon: 'stethoscope', num: '02', title: t.how_step2_t, desc: t.how_step2_d, from: 'from-teal-500', to: 'to-emerald-600' },
    { icon: 'file_text', num: '03', title: t.how_step3_t, desc: t.how_step3_d, from: 'from-emerald-500', to: 'to-blue-600' },
  ];
  return (
    <section id="how" className="relative py-12 md:py-16" data-reveal>
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader eyebrow={t.how_eyebrow} title={t.how_title} sub={t.how_sub}/>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connector */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-teal-500/40 via-emerald-500/40 to-blue-500/40"/>
          {steps.map((s, i) => (
            <div key={i} className="relative group animate-[fade-in-up_0.8s_ease-out] opacity-0" style={{animationDelay:`${i*0.15}s`, animationFillMode:'forwards'}}>
              <Card className="p-7 h-full">
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${s.from} ${s.to} text-white flex items-center justify-center shadow-lg shadow-teal-500/25 mb-5`}>
                  <window.Icon name={s.icon} className="w-6 h-6"/>
                </div>
                <div className="text-[10px] font-black tracking-[0.3em] text-teal-600/70 mb-2">{s.num}</div>
                <h3 className="text-2xl font-black tracking-tight mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{s.desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Features with mini demos ---
const Features = ({ lang }) => {
  const t = window.I18N[lang];
  const feats = [
    { icon:'mic', title: t.feat_listen_t, desc: t.feat_listen_d, demo: <MiniListen lang={lang}/> },
    { icon:'stethoscope', title: t.feat_struct_t, desc: t.feat_struct_d, demo: <MiniStruct lang={lang}/> },
    { icon:'layout', title: t.feat_templates_t, desc: t.feat_templates_d, demo: <MiniTemplates lang={lang}/> },
    { icon:'heart', title: t.feat_tutor_t, desc: t.feat_tutor_d, demo: <MiniTutor lang={lang}/> },
    { icon:'activity', title: t.feat_timeline_t, desc: t.feat_timeline_d, demo: <MiniTimeline lang={lang}/> },
    { icon:'paperclip', title: t.feat_attach_t, desc: t.feat_attach_d, demo: <MiniAttach lang={lang}/> },
  ];
  return (
    <section id="features" className="relative py-12 md:py-16 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent" data-reveal>
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader eyebrow={t.feat_eyebrow} title={t.feat_title} sub={t.feat_sub}/>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {feats.map((f, i) => (
            <Card key={i} interactive className="p-6 flex flex-col gap-4 min-h-[340px]">
              <div className="h-36 rounded-2xl bg-gradient-to-br from-teal-500/5 via-slate-500/5 to-blue-500/5 border border-slate-200/50 dark:border-white/5 overflow-hidden relative p-3">
                {f.demo}
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                  <window.Icon name={f.icon} className="w-5 h-5"/>
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-snug">{f.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Mini demos
const MiniListen = ({ lang }) => {
  const [bars, setBars] = useState(() => Array.from({length:32}, () => 0.3));
  const [sec, setSec] = useState(0);
  window.useInterval(() => setBars(prev => prev.map((_, i) => {
    const env = 0.5 + 0.5 * Math.sin((i / 32) * Math.PI);
    return Math.max(0.1, env * (0.3 + Math.random() * 0.7));
  })), 100);
  window.useInterval(() => setSec(s => (s + 1) % 600), 1000);
  const fmt = (n) => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
  return (
    <div className="h-full flex flex-col items-center justify-center gap-2">
      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"/>
        <span className="text-[8px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">REC</span>
      </div>
      <div className="flex items-center justify-center gap-[2px] h-10 w-full px-2">
        {bars.map((v,i) => (
          <div key={i} className="w-[3px] rounded-full bg-gradient-to-t from-teal-500 to-blue-400 transition-[height,opacity] duration-75" style={{height:`${Math.max(3, v*40)}px`, opacity:Math.max(0.3, v)}}/>
        ))}
      </div>
      <div className="text-sm font-mono font-black tabular tracking-tight">{fmt(sec)}</div>
    </div>
  );
};

const MiniStruct = ({ lang }) => {
  const lines = lang==='pt' ? ['Anamnese','Exame físico','Diagnóstico','Conduta'] : ['History','Physical exam','Assessment','Plan'];
  return (
    <div className="h-full flex flex-col justify-center gap-1.5">
      {lines.map((l,i) => (
        <div key={i} className="flex items-center gap-2 animate-[fade-in-up_0.5s_ease-out] opacity-0" style={{animationDelay:`${i*0.12}s`, animationFillMode:'forwards'}}>
          <window.Icon name="check" className="w-3 h-3 text-emerald-500" strokeWidth={3}/>
          <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{l}</div>
          <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-teal-500/60 to-emerald-500/20"/>
        </div>
      ))}
    </div>
  );
};

const MiniTemplates = ({ lang }) => {
  const items = lang==='pt' ? ['Prontuário padrão','Consulta rápida','Pré-cirúrgico','Dermatologia'] : ['Default record','Quick visit','Pre-surgical','Dermatology'];
  const [active, setActive] = useState(0);
  window.useInterval(() => setActive(a => (a+1) % items.length), 1400);
  return (
    <div className="h-full flex flex-col gap-1.5 justify-center">
      {items.map((it,i) => (
        <div key={i} className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${active===i?'bg-teal-500 text-white shadow shadow-teal-500/30':'bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5'}`}>
          <span>{it}</span>
          {active===i && <window.Icon name="check" className="w-3 h-3" strokeWidth={3}/>}
        </div>
      ))}
    </div>
  );
};

const MiniTutor = ({ lang }) => (
  <div className="h-full p-2 flex flex-col justify-center">
    <div className="rounded-xl bg-white/70 dark:bg-white/5 border border-teal-500/15 p-2.5">
      <div className="text-[8px] font-black text-teal-600 uppercase tracking-widest mb-1">{lang==='pt'?'Para o tutor':'For the owner'}</div>
      <div className="text-[10px] leading-snug text-slate-700 dark:text-slate-300 font-medium">
        {lang==='pt'
          ? 'Luna está com o estômago inflamado. Nada grave, mas precisamos investigar os rins...'
          : 'Luna has an inflamed stomach. Nothing serious, but we need to check her kidneys...'}
      </div>
    </div>
  </div>
);

const MiniTimeline = ({ lang }) => {
  const events = lang==='pt'?['Hoje','12 Jan','03 Set','20 Mar']:['Today','Jan 12','Sep 3','Mar 20'];
  return (
    <div className="h-full flex flex-col justify-center pl-4 relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-500/60 to-transparent"/>
      {events.map((d,i) => (
        <div key={i} className="relative flex items-center gap-3 py-1">
          <div className={`absolute -left-[13px] w-2 h-2 rounded-full ${i===0?'bg-teal-500 shadow shadow-teal-500/50':'bg-slate-300 dark:bg-white/20'}`}/>
          <div className="text-[9px] font-mono text-slate-500 w-12">{d}</div>
          <div className={`h-1.5 flex-1 rounded-full ${i===0?'bg-teal-500/70':'bg-slate-200 dark:bg-white/10'}`} style={{maxWidth:`${80-i*12}%`}}/>
        </div>
      ))}
    </div>
  );
};

const MiniAttach = ({ lang }) => (
  <div className="h-full p-1 flex flex-col justify-center gap-1.5">
    {[
      {n:'raio-x-torax.jpg', s:'2.3 MB', icon:'image'},
      {n:'hemograma.pdf', s:'180 KB', icon:'file_text'},
      {n:'ecocardio.pdf', s:'1.1 MB', icon:'file_text'},
    ].map((f,i) => (
      <div key={i} className="flex items-center gap-2 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 px-2 py-1.5">
        <window.Icon name={f.icon} className="w-3 h-3 text-teal-600 shrink-0"/>
        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 truncate flex-1">{f.n}</span>
        <span className="text-[9px] font-mono text-slate-400">{f.s}</span>
        <window.Icon name="lock" className="w-2.5 h-2.5 text-emerald-500"/>
      </div>
    ))}
  </div>
);

// --- ProntuLink ---
const ProntuLinkDemo = ({ lang }) => {
  const containerRef = React.useRef(null);
  const [fired, setFired] = useState(false);
  const pt = lang === 'pt';

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setFired(true);
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!fired || !window.anime || !window.anime.animate) return;
    const c = containerRef.current;
    if (!c) return;
    const card  = c.querySelector('.plk-card');
    const rows  = c.querySelectorAll('.plk-row');
    const chips = c.querySelectorAll('.plk-chip');
    const rings = c.querySelectorAll('.plk-ring');
    window.anime.animate(card,  { opacity:[0,1], translateY:[32,0], scale:[0.93,1], duration:700, ease:'outExpo' });
    window.anime.animate(rows,  { opacity:[0,1], translateX:[-14,0], delay:window.anime.stagger(80,{start:320}), duration:420, ease:'outExpo' });
    window.anime.animate(chips, { opacity:[0,1], scale:[0.5,1], translateY:[10,0], delay:window.anime.stagger(100,{start:850}), duration:550, ease:'spring(1,90,12,0)' });
    setTimeout(() => {
      rings.forEach((ring, i) => window.anime.animate(ring, { scale:[1,1.65], opacity:[0.5,0], duration:1800, delay:i*450, loop:true, ease:'outExpo' }));
    }, 1350);
  }, [fired]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-5">
      {/* Card */}
      <div className="plk-card w-full max-w-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-teal-900/40"
        style={{opacity:0, background:'#0f1923', border:'1px solid rgba(20,184,166,0.18)'}}>
        {/* URL bar */}
        <div className="plk-row px-4 py-2.5 flex items-center gap-2.5 border-b border-white/5"
          style={{background:'#0a1119', opacity:0}}>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500/50"/>
            <span className="w-2 h-2 rounded-full bg-yellow-500/50"/>
            <span className="w-2 h-2 rounded-full bg-green-500/50"/>
          </div>
          <div className="flex-1 flex items-center gap-1.5 rounded-lg px-3 py-1" style={{background:'rgba(255,255,255,0.05)'}}>
            <window.Icon name="lock" className="w-3 h-3 text-emerald-400"/>
            <span className="text-[11px] font-mono text-slate-400">prontuvet.app/p/luna-a3f7</span>
          </div>
          <window.Icon name="share" className="w-3.5 h-3.5 text-teal-400"/>
        </div>
        {/* Pet header */}
        <div className="plk-row px-5 py-4 flex items-center gap-3 border-b border-white/5" style={{opacity:0}}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white">
            <window.Icon name="dog" className="w-5 h-5"/>
          </div>
          <div>
            <div className="text-sm font-black text-white">Luna</div>
            <div className="text-[10px] text-slate-400 font-medium">{pt?'Labrador · 4 anos · Fêmea':'Labrador · 4 yrs · Female'}</div>
          </div>
          <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full border" style={{background:'rgba(20,184,166,0.08)', borderColor:'rgba(20,184,166,0.2)'}}>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"/>
            <span className="text-[9px] font-bold text-teal-400 uppercase">{pt?'Ativo':'Active'}</span>
          </div>
        </div>
        {/* Medical rows */}
        <div className="px-5 py-4 space-y-3">
          <div className="plk-row" style={{opacity:0}}>
            <div className="text-[9px] font-black uppercase tracking-widest text-teal-500 mb-1">{pt?'Diagnóstico':'Diagnosis'}</div>
            <div className="text-xs text-slate-300 font-medium">{pt?'Gastrite aguda · CID K29.1':'Acute gastritis · ICD K29.1'}</div>
          </div>
          <div className="plk-row" style={{opacity:0}}>
            <div className="text-[9px] font-black uppercase tracking-widest text-teal-500 mb-1">{pt?'Conduta':'Treatment'}</div>
            <div className="text-xs text-slate-300 font-medium">{pt?'Omeprazol 2 mg/kg · 7 dias · jejum 12h':'Omeprazole 2mg/kg · 7 days · 12h fast'}</div>
          </div>
          <div className="plk-row rounded-xl px-3 py-2.5 text-[11px] font-medium text-teal-300" style={{background:'rgba(20,184,166,0.07)', border:'1px solid rgba(20,184,166,0.2)', opacity:0}}>
            {pt?'Retorno em 7 dias. Em caso de vômito persistente, retornar antes.':'Return in 7 days. If vomiting persists, come back sooner.'}
          </div>
          {/* Vet signature */}
          <div className="plk-row flex items-center gap-2 pt-2 border-t border-white/5" style={{opacity:0}}>
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white">
              <window.Icon name="stethoscope" className="w-3 h-3"/>
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-300">{pt?'Dra. Ana Figueiredo · CRMV-SP 12847':'Dr. Ana Figueiredo · CRMV-SP 12847'}</div>
              <div className="text-[9px] text-slate-500">{pt?'Assinado digitalmente':'Digitally signed'}</div>
            </div>
          </div>
          {/* Action row */}
          <div className="plk-row flex gap-2 pt-1" style={{opacity:0}}>
            <button className="flex-1 h-9 rounded-xl text-[12px] font-bold transition-all" style={{border:'1px solid rgba(255,255,255,0.1)', color:'rgba(148,163,184,0.8)', background:'transparent'}}>
              {pt?'Salvar PDF':'Save PDF'}
            </button>
            <button className="relative flex-1 h-9 rounded-xl text-[12px] font-black transition-all overflow-visible flex items-center justify-center gap-1.5"
              style={{background:'linear-gradient(135deg,#14b8a6,#10b981)', color:'#072a26'}}>
              <span className="plk-ring absolute inset-0 rounded-xl border-2 border-teal-400/60" style={{opacity:0}}/>
              <span className="plk-ring absolute -inset-1 rounded-[14px] border border-teal-400/30" style={{opacity:0}}/>
              <window.Icon name="share" className="w-3.5 h-3.5"/>
              {pt?'Compartilhar':'Share'}
            </button>
          </div>
        </div>
      </div>

      {/* Recipient chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          {icon:'user',       label:pt?'Tutor · WhatsApp':'Owner · WhatsApp', clr:'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'},
          {icon:'stethoscope',label:pt?'Veterinário parceiro':'Partner vet',    clr:'bg-blue-500/10 border-blue-500/25 text-blue-400'},
          {icon:'activity',   label:pt?'Especialista':'Specialist',             clr:'bg-violet-500/10 border-violet-500/25 text-violet-400'},
        ].map((c,i) => (
          <div key={i} className={`plk-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold ${c.clr}`} style={{opacity:0}}>
            <window.Icon name={c.icon} className="w-3 h-3"/>
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProntuLink = ({ lang }) => {
  const pt = lang === 'pt';
  return (
    <section id="prontulink" className="relative py-16 md:py-24 overflow-hidden" data-reveal>
      <div className="absolute inset-0" style={{background:'linear-gradient(160deg,#050e1a 0%,#071420 55%,#060c12 100%)'}}/>
      <div className="absolute inset-0 dot-grid opacity-20"/>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[280px] blur-[100px] pointer-events-none" style={{background:'radial-gradient(ellipse at center,rgba(20,184,166,0.22) 0%,transparent 70%)'}}/>
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] blur-[120px] pointer-events-none" style={{background:'radial-gradient(ellipse at 80% 100%,rgba(6,182,212,0.12) 0%,transparent 70%)'}}/>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_430px] gap-12 xl:gap-20 items-center">

          {/* Left: copy */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-[10px] font-black uppercase tracking-widest"
              style={{background:'rgba(20,184,166,0.08)',border:'1px solid rgba(20,184,166,0.25)',color:'#5eead4'}}>
              <window.Icon name="sparkle" className="w-3 h-3"/>
              {pt?'Tecnologia exclusiva Platinum':'Exclusive Platinum Technology'}
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 text-white">
              Prontu<span style={{background:'linear-gradient(135deg,#14b8a6,#10b981,#06b6d4)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',WebkitTextFillColor:'transparent'}}>Link</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl font-medium mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0" style={{color:'rgba(148,163,184,0.9)',textWrap:'pretty'}}>
              {pt
                ? 'Gere um link seguro e rastreável de qualquer prontuário e compartilhe com o tutor ou outro veterinário em segundos. Sem login. Sem app. Apenas um link.'
                : 'Generate a secure, traceable link from any patient record and share with the owner or another vet in seconds. No login. No app. Just a link.'}
            </p>

            <ul className="space-y-4 mb-10 w-full max-w-lg mx-auto lg:mx-0">
              {[
                {icon:'link',      text:pt?'Link único com validade configurável':'Unique link with configurable expiry'},
                {icon:'lock',      text:pt?'Acesso protegido — só quem tem o link vê':'Access-controlled — only the link holder can view'},
                {icon:'user',      text:pt?'Tutor recebe via WhatsApp, sem baixar nada':'Owner receives via WhatsApp, no download needed'},
                {icon:'file_text', text:pt?'Inclui anexos, laudos e assinatura digital':'Includes attachments, reports and digital signature'},
              ].map((b,i) => (
                <li key={i} className="flex items-start gap-3 text-left">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{background:'rgba(20,184,166,0.1)',border:'1px solid rgba(20,184,166,0.22)'}}>
                    <window.Icon name={b.icon} className="w-4 h-4 text-teal-400"/>
                  </div>
                  <span className="text-sm font-medium pt-1.5" style={{color:'rgba(203,213,225,0.85)'}}>{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{background:'linear-gradient(135deg,rgba(20,184,166,0.12),rgba(16,185,129,0.07))',border:'1px solid rgba(20,184,166,0.25)'}}>
              <window.Icon name="check_circle" className="w-5 h-5 text-emerald-400"/>
              <span className="text-sm font-bold text-slate-200">{pt?'Incluído em todos os planos Platinum':'Included in all Platinum plans'}</span>
            </div>
          </div>

          {/* Right: demo */}
          <ProntuLinkDemo lang={lang}/>
        </div>
      </div>
    </section>
  );
};

// --- Desktop section ---
const DesktopSection = ({ lang }) => {
  const t = window.I18N[lang];
  return (
    <section id="desktop" className="relative py-12 md:py-16 overflow-hidden" data-reveal>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader eyebrow={t.desktop_eyebrow} title={t.desktop_title} sub={t.desktop_sub}/>
        <div className="relative">
          <div className="absolute -inset-10 bg-gradient-to-br from-teal-400/10 to-blue-400/10 rounded-[40px] blur-3xl -z-10"/>
          <window.DemoDesktop lang={lang}/>
        </div>
      </div>
    </section>
  );
};

// --- Security ---
const Security = ({ lang }) => {
  const t = window.I18N[lang];
  const items = [
    {icon:'shield', title: t.sec_rls_t, desc: t.sec_rls_d},
    {icon:'lock', title: t.sec_signed_t, desc: t.sec_signed_d},
    {icon:'file_text', title: t.sec_lgpd_t, desc: t.sec_lgpd_d},
    {icon:'code', title: t.sec_code_t, desc: t.sec_code_d},
  ];
  return (
    <section id="security" className="relative py-12 md:py-16" data-reveal>
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader eyebrow={t.sec_eyebrow} title={t.sec_title} sub={t.sec_sub}/>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((it,i) => (
            <Card key={i} className="p-7 flex gap-5" interactive>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500/15 to-emerald-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                <window.Icon name={it.icon} className="w-6 h-6"/>
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight mb-1">{it.title}</h3>
                <p className="text-[15px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{it.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Code-like trust strip */}
        <div className="mt-10 rounded-3xl border border-slate-200/80 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] p-5 md:p-6 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-8 md:gap-x-10 gap-y-3 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2"><window.Icon name="check_circle" className="w-4 h-4 text-emerald-500"/> PostgreSQL + RLS</div>
          <div className="flex items-center gap-2"><window.Icon name="check_circle" className="w-4 h-4 text-emerald-500"/> Supabase Storage</div>
          <div className="flex items-center gap-2"><window.Icon name="check_circle" className="w-4 h-4 text-emerald-500"/> TLS 1.3 · SSL</div>
          <div className="flex items-center gap-2"><window.Icon name="check_circle" className="w-4 h-4 text-emerald-500"/> TypeScript strict</div>
          <div className="flex items-center gap-2"><window.Icon name="check_circle" className="w-4 h-4 text-emerald-500"/> {lang==='pt'?'Servidores BR':'BR servers'}</div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials = ({ lang }) => {
  const t = window.I18N[lang];
  const items = [
    {q: t.test_1_quote, n: t.test_1_name, r: t.test_1_role, initials:'CF'},
    {q: t.test_2_quote, n: t.test_2_name, r: t.test_2_role, initials:'RM'},
    {q: t.test_3_quote, n: t.test_3_name, r: t.test_3_role, initials:'JR'},
  ];
  return (
    <section id="testimonials" className="relative py-12 md:py-16" data-reveal>
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader eyebrow={t.test_eyebrow} title={t.test_title} sub={t.test_sub}/>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it,i) => (
            <Card key={i} className="p-7 flex flex-col gap-5 min-h-[260px]">
              <window.Icon name="quote" className="w-8 h-8 text-teal-500/50"/>
              <p className="text-base md:text-[17px] leading-snug font-semibold text-slate-800 dark:text-slate-200 flex-1" style={{textWrap:'pretty'}}>
                {it.q}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 dark:border-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-black flex items-center justify-center text-xs">
                  {it.initials}
                </div>
                <div>
                  <div className="font-bold text-sm">{it.n}</div>
                  <div className="text-xs text-slate-500">{it.r}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Pricing ---
const PLAT_GRAD = 'linear-gradient(135deg,#475569 0%,#94a3b8 22%,#e2e8f0 42%,#f8fafc 50%,#e2e8f0 58%,#94a3b8 78%,#475569 100%)';
const PLAT_GRAD_ANIM = { background: PLAT_GRAD, backgroundSize: '200% 100%', animation: 'shimmer 3.2s linear infinite' };

const PricingCard = ({ plan, orderClass = '' }) => {
  const { name, badge, proof, desc, price, period, feats, cta, featured, clinic } = plan;

  /* PLATINUM — metallic dark, 2× wide on xl */
  if (featured) return (
    <div className={`relative md:col-span-2 xl:col-span-2 ${orderClass}`}>
      <div className="absolute -inset-[1.5px] rounded-[2rem]" style={{...PLAT_GRAD_ANIM, opacity: 0.9}}/>
      <div className="relative rounded-[calc(2rem-1px)] overflow-hidden h-full flex flex-col" style={{background: '#0c1420'}}>
        <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse 90% 32% at 50% 0%, rgba(226,232,240,0.1) 0%, transparent 65%)'}}/>
        <div className="relative p-7 flex flex-col gap-5 flex-1">
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-black tracking-[0.22em] uppercase" style={{...PLAT_GRAD_ANIM, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent'}}>Platinum</span>
            {badge && <span className="ml-auto px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest" style={{background: 'linear-gradient(135deg,#64748b,#94a3b8,#cbd5e1)', color: '#0c1420'}}>{badge}</span>}
          </div>
          <p className="text-xs text-slate-400 font-medium leading-snug">{desc}</p>
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tighter" style={{...PLAT_GRAD_ANIM, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent'}}>{price}</span>
            <span className="text-sm text-slate-500 font-bold">{period}</span>
          </div>
          <div className="h-px" style={{background: 'linear-gradient(to right, rgba(148,163,184,0.35), transparent)'}}/>
          {/* Social proof */}
          {proof && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"/>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{proof}</span>
            </div>
          )}
          {/* Features — 2 cols on wide layout */}
          <ul className="flex-1 grid xl:grid-cols-2 xl:gap-x-6 gap-y-2.5">
            {feats.map((f, j) => (
              <li key={j} className="flex items-start gap-2 text-xs font-medium text-slate-300">
                <div className="w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{background: 'linear-gradient(135deg,#64748b,#e2e8f0)'}}>
                  <window.Icon name="check" className="w-2 h-2 text-[#0c1420]" strokeWidth={3}/>
                </div>
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-auto h-13 py-3.5 rounded-2xl font-black text-base tracking-tight transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]" style={{...PLAT_GRAD_ANIM, color: '#0c1420'}}>
            {cta}
          </button>
        </div>
      </div>
    </div>
  );

  /* CLÍNICA — jewel purple */
  if (clinic) return (
    <div className={`relative ${orderClass}`}>
      <div className="absolute -inset-[1px] rounded-[2rem]" style={{background: 'linear-gradient(135deg,#7c3aed,#4c1d95,#6d28d9,#a78bfa,#7c3aed)', opacity: 0.65}}/>
      <div className="relative rounded-[calc(2rem-1px)] overflow-hidden h-full flex flex-col" style={{background: '#0d0520'}}>
        <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse 80% 30% at 50% 0%, rgba(139,92,246,0.22) 0%, transparent 60%)'}}/>
        <div className="relative p-6 flex flex-col gap-4 flex-1">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-1" style={{background: 'linear-gradient(135deg,#a78bfa,#c4b5fd,#ede9fe)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent'}}>{name}</div>
            <p className="text-xs font-medium mb-3" style={{color: 'rgba(167,139,250,0.65)'}}>{desc}</p>
            <div className="flex items-baseline gap-1.5">
              <div className="text-3xl font-black tracking-tighter" style={{background: 'linear-gradient(135deg,#a78bfa,#c4b5fd,#ede9fe)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent'}}>{price}</div>
              <div className="text-xs font-bold" style={{color: 'rgba(139,92,246,0.7)'}}>{period}</div>
            </div>
          </div>
          <div className="h-px" style={{background: 'linear-gradient(to right, rgba(139,92,246,0.35), transparent)'}}/>
          <ul className="space-y-2 flex-1">
            {feats.map((f, j) => (
              <li key={j} className="flex items-start gap-2 text-xs font-medium" style={{color: '#c4b5fd'}}>
                <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{background: 'linear-gradient(135deg,#7c3aed,#a78bfa)'}}>
                  <window.Icon name="check" className="w-2 h-2 text-white" strokeWidth={3}/>
                </div>
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-auto h-10 px-5 rounded-2xl text-sm font-bold transition-all"
            style={{border: '1px solid rgba(139,92,246,0.45)', color: '#a78bfa', background: 'rgba(139,92,246,0.07)'}}
            onMouseEnter={e => e.currentTarget.style.background='rgba(139,92,246,0.17)'}
            onMouseLeave={e => e.currentTarget.style.background='rgba(139,92,246,0.07)'}
          >{cta}</button>
        </div>
      </div>
    </div>
  );

  /* Free / Essential */
  return (
    <div className={orderClass}>
    <Card className="p-6 flex flex-col gap-4 h-full">
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500 mb-1">{name}</div>
        <p className="text-xs text-slate-500 font-medium mb-2">{desc}</p>
        <div className="flex items-baseline gap-1.5">
          <div className="text-3xl font-black tracking-tighter text-slate-600 dark:text-slate-400">{price}</div>
          <div className="text-xs text-slate-400 font-bold">{period}</div>
        </div>
      </div>
      <div className="h-px bg-slate-200/60 dark:bg-white/5"/>
      <ul className="space-y-2 flex-1">
        {feats.map((f, j) => (
          <li key={j} className="flex items-start gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <window.Icon name="check" className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" strokeWidth={2.5}/>
            {f}
          </li>
        ))}
      </ul>
      <Button variant="secondary" size="md" className="mt-auto">{cta}</Button>
    </Card>
    </div>
  );
};

const Pricing = ({ lang }) => {
  const t = window.I18N[lang];
  const plans = [
    { name: t.price_free_name, desc: t.price_free_desc, price: t.price_free_price, period: t.price_free_period, feats: t.price_free_feats, cta: t.price_free_cta },
    { name: t.price_ess_name, desc: t.price_ess_desc, price: t.price_ess_price, period: t.price_ess_period, feats: t.price_ess_feats, cta: t.price_ess_cta },
    { name: t.price_plat_name, badge: t.price_plat_badge, proof: t.price_plat_proof, desc: t.price_plat_desc, price: t.price_plat_price, period: t.price_plat_period, feats: t.price_plat_feats, cta: t.price_plat_cta, featured: true },
    { name: t.price_clinic_name, desc: t.price_clinic_desc, price: t.price_clinic_price, period: t.price_clinic_period, feats: t.price_clinic_feats, cta: t.price_clinic_cta, clinic: true },
  ];
  // Mobile order: Platinum(1) → Essential(2) → Free(3) → Clinic(4)
  // Desktop (md+): order-none resets to 0, so DOM order takes over: Free, Essential, Platinum, Clinic
  const mobileOrders = ['order-3 md:order-none', 'order-2 md:order-none', 'order-1 md:order-none', 'order-4 md:order-none'];
  return (
    <section id="pricing" className="relative py-12 md:py-16 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent" data-reveal>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader eyebrow={t.price_eyebrow} title={t.price_title} sub={t.price_sub}/>
        {/* Grid: [Free 1col][Essential 1col][Platinum 2col][Clinic 1col] = 5 cols on xl */}
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4 items-stretch">
          {plans.map((plan, i) => <PricingCard key={i} plan={plan} orderClass={mobileOrders[i]}/>)}
        </div>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">{t.price_note}</p>
      </div>
    </section>
  );
};

// --- FAQ ---
const FAQ = ({ lang }) => {
  const t = window.I18N[lang];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-12 md:py-16" data-reveal>
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader eyebrow={t.faq_eyebrow} title={t.faq_title}/>
        <div className="space-y-3">
          {t.faq_items.map((it, i) => (
            <div key={i} className={`rounded-2xl border transition-all ${open===i?'bg-white dark:bg-white/[0.03] border-teal-500/30 shadow-lg shadow-teal-500/5':'bg-white/50 dark:bg-white/[0.02] border-slate-200/60 dark:border-white/5'}`}>
              <button onClick={() => setOpen(open===i?-1:i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4">
                <span className="text-base md:text-[17px] font-bold tracking-tight">{it.q}</span>
                <window.Icon name="chevron_down" className={`w-5 h-5 text-teal-500 transition-transform ${open===i?'rotate-180':''}`}/>
              </button>
              {open===i && (
                <div className="px-6 pb-6 text-[15px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed animate-[fade-in-up_0.3s_ease-out]" style={{textWrap:'pretty'}}>
                  {it.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Final CTA ---
const FinalCTA = ({ lang }) => {
  const t = window.I18N[lang];
  return (
    <section id="cta" className="relative py-10 md:py-14" data-reveal>
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-[2.5rem] overflow-hidden p-8 sm:p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-emerald-600 to-blue-600"/>
          <div className="absolute inset-0 grain opacity-100"/>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"/>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"/>
          <div className="relative text-white">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4" style={{textWrap:'balance'}}>
              {t.cta_title}
            </h2>
            <p className="text-lg md:text-2xl font-medium text-white/90 mb-8" style={{textWrap:'pretty'}}>
              {t.cta_sub}
            </p>
            <button className="inline-flex items-center gap-3 h-14 px-8 rounded-2xl bg-white text-teal-700 font-black text-base shadow-2xl shadow-black/30 hover:scale-[1.03] transition-transform">
              {t.cta_btn}
              <window.Icon name="arrow_right" className="w-5 h-5"/>
            </button>
            <div className="mt-6 text-sm text-white/80 font-medium">
              {t.cta_foot}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = ({ lang }) => {
  const t = window.I18N[lang];
  const cols = [
    {h: t.footer_prod, items: [t.nav_features, t.nav_pricing, t.nav_security, 'Changelog']},
    {h: t.footer_company, items: [lang==='pt'?'Sobre':'About', 'Blog', lang==='pt'?'Contato':'Contact']},
    {h: t.footer_legal, items: [lang==='pt'?'Termos':'Terms', lang==='pt'?'Privacidade':'Privacy', 'LGPD']},
  ];
  return (
    <footer className="relative border-t border-slate-200/80 dark:border-white/5 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          <div className="col-span-2">
            <Logo size="md"/>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 max-w-xs font-medium">{t.footer_tag}</p>
          </div>
          {cols.map((c,i) => (
            <div key={i}>
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4">{c.h}</div>
              <ul className="space-y-2.5 text-sm font-medium">
                {c.items.map((it,j) => (
                  <li key={j}><a href="#" className="text-slate-700 dark:text-slate-300 hover:text-teal-600 transition-colors link-underline">{it}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200/60 dark:border-white/5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between text-xs text-slate-500 text-center sm:text-left">
          <div>© 2026 ProntuVet. {t.footer_rights}</div>
          <div className="text-slate-400 font-medium">
            {lang==='pt'?'Feito pela ':'Made by '}<span className="font-bold text-slate-500">Vibe Surf</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
            <span className="font-mono">{lang==='pt'?'Todos os sistemas operacionais':'All systems operational'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Nav, Hero, HowItWorks, Features, ProntuLink, DesktopSection, Security, Testimonials, Pricing, FAQ, FinalCTA, Footer });
