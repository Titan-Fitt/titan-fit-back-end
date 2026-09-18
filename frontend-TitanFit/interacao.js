function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

/* =======================================================
   ANIMAÇÃO SOBRE NÓS HOME
======================================================= */

const sobreNos = document.querySelector(".sobrenos-home");

if (sobreNos) {

    const observerSobre = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                sobreNos.classList.add("animar");
                observerSobre.disconnect();

            }

        });

    }, { threshold: 0.3 });

    observerSobre.observe(sobreNos);
}

/* =======================================================
   ANIMAÇÃO PLANOS HOME
======================================================= */

const planosHome = document.querySelectorAll(
    ".plano_basico-home, .plano_avancado-home, .plano_premium-home"
);

const secaoPlanosHome = document.querySelector(".caixa-planos_home");

if (secaoPlanosHome && planosHome.length > 0) {

    const observerPlanos = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                planosHome.forEach((plano, index) => {

                    setTimeout(() => {
                        plano.classList.add("animar");
                    }, index * 300);

                });

                observerPlanos.disconnect();
            }

        });

    }, { threshold: 0.3 });

    observerPlanos.observe(secaoPlanosHome);
}

/* =======================================================
   ANIMAÇÃO SERVIÇOS HOME
======================================================= */

const servicos = document.querySelectorAll(".animar-servico");

if (servicos.length > 0) {

    const observerServicos = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                servicos.forEach((servico, index) => {

                    setTimeout(() => {
                        servico.classList.add("ativo");
                    }, index * 250);

                });

                observerServicos.disconnect();
            }

        });

    }, { threshold: 0.2 });

    servicos.forEach((servico) => {
        observerServicos.observe(servico);
    });
}

/* =======================================================
   CARD CENTRAL - PÁGINA PLANOS
======================================================= */

const cardsContainer = document.querySelector(".pagina-planos-cards");
const cards = document.querySelectorAll(".pagina-plano-card");

function destacarCardCentral() {

    if (!cardsContainer || cards.length === 0) return;

    const centroTela = window.innerWidth / 2;

    let cardMaisCentral = null;
    let menorDistancia = Infinity;

    cards.forEach((card) => {

        const rect = card.getBoundingClientRect();
        const centroCard = rect.left + rect.width / 2;
        const distancia = Math.abs(centroTela - centroCard);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            cardMaisCentral = card;
        }

    });

    cards.forEach((card) => {
        card.classList.remove("ativo");
    });

    if (cardMaisCentral) {
        cardMaisCentral.classList.add("ativo");
    }
}

if (cardsContainer && cards.length > 0) {

    cardsContainer.addEventListener("scroll", destacarCardCentral);
    window.addEventListener("resize", destacarCardCentral);
    window.addEventListener("load", destacarCardCentral);
}

/* =======================================================
   ANIMAÇÃO ENTRADA PLANOS
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".pagina-plano-card");
    const secaoPlanos = document.querySelector(".pagina-planos-cards");

    if (secaoPlanos && cards.length > 0) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    cards.forEach((card, index) => {

                        setTimeout(() => {
                            card.classList.add("animar");
                        }, index * 400);

                    });

                    observer.disconnect();
                }

            });

        }, { threshold: 0.2 });

        observer.observe(secaoPlanos);
    }

});

/* =======================================================
   ANIMAÇÃO PAGAMENTO
======================================================= */

const pagamento = document.querySelector(".pagina-pagamento");

if (pagamento) {

    const observerPagamento = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                pagamento.classList.add("animar");
                observerPagamento.unobserve(entry.target);

            }

        });

    }, { threshold: 0.3 });

    observerPagamento.observe(pagamento);
}

/* =======================================================
   CADASTRO - ESCOLHA PROFESSOR / USUÁRIO
======================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const botoes = document.querySelectorAll(".botao-escolha");
    const camposProfessor = document.getElementById("camposProfessor");
    const tipoInput = document.getElementById("tipoInput");

    if (botoes.length > 0) {

        botoes.forEach((botao) => {

            botao.addEventListener("click", () => {

                // Marca visualmente qual botão está ativo
                botoes.forEach(b => b.classList.remove("ativo"));
                botao.classList.add("ativo");

                const tipo = botao.dataset.tipo; // "professor" ou "usuario"

                // Atualiza o campo escondido que vai junto no formulário
                if (tipoInput) {
                    tipoInput.value = tipo;
                }

                // Mostra os campos extras só se for professor
                if (camposProfessor) {
                    camposProfessor.style.display = tipo === "professor" ? "block" : "none";
                }

            });

        });

    }

});

const menu = document.querySelector("#menu");
const botaoAbrirMenu = document.querySelector(".menu-toggle");
const botaoFecharMenu = document.querySelector(".close-menu");

function alternarMenu() {
    const menuEstaAberto = menu.classList.toggle("aberto");

    botaoAbrirMenu.setAttribute(
        "aria-expanded",
        String(menuEstaAberto)
    );
}

botaoAbrirMenu.addEventListener("click", alternarMenu);
botaoFecharMenu.addEventListener("click", alternarMenu);

const titulosAcordeon = document.querySelectorAll(
    ".acordeon-titulo"
);

titulosAcordeon.forEach((titulo) => {
    titulo.addEventListener("click", () => {
        const itemAtual = titulo.closest(".acordeon-item");
        const acordeonAtual = itemAtual.closest(".acordeon");
        const itemEstaAtivo = itemAtual.classList.contains("ativo");

        acordeonAtual
            .querySelectorAll(".acordeon-item")
            .forEach((item) => {
                item.classList.remove("ativo");

                const botao = item.querySelector(
                    ".acordeon-titulo"
                );

                botao.setAttribute("aria-expanded", "false");
            });

        if (!itemEstaAtivo) {
            itemAtual.classList.add("ativo");
            titulo.setAttribute("aria-expanded", "true");
        }
    });
});

/* =====================================================
   MODAL DE PLANOS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const modalPlanos = document.getElementById("modalPlanos");

    const abrirModal = document.getElementById("abrirModalPlanos");

    const fecharModal = document.getElementById("fecharModalPlanos");


    /* ================================================
       ABRIR MODAL
    ================================================ */

    if (abrirModal) {

        abrirModal.addEventListener("click", function () {

            modalPlanos.classList.add("ativo");

            document.body.style.overflow = "hidden";

        });

    }


    /* ================================================
       FECHAR MODAL PELO X
    ================================================ */

    if (fecharModal) {

        fecharModal.addEventListener("click", function () {

            fecharModalPlanos();

        });

    }


    /* ================================================
       FUNÇÃO PARA FECHAR
    ================================================ */

    function fecharModalPlanos() {

        modalPlanos.classList.remove("ativo");

        document.body.style.overflow = "";

    }


    /* ================================================
       CLICAR FORA DA CAIXA
    ================================================ */

    if (modalPlanos) {

        modalPlanos.addEventListener("click", function (event) {

            if (event.target === modalPlanos) {

                fecharModalPlanos();

            }

        });

    }


    /* ================================================
       TECLA ESC
    ================================================ */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modalPlanos.classList.contains("ativo")
        ) {

            fecharModalPlanos();

        }

    });


    /* ================================================
       BOTÕES DOS PLANOS
    ================================================ */

    const botoesPlanos =
        document.querySelectorAll(".modal-plano-botao");


    botoesPlanos.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const plano =
                botao.getAttribute("data-plano");


            console.log("Plano selecionado:", plano);


            /*
             * AQUI VOCÊ PODE REDIRECIONAR
             * PARA A PÁGINA DE PAGAMENTO.
             *
             * Exemplo:
             *
             * if (plano === "avancado") {
             *     window.location.href = "pagamento.html?plano=avancado";
             * }
             */


        });

    });

});



const abrirModalProfessores =
    document.getElementById("abrirModalProfessores");

const fecharModalProfessores =
    document.getElementById("fecharModalProfessores");

const modalProfessores =
    document.getElementById("modalProfessores");

const professoresLista =
    document.getElementById("professoresLista");


/*
    Abre o modal de professores
*/

if (abrirModalProfessores) {

    abrirModalProfessores.addEventListener(
        "click",
        function () {

            modalProfessores.classList.add("ativo");

            modalProfessores.setAttribute(
                "aria-hidden",
                "false"
            );

            carregarProfessores();

        }
    );

}


/*
    Fecha o modal
*/

if (fecharModalProfessores) {

    fecharModalProfessores.addEventListener(
        "click",
        fecharModalProfessoresFunc
    );

}


function fecharModalProfessoresFunc() {

    modalProfessores.classList.remove("ativo");

    modalProfessores.setAttribute(
        "aria-hidden",
        "true"
    );

}


/*
    Fecha clicando no fundo escuro
*/

if (modalProfessores) {

    modalProfessores.addEventListener(
        "click",
        function (evento) {

            if (evento.target === modalProfessores) {

                fecharModalProfessoresFunc();

            }

        }
    );

}


/* =====================================================
   BUSCAR PROFESSORES DO BANCO
===================================================== */

async function carregarProfessores() {

    professoresLista.innerHTML = `

        <div class="professores-carregando">

            <div class="spinner"></div>

            <p>Carregando professores...</p>

        </div>

    `;


    try {

        const resposta = await fetch(
            "professores.php",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível buscar os professores."
            );

        }


        const professores =
            await resposta.json();


        /*
            Verifica se retornou um array
        */

        if (!Array.isArray(professores)) {

            throw new Error(
                "Resposta inválida do servidor."
            );

        }


        /*
            Nenhum professor cadastrado
        */

        if (professores.length === 0) {

            professoresLista.innerHTML = `

                <div class="sem-professores">

                    <strong>
                        Nenhum professor encontrado
                    </strong>

                    <span>
                        No momento não existem professores
                        cadastrados.
                    </span>

                </div>

            `;

            return;

        }


        /*
            Limpa a lista
        */

        professoresLista.innerHTML = "";


        /*
            Cria os cards
        */

        professores.forEach(
            function (professor) {

                const card =
                    criarCardProfessor(professor);

                professoresLista.appendChild(card);

            }
        );


    } catch (erro) {

        console.error(
            "Erro ao carregar professores:",
            erro
        );


        professoresLista.innerHTML = `

            <div class="sem-professores">

                <strong>
                    Não foi possível carregar os professores.
                </strong>

                <span>
                    Verifique a conexão com o servidor
                    e tente novamente.
                </span>

            </div>

        `;

    }

}


/* =====================================================
   CRIAR CARD DO PROFESSOR
===================================================== */

function criarCardProfessor(professor) {

    const card =
        document.createElement("div");

    card.className =
        "professor-card";


    /*
        Foto padrão caso o professor
        não tenha foto cadastrada.
    */

    const foto =
        professor.foto &&
        professor.foto.trim() !== ""
            ? professor.foto
            : "fotos/professor-padrao.png";


    /*
        Cria o HTML do professor
    */

    card.innerHTML = `

        <img
            class="professor-foto"
            src="${escaparHTML(foto)}"
            alt="Foto de ${escaparHTML(professor.nome)}"
            onerror="
                this.src='fotos/professor-padrao.png'
            "
        >


        <div class="professor-info">

            <h3>
                ${escaparHTML(professor.nome)}
            </h3>

            <p class="professor-especialidade">
                ${escaparHTML(
                    professor.especialidade ||
                    "Professor de Educação Física"
                )}
            </p>

            <p class="professor-telefone">
                📞 ${escaparHTML(
                    professor.telefone ||
                    "Telefone não informado"
                )}
            </p>

        </div>


        <button
            type="button"
            class="professor-conectar"
            data-professor-id="${escaparHTML(
                professor.id
            )}"
        >
            Conectar
        </button>

    `;


    /*
        Evento do botão
    */

    const botao =
        card.querySelector(
            ".professor-conectar"
        );


    botao.addEventListener(
        "click",
        function () {

            conectarProfessor(
                professor.id,
                professor.nome
            );

        }
    );


    return card;

}


/* =====================================================
   CONECTAR AO PROFESSOR
===================================================== */

async function conectarProfessor(
    professorId,
    professorNome
) {

    const confirmar =
        confirm(
            `Deseja se conectar ao professor ${professorNome}?`
        );


    if (!confirmar) {

        return;

    }


    try {

        const resposta =
            await fetch(
                "conectar-professor.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        professor_id:
                            professorId
                    })
                }
            );


        const resultado =
            await resposta.json();


        if (!resposta.ok || !resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                "Não foi possível realizar a conexão."
            );

        }


        alert(
            resultado.mensagem ||
            "Solicitação enviada com sucesso!"
        );


        fecharModalProfessoresFunc();


    } catch (erro) {

        console.error(erro);

        alert(
            erro.message ||
            "Erro ao conectar com o professor."
        );

    }

}


/* =====================================================
   PROTEÇÃO CONTRA HTML INJETADO
===================================================== */

function escaparHTML(valor) {

    if (valor === null ||
        valor === undefined) {

        return "";

    }


    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

