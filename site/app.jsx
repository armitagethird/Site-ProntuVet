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
        <DesktopSection lang={lang}/>
        <Security lang={lang}/>
        <Testimonials lang={lang}/>
        <Pricing lang={lang}/>
        <FAQ lang={lang}/>
        <FinalCTA lang={lang}/>
      </main>
      <Footer lang={lang}/>

      {tweaksOn && <TweaksPanel lang={lang} setLang={setLang} dark={dark} setDark={setDark}/>}
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
