// Main App: assembles everything, handles theme, language, tweaks
const { useState: useS, useEffect: useE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "defaultLang": "pt",
  "defaultDark": false,
  "heroVariant": "split",
  "accentColor": "teal"
}/*EDITMODE-END*/;

const App = () => {
  const [lang, setLang] = useS(() => {
    try { return localStorage.getItem('pv_lang') || TWEAK_DEFAULTS.defaultLang; }
    catch (e) { return TWEAK_DEFAULTS.defaultLang; }
  });
  const [dark, setDark] = useS(() => {
    try { return localStorage.getItem('pv_dark') === '1' || TWEAK_DEFAULTS.defaultDark; }
    catch (e) { return TWEAK_DEFAULTS.defaultDark; }
  });
  const [tweaksOn, setTweaksOn] = useS(false);

  useE(() => {
    document.body.classList.toggle('dark', dark);
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('pv_dark', dark ? '1' : '0'); } catch (e) {}
  }, [dark]);

  useE(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try { localStorage.setItem('pv_lang', lang); } catch (e) {}
  }, [lang]);

  // Scroll reveal
  useE(() => {
    const init = () => {
      const els = document.querySelectorAll('[data-reveal]');
      if (!els.length) { setTimeout(init, 150); return; }
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
      }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
      els.forEach((el) => obs.observe(el));
    };
    init();
  }, []);

  // Tweaks protocol
  useE(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOn(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({type: '__edit_mode_available'}, '*'); } catch (e) {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <div className="relative">
      <Nav lang={lang} setLang={setLang} dark={dark} setDark={setDark} tweaksOn={tweaksOn} setTweaksOn={setTweaksOn}/>
      <main>
        <Hero lang={lang}/>
        <HowItWorks lang={lang}/>
        <Features lang={lang}/>
        <ProntuLink lang={lang}/>
        <DesktopSection lang={lang}/>
        <Security lang={lang}/>
        <Testimonials lang={lang}/>
        <Pricing lang={lang}/>
        <FAQ lang={lang}/>
        <FinalCTA lang={lang}/>
      </main>
      <Footer lang={lang}/>

      <ScrollTimeline lang={lang}/>
      {tweaksOn && <TweaksPanel lang={lang} setLang={setLang} dark={dark} setDark={setDark}/>}
    </div>
  );
};

// --- Scroll Timeline ---
const ScrollTimeline = ({ lang }) => {
  const pt = lang === 'pt';
  const SECS = [
    { id: 'hero',         label: pt ? 'Início'          : 'Home' },
    { id: 'how',          label: pt ? 'Como funciona'   : 'How it works' },
    { id: 'features',     label: pt ? 'Funcionalidades' : 'Features' },
    { id: 'prontulink',   label: 'ProntuLink' },
    { id: 'desktop',      label: 'Dashboard' },
    { id: 'security',     label: pt ? 'Segurança'       : 'Security' },
    { id: 'testimonials', label: pt ? 'Depoimentos'     : 'Testimonials' },
    { id: 'pricing',      label: pt ? 'Planos'          : 'Pricing' },
    { id: 'faq',          label: 'FAQ' },
    { id: 'cta',          label: pt ? 'Comece já'       : 'Get started' },
  ];

  const [active, setActive] = useS(0);
  const [hovered, setHovered] = useS(null);

  useE(() => {
    let els = SECS.map(s => document.getElementById(s.id));
    const track = () => {
      // Re-query any missing elements (after React renders sections)
      els = els.map((el, i) => el || document.getElementById(SECS[i].id));
      const mid = window.scrollY + window.innerHeight * 0.42;
      let idx = 0;
      els.forEach((el, i) => { if (el && el.offsetTop <= mid) idx = i; });
      setActive(idx);
    };
    window.addEventListener('scroll', track, { passive: true });
    setTimeout(track, 400);
    return () => window.removeEventListener('scroll', track);
  }, [lang]);

  const scrollTo = (id) => {
    if (id === 'hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed right-5 xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
      aria-hidden="true">
      {SECS.map((s, i) => (
        <React.Fragment key={s.id}>
          {/* Dot row */}
          <div
            className="relative flex items-center justify-center cursor-pointer"
            style={{ padding: '5px 8px' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => scrollTo(s.id)}
          >
            {/* Floating label — slides in from the right */}
            <div
              className="absolute right-full mr-3 pointer-events-none transition-all duration-200"
              style={{
                opacity: hovered === i ? 1 : 0,
                transform: hovered === i ? 'translateX(0px)' : 'translateX(5px)',
              }}
            >
              <div
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl text-[11px] font-bold"
                style={{
                  background: 'rgba(5,12,22,0.88)',
                  border: `1px solid ${i <= active ? 'rgba(20,184,166,0.3)' : 'rgba(100,116,139,0.18)'}`,
                  backdropFilter: 'blur(14px)',
                  color: i <= active ? '#5eead4' : 'rgba(148,163,184,0.85)',
                  boxShadow: i === active ? '0 0 16px rgba(20,184,166,0.12)' : 'none',
                }}
              >
                {s.label}
              </div>
              {/* Arrow nub */}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2"
                style={{
                  width: 0, height: 0,
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent',
                  borderLeft: `4px solid ${i <= active ? 'rgba(20,184,166,0.3)' : 'rgba(100,116,139,0.18)'}`,
                }}
              />
            </div>

            {/* Dot */}
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === active ? '10px' : '6px',
                height: i === active ? '10px' : '6px',
                background: i === active
                  ? '#14b8a6'
                  : i < active
                    ? 'rgba(20,184,166,0.55)'
                    : 'rgba(100,116,139,0.28)',
                boxShadow: i === active
                  ? '0 0 8px rgba(20,184,166,0.8), 0 0 18px rgba(20,184,166,0.35)'
                  : 'none',
              }}
            />

            {/* Active ping ring */}
            {i === active && (
              <div
                className="absolute rounded-full animate-ping pointer-events-none"
                style={{
                  width: '20px', height: '20px',
                  background: 'rgba(20,184,166,0.12)',
                  animationDuration: '1.8s',
                }}
              />
            )}
          </div>

          {/* Connector line segment */}
          {i < SECS.length - 1 && (
            <div
              className="relative overflow-hidden rounded-full"
              style={{ width: '2px', height: '24px', background: 'rgba(100,116,139,0.1)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 rounded-full transition-all duration-500"
                style={{
                  height: i < active ? '100%' : i === active ? '55%' : '0%',
                  background: 'linear-gradient(to bottom, rgba(20,184,166,0.75), rgba(20,184,166,0.2))',
                }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const TweaksPanel = ({ lang, setLang, dark, setDark }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[60] w-72 rounded-3xl glass shadow-2xl p-5 border border-teal-500/30">
      <div className="flex items-center gap-2 mb-4">
        <window.Icon name="settings" className="w-4 h-4 text-teal-600"/>
        <div className="text-xs font-black uppercase tracking-widest text-teal-700 dark:text-teal-400">Tweaks</div>
      </div>
      <div className="space-y-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Idioma / Language</div>
          <div className="flex gap-1.5">
            {['pt','en'].map(v => (
              <button key={v} onClick={()=>setLang(v)}
                className={`flex-1 h-9 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${lang===v?'bg-teal-500 text-white shadow shadow-teal-500/30':'bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">Tema / Theme</div>
          <div className="flex gap-1.5">
            {[{k:false,l:'Light'},{k:true,l:'Dark'}].map(v => (
              <button key={v.l} onClick={()=>setDark(v.k)}
                className={`flex-1 h-9 rounded-xl text-xs font-bold transition-all ${dark===v.k?'bg-teal-500 text-white shadow shadow-teal-500/30':'bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10'}`}>
                {v.l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
