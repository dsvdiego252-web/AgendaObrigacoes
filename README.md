# Agenda de Obrigações

App web (PWA) para controlar as obrigações e prazos da rotina de trabalho, com abas, subabas, status por cor e lembretes no celular.

## Como usar

1. Hospede os arquivos (`index.html`, `manifest.json`, `sw.js`, `icons/`) em um servidor HTTPS (GitHub Pages, Netlify, Vercel etc.). PWAs exigem HTTPS (ou `localhost`) para o service worker e as notificações funcionarem.
2. Abra o link no celular.
3. **Instalar como app:**
   - **Android/Chrome:** toque no menu (⋮) → "Instalar app" ou "Adicionar à tela inicial".
   - **iPhone/Safari:** toque em Compartilhar → "Adicionar à Tela de Início".
4. Abra o app instalado e toque em ⚙️ → "Ativar" para permitir notificações.

## Funcionalidades

- Abas (ex: Rafas) com subabas (ex: AP Faria, JV, Paulo Sergio).
- Cada obrigação tem um dia de vencimento mensal recorrente.
- Cores automáticas:
  - 🟢 Verde: entregue dentro do prazo.
  - 🔴 Vermelho: prazo vencido e ainda não entregue.
  - 🟠 Laranja: entregue, mas após o vencimento.
  - ⚪ Cinza: ainda dentro do prazo, aguardando entrega.
- Botão "＋ Obrigação" para cadastrar novas obrigações em qualquer subaba.
- Botões "＋ aba" / "＋ subaba" para organizar outras rotinas além de Rafas.
- Lembretes locais no celular (dias antes do vencimento, configurável em ⚙️) e aviso diário enquanto uma obrigação estiver atrasada.
- Exportar backup dos dados em JSON pela tela de configurações.

## Sobre as notificações

O app usa a API de Notificações do navegador via Service Worker — não depende de nenhum servidor externo, mas por isso também não recebe push quando fica fechado por muito tempo. Ele verifica os prazos automaticamente sempre que é aberto ou volta ao primeiro plano, e a cada 30 minutos enquanto está aberto. Para lembretes confiáveis, abra o app pelo menos uma vez por dia (isso é suficiente, já que ele reavalia tudo automaticamente). Instalar como app na tela inicial melhora a frequência com que o navegador mantém o Service Worker ativo.

## Dados

Tudo fica salvo localmente no navegador/app (localStorage) do aparelho. Use "Exportar backup" periodicamente se quiser guardar uma cópia.
