// Phone demo — FIEL ao app real (DashboardClient + AudioRecorder + ConsultationResult + DockNav)
const DemoPhone = ({ lang = 'pt', className = '' }) => {
  const t = window.I18N[lang];
  const [ref, inView] = window.useInView({ threshold: 0.25 });
  const [stage, setStage] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [bars, setBars] = useState(() => Array.from({ length: 40 }, () => 0.1));

  const script = lang === 'pt'
    ? 'Oi doutora, a Luna tá comendo menos e apática desde ontem. Tá bebendo bastante água... vomitou duas vezes hoje de manhã.'
    : 'Hi doctor, Luna has been eating less and apathetic since yesterday. Drinking a lot of water... vomited twice this morning.';

  useEffect(() => { if (stage === 1) { setSeconds(0); setTranscript(''); } }, [stage]);

  useEffect(() => {
    if (!inView) return;
    const dur = [3800, 10000, 3400, 6800];
    const to = setTimeout(() => setStage((s) => (s + 1) % 4), dur[stage]);
    return () => clearTimeout(to);
  }, [stage, inView]);

  window.useInterval(() => setSeconds((s) => s + 1), stage === 1 ? 1000 : null, inView);
  // Frequency-like variation: some bars high, some low (simulating getByteFrequencyData)
  window.useInterval(() => {
    setBars(prev => prev.map((_, i) => {
      // Mimic real audio: louder in mids, quieter at edges
      const env = 0.5 + 0.5 * Math.sin((i / 40) * Math.PI);
      return Math.max(0.08, env * (0.3 + Math.random() * 0.7));
    }));
  }, stage === 1 ? 80 : null, inView);

  useEffect(() => {
    if (stage !== 1 || !inView) return;
    let i = 0;
    const id = setInterval(() => { i++; setTranscript(script.slice(0, i)); if (i >= script.length) clearInterval(id); }, 50);
    return () => clearInterval(id);
  }, [stage, inView, script]);

  const fmt = (n) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="absolute -inset-8 bg-gradient-to-br from-teal-400/20 via-emerald-400/10 to-blue-400/20 rounded-[60px] blur-3xl -z-10" />
      <div className="phone-frame mx-auto" style={{ width: 340, height: 700 }}>
        <div className="phone-screen bg-[#fafcfd] dark:bg-[#12202a] text-slate-900 dark:text-slate-100 flex flex-col relative">
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(rgba(15,118,110,0.1) 1px, transparent 0)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)',
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle 600px at 50% -120px, rgba(20,184,166,0.08), transparent)'
          }} />

          <div className="relative flex items-center justify-between px-7 pt-4 pb-2 text-[11px] font-semibold tabular z-10">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>●●●</span>
              <svg viewBox="0 0 24 12" className="w-6 h-3 fill-current opacity-80"><rect x="0" y="1" width="20" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1" /><rect x="2" y="3" width="14" height="6" rx="1" /><rect x="21" y="4" width="2" height="4" rx="0.5" /></svg>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden">
            {stage === 0 && <PhoneDashboard lang={lang} />}
            {stage === 1 && <PhoneRecording lang={lang} seconds={seconds} bars={bars} transcript={transcript} fmt={fmt} />}
            {stage === 2 && <PhoneProcessing lang={lang} />}
            {stage === 3 && <PhoneResult lang={lang} />}
          </div>

          {/* Dock nav fiel — bg-card/80 backdrop-blur-2xl rounded-2xl border p-2 */}
          <div className="relative flex justify-center pb-3 z-20">
            <div className="flex items-end gap-2.5 px-2.5 py-2 bg-white/80 dark:bg-[#16242e]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] ring-1 ring-white/20 dark:ring-white/5">
              {[
                { icon: 'home', color: 'text-orange-500', bg: 'bg-orange-500/10', active: stage === 0 },
                { icon: 'dog', color: 'text-blue-500', bg: 'bg-blue-500/10', active: false },
                { icon: 'layout', color: 'text-teal-500', bg: 'bg-teal-500/10', active: false },
                { icon: 'user', color: 'text-purple-500', bg: 'bg-purple-500/10', active: false },
              ].map((it, i) => (
                <div key={i} className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${it.active ? `${it.bg} ring-1 ring-slate-200 dark:ring-white/10 shadow-inner ${it.color}` : 'bg-slate-100/50 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-slate-400'
                  }`}>
                  <window.Icon name={it.icon} className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center pb-2.5 z-10">
            <div className="w-32 h-1 rounded-full bg-slate-900/40 dark:bg-white/30" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === stage ? 'w-8 bg-teal-500' : 'w-1.5 bg-slate-300 dark:bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};

// --- Stage 0: Dashboard FIEL — "Prontu" em gradient + "Vet" em foreground ---
const PhoneDashboard = ({ lang }) => (
  <div className="h-full flex flex-col items-center justify-center px-5 pb-6 animate-[fade-in-up_0.5s_ease-out]">
    {/* Logo Signature — RESTAURADO "Prontu" */}
    <div className="flex items-center justify-center gap-[2px] mb-4 select-none">
      <span
        className="text-[42px] font-black tracking-tighter leading-none"
        style={{
          background: 'linear-gradient(to bottom right, #2dd4bf, #14b8a6, #059669)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >Prontu</span>
      <span className="text-[42px] font-black tracking-tighter leading-none text-slate-900 dark:text-slate-100 relative">
        Vet
        <span className="absolute top-[6px] -right-[10px] w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 12px rgba(20,184,166,0.7)' }} />
      </span>
    </div>

    <h1 className="text-lg font-bold tracking-tight text-center mb-1">
      {lang === 'pt' ? 'Pronto para atender?' : 'Ready to see a patient?'}
    </h1>
    <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-3">
      {lang === 'pt' ? <>Olá, <span className="font-medium text-slate-900 dark:text-slate-100">Dra. Carla</span>! Inicie uma nova consulta.</>
        : <>Hi, <span className="font-medium text-slate-900 dark:text-slate-100">Dr. Carla</span>! Start a new visit.</>}
    </p>

    <div className="px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mb-5">
      Platinum ✦
    </div>

    <div className="w-full max-w-[280px] flex flex-col gap-3">
      <div className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm border border-teal-500/10 rounded-[2rem] p-4 shadow-xl shadow-black/5 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <label className="text-[8px] font-bold text-teal-600/60 uppercase tracking-[0.2em] mb-1.5 block px-1">
          {lang === 'pt' ? 'Modelo de Prontuário' : 'Record Template'}
        </label>
        <div className="flex items-center justify-between w-full bg-white/40 dark:bg-white/[0.02] border border-teal-500/20 rounded-xl h-10 px-3 text-xs font-medium shadow-sm">
          <span>{lang === 'pt' ? 'Prontuário Padrão' : 'Default Record'}</span>
          <window.Icon name="chevron_down" className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      <div className="relative overflow-hidden border border-teal-500/20 bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center gap-3">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 pointer-events-none" />
        <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 text-white p-3.5 rounded-2xl shadow-xl shadow-teal-500/20 z-10 mic-glow">
          <window.Icon name="dog" className="w-7 h-7" />
        </div>
        <div className="relative z-10">
          <h2 className="text-lg font-bold tracking-tight mb-0.5">
            {lang === 'pt' ? 'Iniciar Escuta' : 'Start Listening'}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {lang === 'pt' ? 'Gerar prontuário com IA' : 'Generate record with AI'}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Stage 1: Recording FIEL — WaveVisualizer replicado ---
const PhoneRecording = ({ lang, seconds, bars, transcript, fmt }) => (
  <div className="h-full flex flex-col items-center px-5 pt-3 pb-2 overflow-hidden">
    <div className="text-center space-y-2 mb-3 animate-[fade-in-up_0.4s_ease-out]">
      <h1 className="text-[28px] font-black text-foreground tracking-tighter leading-none">
        {lang === 'pt' ? 'Ouvindo Consulta' : 'Listening Visit'}
      </h1>
      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium px-4 leading-snug">
        {lang === 'pt' ? 'A tecnologia IA está processando sua voz e transformando em um prontuário clínico.'
          : 'AI is processing your voice and turning it into a clinical record.'}
      </p>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
        <span className="text-[9px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
          {lang === 'pt' ? 'Prontuário Padrão' : 'Default Record'}
        </span>
      </div>
    </div>

    {/* WaveVisualizer — fiel ao app */}
    <div className="w-full h-24 flex flex-col items-center justify-center relative mb-1">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent rounded-3xl -z-10" />
      <div className="flex items-center justify-center h-20 w-full px-8" style={{ gap: '3px' }}>
        {bars.map((v, i) => (
          <div key={i}
            style={{
              width: '3px',
              minWidth: '3px',
              height: `${Math.max(6, v * 64)}px`,
              opacity: Math.max(0.3, v),
              borderRadius: '9999px',
              background: 'linear-gradient(to top, #14b8a6, #60a5fa)',
              transition: 'height 75ms ease-out, opacity 75ms ease-out',
            }} />
        ))}
      </div>
      {/* Timer com largura fixa para não tremer */}
      <div className="mt-3 text-2xl font-mono font-black text-foreground tracking-tight"
        style={{ fontVariantNumeric: 'tabular-nums', width: '5.5ch', textAlign: 'center' }}>
        {fmt(seconds)}
      </div>
    </div>

    <div className="w-full flex-1 rounded-2xl bg-gradient-to-br from-teal-500/5 to-blue-500/5 border border-teal-500/10 p-3 overflow-hidden mb-3 mt-2">
      <div className="text-[8px] font-bold text-teal-600 uppercase tracking-[0.2em] mb-1.5">
        {lang === 'pt' ? 'Transcrevendo…' : 'Transcribing…'}
      </div>
      <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium caret">
        {transcript || '...'}
      </p>
    </div>

    <div className="flex items-center gap-3 mb-2">
      <button className="h-12 w-12 rounded-2xl border border-teal-500/20 bg-white/60 dark:bg-white/5 hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
        <window.Icon name="pause" className="w-5 h-5 fill-current" />
      </button>
      <button className="h-12 px-6 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-white font-bold flex items-center gap-2 shadow-2xl shadow-teal-500/20 text-xs">
        <window.Icon name="check_circle" className="w-4 h-4" />
        {lang === 'pt' ? 'Finalizar Consulta' : 'Finish Visit'}
      </button>
    </div>
    <div className="flex items-center gap-1 text-slate-500 text-[10px] font-bold opacity-60">
      <window.Icon name="chevron_right" className="w-3 h-3 rotate-180" />
      {lang === 'pt' ? 'Cancelar e Voltar' : 'Cancel and Go Back'}
    </div>
  </div>
);

// --- Stage 2: Processing FIEL (com orbitadores) ---
const PhoneProcessing = ({ lang }) => (
  <div className="h-full flex flex-col items-center justify-center px-8 animate-[fade-in-up_0.4s_ease-out]">
    <div className="relative mb-6" style={{ width: 128, height: 128 }}>
      <div className="w-32 h-32 rounded-full border-4 border-teal-500/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-blue-500 opacity-20 animate-pulse" />
        <svg className="w-16 h-16 animate-spin text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
        </svg>
      </div>
      {/* Orbit 1 */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 12px rgba(16,185,129,0.7)' }} />
      </div>
      {/* Orbit 2 */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4.5s', animationDirection: 'reverse' }}>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500" style={{ boxShadow: '0 0 10px rgba(59,130,246,0.6)' }} />
      </div>
    </div>
    <p className="text-xl font-bold text-center mb-1" style={{
      background: 'linear-gradient(to right, #0d9488, #2563eb)',
      WebkitBackgroundClip: 'text', backgroundClip: 'text',
      color: 'transparent', WebkitTextFillColor: 'transparent'
    }}>
      {lang === 'pt' ? 'Estruturando dados clínicos...' : 'Structuring clinical data...'}
    </p>
    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-widest">
      {lang === 'pt' ? 'Aguarde alguns segundos' : 'Please wait a few seconds'}
    </p>
  </div>
);

// --- Stage 3: Result FIEL ao ConsultationResult ---
const PhoneResult = ({ lang }) => {
  const sections = lang === 'pt' ? [
    { k: 'Identificação', v: 'Luna · Felino · 4 anos · fêmea · SRD' },
    { k: 'Anamnese', v: 'Tutora relata hiporexia há 24h, apatia moderada, polidipsia e dois episódios de êmese matinal. Nega diarreia.' },
    { k: 'Exame físico', v: 'Mucosas normocoradas, TPC < 2s, desidratação leve. Abdome sensível. FC 180, FR 32, T° 39.2°C.' },
    { k: 'Hipótese diagnóstica', v: 'Gastrite aguda vs. doença renal inicial. Sugerido hemograma + bioquímico + urinálise.' },
  ] : [
    { k: 'ID', v: 'Luna · Feline · 4 yrs · female · DSH' },
    { k: 'HISTORY', v: 'Owner reports 24h hyporexia, moderate apathy, polydipsia and two morning emesis episodes. Denies diarrhea.' },
    { k: 'PHYSICAL EXAM', v: 'Pink mucous membranes, CRT < 2s, mild dehydration (5%). Abdomen tender. HR 180, RR 32, T° 39.2°C.' },
    { k: 'ASSESSMENT', v: 'Acute gastritis vs. early kidney disease. Recommend CBC + chem + urinalysis.' },
  ];

  return (
    <div className="h-full flex flex-col px-3.5 pt-2 pb-2 animate-[fade-in-up_0.5s_ease-out]">
      {/* Pet Header Card */}
      <div className="rounded-2xl bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-transparent border border-teal-500/15 p-2.5 mb-2 flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30 ring-2 ring-white/60 dark:ring-white/10">
          <window.Icon name="dog" className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-[14px] tracking-tight truncate leading-tight">Luna</div>
          <div className="text-[9px] text-slate-500 truncate mt-0.5">
            {lang === 'pt' ? 'Felino · SRD · Mariana S.' : 'Feline · DSH · Mariana S.'}
          </div>
        </div>
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full bg-emerald-500/10">
          <window.Icon name="check_circle" className="w-2.5 h-2.5" />
          <span className="text-[8px] font-bold uppercase tracking-wider">
            {lang === 'pt' ? 'Salvo' : 'Saved'}
          </span>
        </div>
      </div>

      {/* Visão Atual + Mudar Visualização (fiel ao ConsultationResult real) */}
      <div className="flex items-end justify-between gap-2 mb-2 px-0.5">
        <div className="flex flex-col min-w-0">
          <span className="text-[7px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-0.5">
            {lang === 'pt' ? 'Visão Atual' : 'Current View'}
          </span>
          <h2 className="text-[13px] font-black flex items-center gap-1 text-teal-600 tracking-tight">
            <window.Icon name="file_text" className="w-3.5 h-3.5" />
            {lang === 'pt' ? 'Prontuário' : 'Record'}
          </h2>
        </div>
        <button className="shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 h-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md shadow-teal-500/20 animate-[pulse-soft_2.5s_ease-in-out_infinite]">
          <window.Icon name="settings" className="w-2.5 h-2.5" />
          <span className="text-[8px] font-bold tracking-tight whitespace-nowrap">
            {lang === 'pt' ? 'Mudar visão' : 'Change view'}
          </span>
        </button>
      </div>

      {/* Prontuário sections — cards com accent bar esquerda (como no real) */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1.5 pb-1">
        {sections.map((s, i) => (
          <div key={i}
            className="group relative rounded-2xl bg-white/90 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 p-2.5 pl-3 shadow-sm animate-[fade-in-up_0.5s_ease-out] opacity-0"
            style={{ animationDelay: `${0.15 + i * 0.1}s`, animationFillMode: 'forwards' }}>
            <div className="absolute top-2 bottom-2 left-0 w-[2px] bg-teal-500 rounded-r"></div>
            <div className="text-[8px] font-black text-teal-600 dark:text-teal-500 uppercase tracking-[0.2em] mb-1">{s.k}</div>
            <div className="text-[10px] leading-snug text-slate-700 dark:text-slate-300 font-medium">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.DemoPhone = DemoPhone;
window.PhoneDashboard = PhoneDashboard;
window.PhoneRecording = PhoneRecording;
window.PhoneProcessing = PhoneProcessing;
window.PhoneResult = PhoneResult;
