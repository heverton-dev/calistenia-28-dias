# 📘 Manual de Implantação e Produção — Calistenia 28D

Este documento detalha o passo a passo completo para arquitetar, desenvolver, testar, gerar os ativos PWA (ícones e splash screens) e colocar a aplicação **Calistenia 28 Dias** em produção na **Vercel** com suporte **100% offline (PWA)**.

---

## 🛠️ 1. Arquitetura do Projeto
- **Framework:** React 18 + TypeScript + Vite
- **Estilização:** Tailwind CSS v4 (com variáveis dinâmicas de temas)
- **Offline / PWA:** `vite-plugin-pwa` (Service Worker com cache estático e de vídeos)
- **Ícones & Splash Screens:** Automação via Node.js + Sharp (`scripts/generate-calisthenics-assets.mjs`)
- **Hospedagem / CI/CD:** Vercel (Produção em `https://calistenia-sigma.vercel.app`)
- **Repositório GitHub:** `https://github.com/heverton-dev/calistenia-28-dias`

---

## 🎨 2. Geração de Ícones e Splash Screens (PWA)

Os ativos visuais do aplicativo (ícones adaptativos e telas de carregamento nativas para iOS e Android) são gerados programaticamente a partir de um SVG vetorial de calistenia (`public/calisthenics-icon.svg`).

### Script de Automação (`scripts/generate-calisthenics-assets.mjs`)
Este script utiliza a biblioteca `sharp` para exportar:
- **Ícones PWA:** `72x72`, `96x96`, `128x128`, `144x144`, `152x152`, `192x192`, `384x384`, `512x512` (mais `icon-512x512-maskable.png` e `apple-touch-icon-180x180.png`).
- **Splash Screens iOS (13 modelos):** Desde iPhones antigos (SE, 6/7/8), modernos (X, 11, 12, 13, 14, 15 Pro Max) até iPads (9.7" a 12.9").

Para regerar os ativos, basta rodar:
```bash
node scripts/generate-calisthenics-assets.mjs
```

---

## 🚀 3. Como Colocar em Produção na Vercel

O projeto está totalmente configurado para deploy automático na Vercel com PWA e HTTPS.

### Passo 1: Instalar Vercel CLI (caso não tenha)
```bash
npm i -g vercel
```

### Passo 2: Fazer Login na Vercel
```bash
vercel login
```
*(Siga as instruções no terminal para autenticar via navegador ou GitHub).*

### Passo 3: Realizar o Deploy de Produção
Na raiz do projeto (`C:\Users\trcnologia\orca\projects\proj--app-calistenia`), execute:
```bash
vercel --prod
```

**Responda às perguntas do assistente:**
1. *Set up and deploy?* → **Y** (Sim)
2. *Which scope?* → Selecione sua conta (ex: `heverton-webs-projects`)
3. *Link to existing project?* → **N** (Não, criar novo projeto)
4. *What's your project's name?* → `calistenia` (ou o nome desejado)
5. *In which directory is your code located?* → `./` (Diretório atual)
6. *Auto-detected settings (Vite):*
   - Build Command: `vite build`
   - Output Directory: `dist`
   *(Aperte **Enter** para aceitar a detecção automática).*

A Vercel fará o build, registrará o Service Worker e gerará o link de produção (ex: `https://calistenia-sigma.vercel.app`).

---

## 📱 4. Como Instalar no Celular (Android e iOS)

### 🤖 No Android (Google Chrome / Edge)
1. Abra o link de produção no navegador do celular.
2. Toque no menu de três pontos (`⋮`) no canto superior direito.
3. Selecione **"Instalar aplicativo"** ou **"Adicionar à tela inicial"**.
4. O app será instalado como um aplicativo nativo, sem barra de endereços, com ícone próprio e funcionamento **100% offline**.

### 🍏 No iOS (Apple Safari)
1. Abra o link de produção no **Safari** (obrigatório para PWA no iOS).
2. Toque no botão de **Compartilhar** (ícone quadrado com seta para cima `⎋` na barra inferior).
3. Role o menu para baixo e selecione **"Adicionar à Tela de Início"**.
4. Confirme o nome **"Calistenia 28D"**.
5. O app aparecerá na sua tela inicial com splash screen animada e funcionará **totalmente offline**.

---

## 🔄 5. Versionamento e Git (GitHub)

Para enviar novas alterações ao repositório público:
```bash
git add .
git commit -m "feat: descrição das melhorias"
git push origin main
```
*(Para atualizar o deploy na Vercel após um `git push`, basta rodar novamente `vercel --prod`).*
