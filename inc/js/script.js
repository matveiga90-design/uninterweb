// --- MENU MOBILE ---
// Obtém o botão do menu (ícone hambúrguer)
const menuToggle = document.getElementById('menuToggle');
// Obtém o elemento da navegação (menu em si)
const menuNav = document.getElementById('menuNav');

// Verifica se os elementos existem antes de adicionar eventos
if (menuToggle && menuNav) {

    // Função para alternar o estado do menu (abrir/fechar)
    const toggleMenu = () => {
        // Alterna a classe "show" no menu
        menuNav.classList.toggle('show');
        // Altera o ícone: X quando aberto, hambúrguer quando fechado
        menuToggle.innerHTML = menuNav.classList.contains('show') ? '&#10006;' : '&#9776;';
    };

    // Ao clicar no botão do menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique de se propagar (para não fechar imediatamente)
        toggleMenu(); // Abre ou fecha o menu
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        // Se o clique não for dentro do menu e o menu estiver aberto
        if (!menuNav.contains(e.target) && menuNav.classList.contains('show')) {
            // Remove a classe "show" (fecha o menu)
            menuNav.classList.remove('show');
            // Retorna o ícone para hambúrguer
            menuToggle.innerHTML = '&#9776;';
        }
    });
}

// --- MODAL DE MENSAGEM ---
// Referência ao modal inteiro
const modal = document.getElementById("modalMensagem");
// Elemento onde a mensagem do modal será exibida
const textoModal = document.getElementById("textoModal");
// Botão de fechar (o “X”)
const fecharModal = document.getElementById("fecharModal");

// Função que mostra o modal com uma mensagem
function mostrarModal(mensagem, tipo) {
    if (!modal || !textoModal) return; // Se o modal não existir, retorna

    if (tipo === 'carregando') { // Se for carregando, mostra o gif
        imgModal.src = 'inc/img/carregando.gif'; // Coloca o gif de carregando
    } else if (tipo === 'sucesso') { // Se for sucesso, mostra o ícone de sucesso
        imgModal.src = 'inc/img/sucesso.png'; // Coloca o ícone de sucesso
    } else { // Caso contrário, mostra o ícone de erro
        imgModal.src = 'inc/img/erro.png'; // Coloca o ícone de erro
    }
    
    textoModal.textContent = mensagem; // Coloca o texto recebido
    modal.style.display = "flex"; // Mostra o modal
}

// Fecha o modal ao clicar no “X” ou fora dele
if (modal && fecharModal) {
    // Clicar no X fecha o modal
    fecharModal.onclick = () => modal.style.display = "none";

    // Clicar fora do conteúdo do modal também fecha
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

// --- FORMULÁRIO DE CONTATO ---
// Função chamada no envio do formulário
function validarFormulario(event) {
    event.preventDefault(); // Impede o envio normal do formulário

    // Obtém os valores digitados, removendo espaços extras
    const nome = document.getElementById('nome')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const mensagem = document.getElementById('mensagem')?.value.trim();
    const form = document.getElementById('formContato');

    // Verifica se algum campo obrigatório está vazio
    if (!nome || !email || !mensagem) {
        return mostrarModal("Por favor, preencha todos os campos obrigatórios.", 'erro');
    }

    // Expressão regular simples para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return mostrarModal("Por favor, insira um e-mail válido (ex: usuario@dominio.com).", 'erro');
    }

    // Simula o envio da mensagem
    mostrarModal("Enviando...", 'carregando');
    setTimeout(() => {
        // Após 1 segundo, mostra mensagem de sucesso
        mostrarModal("Mensagem enviada com sucesso! (Simulação)", 'sucesso');
        // Limpa o formulário
        form?.reset();
    }, 1000);
}

// --- BOTÃO VOLTAR AO TOPO ---
// Referência ao botão de “voltar ao topo”
const btnTopo = document.getElementById("scrollToTopBtn");

// Só executa se o botão existir
if (btnTopo) {
    // Ao rolar a página...
    window.addEventListener('scroll', () => {
        // Exibe o botão se a rolagem for maior que 300px
        btnTopo.style.display = (window.scrollY > 300) ? "block" : "none";
    });

    // Faz a rolagem suave até o topo quando clicado
    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- TEMA CLARO/ESCURO ---
// Botão que alterna o tema
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
// Referência ao corpo da página
const body = document.body;

// Função para aplicar o tema claro ou escuro
function aplicarTema(isDark) {
    // Adiciona ou remove a classe "dark-theme"
    body.classList.toggle('dark-theme', isDark);
    // Atualiza o ícone do botão
    toggleThemeBtn.textContent = isDark ? '☀' : '☾';
    // Atualiza o título (tooltip)
    toggleThemeBtn.title = isDark ? 'Modo claro' : 'Modo escuro';
    // Salva a preferência no armazenamento local
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Se o botão existir, ativa o controle de tema
if (toggleThemeBtn) {
    // Lê a preferência salva anteriormente (se houver)
    const temaSalvo = localStorage.getItem('theme') === 'dark';
    aplicarTema(temaSalvo); // Aplica o tema salvo

    // Quando clicar no botão, alterna o modo
    toggleThemeBtn.addEventListener('click', () => {
        const modoEscuro = !body.classList.contains('dark-theme');
        aplicarTema(modoEscuro);
    });
}

// --- DESTACAR SEÇÃO ATIVA ---
// Pega todas as seções do site
const sections = document.querySelectorAll('section');
// Pega todos os links do menu
const navLinks = document.querySelectorAll('.navbar ul li a');

// Quando o usuário rolar a página
window.addEventListener('scroll', () => {
    let secaoAtual = ''; // Guarda o ID da seção atual

    // Percorre todas as seções
    sections.forEach(section => {
        const offset = section.offsetTop - 250; // Ajuste para o topo fixo
        const altura = section.clientHeight; // Altura da seção

        // Verifica se a seção está visível na tela
        if (scrollY >= offset && scrollY < offset + altura) {
            secaoAtual = section.id; // Salva o ID da seção atual
        }

        // Remove a classe "active" de todas as seções
        section.classList.remove('active');
    });

    // Adiciona "active" à seção visível
    if (secaoAtual) {
        document.getElementById(secaoAtual)?.classList.add('active');
    }

    // Atualiza os links do menu conforme a seção atual
    navLinks.forEach(link => {
        // Se o href do link corresponde à seção atual, adiciona "active"
        link.classList.toggle('active', link.getAttribute('href') === `#${secaoAtual}`);
    });
});
