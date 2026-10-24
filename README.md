# Jacy & Cia — Centro de Beleza

V1 do site oficial da Jacy & Cia, em Betim (MG). A Home destaca terapia capilar e direciona todos os agendamentos ao WhatsApp oficial.

## Páginas
- Início, com área especial para terapia capilar, serviços, galeria de trabalhos reais e o ambiente
- 9 páginas individuais: terapia capilar, mechas, progressiva, hidratação, cortes e escovas, manicure e pedicure, massagem, sobrancelhas e pigmentação, estética e bem-estar

## SEO e performance
- HTML estático, sem framework client-side, JavaScript mínimo
- Títulos e descrições exclusivas, meta Open Graph, canonical, sitemap, robots
- JSON-LD de HairSalon, Service e BreadcrumbList
- Fotos reais do salão, convertidas automaticamente a WebP no build de publicação
- Lazy-loading das imagens secundárias, imagem inicial priorizada, navegação e headings sem dependência de JavaScript
- Linguagem focada em Betim e região metropolitana de BH; **não** afirma que a loja está situada em BH

## Publicação
O GitHub Actions em `.github/workflows/deploy.yml` publica a pasta `_site` no GitHub Pages.

1. Em GitHub → **Settings → Pages**, selecione **Build and deployment → Source: GitHub Actions**. A publicação pode precisar dessa ativação inicial.
2. Acompanhe a aba **Actions** para verificar o deploy e a URL pública efetiva.
3. URL projetada para Pages deste repo: `https://oficial-oferta.github.io/jacy-e-cia-site-oficial/` — **validar que funciona antes de divulgar**.
4. Ao usar domínio próprio, atualizar todas as URLs em `index.html`, páginas de serviço, `sitemap.xml`, `robots.txt` e JSON-LD (ou migrar para um gerador com variável `SITE_URL`).
5. Cadastrar URL final no Google Search Console e vincular ao Perfil da Empresa no Google; submeter sitemap e acompanhar indexação.
6. Verificar endereço, horário, lista de profissionais e serviços antes de publicar como site definitivo.

## Rodar localmente
```bash
python -m pip install pillow==11.3.0
python scripts/build.py
cd _site
python -m http.server 8000
```

## Identidade
Preto, dourado e creme. O cabeçalho usa adaptação vetorial/typográfica simplificada do monograma JC enquanto a logo final aprovada é preparada em formatos transparentes. Fotografias reais do acervo, sem edições que alterem resultados.

## Contato
WhatsApp oficial: +55 31 99267-6485. Mensagem predefinida: "Olá, vim do site e gostaria de marcar um horário."

## Pendências para V2
- Confirmar serviços e modalidades atualizados, incluindo massagem e procedimentos estéticos;
- Inserir fotos específicas de terapia capilar, manicure, massagem e estética;
- Adicionar logo final (idealmente SVG e PNG transparente);
- Confirmar horários, endereço e eventual domínio próprio;
- Validar no PageSpeed Insights e Rich Results Test após site publicado;
- Evitar publicar avaliações, preços ou promessas de resultados não fornecidos pela empresa.
