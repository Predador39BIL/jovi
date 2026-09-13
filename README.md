# Galeria Inteligente IA — Protótipo Web (Sprint 2)

Protótipo web funcional do app "Galeria Inteligente IA": uma câmera com ajustes automáticos por IA e uma galeria que se organiza, busca e limpa fotos duplicadas sozinha.

Construído **apenas** com HTML, CSS, JavaScript e Tailwind CSS (via CDN), conforme exigido no enunciado da Sprint 2.

## Como abrir

Basta abrir `index.html` em qualquer navegador — não há build nem dependências para instalar.

Para rodar com um servidor local (opcional):
```
python -m http.server 8080
```
e acessar `http://localhost:8080`.

## Estrutura

```
index.html      # marcação e telas do app (dentro do mockup de celular)
css/style.css   # componentes visuais e o frame do celular
js/app.js       # navegação entre telas, dados das fotos e toda a interatividade
```

## Funcionalidades implementadas

- **Câmera com IA**: painel de ajustes (Ajuste Automático, Cena Noturna, Resolução 200MP, Nitidez, Desfoque, Filtros IA), cada um com efeito visual real na pré-visualização.
- **Comparador antes/depois** arrastável para o Modo Noturno.
- **Galeria inteligente**: grade de fotos com badges de resolução, filtro por qualidade (Full HD a 8K) e estatísticas.
- **Busca por IA**: digite um termo (ex.: "fotos na praia", "montanha") e a galeria filtra as fotos relacionadas.
- **Menu de contexto**: Fotos Duplicadas, Filtrar Baixa Qualidade, Organizar Automaticamente, Criar Melhores Momentos.
- **Detecção e remoção de duplicadas**: comparação lado a lado com opção de manter/apagar.
- **Detalhe da foto**: curtir, aprimorar com IA, compartilhar (WhatsApp/Facebook/Instagram) e excluir.
- **Criação de Story**: legenda, envio para "Seu story" ou "Amigos Próximos".
- **Favoritos**: acessível pela navegação inferior, lista as fotos curtidas.

## Equipe

> Preencher nome e RM de todos os integrantes da equipe (usado também na apresentação em PDF).

- Nome — RM
- Nome — RM
- Nome — RM
