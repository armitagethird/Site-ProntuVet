// Desktop demo — MESMO app do celular, apenas em container maior (o app é responsive)
// Cicla entre: Dashboard → Recording → Processing → Result
const DemoDesktop = ({ lang = 'pt' }) => {
  const [ref, inView] = window.useInView({ threshold: 0.2 });
  const [stage, setStage] = useState(0); // 0 dashboard, 1 recording, 2 processing, 3 result
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [bars, setBars] = useState(() => Array.from({ length: 40 }, () => 0.1));

  const script = lang === 'pt'
    ? 'Oi doutora, a Luna tá comendo menos e apática desde ontem. Tá bebendo bastante água... vomitou duas vezes hoje de manhã. Nega diarreia. A última vermifugação foi há três meses.'
    : 'Hi doctor, Luna has been eating less and apathetic since yesterday. Drinking a lot of water... vomited twice this morning. No diarrhea. Last deworming was three months ago.';

  useEffect(() => { if (stage === 1) { setSeconds(0); setTranscript(''); } }, [stage]);

  useEffect(() => {
    if (!inView) return;
    const dur = [5000, 11000, 3500, 8000];
    const to = setTimeout(() => setStage(s => (s + 1) % 4), dur[stage]);
    return () => clearTimeout(to);
  }, [stage, inView]);

  window.useInterval(() => setSeconds(s => s + 1), stage === 1 ? 1000 : null, inView);
  window.useInterval(() => {
    setBars(prev => prev.map((_, i) => {
      const env = 0.5 + 0.5 * Math.sin((i / 40) * Math.PI);
      return Math.max(0.08, env * (0.3 + Math.random() * 0.7));
    }));
  }, stage === 1 ? 80 : null, inView);

  useEffect(() => {
    if (stage !== 1 || !inView) return;
    let i = 0;
    const id = setInterval(() => { i++; setTranscript(script.slice(0, i)); if (i >= script.length) clearInterval(id); }, 45);
    return () => clearInterval(id);
  }, [stage, inView, script]);

  const fmt = (n) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

  return (
    <div ref={ref} className="browser-frame bg-white dark:bg-[#0e1a20] w-full">
      {/* Browser chrome */}
      <div className="h-10 bg-slate-100 dark:bg-[#0a1418] flex items-center px-4 gap-2 border-b border-slate-200 dark:border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="mx-auto px-6 py-1 rounded-md bg-white/80 dark:bg-white/5 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <window.Icon name="lock" className="w-3 h-3" />
          prontuvet.app/{stage === 0 ? 'dashboard' : stage === 1 ? 'consultation/new' : stage === 2 ? 'processing' : 'consultation/c7f2'}
        </div>
      </div>

      {/* App canvas — replica o premium-grid + radial glow, centered, sem sidebar */}
      <div className="relative h-[620px] overflow-hidden bg-[#fafcfd] dark:bg-[#0f1a20]">

        {/* Scaling Wrapper: "Recua" a interface para trás enquanto a dock fica na frente.
            Mudamos para 0.75 e justify-start para garantir visibilidade total sem cortes. */}
        <div className={`relative h-full w-full transition-all duration-1000 ease-out origin-top overflow-hidden rounded-[2.5rem] border border-slate-200/50 dark:border-white/5 shadow-inner ${inView ? 'scale-[0.75] translate-y-14' : 'scale-100 translate-y-0'}`}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(rgba(15,118,110,0.08) 1px, transparent 0)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)',
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle 800px at 50% -200px, rgba(20,184,166,0.06), transparent)'
          }} />

          <div className="relative h-full overflow-y-auto scrollbar-hide">
            {stage === 0 && <DesktopDashboard lang={lang} />}
            {stage === 1 && <DesktopRecording lang={lang} seconds={seconds} bars={bars} transcript={transcript} fmt={fmt} />}
            {stage === 2 && <DesktopProcessing lang={lang} />}
            {stage === 3 && <DesktopResult lang={lang} />}
          </div>
        </div>

        {/* Dock nav fixed bottom — mesmo DockNav do app */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <div className="flex items-end gap-3 px-3 py-2.5 bg-white/80 dark:bg-[#16242e]/80 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] ring-1 ring-white/20 dark:ring-white/5 pointer-events-auto transition-transform duration-700 hover:scale-105">
            {[
              { icon: 'home', color: 'text-orange-500', bg: 'bg-orange-500/10', active: stage === 0 },
              { icon: 'dog', color: 'text-blue-500', bg: 'bg-blue-500/10', active: stage === 1 },
              { icon: 'layout', color: 'text-teal-500', bg: 'bg-teal-500/10', active: stage === 2 },
              { icon: 'user', color: 'text-purple-500', bg: 'bg-purple-500/10', active: stage === 3 },
            ].map((it, i) => (
              <div key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${it.active ? `${it.bg} ring-1 ring-slate-200 dark:ring-white/10 shadow-inner ${it.color}` : 'bg-slate-100/50 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-slate-400'
                }`}>
                <window.Icon name={it.icon} className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>

        {/* Interaction blocker — keeps the demo view-only */}
        <div className="absolute inset-0 z-30 cursor-default select-none" aria-hidden="true"/>

        {/* Progress dots */}
        <div className="absolute top-4 right-4 flex gap-1.5 z-20">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === stage ? 'w-6 bg-teal-500' : 'w-1.5 bg-slate-300 dark:bg-white/20'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Dashboard full-size (logo text-5xl md:text-6xl)
const DesktopDashboard = ({ lang }) => (
  <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-start pt-16 px-8 pb-32 animate-[fade-in-up_0.5s_ease-out]">
    <div className="flex items-center justify-center gap-1 mb-6 select-none scale-90">
      <span className="text-5xl font-black tracking-tighter leading-none" style={{
        background: 'linear-gradient(to bottom right, #2dd4bf, #14b8a6, #059669)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text',
        color: 'transparent', WebkitTextFillColor: 'transparent',
      }}>Prontu</span>
      <span className="text-5xl font-black tracking-tighter leading-none text-slate-900 dark:text-slate-100 relative">
        Vet
        <span className="absolute top-[8px] -right-2.5 w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ boxShadow: '0 0 15px rgba(20,184,166,0.6)' }} />
      </span>
    </div>

    <h1 className="text-2xl font-bold tracking-tight text-center mb-1">
      {lang === 'pt' ? 'Pronto para atender?' : 'Ready to see a patient?'}
    </h1>
    <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4 max-w-xl">
      {lang === 'pt' ? <>Olá, <span className="font-medium text-slate-900 dark:text-slate-100">Dra. Carla</span>! Inicie uma nova consulta.</>
        : <>Hi, <span className="font-medium text-slate-900 dark:text-slate-100">Dr. Carla</span>! Start a new visit.</>}
    </p>

    <div className="px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm mb-6">
      Platinum ✦
    </div>

    <div className="w-full max-w-sm flex flex-col gap-3">
      <div className="bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm border border-teal-500/10 rounded-[2rem] p-4 shadow-xl shadow-black/5 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <label className="text-[9px] font-bold text-teal-600/60 uppercase tracking-[0.2em] mb-1.5 block px-1">
          {lang === 'pt' ? 'Modelo de Prontuário' : 'Record Template'}
        </label>
        <div className="flex items-center justify-between w-full bg-white/40 dark:bg-white/[0.02] border border-teal-500/20 rounded-xl h-10 px-3.5 text-xs font-medium shadow-sm">
          <span>{lang === 'pt' ? 'Prontuário Padrão' : 'Default Record'}</span>
          <window.Icon name="chevron_down" className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      <div className="relative overflow-hidden border border-teal-500/20 bg-white/80 dark:bg-white/[0.04] backdrop-blur-sm rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center gap-3">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 pointer-events-none" />
        <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 text-white p-3.5 rounded-2xl shadow-xl shadow-teal-500/20 z-10 mic-glow">
          <window.Icon name="dog" className="w-8 h-8" />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold tracking-tight mb-0.5">
            {lang === 'pt' ? 'Iniciar Escuta' : 'Start Listening'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'pt' ? 'Gerar prontuário com IA' : 'Generate record with AI'}
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Recording full-size
const DesktopRecording = ({ lang, seconds, bars, transcript, fmt }) => (
  <div className="relative max-w-3xl mx-auto flex flex-col items-center justify-start pt-16 px-6 pb-32 animate-[fade-in-up_0.5s_ease-out]">
    <div className="text-center space-y-2 mb-6">
      <h1 className="text-4xl font-black text-foreground tracking-tighter leading-none">
        {lang === 'pt' ? 'Ouvindo Consulta' : 'Listening Visit'}
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium px-8 leading-snug max-w-lg mx-auto">
        {lang === 'pt' ? 'A tecnologia IA está processando sua voz e transformando em um prontuário clínico de alto nível.'
          : 'AI is processing your voice and turning it into a high-level clinical record.'}
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20">
        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
        <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
          {lang === 'pt' ? 'Prontuário Padrão' : 'Default Record'}
        </span>
      </div>
    </div>

    {/* WaveVisualizer — fiel ao app */}
    <div className="w-full h-24 flex flex-col items-center justify-center relative mb-4">
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
      <div className="mt-6 text-3xl font-mono font-black text-foreground tabular-nums tracking-tight">
        {fmt(seconds)}
      </div>
    </div>

    {/* Transcript preview */}
    <div className="w-full max-w-xl rounded-[2.5rem] bg-gradient-to-br from-teal-500/5 to-blue-500/5 border border-teal-500/10 p-5 mb-6">
      <div className="text-[9px] font-bold text-teal-600 uppercase tracking-[0.25em] mb-2">
        {lang === 'pt' ? 'Transcrevendo em tempo real' : 'Transcribing in real time'}
      </div>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium caret min-h-[3em]">
        {transcript || '...'}
      </p>
    </div>

    {/* Controls */}
    <div className="flex items-center gap-4">
      <button className="h-14 w-14 rounded-2xl border border-teal-500/20 bg-white/60 dark:bg-white/5 text-teal-600 dark:text-teal-400 flex items-center justify-center">
        <window.Icon name="pause" className="w-6 h-6 fill-current" />
      </button>
      <button className="h-14 px-8 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-white font-bold flex items-center gap-3 shadow-2xl shadow-teal-500/20 text-sm">
        <window.Icon name="check_circle" className="w-5 h-5" />
        <span>{lang === 'pt' ? 'Finalizar Consulta' : 'Finish Visit'}</span>
      </button>
    </div>
  </div>
);

// Stage 2: Processing (NOVO, igual ao mobile mas adaptado)
const DesktopProcessing = ({ lang }) => (
  <div className="h-full flex flex-col items-center justify-start pt-24 px-8 animate-[fade-in-up_0.4s_ease-out]">
    <div className="relative mb-8" style={{ width: 160, height: 160 }}>
      <div className="w-40 h-40 rounded-full border-4 border-teal-500/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-blue-500 opacity-20 animate-pulse" />
        <svg className="w-20 h-20 animate-spin text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-500" style={{ boxShadow: '0 0 15px rgba(16,185,129,0.7)' }} />
      </div>
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4.5s', animationDirection: 'reverse' }}>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500" style={{ boxShadow: '0 0 12px rgba(59,130,246,0.6)' }} />
      </div>
    </div>
    <p className="text-2xl font-black text-center mb-2" style={{
      background: 'linear-gradient(to right, #0d9488, #2563eb)',
      WebkitBackgroundClip: 'text', backgroundClip: 'text',
      color: 'transparent', WebkitTextFillColor: 'transparent'
    }}>
      {lang === 'pt' ? 'Estruturando dados clínicos...' : 'Structuring clinical data...'}
    </p>
    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
      {lang === 'pt' ? 'Aguarde alguns segundos' : 'Please wait a few seconds'}
    </p>
  </div>
);

// Result full-size — com patient hero + tabs + 4 seções
const DesktopResult = ({ lang }) => {
  const [tab, setTab] = useState('prontuario');
  const sections = lang === 'pt' ? {
    prontuario: [
      { k: 'Identificação', v: 'Luna · Felino · 4 anos · fêmea · SRD · 4.1 kg' },
      { k: 'Anamnese', v: 'Tutora relata hiporexia de 24h, apatia moderada, polidipsia evidente e dois episódios de êmese matinal. Nega diarreia. Última vermifugação há 3 meses. Vacinação em dia.' },
      { k: 'Exame físico', v: 'Mucosas normocoradas, TPC < 2s, desidratação leve (5%). Abdome sensível à palpação em região epigástrica, sem massas palpáveis. FC 180 bpm, FR 32 mpm, T° 39.2°C.' },
      { k: 'Hipótese diagnóstica', v: 'Gastrite aguda com suspeita de doença renal inicial. Necessário excluir IRC por hemograma, bioquímico e urinálise.' },
      { k: 'Conduta', v: 'Maropitant 1mg/kg SID por 3 dias\nOmeprazol 1mg/kg BID por 7 dias\nFluidoterapia SC 40ml/kg\nDieta gastrointestinal úmida por 5 dias\nRetorno em 72h com exames', mono: true },
    ],
  } : {
    prontuario: [
      { k: 'ID', v: 'Luna · Feline · 4 yrs · female · DSH · 4.1 kg' },
      { k: 'History', v: 'Owner reports 24h of hyporexia, moderate apathy, clear polydipsia and two morning emesis episodes. No diarrhea. Last deworming 3 months ago. Vaccines up to date.' },
      { k: 'Physical exam', v: 'Pink mucous membranes, CRT < 2s, mild dehydration (5%). Abdomen tender at epigastric region, no palpable masses. HR 180 bpm, RR 32 bpm, T° 39.2°C.' },
      { k: 'Assessment', v: 'Acute gastritis with suspicion of early kidney disease. CKD must be ruled out via CBC, chemistry and urinalysis.' },
      { k: 'Plan', v: 'Maropitant 1mg/kg SID for 3 days\nOmeprazole 1mg/kg BID for 7 days\nSC fluids 40ml/kg\nWet GI diet for 5 days\nFollow-up in 72h with exam results', mono: true },
    ],
  };

  return (
    <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-start pt-6 px-6 pb-32 animate-[fade-in-up_0.5s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <window.Icon name="stethoscope" className="w-5 h-5 text-teal-600" />
          <h2 className="text-2xl font-black tracking-tighter">
            {lang === 'pt' ? 'Consulta · Luna' : 'Visit · Luna'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 px-3 rounded-xl border border-slate-200 dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <window.Icon name="download" className="w-3.5 h-3.5" /> PDF
          </div>
          <div className="h-9 px-3 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center gap-2 text-xs font-bold shadow-lg shadow-teal-500/30">
            <window.Icon name="check_circle" className="w-3.5 h-3.5" /> {lang === 'pt' ? 'Salvo' : 'Saved'}
          </div>
        </div>
      </div>

      {/* Patient hero card */}
      <div className="rounded-3xl bg-gradient-to-br from-teal-500/10 to-blue-500/5 border border-teal-500/15 p-5 mb-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
          <window.Icon name="dog" className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-xl tracking-tight">Luna</div>
          <div className="text-sm text-slate-500">
            {lang === 'pt' ? 'Felino · 4a · Tutora Mariana Silva · 5ª consulta' : 'Feline · 4y · Owner Mariana Silva · 5th visit'}
          </div>
        </div>
        <div className="text-xs font-bold text-teal-600/80 uppercase tracking-widest">
          {lang === 'pt' ? '18 Abr 2026' : 'Apr 18, 2026'}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 mb-4">
        {[
          { id: 'prontuario', label: lang === 'pt' ? 'Prontuário' : 'Record', icon: 'file_text' },
          { id: 'tutor', label: lang === 'pt' ? 'Resumo Tutor' : 'Owner Summary', icon: 'heart' },
          { id: 'timeline', label: lang === 'pt' ? 'Trilha Clínica' : 'Timeline', icon: 'activity' },
        ].map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold tracking-tight transition-all ${tab === tb.id ? 'bg-white dark:bg-white/10 shadow-sm text-teal-700 dark:text-teal-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}>
            <window.Icon name={tb.icon} className="w-4 h-4" />
            {tb.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'prontuario' && (
        <div className="space-y-3">
          {sections.prontuario.map((s, i) => (
            <div key={i}
              className="rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 p-5 shadow-sm animate-[fade-in-up_0.5s_ease-out] opacity-0"
              style={{ animationDelay: `${0.05 + i * 0.08}s`, animationFillMode: 'forwards' }}>
              <div className="text-[10px] font-bold text-teal-600/80 uppercase tracking-[0.25em] mb-2">{s.k}</div>
              <div className={`${s.mono ? 'font-mono text-[13px]' : 'text-sm'} leading-relaxed text-slate-700 dark:text-slate-300 font-medium whitespace-pre-line`}>{s.v}</div>
            </div>
          ))}
        </div>
      )}
      {tab === 'tutor' && (
        <div className="rounded-3xl bg-gradient-to-br from-teal-500/5 via-blue-500/5 to-emerald-500/5 border border-teal-500/15 p-6 animate-[fade-in-up_0.4s_ease-out]">
          <div className="flex items-center gap-2 mb-4">
            <window.Icon name="heart" className="w-4 h-4 text-teal-600" />
            <div className="text-[10px] font-black uppercase tracking-widest text-teal-700 dark:text-teal-400">
              {lang === 'pt' ? 'Resumo para o tutor · linguagem simples' : 'Owner summary · plain language'}
            </div>
          </div>
          <div className="space-y-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
            {lang === 'pt' ? (<>
              <p>Oi Mariana! Conversei bastante com a Luna hoje 🐾</p>
              <p>Ela está um pouco desidratada e com o estômago inflamado — o que explica os vômitos e a falta de apetite. Nada grave, mas precisamos investigar os rins também.</p>
              <p><b>O que fazer:</b> dar os remédios, ração úmida por 5 dias, bastante água e voltar em 3 dias com os exames.</p>
            </>) : (<>
              <p>Hi Mariana! Had a good look at Luna today 🐾</p>
              <p>She's slightly dehydrated and has an inflamed stomach — which explains the vomiting and the loss of appetite. Not serious, but we need to check her kidneys too.</p>
              <p><b>What to do:</b> give the meds, wet diet for 5 days, plenty of water and come back in 3 days with the test results.</p>
            </>)}
          </div>
        </div>
      )}
      {tab === 'timeline' && (
        <div className="relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-teal-500/40 via-teal-500/10 to-transparent" />
          {(lang === 'pt' ? [
            { date: '18 Abr 2026', tag: 'Consulta', title: 'Hiporexia e êmese', sub: 'Gastrite aguda · Dra. Carla' },
            { date: '12 Jan 2026', tag: 'Vacina', title: 'V4 + Antirrábica', sub: 'Reforço anual' },
            { date: '03 Set 2025', tag: 'Consulta', title: 'Check-up de rotina', sub: 'Sem alterações · Peso 4.1kg' },
            { date: '20 Mar 2025', tag: 'Exame', title: 'Hemograma + Bioquímico', sub: 'Dentro dos parâmetros' },
          ] : [
            { date: 'Apr 18, 2026', tag: 'Visit', title: 'Hyporexia and emesis', sub: 'Acute gastritis · Dr. Carla' },
            { date: 'Jan 12, 2026', tag: 'Vaccine', title: 'DHPPi + Rabies', sub: 'Annual booster' },
            { date: 'Sep 3, 2025', tag: 'Visit', title: 'Routine check-up', sub: 'No changes · Weight 4.1kg' },
            { date: 'Mar 20, 2025', tag: 'Exam', title: 'CBC + Chemistry', sub: 'Within reference ranges' },
          ]).map((e, i) => (
            <div key={i} className="relative mb-3 animate-[fade-in-up_0.4s_ease-out] opacity-0" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'forwards' }}>
              <div className="absolute -left-[18px] top-4 w-3 h-3 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/40 ring-4 ring-white dark:ring-[#0e1a20]" />
              <div className="rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 p-4 flex items-center gap-4">
                <div className="text-[10px] font-mono text-slate-500 shrink-0 w-24">{e.date}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-teal-700 dark:text-teal-400 px-1.5 py-0.5 rounded bg-teal-500/10">{e.tag}</span>
                    <span className="font-bold text-sm">{e.title}</span>
                  </div>
                  <div className="text-xs text-slate-500">{e.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

window.DemoDesktop = DemoDesktop;
