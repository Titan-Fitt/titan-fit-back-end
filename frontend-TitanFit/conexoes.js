
/* =====================================================
   TITAN FIT - CONEXOES.JS
   Conexão com o Back-end / API
===================================================== */

const API_URL = "http://localhost:3000";


/* =====================================================
   MODAL
===================================================== */

function mostrarModal(mensagem, aoFechar) {
    const modal = document.getElementById("modalMensagem");
    const mensagemModal = document.getElementById("mensagemModal");

    if (!modal || !mensagemModal) {
        alert(mensagem);

        if (aoFechar) {
            aoFechar();
        }

        return;
    }

    mensagemModal.textContent = mensagem;
    modal.classList.add("ativo");

    const botaoFechar = modal.querySelector(".fechar-modal");

    if (botaoFechar) {
        botaoFechar.onclick = function () {
            modal.classList.remove("ativo");

            if (aoFechar) {
                aoFechar();
            }
        };
    }
}


/* =====================================================
   LER RESPOSTA DA API
===================================================== */

async function lerResposta(resposta) {
    const texto = await resposta.text();

    try {
        return JSON.parse(texto);
    } catch {
        return {
            mensagem: texto || "Resposta inválida do servidor."
        };
    }
}


/* =====================================================
   AUTENTICAÇÃO
===================================================== */

function obterToken() {
    return localStorage.getItem("token");
}


function obterIdAluno() {
    return localStorage.getItem("id_aluno");
}


function obterHeadersAutenticacao() {
    const token = obterToken();

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}


/* =====================================================
   SALVAR DADOS DO ALUNO
===================================================== */

function salvarDadosAluno(aluno) {
    localStorage.setItem("id_aluno", aluno.id);
    localStorage.setItem("nome_aluno", aluno.nome);
    localStorage.setItem("email_aluno", aluno.email);

    if (aluno.cpf) {
        localStorage.setItem("cpf_aluno", aluno.cpf);
    }
}


/* =====================================================
   ESCOLHA DO TIPO DE CADASTRO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const botoesEscolha =
        document.querySelectorAll(".botao-escolha");

    const tipoInput =
        document.getElementById("tipoInput");

    const camposProfessor =
        document.getElementById("camposProfessor");

    if (!tipoInput) {
        return;
    }

    botoesEscolha.forEach((botao) => {

        botao.addEventListener("click", () => {

            botoesEscolha.forEach((item) => {
                item.classList.remove("ativo");
            });

            botao.classList.add("ativo");

            const tipo = botao.dataset.tipo;

            tipoInput.value = tipo;

            if (camposProfessor) {
                if (tipo === "professor") {
                    camposProfessor.style.display = "block";
                } else {
                    camposProfessor.style.display = "none";
                }
            }
        });

    });

});


/* =====================================================
   CADASTRO
===================================================== */

const formCadastro =
    document.getElementById("formCadastro");

if (formCadastro) {

    formCadastro.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nome =
            document.getElementById("nome")?.value.trim();

        const email =
            document.getElementById("email")?.value.trim();

        const senha =
            document.getElementById("senha")?.value;

        const tipo =
            document.getElementById("tipoInput")?.value;

        if (!nome || !email || !senha) {
            mostrarModal(
                "Preencha todos os campos obrigatórios."
            );
            return;
        }

        try {

            let resposta;

            /* =================================================
               CADASTRO DO PROFESSOR
            ================================================= */

            if (tipo === "professor") {

                const registro_cref =
                    document
                        .getElementById("registro_cref")
                        ?.value.trim();

                const especialidade =
                    document
                        .getElementById("especialidade")
                        ?.value.trim();

                const curriculo =
                    document
                        .getElementById("curriculo")
                        ?.value.trim();

                const bacharelado =
                    document
                        .getElementById("bacharelado")
                        ?.value.trim();

                const formacao_academica =
                    document
                        .getElementById("formacao_academica")
                        ?.value.trim();

                resposta = await fetch(
                    `${API_URL}/professor/cadastro`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            nome,
                            email,
                            senha,
                            registro_cref,
                            especialidade,
                            curriculo,
                            bacharelado,
                            formacao_academica,
                            status: "ativo"
                        })
                    }
                );

            }

            /* =================================================
               CADASTRO DO ALUNO
            ================================================= */

            else {

                const cpf =
                    document
                        .getElementById("cpf")
                        ?.value.trim();

                resposta = await fetch(
                    `${API_URL}/aluno/cadastro`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            nome,
                            email,
                            senha,
                            cpf
                        })
                    }
                );

            }

            const resultado =
                await lerResposta(resposta);

            if (!resposta.ok) {

                mostrarModal(
                    resultado.mensagem ||
                    "Erro ao realizar cadastro."
                );

                return;
            }

            mostrarModal(
                resultado.mensagem ||
                "Cadastro realizado com sucesso!",
                function () {
                    window.location.href =
                        "login.html";
                }
            );

        } catch (erro) {

            console.error(
                "Erro no cadastro:",
                erro
            );

            mostrarModal(
                "Não foi possível conectar ao servidor."
            );
        }

    });

}


/* =====================================================
   LOGIN — SELEÇÃO ALUNO / PROFESSOR
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const botoesTipoLogin =
        document.querySelectorAll(".botao-tipo");

    const tipoLogin =
        document.getElementById("tipoLogin");

    if (!tipoLogin) {
        return;
    }

    botoesTipoLogin.forEach((botao) => {

        botao.addEventListener("click", () => {

            botoesTipoLogin.forEach((item) => {
                item.classList.remove("ativo");
            });

            botao.classList.add("ativo");

            tipoLogin.value =
                botao.dataset.tipo;

            console.log(
                "Tipo de login selecionado:",
                tipoLogin.value
            );

        });

    });

});


/* =====================================================
   LOGIN — ALUNO E PROFESSOR
===================================================== */

const formLogin =
    document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("username-email")
                    .value
                    .trim();

            const senha =
                document
                    .getElementById("senha")
                    .value;

            const tipoLogin =
                document
                    .getElementById("tipoLogin")
                    .value;

            if (!email || !senha) {

                mostrarModal(
                    "Preencha o e-mail e a senha."
                );

                return;
            }

            try {

                let resposta;

                /* =================================================
                   LOGIN DO PROFESSOR
                ================================================= */

                if (tipoLogin === "professor") {

                    resposta = await fetch(
                        `${API_URL}/professor/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                senha
                            })
                        }
                    );

                }

                /* =================================================
                   LOGIN DO ALUNO
                ================================================= */

                else {

                    resposta = await fetch(
                        `${API_URL}/auth/aluno`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                senha
                            })
                        }
                    );

                }

                const resultado =
                    await lerResposta(resposta);

                console.log(
                    "Resposta do login:",
                    resultado
                );

                if (!resposta.ok) {

                    mostrarModal(
                        resultado.mensagem ||
                        "E-mail ou senha incorretos."
                    );

                    return;
                }

                if (!resultado.token) {

                    mostrarModal(
                        resultado.mensagem ||
                        "Token não recebido pelo servidor."
                    );

                    return;
                }

                /* =================================================
                   SALVA TOKEN
                ================================================= */

                localStorage.setItem(
                    "token",
                    resultado.token
                );


                /* =================================================
                   LOGIN DO PROFESSOR
                ================================================= */

                if (tipoLogin === "professor") {

                    if (!resultado.professor) {

                        mostrarModal(
                            "Dados do professor não foram recebidos."
                        );

                        return;
                    }

                    localStorage.setItem(
                        "id_professor",
                        resultado.professor.id
                    );

                    localStorage.setItem(
                        "nome_professor",
                        resultado.professor.nome
                    );

                    localStorage.setItem(
                        "email_professor",
                        resultado.professor.email
                    );

                    window.location.href =
                        "areaClienteProfessor.html";

                }


                /* =================================================
                   LOGIN DO ALUNO
                ================================================= */

                else {

                    if (!resultado.aluno) {

                        mostrarModal(
                            "Dados do aluno não foram recebidos."
                        );

                        return;
                    }

                    salvarDadosAluno(
                        resultado.aluno
                    );

                    window.location.href =
                        "areaCliente.html";
                }

            } catch (erro) {

                console.error(
                    "Erro no login:",
                    erro
                );

                mostrarModal(
                    "Não foi possível conectar ao servidor."
                );
            }

        }
    );

}


/* =====================================================
   CARREGAR PROFESSORES
===================================================== */

async function carregarProfessores() {

    const listaProfessores =
        document.getElementById(
            "listaProfessores"
        );

    if (!listaProfessores) {
        return;
    }

    listaProfessores.innerHTML =
        "<p>Carregando professores...</p>";

    try {

        /* =================================================
           IMPORTANTE:
           O GET /professor É PROTEGIDO PELO AuthGuard.
           Por isso precisamos enviar o TOKEN.
        ================================================= */

        const resposta =
            await fetch(
                `${API_URL}/professor`,
                {
                    method: "GET",
                    headers:
                        obterHeadersAutenticacao()
                }
            );

        const professores =
            await lerResposta(resposta);

        console.log(
            "Professores recebidos:",
            professores
        );

        if (!resposta.ok) {

            listaProfessores.innerHTML =
                `<p>${professores.mensagem ||
                "Erro ao carregar professores."}</p>`;

            return;
        }

        if (
            !Array.isArray(professores) ||
            professores.length === 0
        ) {

            listaProfessores.innerHTML =
                "<p>Nenhum professor cadastrado.</p>";

            return;
        }

        listaProfessores.innerHTML = "";

        professores.forEach((professor) => {

            const card =
                document.createElement("div");

            card.className =
                "card-professor";

            card.innerHTML = `
                <h3>${professor.nome}</h3>

                <p>
                    <strong>Especialidade:</strong>
                    ${professor.especialidade || "Não informado"}
                </p>

                <p>
                    <strong>CREF:</strong>
                    ${professor.registro_cref || "Não informado"}
                </p>

                <p>
                    <strong>Formação:</strong>
                    ${professor.formacao_academica || "Não informado"}
                </p>

                <p>
                    <strong>Currículo:</strong>
                    ${professor.curriculo || "Não informado"}
                </p>

                <button
                    type="button"
                    onclick="conectarProfessor(${professor.id_professor})"
                >
                    Conectar
                </button>
            `;

            listaProfessores.appendChild(card);

        });

    } catch (erro) {

        console.error(
            "Erro ao carregar professores:",
            erro
        );

        listaProfessores.innerHTML =
            "<p>Não foi possível carregar os professores.</p>";
    }
}


/* =====================================================
   ABRIR MODAL DE PROFESSORES
===================================================== */

const botaoProfessores =
    document.getElementById(
        "abrirModalProfessores"
    );

if (botaoProfessores) {

    botaoProfessores.addEventListener(
        "click",
        function () {

            const modal =
                document.getElementById(
                    "modalProfessores"
                );

            if (modal) {
                modal.classList.add("ativo");
            }

            carregarProfessores();

        }
    );

}


/* =====================================================
   CONECTAR ALUNO COM PROFESSOR
===================================================== */

async function conectarProfessor(idProfessor) {

    const idAluno =
        obterIdAluno();

    if (!idAluno) {

        mostrarModal(
            "Aluno não identificado. Faça login novamente."
        );

        return;
    }

    try {

        const resposta =
            await fetch(
                `${API_URL}/professor-aluno`,
                {
                    method: "POST",
                    headers:
                        obterHeadersAutenticacao(),

                    body: JSON.stringify({
                        id_professor:
                            Number(idProfessor),

                        id_aluno:
                            Number(idAluno),

                        status:
                            "pendente"
                    })
                }
            );

        const resultado =
            await lerResposta(resposta);

        console.log(
            "Resposta conexão professor:",
            resultado
        );

        if (!resposta.ok) {

            mostrarModal(
                resultado.mensagem ||
                "Não foi possível solicitar a conexão."
            );

            return;
        }

        mostrarModal(
            resultado.mensagem ||
            "Solicitação enviada com sucesso!"
        );

    } catch (erro) {

        console.error(
            "Erro ao conectar professor:",
            erro
        );

        mostrarModal(
            "Não foi possível conectar ao servidor."
        );
    }
}


/* =====================================================
   PROTEÇÃO DA ÁREA DO CLIENTE
===================================================== */

if (
    window.location.pathname.includes(
        "areaCliente.html"
    )
) {

    const token =
        localStorage.getItem("token");

    const idAluno =
        localStorage.getItem("id_aluno");

    if (!token || !idAluno) {

        window.location.href =
            "login.html";

    } else {

        const nomeAluno =
            localStorage.getItem(
                "nome_aluno"
            );

        const elementoNome =
            document.getElementById(
                "nomeAluno"
            );

        if (
            elementoNome &&
            nomeAluno
        ) {

            elementoNome.textContent =
                `Olá, ${nomeAluno}`;

        }

    }

}


/* =====================================================
   DADOS DO ALUNO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const nome =
            localStorage.getItem(
                "nome_aluno"
            );

        const email =
            localStorage.getItem(
                "email_aluno"
            );

        const elementoNome =
            document.getElementById(
                "dadosNome"
            );

        const elementoEmail =
            document.getElementById(
                "dadosEmail"
            );

        if (elementoNome && nome) {
            elementoNome.textContent =
                nome;
        }

        if (elementoEmail && email) {
            elementoEmail.textContent =
                email;
        }

    }
);


/* =====================================================
   FICHA DO ALUNO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const peso =
            localStorage.getItem(
                "fichaPeso"
            );

        const idade =
            localStorage.getItem(
                "fichaIdade"
            );

        const altura =
            localStorage.getItem(
                "fichaAltura"
            );

        const objetivo =
            localStorage.getItem(
                "fichaObjetivo"
            );

        const elementoPeso =
            document.getElementById(
                "fichaPeso"
            );

        const elementoIdade =
            document.getElementById(
                "fichaIdade"
            );

        const elementoAltura =
            document.getElementById(
                "fichaAltura"
            );

        const elementoObjetivo =
            document.getElementById(
                "fichaObjetivo"
            );

        if (elementoPeso) {
            elementoPeso.textContent =
                peso || "Não informado";
        }

        if (elementoIdade) {
            elementoIdade.textContent =
                idade || "Não informado";
        }

        if (elementoAltura) {
            elementoAltura.textContent =
                altura || "Não informado";
        }

        if (elementoObjetivo) {
            elementoObjetivo.textContent =
                objetivo || "Não informado";
        }

    }
);

