// Etapas do banho/tosa
const etapas = [
  {
    numero: 1,
    nome: "Recepção",
    descricao: "Pet recebido e documentação verificada"
  },
  {
    numero: 2,
    nome: "Higienização",
    descricao: "Banho com shampoo específico"
  },
  {
    numero: 3,
    nome: "Secagem",
    descricao: "Secagem completa do pelo"
  },
  {
    numero: 4,
    nome: "Tosa",
    descricao: "Corte e modelagem do pelo"
  },
  {
    numero: 5,
    nome: "Acabamento",
    descricao: "Unhas, orelhas e limpeza final"
  },
  {
    numero: 6,
    nome: "Pronto para Buscar",
    descricao: "Pet aguardando o tutor"
  }
];

let etapaAtual = 0;

// Elementos do DOM
const containerEtapas = document.getElementById("etapas");
const botaoAnterior = document.getElementById("anterior");
const botaoProxima = document.getElementById("proxima");
const spanEtapaAtual = document.getElementById("etapaAtual");

// Inicializar
function init() {
  renderizarEtapas();
  atualizarBotoes();
  adicionarEventos();
}

// Renderizar etapas
function renderizarEtapas() {
  containerEtapas.innerHTML = "";
  
  etapas.forEach((etapa, index) => {
    const divEtapa = document.createElement("div");
    divEtapa.className = "etapa";
    
    if (index < etapaAtual) {
      divEtapa.classList.add("completa");
    } else if (index === etapaAtual) {
      divEtapa.classList.add("ativa");
    }
    
    divEtapa.innerHTML = `
      <strong>${etapa.nome}</strong>
      <p>${etapa.descricao}</p>
      <small class="etapa-numero">Etapa ${etapa.numero}/6</small>
    `;
    
    divEtapa.addEventListener("click", () => {
      if (index < etapaAtual) {
        etapaAtual = index;
        renderizarEtapas();
        atualizarBotoes();
      }
    });
    
    containerEtapas.appendChild(divEtapa);
  });
  
  // Atualizar span da etapa atual
  spanEtapaAtual.textContent = etapas[etapaAtual].nome;
}

// Atualizar estado dos botões
function atualizarBotoes() {
  botaoAnterior.disabled = etapaAtual === 0;
  botaoProxima.disabled = etapaAtual === etapas.length - 1;
}

// Eventos dos botões
function adicionarEventos() {
  botaoAnterior.addEventListener("click", irAnterior);
  botaoProxima.addEventListener("click", irProxima);
  
  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && etapaAtual > 0) {
      irAnterior();
    } else if (e.key === "ArrowRight" && etapaAtual < etapas.length - 1) {
      irProxima();
    }
  });
}

// Ir para etapa anterior
function irAnterior() {
  if (etapaAtual > 0) {
    etapaAtual--;
    renderizarEtapas();
    atualizarBotoes();
  }
}

// Ir para próxima etapa
function irProxima() {
  if (etapaAtual < etapas.length - 1) {
    etapaAtual++;
    renderizarEtapas();
    atualizarBotoes();
  }
}

// Iniciar quando a página carregar
document.addEventListener("DOMContentLoaded", init);
