# Desafios recorrentes

## Capturas de tela dos produtos (public/projects)

- Chrome headless (`--headless=new --screenshot`) precisa de `--user-data-dir` próprio,
  senão não grava nada quando o Chrome do usuário está aberto.
- No zsh, `set -- $var` não divide palavras: use uma função `shot nome url`.
- O Chrome headless renderiza com largura mínima de ~500px. Captura em 390px sai
  cortada e parece overflow horizontal. Valide mobile no navegador com viewport real
  (`document.documentElement.scrollWidth === innerWidth`).
- Captura dos sites: 1440x900 em 2x, recortada para 2:1 (2000x1000). O recorte deixa de
  fora banners de cookie e botões flutuantes de chat.

## Prints de sistemas logados (ex.: Dígito CRM)

- O navegador do app captura só ~800px de largura; a janela do Playwright não tem a
  sessão do usuário. Use o Claude in Chrome (Chrome do usuário, já logado) com
  `zoom` em `scale: 1` + `save_to_disk`: sai em pixels nativos (região 1176x588 do
  quadro = 1390x695 px). Corte a barra de rolagem da borda direita.
- Telas com leads, conversas ou execuções mostram dados de pessoas reais: não usar.
  O painel (números agregados) serve; ler o conteúdo de cards de leads é bloqueado.

## Verificação visual

- Com o painel do navegador oculto, animações CSS ficam pausadas e conteúdo com
  `opacity: 0` inicial parece sumido. Por isso o hero não tem animação de entrada.
