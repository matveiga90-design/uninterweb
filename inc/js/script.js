// Toggle do menu mobile
const menuToggle = document.getElementById('menuToggle');
const menuNav = document.getElementById('menuNav');

menuToggle.addEventListener('click', () => {
    menuNav.classList.toggle('show');

    // Troca o ícone do hambúrguer para X quando aberto
    if (menuNav.classList.contains('show')) {
        menuToggle.innerHTML = '&#10006;'; // X
    } else {
        menuToggle.innerHTML = '&#9776;'; // hambúrguer
    }

     e.stopPropagation(); // Evita que o clique no botão feche imediatamente
    
});

// Fechar menu ao clicar fora dele
window.addEventListener('click', (e) => {
    if (!menuNav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuNav.classList.remove('show');
    }
        // Troca o ícone do hambúrguer para X quando aberto
    if (menuNav.classList.contains('show')) {
        menuToggle.innerHTML = '&#10006;'; // X
    } else {
        menuToggle.innerHTML = '&#9776;'; // hambúrguer
    }
});

// Referências
const modal = document.getElementById("modalMensagem");
const textoModal = document.getElementById("textoModal");
const fecharModal = document.getElementById("fecharModal");

function mostrarModal(mensagem) {
    textoModal.textContent = mensagem;
    modal.style.display = "block";
}

// Fecha o modal ao clicar no "x"
fecharModal.onclick = function() {
    modal.style.display = "none";
};

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Função de validação e envio (modificada)
function validarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const form = document.getElementById('formContato');

    // Validação
    if (nome === '' || email === '' || mensagem === '') {
        mostrarModal("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarModal("Por favor, insira um endereço de e-mail válido (ex: usuario@dominio.com).");
        return false;
    }

    // Simulação de envio
    mostrarModal("Enviando...");
    setTimeout(() => {
        mostrarModal("Mensagem enviada com sucesso! (Simulação)");
        form.reset();
    }, 1000);

    return false;
}
// --- Seção de JavaScript para Botão de Voltar ao Topo ---

const btnTopo = document.getElementById("scrollToTopBtn");

// Mostra o botão quando a rolagem for maior que 300px
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

// Faz a rolagem suave ao topo quando o botão é clicado
btnTopo.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- Seção de JavaScript para Tema Claro/Escuro ---

const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const body = document.body;

function toggleTheme() {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    
    // Atualiza o ícone do botão
    toggleThemeBtn.textContent = isDark ? '☀' : '☾';
    // Atualiza o título do botão

    toggleThemeBtn.title = isDark ? 'Modo claro' : 'Modo escuro';
    
    // Salva a preferência
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Inicializa ícone corretamente
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') body.classList.add('dark-theme');
    toggleThemeBtn.textContent = body.classList.contains('dark-theme') ? '☀' : '☾';
    toggleThemeBtn.title = body.classList.contains('dark-theme') ? 'Modo claro' : 'Modo escuro';
}

// O código é executado somente se o elemento existir
if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', toggleTheme);
    loadThemePreference(); // Chama a função ao carregar o script
}

// --- Destacar item ativo no menu e na seção conforme a rolagem ---
const sections = document.querySelectorAll('section');       // Todas as seções
const navLinks = document.querySelectorAll('.navbar ul li a'); // Todos os links do menu

window.addEventListener('scroll', () => {
    let current = '';

    // Descobre qual seção está visível
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 250; // Ajusta para o header fixo
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }

        // Remove classe 'active' de todas as seções
        section.classList.remove('active');
    });

    // Adiciona 'active' na seção visível
    if (current) {
        const secaoAtual = document.getElementById(current);
        secaoAtual.classList.add('active');
    }

    // Atualiza o menu
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

