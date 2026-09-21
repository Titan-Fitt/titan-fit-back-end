/* =====================================================
   TITAN FIT - INTERACAO.JS
   Somente animações e interações visuais.
   Nenhuma conexão com o back-end/API.
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */

function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("active");
    }
}


/* =====================================================
   ANIMAÇÃO - SOBRE NÓS HOME
===================================================== */

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


/* =====================================================
   ANIMAÇÃO - PLANOS HOME
===================================================== */

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


/* =====================================================
   ANIMAÇÃO - SERVIÇOS HOME
===================================================== */

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


/* =====================================================
   CARD CENTRAL - PÁGINA DE PLANOS
===================================================== */

const cardsContainer = document.querySelector(".pagina-planos-cards");
const cardsPlanos = document.querySelectorAll(".pagina-plano-card");

function destacarCardCentral() {
    if (!cardsContainer || cardsPlanos.length === 0) {
        return;
    }

    const centroTela = window.innerWidth / 2;

    let cardMaisCentral = null;
    let menorDistancia = Infinity;

    cardsPlanos.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centroCard = rect.left + rect.width / 2;
        const distancia = Math.abs(centroTela - centroCard);

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            cardMaisCentral = card;
        }
    });

    cardsPlanos.forEach((card) => {
        card.classList.remove("ativo");
    });

    if (cardMaisCentral) {
        cardMaisCentral.classList.add("ativo");
    }
}

if (cardsContainer && cardsPlanos.length > 0) {
    cardsContainer.addEventListener("scroll", destacarCardCentral);
    window.addEventListener("resize", destacarCardCentral);
    window.addEventListener("load", destacarCardCentral);
}


/* =====================================================
   ANIMAÇÃO DE ENTRADA - PLANOS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".pagina-plano-card");
    const secaoPlanos = document.querySelector(".pagina-planos-cards");

    if (secaoPlanos && cards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
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


/* =====================================================
   ANIMAÇÃO - PAGAMENTO
===================================================== */

const pagamento = document.querySelector(".pagina-pagamento");

if (pagamento) {
    const observerPagamento = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                pagamento.classList.add("animar");
                observerPagamento.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observerPagamento.observe(pagamento);
}


/* =====================================================
   CADASTRO - ESCOLHA PROFESSOR / USUÁRIO
   Apenas interação visual do formulário.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".botao-escolha");
    const camposProfessor = document.getElementById("camposProfessor");
    const tipoInput = document.getElementById("tipoInput");

    if (botoes.length === 0) {
        return;
    }

    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {

            botoes.forEach((b) => {
                b.classList.remove("ativo");
            });

            botao.classList.add("ativo");

            const tipo = botao.dataset.tipo;

            if (tipoInput) {
                tipoInput.value = tipo;
            }

            if (camposProfessor) {
                camposProfessor.style.display =
                    tipo === "professor" ? "block" : "none";
            }
        });
    });
});


/* =====================================================
   MENU MOBILE - CONTROLE ALTERNATIVO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector("#menu");
    const botaoAbrirMenu = document.querySelector(".menu-toggle");
    const botaoFecharMenu = document.querySelector(".close-menu");

    function alternarMenu() {
        if (!menu) {
            return;
        }

        const menuEstaAberto = menu.classList.toggle("aberto");

        if (botaoAbrirMenu) {
            botaoAbrirMenu.setAttribute(
                "aria-expanded",
                String(menuEstaAberto)
            );
        }
    }

    if (botaoAbrirMenu) {
        botaoAbrirMenu.addEventListener("click", alternarMenu);
    }

    if (botaoFecharMenu) {
        botaoFecharMenu.addEventListener("click", alternarMenu);
    }
});


/* =====================================================
   ACORDEÃO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const titulosAcordeon = document.querySelectorAll(
        ".acordeon-titulo"
    );

    titulosAcordeon.forEach((titulo) => {
        titulo.addEventListener("click", () => {

            const itemAtual = titulo.closest(".acordeon-item");

            if (!itemAtual) {
                return;
            }

            const acordeonAtual = itemAtual.closest(".acordeon");

            if (!acordeonAtual) {
                return;
            }

            const itemEstaAtivo =
                itemAtual.classList.contains("ativo");

            acordeonAtual
                .querySelectorAll(".acordeon-item")
                .forEach((item) => {

                    item.classList.remove("ativo");

                    const botao = item.querySelector(
                        ".acordeon-titulo"
                    );

                    if (botao) {
                        botao.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                });

            if (!itemEstaAtivo) {

                itemAtual.classList.add("ativo");

                titulo.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        });
    });
});


/* =====================================================
   MODAL DE PLANOS
   Apenas abrir, fechar e selecionar visualmente.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const modalPlanos =
        document.getElementById("modalPlanos");

    const abrirModal =
        document.getElementById("abrirModalPlanos");

    const fecharModal =
        document.getElementById("fecharModalPlanos");


    function fecharModalPlanos() {

        if (!modalPlanos) {
            return;
        }

        modalPlanos.classList.remove("ativo");

        document.body.style.overflow = "";
    }


    if (abrirModal && modalPlanos) {

        abrirModal.addEventListener("click", () => {

            modalPlanos.classList.add("ativo");

            document.body.style.overflow = "hidden";

        });
    }


    if (fecharModal) {

        fecharModal.addEventListener(
            "click",
            fecharModalPlanos
        );

    }


    if (modalPlanos) {

        modalPlanos.addEventListener("click", (event) => {

            if (event.target === modalPlanos) {
                fecharModalPlanos();
            }

        });

    }


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modalPlanos &&
            modalPlanos.classList.contains("ativo")
        ) {

            fecharModalPlanos();

        }

    });


    const botoesPlanos =
        document.querySelectorAll(".modal-plano-botao");


    botoesPlanos.forEach((botao) => {

        botao.addEventListener("click", () => {

            const plano =
                botao.getAttribute("data-plano");

            console.log(
                "Plano selecionado:",
                plano
            );

        });

    });

});


/* =====================================================
   MODAL DE PROFESSORES
   SOMENTE ABRIR E FECHAR.
   
   A busca dos professores e a conexão com o
   professor ficam no conexoes.js.
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const abrirModalProfessores =
        document.getElementById(
            "abrirModalProfessores"
        );

    const fecharModalProfessores =
        document.getElementById(
            "fecharModalProfessores"
        );

    const modalProfessores =
        document.getElementById(
            "modalProfessores"
        );


    function fecharModal() {

        if (!modalProfessores) {
            return;
        }

        modalProfessores.classList.remove("ativo");

        document.body.style.overflow = "";

    }


    if (
        abrirModalProfessores &&
        modalProfessores
    ) {

        abrirModalProfessores.addEventListener(
            "click",
            () => {

                modalProfessores.classList.add(
                    "ativo"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    if (fecharModalProfessores) {

        fecharModalProfessores.addEventListener(
            "click",
            fecharModal
        );

    }


    if (modalProfessores) {

        modalProfessores.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    modalProfessores
                ) {

                    fecharModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modalProfessores &&
                modalProfessores.classList.contains(
                    "ativo"
                )
            ) {

                fecharModal();

            }

        }
    );

});