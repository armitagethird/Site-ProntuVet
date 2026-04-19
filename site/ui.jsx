// Shared UI primitives: Logo, Button, glass containers
const { useState, useEffect, useRef, useMemo, useCallback } = React;

const Logo = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'text-xl', md: 'text-2xl', lg: 'text-3xl', xl: 'text-5xl md:text-6xl' };
  return (
    <div className={`inline-flex items-center gap-1 select-none ${className}`}>
      <span className={`${sizes[size]} font-black tracking-tighter brand-gradient drop-shadow-sm`}>Prontu</span>
      <span className={`${sizes[size]} font-black tracking-tighter relative text-current`}>
        Vet
        <span className="absolute -right-2.5 top-0.5 w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_12px_rgba(20,184,166,0.7)]" />
      </span>
    </div>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', icon, iconRight, className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-bold tracking-tight rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/20';
  const sizes = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-[15px]',
    lg: 'h-14 px-8 text-base',
  };
  const variants = {
    primary: 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white/70 dark:bg-white/5 backdrop-blur border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-slate-100 hover:border-teal-500/40 hover:bg-white dark:hover:bg-white/10',
    ghost: 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-500/5',
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{iconRight}</span>}
    </button>
  );
};

const Eyebrow = ({ children, className = '' }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[11px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-[0.2em] ${className}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
    {children}
  </div>
);

const Card = ({ children, className = '', interactive = false }) => (
  <div className={`relative rounded-[2rem] bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200/60 dark:border-white/[0.06] shadow-xl shadow-black/[0.02] dark:shadow-black/40 ${interactive ? 'transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-500/30' : ''} ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ eyebrow, title, sub, align = 'center' }) => (
  <div className={`flex flex-col gap-4 mb-8 md:mb-12 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter max-w-3xl" style={{textWrap:'balance'}}>{title}</h2>
    {sub && <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium" style={{textWrap:'pretty'}}>{sub}</p>}
  </div>
);

// Hook: in-view detection
const useInView = (options = { threshold: 0.3 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

// Hook: interval that respects visibility
const useInterval = (cb, delay, active = true) => {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);
  useEffect(() => {
    if (!active || delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay, active]);
};

Object.assign(window, { Logo, Button, Eyebrow, Card, SectionHeader, useInView, useInterval });
