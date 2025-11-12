// Configuração de produtos (editável)
const PRODUTOS_INICIAIS = [
  { id: 1, nome: 'Kit Escolar', preco: 154.00 },
  { id: 2, nome: 'Kit Escolar sem Tag', preco: 132.00 },
  { id: 3, nome: 'Kit Petit', preco: 110.00 },
  { id: 4, nome: 'Kit Petit sem Tag', preco: 99.00 },
  { id: 5, nome: 'Kit Baby Plus', preco: 121.00 },
  { id: 6, nome: 'Kit Baby', preco: 77.00 },
  { id: 7, nome: 'Casadinha Termocolantes', preco: 88.00 },
  { id: 8, nome: 'Kits Casadinha', preco: 66.00 },
  { id: 9, nome: 'Tag Mochila/Lancheira', preco: 22.00 },
  { id: 10, nome: 'Tag Estojo', preco: 16.50 },
  { id: 11, nome: 'Garrafa Térmica 350ml', preco: 80.00 },
  { id: 12, nome: 'Ecobag Meu Material', preco: 55.00 },
  { id: 13, nome: 'Cartela Kit Higiene Padrão', preco: 22.00 },
  { id: 14, nome: 'Cartela Kit Higiene Personalizada', preco: 33.00 },
  { id: 15, nome: 'Cartela Avulsa Etiquetas', preco: 27.50 },
];

const OPCOES_ENTREGA = [
  { id: 'retirada', label: 'Retirada na loja do Espinheiro', valor: 0 },
  { id: 'motoboy_recife', label: 'Motoboy Recife', valor: 14.00 },
  { id: 'motoboy_olinda', label: 'Motoboy Olinda', valor: 22.00 },
  { id: 'motoboy_jaboatao', label: 'Motoboy Jaboatão', valor: 27.00 },
  { id: 'correios', label: 'Correios', valor: 0 },
];

const TAXA_NOVA_ARTE = 20.00;

// Estado da aplicação
let state = {
  produtos: [...PRODUTOS_INICIAIS],
  modoEdicao: false,
  produtoEditando: null,
  novoProduto: { nome: '', preco: '' },
  nomeResponsavel: '',
  telefone: '',
  tipoEntrega: '',
  endereco: {
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    cep: ''
  },
  criancas: [
    {
      id: 1,
      nomeCrianca: '',
      nomeAbreviado: '',
      produtos: [{ produtoId: '', quantidade: 1 }],
      tema: '',
      tipoTema: '',
      imagemTema: null,
      imagemTemaPreview: null,
      referenciaNovaArte: '',
      infoAdicionais: { escola: '', serie: '', turma: '' }
    }
  ]
};

// Funções de gerenciamento de produtos
function adicionarProduto() {
  if (state.novoProduto.nome && state.novoProduto.preco) {
    const novoId = Math.max(...state.produtos.map(p => p.id)) + 1;
    state.produtos.push({
      id: novoId,
      nome: state.novoProduto.nome,
      preco: parseFloat(state.novoProduto.preco)
    });
    state.novoProduto = { nome: '', preco: '' };
    render();
  }
}

function removerProduto(id) {
  state.produtos = state.produtos.filter(p => p.id !== id);
  render();
}

function iniciarEdicaoProduto(produto) {
  state.produtoEditando = { ...produto };
  render();
}

function salvarEdicaoProduto() {
  state.produtos = state.produtos.map(p =>
    p.id === state.produtoEditando.id ? state.produtoEditando : p
  );
  state.produtoEditando = null;
  render();
}

function cancelarEdicaoProduto() {
  state.produtoEditando = null;
  render();
}

// Funções de gerenciamento de crianças
function adicionarCrianca() {
  if (state.criancas.length < 3) {
    const novoId = Math.max(...state.criancas.map(c => c.id), 0) + 1;
    state.criancas.push({
      id: novoId,
      nomeCrianca: '',
      nomeAbreviado: '',
      produtos: [{ produtoId: '', quantidade: 1 }],
      tema: '',
      tipoTema: '',
      imagemTema: null,
      imagemTemaPreview: null,
      referenciaNovaArte: '',
      infoAdicionais: { escola: '', serie: '', turma: '' }
    });
    render();
  }
}

function removerCrianca(id) {
  state.criancas = state.criancas.filter(c => c.id !== id);
  render();
}

function atualizarCrianca(id, campo, valor) {
  const crianca = state.criancas.find(c => c.id === id);
  if (crianca) {
    crianca[campo] = valor;
    render();
  }
}

function handleImagemUpload(criancaId, event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const crianca = state.criancas.find(c => c.id === criancaId);
      if (crianca) {
        crianca.imagemTema = file;
        crianca.imagemTemaPreview = reader.result;
        render();
      }
    };
    reader.readAsDataURL(file);
  }
}

function removerImagem(criancaId) {
  const crianca = state.criancas.find(c => c.id === criancaId);
  if (crianca) {
    crianca.imagemTema = null;
    crianca.imagemTemaPreview = null;
    render();
  }
}

function adicionarProdutoCrianca(criancaId) {
  const crianca = state.criancas.find(c => c.id === criancaId);
  if (crianca) {
    crianca.produtos.push({ produtoId: '', quantidade: 1 });
    render();
  }
}

function removerProdutoCrianca(criancaId, index) {
  const crianca = state.criancas.find(c => c.id === criancaId);
  if (crianca) {
    crianca.produtos.splice(index, 1);
    render();
  }
}

function atualizarProdutoCrianca(criancaId, index, campo, valor) {
  const crianca = state.criancas.find(c => c.id === criancaId);
  if (crianca && crianca.produtos[index]) {
    crianca.produtos[index][campo] = valor;
    render();
  }
}

// Calcular total
function calcularTotal() {
  let total = 0;
  let novasArtes = 0;

  state.criancas.forEach(crianca => {
    crianca.produtos.forEach(p => {
      const produto = state.produtos.find(prod => prod.id === parseInt(p.produtoId));
      if (produto) {
        total += produto.preco * p.quantidade;
      }
    });

    if (crianca.tipoTema === 'nova_arte') {
      novasArtes++;
    }
  });

  total += novasArtes * TAXA_NOVA_ARTE;

  const entrega = OPCOES_ENTREGA.find(e => e.id === state.tipoEntrega);
  if (entrega) {
    total += entrega.valor;
  }

  return total;
}

// Gerar mensagem WhatsApp
function gerarMensagemWhatsApp() {
  let mensagem = `*🎨 PEDIDO ETIQUETAS & TAL*\n\n`;
  mensagem += `*Responsável:* ${state.nomeResponsavel}\n`;
  mensagem += `*Telefone:* ${state.telefone}\n\n`;

  mensagem += `*═══════════════*\n`;

  let temImagens = false;

  state.criancas.forEach((crianca, index) => {
    mensagem += `\n*CRIANÇA ${index + 1}:*\n`;
    mensagem += `👤 Nome: ${crianca.nomeCrianca}\n`;
    if (crianca.nomeAbreviado) {
      mensagem += `📝 Nome Abreviado: ${crianca.nomeAbreviado}\n`;
    }
    mensagem += `🎨 Tema: ${crianca.tema}\n`;

    if (crianca.tipoTema === 'catalogo') {
      mensagem += `📋 Tipo: Tema do Catálogo\n`;
      if (crianca.imagemTema) {
        mensagem += `📎 *Imagem anexada no print*\n`;
        temImagens = true;
      }
    } else if (crianca.tipoTema === 'nova_arte') {
      mensagem += `✨ Tipo: Nova Arte (+R$ ${TAXA_NOVA_ARTE.toFixed(2)})\n`;
      if (crianca.referenciaNovaArte) {
        mensagem += `💡 Referência: ${crianca.referenciaNovaArte}\n`;
      }
      if (crianca.imagemTema) {
        mensagem += `📎 *Imagem de referência anexada no print*\n`;
        temImagens = true;
      }
    }

    if (crianca.infoAdicionais.escola || crianca.infoAdicionais.serie || crianca.infoAdicionais.turma) {
      mensagem += `📚 Info Adicionais:\n`;
      if (crianca.infoAdicionais.escola) mensagem += `   - Escola: ${crianca.infoAdicionais.escola}\n`;
      if (crianca.infoAdicionais.serie) mensagem += `   - Série: ${crianca.infoAdicionais.serie}\n`;
      if (crianca.infoAdicionais.turma) mensagem += `   - Turma: ${crianca.infoAdicionais.turma}\n`;
    }

    mensagem += `\n*Produtos:*\n`;
    crianca.produtos.forEach(p => {
      const produto = state.produtos.find(prod => prod.id === parseInt(p.produtoId));
      if (produto) {
        mensagem += `• ${produto.nome} - Qtd: ${p.quantidade} - R$ ${(produto.preco * p.quantidade).toFixed(2)}\n`;
      }
    });

    mensagem += `\n*═══════════════*\n`;
  });

  const entregaSelecionada = OPCOES_ENTREGA.find(e => e.id === state.tipoEntrega);
  mensagem += `\n*🚚 ENTREGA:*\n`;
  mensagem += `${entregaSelecionada?.label}`;
  if (entregaSelecionada?.valor > 0) {
    mensagem += ` - R$ ${entregaSelecionada.valor.toFixed(2)}`;
  }
  mensagem += `\n`;

  if (state.tipoEntrega !== 'retirada') {
    mensagem += `\n*📍 Endereço:*\n`;
    mensagem += `${state.endereco.rua}, ${state.endereco.numero}`;
    if (state.endereco.complemento) mensagem += ` - ${state.endereco.complemento}`;
    mensagem += `\n${state.endereco.bairro} - ${state.endereco.cidade}\n`;
    mensagem += `CEP: ${state.endereco.cep}\n`;
  }

  mensagem += `\n*💰 TOTAL: R$ ${calcularTotal().toFixed(2)}*`;

  if (temImagens) {
    mensagem += `\n\n⚠️ *ATENÇÃO: Vou enviar as imagens dos temas/referências logo em seguida!*`;
  }

  return encodeURIComponent(mensagem);
}

function enviarWhatsApp() {
  const mensagem = gerarMensagemWhatsApp();
  window.open(`https://wa.me/5581996156670?text=${mensagem}`, '_blank');

  const temImagens = state.criancas.some(c => c.imagemTema);
  if (temImagens) {
    setTimeout(() => {
      alert('📱 Importante: Após enviar a mensagem, por favor envie as imagens dos temas/referências que você anexou no formulário diretamente no chat do WhatsApp!');
    }, 1000);
  }
}

// Renderizar a aplicação
function render() {
  const app = document.getElementById('app');
  const precisaEndereco = state.tipoEntrega && state.tipoEntrega !== 'retirada';

  app.innerHTML = `
    <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 fade-in">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-500 to-cyan-600 bg-clip-text text-transparent mb-2">Formulário de Pedido</h1>
        <p class="text-gray-600">etiquetas & tal</p>
      </div>

      <!-- Painel de Administração de Produtos -->
      <div class="mb-8 bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-800">Gerenciar Produtos</h2>
          <button
            onclick="state.modoEdicao = !state.modoEdicao; render();"
            class="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2 shadow-lg"
          >
            ✏️ ${state.modoEdicao ? 'Fechar Edição' : 'Editar Produtos'}
          </button>
        </div>

        ${state.modoEdicao ? `
          <div class="space-y-4">
            <!-- Lista de produtos -->
            <div class="max-h-64 overflow-y-auto space-y-2">
              ${state.produtos.map(produto => `
                <div class="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                  ${state.produtoEditando?.id === produto.id ? `
                    <input
                      type="text"
                      value="${state.produtoEditando.nome}"
                      onchange="state.produtoEditando.nome = this.value; render();"
                      class="flex-1 px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value="${state.produtoEditando.preco}"
                      onchange="state.produtoEditando.preco = parseFloat(this.value); render();"
                      class="w-32 px-3 py-2 border rounded"
                    />
                    <button onclick="salvarEdicaoProduto();" class="text-green-600 hover:text-green-700">💾</button>
                    <button onclick="cancelarEdicaoProduto();" class="text-gray-600 hover:text-gray-700">✕</button>
                  ` : `
                    <span class="flex-1 font-medium">${produto.nome}</span>
                    <span class="w-32 text-right text-orange-600 font-bold">R$ ${produto.preco.toFixed(2)}</span>
                    <button onclick="iniciarEdicaoProduto(${JSON.stringify(produto).replace(/"/g, '&quot;')});" class="text-cyan-600 hover:text-cyan-700">✏️</button>
                    <button onclick="removerProduto(${produto.id});" class="text-red-600 hover:text-red-700">🗑️</button>
                  `}
                </div>
              `).join('')}
            </div>

            <!-- Adicionar novo produto -->
            <div class="flex gap-3 pt-4 border-t">
              <input
                type="text"
                placeholder="Nome do produto"
                value="${state.novoProduto.nome}"
                onchange="state.novoProduto.nome = this.value;"
                class="flex-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Preço"
                value="${state.novoProduto.preco}"
                onchange="state.novoProduto.preco = this.value;"
                class="w-32 px-4 py-2 border rounded-lg"
              />
              <button
                onclick="adicionarProduto();"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                ➕ Adicionar
              </button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Dados do Responsável -->
      <div class="mb-8 bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200">
        <h2 class="text-2xl font-bold text-orange-600 mb-4">Dados do Responsável</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
            <input
              type="text"
              value="${state.nomeResponsavel}"
              onchange="state.nomeResponsavel = this.value; render();"
              class="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone (WhatsApp) *</label>
            <input
              type="tel"
              value="${state.telefone}"
              onchange="state.telefone = this.value; render();"
              placeholder="(81) 99999-9999"
              class="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <!-- Dados das Crianças -->
      ${state.criancas.map((crianca, criancaIndex) => `
        <div class="mb-8 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border-2 border-cyan-300">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold text-cyan-700">Criança ${criancaIndex + 1}</h2>
            ${state.criancas.length > 1 ? `
              <button
                onclick="removerCrianca(${crianca.id});"
                class="text-red-600 hover:text-red-700 flex items-center gap-2"
              >
                🗑️ Remover
              </button>
            ` : ''}
          </div>

          <!-- Nome da criança -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo da Criança *</label>
              <input
                type="text"
                value="${crianca.nomeCrianca}"
                onchange="atualizarCrianca(${crianca.id}, 'nomeCrianca', this.value);"
                class="w-full px-4 py-3 border-2 border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome Abreviado (opcional)</label>
              <input
                type="text"
                value="${crianca.nomeAbreviado}"
                onchange="atualizarCrianca(${crianca.id}, 'nomeAbreviado', this.value);"
                placeholder="Caso o nome não caiba"
                class="w-full px-4 py-3 border-2 border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <!-- Tema -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Tema *</label>
            <input
              type="text"
              value="${crianca.tema}"
              onchange="atualizarCrianca(${crianca.id}, 'tema', this.value);"
              placeholder="Ex: Unicórnio, Dinossauros, Super-heróis..."
              class="w-full px-4 py-3 border-2 border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <!-- Tipo de Tema -->
          <div class="mb-4 bg-white p-5 rounded-xl border-2 border-blue-200">
            <label class="block text-sm font-medium text-gray-700 mb-3">Tipo de Arte *</label>
            <div class="space-y-3">
              <label class="flex items-start gap-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg cursor-pointer hover:from-cyan-100 hover:to-blue-100 border-2 border-transparent hover:border-cyan-400 transition-all">
                <input
                  type="radio"
                  name="tipoTema-${crianca.id}"
                  value="catalogo"
                  ${crianca.tipoTema === 'catalogo' ? 'checked' : ''}
                  onchange="atualizarCrianca(${crianca.id}, 'tipoTema', 'catalogo');"
                  class="w-5 h-5 text-cyan-600 mt-1"
                />
                <div class="flex-1">
                  <span class="font-semibold text-cyan-800 block">📋 Tema do Catálogo</span>
                  <span class="text-sm text-gray-600">Escolha um dos temas disponíveis no nosso catálogo</span>
                </div>
              </label>

              <label class="flex items-start gap-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg cursor-pointer hover:from-orange-100 hover:to-yellow-100 border-2 border-transparent hover:border-orange-400 transition-all">
                <input
                  type="radio"
                  name="tipoTema-${crianca.id}"
                  value="nova_arte"
                  ${crianca.tipoTema === 'nova_arte' ? 'checked' : ''}
                  onchange="atualizarCrianca(${crianca.id}, 'tipoTema', 'nova_arte');"
                  class="w-5 h-5 text-orange-600 mt-1"
                />
                <div class="flex-1">
                  <span class="font-semibold text-orange-800 block">✨ Nova Arte Personalizada</span>
                  <span class="text-sm text-gray-600">Criamos uma arte exclusiva para você</span>
                  <span class="text-sm font-bold text-orange-600 block mt-1">+ R$ ${TAXA_NOVA_ARTE.toFixed(2)}</span>
                </div>
              </label>
            </div>

            <!-- Upload de imagem para tema do catálogo -->
            ${crianca.tipoTema === 'catalogo' ? `
              <div class="mt-4 p-4 bg-cyan-50 rounded-lg border-2 border-cyan-300">
                <label class="block text-sm font-medium text-cyan-800 mb-2">
                  📸 Envie o print do tema escolhido *
                </label>
                <p class="text-xs text-gray-600 mb-3">Tire um print da página do catálogo com o tema escolhido</p>
                
                ${!crianca.imagemTemaPreview ? `
                  <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-cyan-400 rounded-lg cursor-pointer hover:bg-cyan-100 transition-all">
                    <span class="text-2xl mb-2">📤</span>
                    <span class="text-sm text-cyan-700 font-medium">Clique para fazer upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onchange="handleImagemUpload(${crianca.id}, event);"
                      class="hidden"
                    />
                  </label>
                ` : `
                  <div class="relative">
                    <img src="${crianca.imagemTemaPreview}" alt="Preview" class="w-full h-48 object-cover rounded-lg" />
                    <button
                      onclick="removerImagem(${crianca.id});"
                      class="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                `}
              </div>
            ` : ''}

            <!-- Upload opcional e campo de referência para nova arte -->
            ${crianca.tipoTema === 'nova_arte' ? `
              <div class="mt-4 p-4 bg-orange-50 rounded-lg border-2 border-orange-300 space-y-4">
                <div>
                  <label class="block text-sm font-medium text-orange-800 mb-2">
                    💡 Descrição ou referência (opcional)
                  </label>
                  <textarea
                    value="${crianca.referenciaNovaArte}"
                    onchange="atualizarCrianca(${crianca.id}, 'referenciaNovaArte', this.value);"
                    placeholder="Descreva como gostaria da arte ou conte mais sobre o tema..."
                    class="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-orange-800 mb-2">
                    📸 Imagem de referência (opcional)
                  </label>
                  <p class="text-xs text-gray-600 mb-3">Você pode enviar uma imagem para nos ajudar a criar a arte perfeita</p>
                  
                  ${!crianca.imagemTemaPreview ? `
                    <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-orange-400 rounded-lg cursor-pointer hover:bg-orange-100 transition-all">
                      <span class="text-2xl mb-2">🖼️</span>
                      <span class="text-sm text-orange-700 font-medium">Clique para fazer upload (opcional)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onchange="handleImagemUpload(${crianca.id}, event);"
                        class="hidden"
                      />
                    </label>
                  ` : `
                    <div class="relative">
                      <img src="${crianca.imagemTemaPreview}" alt="Preview" class="w-full h-48 object-cover rounded-lg" />
                      <button
                        onclick="removerImagem(${crianca.id});"
                        class="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  `}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Produtos -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Produtos *</label>
            ${crianca.produtos.map((produto, produtoIndex) => `
              <div class="flex gap-3 mb-3">
                <select
                  value="${produto.produtoId}"
                  onchange="atualizarProdutoCrianca(${crianca.id}, ${produtoIndex}, 'produtoId', this.value);"
                  class="flex-1 px-4 py-3 border-2 border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 bg-white"
                  required
                >
                  <option value="">Selecione um produto</option>
                  ${state.produtos.map(p => `
                    <option value="${p.id}">
                      ${p.nome} - R$ ${p.preco.toFixed(2)}
                    </option>
                  `).join('')}
                </select>
                <input
                  type="number"
                  min="1"
                  value="${produto.quantidade}"
                  onchange="atualizarProdutoCrianca(${crianca.id}, ${produtoIndex}, 'quantidade', parseInt(this.value));"
                  class="w-24 px-4 py-3 border-2 border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  placeholder="Qtd"
                />
                ${crianca.produtos.length > 1 ? `
                  <button
                    onclick="removerProdutoCrianca(${crianca.id}, ${produtoIndex});"
                    class="text-red-600 hover:text-red-700 p-2"
                  >
                    🗑️
                  </button>
                ` : ''}
              </div>
            `).join('')}
            <button
              onclick="adicionarProdutoCrianca(${crianca.id});"
              class="text-cyan-700 hover:text-cyan-800 flex items-center gap-2 mt-2 font-medium"
            >
              ➕ Adicionar outro produto
            </button>
          </div>

          <!-- Informações Adicionais -->
          <div class="bg-white p-4 rounded-lg border-2 border-blue-200">
            <label class="block text-sm font-medium text-gray-700 mb-3">Informações Adicionais (opcional)</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value="${crianca.infoAdicionais.escola}"
                onchange="const info = crianca.infoAdicionais; info.escola = this.value; atualizarCrianca(${crianca.id}, 'infoAdicionais', info);"
                placeholder="Escola"
                class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value="${crianca.infoAdicionais.serie}"
                onchange="const info = crianca.infoAdicionais; info.serie = this.value; atualizarCrianca(${crianca.id}, 'infoAdicionais', info);"
                placeholder="Série"
                class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value="${crianca.infoAdicionais.turma}"
                onchange="const info = crianca.infoAdicionais; info.turma = this.value; atualizarCrianca(${crianca.id}, 'infoAdicionais', info);"
                placeholder="Turma"
                class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      `).join('')}

      <!-- Botão adicionar criança -->
      ${state.criancas.length < 3 ? `
        <button
          onclick="adicionarCrianca();"
          class="w-full mb-8 py-4 border-2 border-dashed border-cyan-400 text-cyan-700 rounded-2xl hover:bg-cyan-50 flex items-center justify-center gap-2 font-medium transition-all"
        >
          ➕ Adicionar outra criança (até 3)
        </button>
      ` : ''}

      <!-- Opções de Entrega -->
      <div class="mb-8 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-300">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">Opção de Entrega *</h2>
        <div class="space-y-3">
          ${OPCOES_ENTREGA.map(opcao => `
            <label class="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer hover:bg-blue-50 border-2 border-transparent hover:border-blue-400 transition-all">
              <input
                type="radio"
                name="entrega"
                value="${opcao.id}"
                ${state.tipoEntrega === opcao.id ? 'checked' : ''}
                onchange="state.tipoEntrega = this.value; render();"
                class="w-5 h-5 text-blue-600"
              />
              <span class="flex-1 font-medium">${opcao.label}</span>
              ${opcao.valor > 0 ? `
                <span class="text-blue-700 font-bold">R$ ${opcao.valor.toFixed(2)}</span>
              ` : ''}
            </label>
          `).join('')}
        </div>

        <!-- Endereço (se necessário) -->
        ${precisaEndereco ? `
          <div class="mt-6 p-4 bg-white rounded-lg border-2 border-blue-200">
            <h3 class="font-bold text-gray-800 mb-4">📍 Endereço de Entrega</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <input
                  type="text"
                  value="${state.endereco.rua}"
                  onchange="state.endereco.rua = this.value; render();"
                  placeholder="Rua / Avenida *"
                  class="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <input
                type="text"
                value="${state.endereco.numero}"
                onchange="state.endereco.numero = this.value; render();"
                placeholder="Número *"
                class="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value="${state.endereco.complemento}"
                onchange="state.endereco.complemento = this.value; render();"
                placeholder="Complemento"
                class="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value="${state.endereco.bairro}"
                onchange="state.endereco.bairro = this.value; render();"
                placeholder="Bairro *"
                class="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value="${state.endereco.cidade}"
                onchange="state.endereco.cidade = this.value; render();"
                placeholder="Cidade *"
                class="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value="${state.endereco.cep}"
                onchange="state.endereco.cep = this.value; render();"
                placeholder="CEP *"
                class="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Total e Enviar -->
      <div class="bg-gradient-to-r from-orange-500 via-cyan-600 to-blue-700 p-6 rounded-2xl text-white shadow-2xl">
        <div class="flex justify-between items-center mb-4">
          <span class="text-2xl font-bold">Total do Pedido:</span>
          <span class="text-4xl font-bold">R$ ${calcularTotal().toFixed(2)}</span>
        </div>
        <button
          onclick="enviarWhatsApp();"
          class="w-full py-4 bg-white text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-cyan-700 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
        >
          📱 Enviar Pedido pelo WhatsApp
        </button>
        <p class="text-center text-sm mt-3 text-white/90">
          ${state.criancas.some(c => c.imagemTema) ? '⚠️ Lembre-se de enviar as imagens após a mensagem!' : ''}
        </p>
      </div>
    </div>
  `;
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', render);
