# Formulário de Pedido - Etiquetas & Tal

Um formulário web completo e responsivo para pedidos de etiquetas personalizadas, desenvolvido com HTML, CSS e JavaScript puro. Perfeito para deploy no GitHub Pages!

## Características

✨ **Funcionalidades principais:**

- Gerenciamento de produtos (adicionar, editar, remover)
- Suporte para até 3 crianças por pedido
- Seleção de temas (catálogo ou nova arte personalizada)
- Upload de imagens de referência
- Múltiplas opções de entrega
- Cálculo automático de total
- Integração com WhatsApp para envio de pedidos
- Design responsivo e moderno
- Sem dependências externas (apenas Tailwind CSS via CDN)

## Estrutura do Projeto

```
formulario-etiquetas/
├── index.html          # Arquivo HTML principal
├── css/
│   └── styles.css      # Estilos customizados
├── js/
│   └── app.js          # Lógica da aplicação
└── README.md           # Este arquivo
```

## Como Usar Localmente

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` em um navegador web
3. O formulário estará pronto para usar!

## Deploy no GitHub Pages

### Passo 1: Criar um repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nomeie como `formulario-etiquetas` (ou outro nome de sua preferência)
4. Deixe como "Public"
5. Clique em "Create repository"

### Passo 2: Fazer upload dos arquivos

#### Opção A: Usando Git (recomendado)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/formulario-etiquetas.git
cd formulario-etiquetas

# Copie todos os arquivos do projeto para esta pasta

# Faça commit e push
git add .
git commit -m "Adicionar formulário de etiquetas"
git push origin main
```

#### Opção B: Usando a interface do GitHub

1. Acesse seu repositório
2. Clique em "Add file" → "Upload files"
3. Arraste e solte todos os arquivos do projeto
4. Clique em "Commit changes"

### Passo 3: Ativar GitHub Pages

1. Vá para as configurações do repositório (Settings)
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Escolha a branch `main` e a pasta `/ (root)`
5. Clique em "Save"

### Passo 4: Acessar o site

Após alguns minutos, seu site estará disponível em:
```
https://seu-usuario.github.io/formulario-etiquetas/
```

## Personalização

### Editar produtos

Abra o arquivo `js/app.js` e localize a constante `PRODUTOS_INICIAIS`. Você pode adicionar, remover ou modificar produtos:

```javascript
const PRODUTOS_INICIAIS = [
  { id: 1, nome: 'Kit Escolar', preco: 154.00 },
  { id: 2, nome: 'Kit Escolar sem Tag', preco: 132.00 },
  // ... mais produtos
];
```

### Editar opções de entrega

Localize a constante `OPCOES_ENTREGA` para modificar as opções de entrega e valores:

```javascript
const OPCOES_ENTREGA = [
  { id: 'retirada', label: 'Retirada na loja do Espinheiro', valor: 0 },
  { id: 'motoboy_recife', label: 'Motoboy Recife', valor: 14.00 },
  // ... mais opções
];
```

### Editar número do WhatsApp

Procure por `5581996156670` no arquivo `js/app.js` e substitua pelo seu número de WhatsApp (com código do país e DDD, sem símbolos).

### Editar taxa de nova arte

Localize a constante `TAXA_NOVA_ARTE` e ajuste o valor:

```javascript
const TAXA_NOVA_ARTE = 20.00;
```

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos e responsividade
- **JavaScript (Vanilla)**: Lógica da aplicação sem frameworks
- **Tailwind CSS**: Framework CSS via CDN
- **WhatsApp API**: Integração para envio de pedidos

## Compatibilidade

- Chrome/Edge (versões recentes)
- Firefox (versões recentes)
- Safari (versões recentes)
- Dispositivos móveis (responsivo)

## Notas Importantes

1. **Imagens**: As imagens são armazenadas localmente no navegador (Data URL) e não são enviadas para um servidor
2. **WhatsApp**: O número do WhatsApp precisa estar configurado no código para receber os pedidos
3. **Dados**: Os dados do formulário não são salvos automaticamente - eles são perdidos ao recarregar a página
4. **Segurança**: Este é um formulário front-end. Para uma solução completa, considere adicionar um backend para armazenar dados

## Melhorias Futuras

- [ ] Salvar dados localmente (localStorage)
- [ ] Backend para armazenar pedidos
- [ ] Envio de email automático
- [ ] Sistema de autenticação
- [ ] Dashboard de pedidos
- [ ] Integração com gateway de pagamento

## Licença

Este projeto é de código aberto e pode ser usado livremente.

## Suporte

Se encontrar algum problema ou tiver dúvidas, abra uma issue no repositório do GitHub.

---

**Desenvolvido com ❤️ para Etiquetas & Tal**
