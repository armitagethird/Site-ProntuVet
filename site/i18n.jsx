// i18n dictionary for PT-BR and EN
const I18N = {
  pt: {
    // Nav
    nav_features: 'Funcionalidades',
    nav_how: 'Como funciona',
    nav_security: 'Segurança',
    nav_pricing: 'Planos',
    nav_faq: 'FAQ',
    cta_start: 'Começar grátis',
    cta_login: 'Entrar',

    // Hero
    hero_badge: 'Copiloto clínico com IA',
    hero_title_a: 'A consulta termina.',
    hero_title_b: 'O prontuário já está pronto.',
    hero_sub: 'ProntuVet escuta sua conversa com o tutor e devolve um prontuário clínico estruturado — anamnese, exame físico, diagnóstico e prescrição — em segundos. Funciona ao lado do sistema que você já usa.',
    hero_cta_primary: 'Começar grátis',
    hero_cta_secondary: 'Ver como funciona',
    hero_trust: 'Sem cartão de crédito · 20 consultas grátis por mês',

    // Live demo labels
    demo_live: 'Demo ao vivo',
    demo_template: 'Prontuário Padrão',
    demo_recording: 'Gravando consulta',
    demo_transcribing: 'Transcrevendo…',
    demo_structuring: 'Estruturando com IA',
    demo_done: 'Prontuário pronto',

    // How it works
    how_eyebrow: 'Do áudio ao prontuário em 3 passos',
    how_title: 'Três passos. Trinta segundos.',
    how_sub: 'Você continua fazendo o que sempre fez — conversar com o tutor. O ProntuVet faz o resto em background.',
    how_step1_t: 'Você grava',
    how_step1_d: 'Toque em "Iniciar Escuta" no início da consulta. O áudio é capturado diretamente pelo navegador.',
    how_step2_t: 'A IA estrutura',
    how_step2_d: 'O ProntuVet transcreve e organiza tudo nos campos clínicos corretos — do histórico ao plano terapêutico.',
    how_step3_t: 'Você revisa e assina',
    how_step3_d: 'Em segundos, revise, ajuste o que precisar, gere o PDF e entregue ao tutor.',

    // Features
    feat_eyebrow: 'Funcionalidades',
    feat_title: 'Feito para a rotina de quem vê 20 pets por dia.',
    feat_sub: 'Cada detalhe desenhado para eliminar fricção. Nada de digitar em tempo real, nada de memória furada no fim do dia.',

    feat_listen_t: 'Escuta em tempo real',
    feat_listen_d: 'Visualizador de onda sonora, pausa e retomada. Até 30 minutos por consulta.',

    feat_struct_t: 'Estruturação automática',
    feat_struct_d: 'Anamnese, exame físico, diagnóstico, conduta. Cada campo no seu lugar, sem re-digitação.',

    feat_templates_t: 'Templates personalizáveis',
    feat_templates_d: 'Use nossos modelos ou crie o seu. Fica salvo na sua conta, sempre disponível.',

    feat_tutor_t: 'Resumo para o tutor',
    feat_tutor_d: 'Uma versão em linguagem simples, gerada automaticamente, pronta para entregar.',

    feat_timeline_t: 'Timeline clínica',
    feat_timeline_d: 'Biografia médica completa do paciente em ordem cronológica. Nunca mais perca contexto.',

    feat_attach_t: 'Anexos seguros',
    feat_attach_d: 'Exames, raios-X, laudos. Upload com URLs assinadas que expiram em 1h.',

    // Desktop section
    desktop_eyebrow: 'No consultório ou na clínica',
    desktop_title: 'Funciona no celular, brilha no desktop.',
    desktop_sub: 'Depois da consulta, revise o prontuário, navegue pela timeline do paciente e gere o PDF — tudo em uma interface pensada para veterinários.',

    // Security
    sec_eyebrow: 'Segurança clínica de verdade',
    sec_title: 'Seus dados de paciente nunca vazam.',
    sec_sub: 'Auditado. Ponta a ponta. Nenhum veterinário enxerga os dados de outro. Nenhum arquivo fica público.',
    sec_rls_t: 'RLS em 100% das tabelas',
    sec_rls_d: 'Row Level Security no PostgreSQL. Cada query é filtrada pelo seu user ID no banco.',
    sec_signed_t: 'Signed URLs de 1h',
    sec_signed_d: 'Áudios e anexos ficam em buckets privados. Links assinados expiram em 60 min.',
    sec_lgpd_t: 'LGPD-ready',
    sec_lgpd_d: 'Dados em servidores brasileiros, políticas claras, direito ao esquecimento respeitado.',
    sec_code_t: 'Type-safe ponta a ponta',
    sec_code_d: 'TypeScript estrito, validação de inputs, AbortController em todas as requisições.',

    // Testimonials
    test_eyebrow: 'Quem já usa',
    test_title: 'Veterinários que recuperaram a noite.',
    test_sub: 'Coloque aqui o que seus colegas estão dizendo — enviarei os depoimentos reais em breve.',

    test_1_quote: 'Antes eu voltava para casa com 8 prontuários na cabeça. Agora eu volto com 8 prontuários assinados.',
    test_1_name: 'Dra. Camila Ferreira',
    test_1_role: 'Clínica Geral · São Paulo',

    test_2_quote: 'Os tutores adoram receber o resumo em linguagem simples. Virou diferencial da minha clínica.',
    test_2_name: 'Dr. Rafael Mendes',
    test_2_role: 'Especialista em felinos · BH',

    test_3_quote: 'A estruturação é absurdamente boa. Eu só revise. Em 30 segundos está pronto.',
    test_3_name: 'Dra. Juliana Rocha',
    test_3_role: 'Hospital Veterinário · Curitiba',

    // Pricing
    price_eyebrow: 'Planos simples',
    price_title: 'Comece grátis. Escale quando crescer.',
    price_sub: 'Para a maioria dos veterinários, o Platinum é o ponto certo. Sem fidelidade, sem pegadinha.',
    price_note: 'Todos os planos incluem acesso web e mobile · Cancele a qualquer momento',

    price_free_name: 'Gratuito',
    price_free_desc: 'Para experimentar e conhecer.',
    price_free_price: 'R$ 0',
    price_free_period: 'para sempre',
    price_free_cta: 'Começar grátis',
    price_free_feats: [
      '20 consultas por mês',
      '15 consultas por dia',
      'Prontuário Padrão',
      '1 template próprio',
      'Resumo para o tutor',
    ],

    price_ess_name: 'Essential',
    price_ess_desc: 'Para quem usa no dia a dia.',
    price_ess_price: 'R$ 34,90',
    price_ess_period: '/ mês',
    price_ess_cta: 'Assinar Essential',
    price_ess_feats: [
      '80 consultas por mês',
      '20 consultas por dia',
      'Templates ilimitados',
      'Timeline clínica',
      'Resumo para o tutor',
      'Anexos até 25 MB',
    ],

    price_plat_name: 'Platinum',
    price_plat_badge: 'Mais popular',
    price_plat_proof: '8 em 10 veterinários escolhem',
    price_plat_desc: 'Para quem quer o melhor do ProntuVet.',
    price_plat_price: 'R$ 69,90',
    price_plat_period: '/ mês',
    price_plat_cta: 'Assinar Platinum',
    price_plat_feats: [
      '200 consultas por mês',
      '20 consultas por dia',
      'Templates ilimitados',
      'Timeline clínica completa',
      'ProntuLink — link do prontuário para tutor ou parceiro',
      'Anexos PDF e imagens até 200 MB',
      'Suporte prioritário',
    ],

    price_clinic_name: 'Clínica',
    price_clinic_desc: 'Para clínicas com múltiplos veterinários.',
    price_clinic_price: 'R$ 149,90',
    price_clinic_period: '/ mês',
    price_clinic_cta: 'Falar com a equipe',
    price_clinic_feats: [
      'Consultas ilimitadas',
      'Veterinários ilimitados',
      'Tudo do Platinum',
      'ProntuLink avançado',
      'Gestão de equipe',
      'Suporte via WhatsApp direto',
    ],

    // FAQ
    faq_eyebrow: 'Perguntas frequentes',
    faq_title: 'Respostas diretas.',
    faq_items: [
      {
        q: 'O ProntuVet substitui meu prontuário em papel?',
        a: 'Sim. O prontuário gerado é completo, estruturado, editável e pode ser exportado em PDF a qualquer momento. Fica armazenado na sua conta com acesso cronológico.'
      },
      {
        q: 'Funciona offline?',
        a: 'A gravação inicia no navegador mas o processamento com IA exige conexão. Recomendamos Wi-Fi ou 4G/5G estável durante o envio.'
      },
      {
        q: 'Meus áudios ficam armazenados?',
        a: 'O áudio é enviado para processamento, transcrito e descartado após a estruturação. Apenas o prontuário textual é mantido — e sempre em storage privado com URLs assinadas.'
      },
      {
        q: 'Posso editar o prontuário depois?',
        a: 'Claro. Todos os campos são editáveis. A IA faz o trabalho pesado; você mantém o controle clínico total.'
      },
      {
        q: 'Qual IA é usada?',
        a: 'Calma, isso é nosso segredo.'
      },
      {
        q: 'Como cancelo?',
        a: 'Dentro do app, em "Assinatura". Um clique, sem fidelidade. Seus dados continuam acessíveis no plano gratuito.'
      },
      {
        q: 'O ProntuVet substitui meu sistema de gestão atual?',
        a: 'Não precisa substituir nada. O ProntuVet é um copiloto clínico — faz o que nenhum sistema tradicional faz: transforma a consulta falada em prontuário estruturado em segundos. Use ao lado do que você já usa.',
      },
    ],

    // Final CTA
    cta_title: 'Seu próximo paciente merece sua atenção inteira.',
    cta_sub: 'Deixa o prontuário com a gente.',
    cta_btn: 'Começar grátis agora',
    cta_foot: 'Grátis até 20 consultas/mês · Sem cartão de crédito',

    // Footer
    footer_tag: 'Copiloto clínico com IA.',
    footer_prod: 'Produto',
    footer_company: 'Empresa',
    footer_legal: 'Legal',
    footer_rights: 'Todos os direitos reservados.',

    // Common
    minutes: 'min',
  },

  en: {
    nav_features: 'Features',
    nav_how: 'How it works',
    nav_security: 'Security',
    nav_pricing: 'Pricing',
    nav_faq: 'FAQ',
    cta_start: 'Start free',
    cta_login: 'Log in',

    hero_badge: 'AI clinical copilot',
    hero_title_a: 'The visit ends.',
    hero_title_b: 'The medical record is already done.',
    hero_sub: 'ProntuVet listens to your conversation with the pet owner and returns a structured clinical record — history, physical exam, diagnosis and prescription — in seconds. Works alongside your existing system.',
    hero_cta_primary: 'Start free',
    hero_cta_secondary: 'See how it works',
    hero_trust: 'No credit card · 20 free visits per month',

    demo_live: 'Live demo',
    demo_template: 'Default record',
    demo_recording: 'Recording visit',
    demo_transcribing: 'Transcribing…',
    demo_structuring: 'Structuring with AI',
    demo_done: 'Record ready',

    how_eyebrow: 'From audio to record in 3 steps',
    how_title: 'Three steps. Thirty seconds.',
    how_sub: 'You keep doing what you always did — talking to the owner. ProntuVet handles the rest in the background.',
    how_step1_t: 'You record',
    how_step1_d: 'Tap "Start listening" at the beginning of the visit. Audio is captured right in the browser.',
    how_step2_t: 'AI structures',
    how_step2_d: 'Gemini transcribes and organizes everything into the correct clinical fields — from history to treatment plan.',
    how_step3_t: 'You review and sign',
    how_step3_d: 'In seconds, review, adjust what you need, generate the PDF and hand it to the owner.',

    feat_eyebrow: 'Features',
    feat_title: 'Built for vets who see 20 pets a day.',
    feat_sub: 'Every detail designed to remove friction. No typing during visits, no memory gaps at the end of the day.',

    feat_listen_t: 'Real-time listening',
    feat_listen_d: 'Audio wave visualizer, pause and resume. Up to 30 minutes per visit.',

    feat_struct_t: 'Auto structuring',
    feat_struct_d: 'History, physical exam, diagnosis, treatment. Every field in its place, no re-typing.',

    feat_templates_t: 'Custom templates',
    feat_templates_d: 'Use our models or create yours. Saved to your account, always available.',

    feat_tutor_t: 'Owner summary',
    feat_tutor_d: 'A plain-language version, auto-generated, ready to hand over.',

    feat_timeline_t: 'Clinical timeline',
    feat_timeline_d: 'Full medical biography of the patient, in chronological order. Never lose context.',

    feat_attach_t: 'Secure attachments',
    feat_attach_d: 'Exams, x-rays, reports. Upload with signed URLs that expire in 1h.',

    desktop_eyebrow: 'At the office or at the clinic',
    desktop_title: 'Works on mobile, shines on desktop.',
    desktop_sub: 'After the visit, review the record, navigate the patient timeline and generate the PDF — all in an interface built for veterinarians.',

    sec_eyebrow: 'Real clinical security',
    sec_title: 'Your patient data never leaks.',
    sec_sub: 'Audited. End to end. No vet ever sees another vet\'s data. No file ever goes public.',
    sec_rls_t: 'RLS on 100% of tables',
    sec_rls_d: 'Row Level Security in PostgreSQL. Every query is filtered by your user ID in the database.',
    sec_signed_t: '1h signed URLs',
    sec_signed_d: 'Audio and attachments live in private buckets. Signed links expire in 60 min.',
    sec_lgpd_t: 'LGPD-ready',
    sec_lgpd_d: 'Data on Brazilian servers, clear policies, right to be forgotten respected.',
    sec_code_t: 'Type-safe end to end',
    sec_code_d: 'Strict TypeScript, input validation, AbortController on every request.',

    test_eyebrow: 'Early users',
    test_title: 'Vets who got their evenings back.',
    test_sub: 'Real testimonials coming soon — placeholders for now.',

    test_1_quote: 'I used to go home with 8 records in my head. Now I go home with 8 records already signed.',
    test_1_name: 'Dr. Camila Ferreira',
    test_1_role: 'General practice · São Paulo',

    test_2_quote: 'Owners love getting the plain-language summary. It became a selling point for my clinic.',
    test_2_name: 'Dr. Rafael Mendes',
    test_2_role: 'Feline specialist · BH',

    test_3_quote: 'The structuring is absurdly good. I just review. In 30 seconds it\'s done.',
    test_3_name: 'Dr. Juliana Rocha',
    test_3_role: 'Veterinary Hospital · Curitiba',

    price_eyebrow: 'Simple plans',
    price_title: 'Start free. Scale when you grow.',
    price_sub: 'Most vets find Platinum hits the sweet spot. No lock-in, no tricks.',
    price_note: 'All plans include web and mobile access · Cancel anytime',

    price_free_name: 'Free',
    price_free_desc: 'To try and explore.',
    price_free_price: '$0',
    price_free_period: 'forever',
    price_free_cta: 'Start free',
    price_free_feats: [
      '20 visits per month',
      '15 visits per day',
      'Default record template',
      '1 custom template',
      'Owner summary',
    ],

    price_ess_name: 'Essential',
    price_ess_desc: 'For daily use.',
    price_ess_price: '$9',
    price_ess_period: '/ month',
    price_ess_cta: 'Subscribe to Essential',
    price_ess_feats: [
      '80 visits per month',
      '20 visits per day',
      'Unlimited templates',
      'Clinical timeline',
      'Owner summary',
      'Attachments up to 25 MB',
    ],

    price_plat_name: 'Platinum',
    price_plat_badge: 'Most popular',
    price_plat_proof: '8 out of 10 vets choose this',
    price_plat_desc: 'For those who want the best of ProntuVet.',
    price_plat_price: '$19',
    price_plat_period: '/ month',
    price_plat_cta: 'Subscribe to Platinum',
    price_plat_feats: [
      '200 visits per month',
      '20 visits per day',
      'Unlimited templates',
      'Full clinical timeline',
      'ProntuLink — shareable record link',
      'PDF & image attachments up to 200 MB',
      'Priority support',
    ],

    price_clinic_name: 'Clinic',
    price_clinic_desc: 'For clinics with multiple vets.',
    price_clinic_price: '$39',
    price_clinic_period: '/ month',
    price_clinic_cta: 'Talk to our team',
    price_clinic_feats: [
      'Unlimited visits',
      'Unlimited vets',
      'Everything in Platinum',
      'Advanced ProntuLink',
      'Team management',
      'Direct WhatsApp support',
    ],

    faq_eyebrow: 'Frequently asked',
    faq_title: 'Straight answers.',
    faq_items: [
      { q: 'Does ProntuVet replace paper records?', a: 'Yes. The generated record is complete, structured, editable and can be exported to PDF any time. Stored in your account with chronological access.' },
      { q: 'Does it work offline?', a: 'Recording starts in the browser but AI processing requires connection. We recommend stable Wi-Fi or 4G/5G during upload.' },
      { q: 'Is my audio stored?', a: 'Audio is sent for processing, transcribed and discarded after structuring. Only the textual record is kept — always in private storage with signed URLs.' },
      { q: 'Can I edit the record later?', a: 'Of course. Every field is editable. The AI does the heavy lifting; you stay in full clinical control.' },
      { q: 'Which AI is used?', a: 'Google Gemini 2.5 Flash-Lite, with prompts optimized for veterinary medicine. No data is used to train models.' },
      { q: 'How do I cancel?', a: 'Inside the app, under "Subscription". One click, no lock-in. Your data stays accessible on the free plan.' },
      { q: 'Does ProntuVet replace my current practice management system?', a: 'Nothing needs to be replaced. ProntuVet is a clinical copilot — it does what no traditional system does: turns the spoken visit into a structured record in seconds. Use it alongside whatever you already have.' },
    ],

    cta_title: 'Your next patient deserves your full attention.',
    cta_sub: 'Leave the record to us.',
    cta_btn: 'Start free now',
    cta_foot: 'Free up to 20 visits/month · No credit card',

    footer_tag: 'AI clinical copilot.',
    footer_prod: 'Product',
    footer_company: 'Company',
    footer_legal: 'Legal',
    footer_rights: 'All rights reserved.',

    minutes: 'min',
  }
};

window.I18N = I18N;
