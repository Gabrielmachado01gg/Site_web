# Yume Sushi — site de restaurante japonês

[![Verificar site](https://github.com/Gabrielmachado01gg/Site_web/actions/workflows/verificar.yml/badge.svg)](https://github.com/Gabrielmachado01gg/Site_web/actions/workflows/verificar.yml)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

Site institucional de um restaurante japonês fictício, criado no curso técnico de Análise e Desenvolvimento de Sistemas e depois reconstruído com foco em **responsividade, acessibilidade e desempenho**.

**Ver online:** https://gabrielmachado01gg.github.io/Site_web/ (após ativar o GitHub Pages)

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero, introdução à culinária japonesa e favoritos da casa |
| `sobre-nos.html` | História do restaurante em três momentos |
| `cardapio.html` | 10 combos com preço e **filtro por categoria** |
| `fale-conosco.html` | Formulário com validação e informações de contato |
| `404.html` | Página de erro personalizada |

## O que foi feito

- **Design responsivo** com CSS Grid e Flexbox, sem frameworks, do celular ao desktop.
- **Acessibilidade:** HTML semântico, link "pular para o conteúdo", foco visível, `aria-*` nos componentes, textos alternativos descritivos, contraste adequado e respeito a `prefers-reduced-motion`.
- **Desempenho:** imagens convertidas para WebP e redimensionadas (de cerca de 14 MB para menos de 1 MB), `loading="lazy"`, CSS e JavaScript sem dependências.
- **SEO e compartilhamento:** `title`, `description`, URL canônica e Open Graph em todas as páginas.
- **JavaScript puro** para menu mobile, filtro do cardápio, detalhes expansíveis, animação ao rolar e validação do formulário.
- **Organização:** CSS com variáveis (tokens de design), um único arquivo de estilos e pasta `assets/` separada.

## Estrutura

```
├── index.html, sobre-nos.html, cardapio.html, fale-conosco.html, 404.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/          # imagens em WebP e favicon
├── scripts/verificar_site.py   # checa links quebrados e imagens sem alt
└── .github/workflows/verificar.yml
```

## Como executar

Não precisa instalar nada. Abra o `index.html` no navegador ou rode um servidor local:

```bash
git clone https://github.com/Gabrielmachado01gg/Site_web.git
cd Site_web
python -m http.server 8000   # abra http://localhost:8000
python scripts/verificar_site.py
```

## Publicar no GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` → `/ (root)`.

## Observações

- O formulário de contato valida os campos no navegador, mas **não envia a mensagem**, porque o site é estático e de demonstração.
- Endereço, telefone e e-mail são exemplos. As fotos são ilustrativas.

## Autor

Gabriel Wiedenhoft — [LinkedIn](https://www.linkedin.com/in/gabriel-wiedenhoft-8a3256286)
