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
- Cada obrigação pode ser Mensal (dia do mês), Semanal (dia da semana) ou Diária. Mensal tem um campo extra de "competência" ao marcar entrega; semanal e diária não.
- Cores automáticas:
  - 🟢 Verde: entregue dentro do prazo.
  - 🔴 Vermelho: prazo vencido e ainda não entregue.
  - 🟡 Amarelo: vence hoje, ainda não entregue.
  - 🟠 Laranja: entregue, mas após o vencimento.
  - ⚪ Cinza: ainda dentro do prazo (vence em outro dia), aguardando entrega.
- Botão "＋ Obrigação" para cadastrar novas obrigações em qualquer subaba.
- Botões "＋ aba" / "＋ subaba" para organizar outras rotinas além de Rafas.
- Lembretes locais no celular (dias antes do vencimento, configurável em ⚙️) e aviso diário enquanto uma obrigação estiver atrasada.
- Botão "Histórico" em cada obrigação mostra os meses anteriores já entregues (data e se foi no prazo ou com atraso) — os dados de meses passados ficam salvos e nunca são apagados automaticamente.
- Aviso quando uma obrigação tem meses anteriores sem nenhuma entrega registrada (fácil de esquecer, já que o card só mostra o mês atual).
- Sincronização opcional entre aparelhos via Firebase Firestore (⚙️ → "Sincronizar entre aparelhos") usando um código compartilhado entre os dispositivos.
- Exportar backup dos dados em JSON pela tela de configurações.

## Sobre as notificações

O app usa a API de Notificações do navegador via Service Worker — não depende de nenhum servidor externo, mas por isso também não recebe push quando fica fechado por muito tempo. Ele verifica os prazos automaticamente sempre que é aberto ou volta ao primeiro plano, e a cada 30 minutos enquanto está aberto. Para lembretes confiáveis, abra o app pelo menos uma vez por dia (isso é suficiente, já que ele reavalia tudo automaticamente). Instalar como app na tela inicial melhora a frequência com que o navegador mantém o Service Worker ativo.

## Dados

Tudo fica salvo localmente no navegador/app (localStorage) do aparelho. Use "Exportar backup" periodicamente se quiser guardar uma cópia.

## Sincronização entre aparelhos

Cada aparelho gera um "código de sincronização" sozinho (visível em ⚙️). Para juntar os dados de dois aparelhos, cole o código de um deles no campo "Conectar a um código de outro aparelho" do outro — isso substitui os dados locais desse segundo aparelho pelos da nuvem. Depois de conectados, qualquer alteração feita em um aparelho aparece automaticamente no outro (a última gravação sempre vence; não há mesclagem de edições simultâneas feitas offline nos dois ao mesmo tempo). Se o Firebase estiver indisponível (sem internet, projeto mal configurado etc.), o app continua funcionando normalmente só com os dados locais.
