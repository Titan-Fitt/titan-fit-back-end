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


/* =====================================================
   MODAL DE PROFESSORES
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const abrirModalProfessores =
        document.getElementById("abrirModalProfessores");

    const fecharModalProfessores =
        document.getElementById("fecharModalProfessores");

    const modalProfessores =
        document.getElementById("modalProfessores");

    const listaProfessores =
        document.getElementById("listaProfessores");


    /* =====================================================
       ABRIR MODAL
    ===================================================== */

    if (abrirModalProfessores) {

        abrirModalProfessores.addEventListener("click", function () {

            modalProfessores.classList.add("ativo");

            document.body.style.overflow = "hidden";

            carregarProfessores();

        });

    }


    /* =====================================================
       FECHAR MODAL PELO X
    ===================================================== */

    if (fecharModalProfessores) {

        fecharModalProfessores.addEventListener("click", function () {

            fecharModal();

        });

    }


    /* =====================================================
       FECHAR CLICANDO FORA
    ===================================================== */

    if (modalProfessores) {

        modalProfessores.addEventListener("click", function (event) {

            if (event.target === modalProfessores) {

                fecharModal();

            }

        });

    }


    /* =====================================================
       FECHAR COM ESC
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modalProfessores &&
            modalProfessores.classList.contains("ativo")
        ) {

            fecharModal();

        }

    });


    /* =====================================================
       FUNÇÃO PARA FECHAR O MODAL
    ===================================================== */

    function fecharModal() {

        if (modalProfessores) {

            modalProfessores.classList.remove("ativo");

        }

        document.body.style.overflow = "";

    }


    /* =====================================================
       BUSCAR PROFESSORES NO NESTJS
    ===================================================== */

    async function carregarProfessores() {

        if (!listaProfessores) {
            return;
        }

        // Mostra carregando enquanto consulta o NestJS
        listaProfessores.innerHTML = `
            <div class="sem-professores">
                Carregando professores...
            </div>
        `;

        try {

            /*
             * ENDPOINT DO SEU BACK-END NESTJS
             *
             * Exemplo:
             * GET http://localhost:3000/professores
             */

            const resposta = await fetch(
                "http://localhost:3000/professores"
            );


            /* =================================================
               VERIFICAR RESPOSTA
            ================================================= */

            if (!resposta.ok) {

                throw new Error(
                    "Erro ao consultar professores."
                );

            }


            /* =================================================
               CONVERTER RESPOSTA PARA JSON
            ================================================= */

            const professores = await resposta.json();


            /* =================================================
               NÃO EXISTE NENHUM PROFESSOR
            ================================================= */

            if (
                !professores ||
                professores.length === 0
            ) {

                listaProfessores.innerHTML = `
                    <div class="sem-professores">
                        Sem professores no momento
                    </div>
                `;

                return;

            }


            /* =================================================
               LIMPAR LISTA
            ================================================= */

            listaProfessores.innerHTML = "";


            /* =================================================
               CRIAR CARDS
            ================================================= */

            professores.forEach(function (professor) {

                const card =
                    document.createElement("div");

                card.classList.add("professor-card");


                card.innerHTML = `

                    <div class="professor-info">

                        <div class="professor-avatar">
                            👨‍🏫
                        </div>

                        <div>

                            <h3>
                                ${professor.nome}
                            </h3>

                            <p>
                                ${
                                    professor.especialidade ||
                                    "Personal Trainer"
                                }
                            </p>

                            <span>
                                ${
                                    professor.telefone ||
                                    "Professor disponível"
                                }
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="professor-botao"
                    >
                        SE CONECTAR
                    </button>

                `;


                /* =================================================
                   BOTÃO CONECTAR
                ================================================= */

                const botao =
                    card.querySelector(".professor-botao");


                botao.addEventListener(
                    "click",
                    function () {

                        conectarProfessor(
                            professor.id
                        );

                    }
                );


                listaProfessores.appendChild(card);

            });


        } catch (erro) {

            console.error(
                "Erro ao carregar professores:",
                erro
            );


            listaProfessores.innerHTML = `
                <div class="sem-professores">
                    Não foi possível carregar os professores.
                </div>
            `;

        }

    }


    /* =====================================================
       CONECTAR COM PROFESSOR
    ===================================================== */

    async function conectarProfessor(idProfessor) {

        try {

            /*
             * Envia o ID do professor para o NestJS
             *
             * POST /conexoes
             */

            const resposta = await fetch(
                "http://localhost:3000/conexoes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        professorId: idProfessor
                    })
                }
            );


            /* =================================================
               VERIFICAR RESPOSTA
            ================================================= */

            if (!resposta.ok) {

                throw new Error(
                    "Não foi possível conectar ao professor."
                );

            }


            /* =================================================
               SUCESSO
            ================================================= */

            alert(
                "Professor conectado com sucesso!"
            );


            fecharModal();


        } catch (erro) {

            console.error(
                "Erro ao conectar professor:",
                erro
            );


            alert(
                "Erro ao conectar com o professor."
            );

        }

    }

});