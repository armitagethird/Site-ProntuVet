// Sections: Nav, Hero, How, Features, Desktop, Security, Testimonials, Pricing, FAQ, CTA, Footer

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
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-6">
            <a href="#features" className="link-underline hover:text-teal-600">{t.nav_features}</a>
            <a href="#how" className="link-underline hover:text-teal-600">{t.nav_how}</a>
            <a href="#security" className="link-underline hover:text-teal-600">{t.nav_security}</a>
            <a href="#pricing" className="link-underline hover:text-teal-600">{t.nav_pricing}</a>
            <a href="#faq" className="link-underline hover:text-teal-600">{t.nav_faq}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="hidden sm:inline-flex h-9 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:border-teal-500/40">
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
            <button onClick={() => setDark(!dark)}
              className="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-teal-500/40"
              aria-label="toggle theme">
              <window.Icon name={dark ? 'sun' : 'moon'} className="w-4 h-4"/>
            </button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">{t.cta_login}</Button>
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
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-70"/>
      <div className="absolute inset-0 noise-bg"/>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div className="animate-[fade-in-up_0.8s_ease-out]">
            <Eyebrow className="mb-6">{t.hero_badge}</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6" style={{textWrap:'balance'}}>
              <span className="block">{t.hero_title_a}</span>
              <span className="block brand-gradient">{t.hero_title_b}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-8 font-medium" style={{textWrap:'pretty'}}>
              {t.hero_sub}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Button size="lg" iconRight={<window.Icon name="arrow_right" className="w-5 h-5"/>}>{t.hero_cta_primary}</Button>
              <a href="#how"><Button size="lg" variant="secondary" icon={<window.Icon name="play" className="w-4 h-4 fill-current"/>}>{t.hero_cta_secondary}</Button></a>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <window.Icon name="check_circle" className="w-4 h-4 text-emerald-500"/>
              {t.hero_trust}
            </div>

            {/* Stat strip */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                {n:'28s', l: lang==='pt'?'por prontuário':'per record'},
                {n:'100%', l: lang==='pt'?'RLS auditado':'audited RLS'},
                {n:'30min', l: lang==='pt'?'de áudio/consulta':'audio/visit'},
              ].map((s,i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-black tracking-tighter brand-gradient">{s.n}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.l}</div>
                </div>
              ))}
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
    <section id="how" className="relative py-24 md:py-32">
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
    <section id="features" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent">
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

// --- Desktop section ---
const DesktopSection = ({ lang }) => {
  const t = window.I18N[lang];
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
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
    <section id="security" className="relative py-24 md:py-32">
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
        <div className="mt-10 rounded-3xl border border-slate-200/80 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] p-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-mono text-slate-500">
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
    <section className="relative py-24 md:py-32">
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
const Pricing = ({ lang }) => {
  const t = window.I18N[lang];
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent">
      <div className="max-w-5xl mx-auto px-4">
        <SectionHeader eyebrow={t.price_eyebrow} title={t.price_title} sub={t.price_sub}/>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Free */}
          <Card className="p-8 flex flex-col gap-5">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-500 mb-2">{t.price_free_name}</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">{t.price_free_desc}</p>
              <div className="flex items-baseline gap-2">
                <div className="text-5xl font-black tracking-tighter">{t.price_free_price}</div>
                <div className="text-sm text-slate-500 font-bold">{t.price_free_period}</div>
              </div>
            </div>
            <div className="h-px bg-slate-200/80 dark:bg-white/5"/>
            <ul className="space-y-2.5">
              {t.price_free_feats.map((f,i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <window.Icon name="check" className="w-4 h-4 text-teal-500 shrink-0" strokeWidth={3}/>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="secondary" size="lg" className="mt-auto">{t.price_free_cta}</Button>
          </Card>

          {/* Platinum */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-400 via-emerald-500 to-blue-500 rounded-[2rem] blur opacity-40"/>
            <Card className="relative p-8 flex flex-col gap-5 border-teal-500/30 bg-white dark:bg-[#0f1a20]">
              <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/30">
                {t.price_plat_badge} ✦
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.25em] brand-gradient mb-2">{t.price_plat_name}</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">{t.price_plat_desc}</p>
                <div className="flex items-baseline gap-2">
                  <div className="text-5xl font-black tracking-tighter brand-gradient">{t.price_plat_price}</div>
                  <div className="text-sm text-slate-500 font-bold">{t.price_plat_period}</div>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-teal-500/30 to-transparent"/>
              <ul className="space-y-2.5">
                {t.price_plat_feats.map((f,i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shrink-0">
                      <window.Icon name="check" className="w-2.5 h-2.5 text-white" strokeWidth={3}/>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="lg" className="mt-auto" iconRight={<window.Icon name="arrow_right" className="w-4 h-4"/>}>
                {t.price_plat_cta}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FAQ ---
const FAQ = ({ lang }) => {
  const t = window.I18N[lang];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
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
    <section className="relative py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-emerald-600 to-blue-600"/>
          <div className="absolute inset-0 grain opacity-100"/>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"/>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"/>
          <div className="relative text-white">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4" style={{textWrap:'balance'}}>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
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
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© 2026 ProntuVet. {t.footer_rights}</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
            <span className="font-mono">{lang==='pt'?'Todos os sistemas operacionais':'All systems operational'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Nav, Hero, HowItWorks, Features, DesktopSection, Security, Testimonials, Pricing, FAQ, FinalCTA, Footer });
