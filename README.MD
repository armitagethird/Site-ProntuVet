# 🐾 ProntuVet — Inteligência Artificial Veterinária de Elite

> **Transforme a conversa da consulta em prontuário estruturado em segundos.** O copiloto clínico definitivo para médicos-veterinários que buscam excelência e produtividade.

![ProntuVet Banner](assets/prontuvet-icon-preview.png) 

## ✨ Sobre o Projeto

O **ProntuVet Site** é uma landing page de alta performance e design premium, desenvolvida para apresentar uma solução inovadora de IA para o mercado veterinário. O foco principal é a **interatividade**, permitindo que o usuário visualize em tempo real como a IA processa consultas e gera documentos clínicos detalhados.

### 🚀 Destaques Técnicos

- **Interface Ultra-Moderna**: Uso extensivo de *glassmorphism*, gradientes vibrantes e micro-animações.
- **Buildless React Stack**: Implementação pura de React + Babel + Tailwind via CDN, permitindo prototipagem rápida e deploy instantâneo sem necessidade de build complexo.
- **Simulações Interativas**:
  - **Phone Demo**: Experiência mobile fiel ao app, com waveform de áudio real e transcrição dinâmica.
  - **Desktop Demo**: Dashboard escalonável que simula a visão do sistema em um navegador, com estágios de gravação, processamento de dados e resultado Final.
- **Design Adaptativo**: Interface responsiva que se ajusta perfeitamente entre o modo Light e Dark.

## 🛠️ Tecnologias Utilizadas

*   **Core:** [React 18](https://reactjs.org/) (via CDN Standalone)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide Icons](https://lucide.dev/)
*   **Typography:** Google Fonts (Outfit & JetBrains Mono)
*   **Logic:** Hooks customizados (`useInView`, `useInterval`) para animações disparadas por scroll.

## 📂 Estrutura de Arquivos

```text
├── index.html          # Ponto de entrada e configuração do stack
├── site/
│   ├── app.jsx         # Orquestração principal e estados globais
│   ├── sections.jsx    # Componentes das seções da landing page
│   ├── demo-phone.jsx  # Simulador interativo mobile
│   └── demo-desktop.jsx# Simulador interativo desktop (sync v3)
└── assets/             # Recursos visuais e branding
