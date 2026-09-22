// =====================================================
// CONFIGURAÇÃO DA API
// =====================================================

const API_URL = "http://localhost:3000";


// =====================================================
// CADASTRO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const formCadastro =
        document.getElementById("formCadastro");

    if (!formCadastro) {
        return;
    }


    // Elementos

    const botoesTipo =
        document.querySelectorAll(".botao-escolha");

    const tipoInput =
        document.getElementById("tipoInput");

    const camposProfessor =
        document.getElementById("camposProfessor");

    const crefInput =
        document.getElementById("cref");

    const especialidadeInput =
        document.getElementById("especialidade");

    const curriculoInput =
        document.getElementById("curriculo");

    const bachareladoInput =
        document.getElementById("bacharelado");

    const formacaoAcademicaInput =
        document.getElementById("formacao_academica");


    // =================================================
    // ESCOLHER ALUNO OU PROFESSOR
    // =================================================

    botoesTipo.forEach(botao => {

        botao.addEventListener("click", () => {

            botoesTipo.forEach(item => {

                item.classList.remove("ativo");

            });


            botao.classList.add("ativo");


            const tipo =
                botao.dataset.tipo;


            tipoInput.value =
                tipo;


            // =========================================
            // PROFESSOR
            // =========================================

            if (tipo === "professor") {

                camposProfessor.style.display =
                    "block";


                crefInput.required =
                    true;


                especialidadeInput.required =
                    true;


                curriculoInput.required =
                    true;


                bachareladoInput.required =
                    true;


                formacaoAcademicaInput.required =
                    true;

            }


            // =========================================
            // ALUNO
            // =========================================

            else {

                camposProfessor.style.display =
                    "none";


                crefInput.required =
                    false;


                especialidadeInput.required =
                    false;


                curriculoInput.required =
                    false;


                bachareladoInput.required =
                    false;


                formacaoAcademicaInput.required =
                    false;


                // Limpar campos do professor

                crefInput.value = "";

                especialidadeInput.value = "";

                curriculoInput.value = "";

                bachareladoInput.value = "";

                formacaoAcademicaInput.value = "";

            }

        });

    });


    // =================================================
    // ENVIAR CADASTRO
    // =================================================

    formCadastro.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // =========================================
            // PEGAR DADOS
            // =========================================

            const tipo =
                tipoInput.value;


            const nome =
                document
                    .getElementById("nome")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const telefone =
                document
                    .getElementById("telefone")
                    .value
                    .trim();


            const cpf =
                document
                    .getElementById("cpf")
                    .value
                    .trim();


            const senha =
                document
                    .getElementById("senha-cadastro")
                    .value;


            const confirmarSenha =
                document
                    .getElementById("confirmar-senha")
                    .value;


            // =========================================
            // VALIDAÇÕES
            // =========================================

            if (
                !nome ||
                !email ||
                !telefone ||
                !cpf ||
                !senha
            ) {

                alert(
                    "Preencha todos os campos obrigatórios."
                );

                return;
            }


            // Senha mínima

            if (senha.length < 6) {

                alert(
                    "A senha deve ter pelo menos 6 caracteres."
                );

                return;
            }


            // Confirmar senha

            if (senha !== confirmarSenha) {

                alert(
                    "As senhas não coincidem."
                );

                return;
            }


           // =====================================================
// CADASTRAR ALUNO
// =====================================================

async function cadastrarAluno(dados) {

    try {

        const resposta =
            await fetch(
                `${API_URL}/aluno/cadastro`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        nome: dados.nome,

                        email: dados.email,

                        senha: dados.senha,

                        telefone: dados.telefone,

                        cpf: dados.cpf

                    })

                }
            );


        const resultado =
            await resposta.json();


        console.log(
            "Resposta do cadastro:",
            resultado
        );


        // =================================================
        // ALUNO JÁ CADASTRADO
        // =================================================

        if (
            resultado.mensagem ===
            "E-mail ou CPF já cadastrado"
        ) {

            alert(
                "Aluno já cadastrado! O e-mail ou CPF informado já está cadastrado."
            );

            return;
        }


        // =================================================
        // ERRO
        // =================================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        // =================================================
        // SALVAR DADOS NO NAVEGADOR
        // =================================================

        localStorage.setItem(
            "nome_aluno",
            dados.nome
        );

        localStorage.setItem(
            "email_aluno",
            dados.email
        );

        localStorage.setItem(
            "telefone_aluno",
            dados.telefone
        );

        localStorage.setItem(
            "cpf_aluno",
            dados.cpf
        );


        // =================================================
        // SALVAR ID DO ALUNO
        // =================================================

        if (resultado.aluno) {

            localStorage.setItem(
                "id_aluno",
                resultado.aluno.id
            );

        }


        // =================================================
        // SUCESSO
        // =================================================

        alert(
            "Aluno cadastrado com sucesso!"
        );


        window.location.href =
            "login.html";

    }


    catch (erro) {

        console.error(
            "Erro ao cadastrar aluno:",
            erro
        );


        alert(
            "Não foi possível conectar ao servidor."
        );

    }

}


            // =========================================
            // CADASTRAR PROFESSOR
            // =========================================

            if (tipo === "professor") {

                const cref =
                    crefInput.value.trim();


                const especialidade =
                    especialidadeInput.value.trim();


                const curriculo =
                    curriculoInput.value.trim();


                const bacharelado =
                    bachareladoInput.value.trim();


                const formacaoAcademica =
                    formacaoAcademicaInput.value.trim();


                // Verificar campos

                if (
                    !cref ||
                    !especialidade ||
                    !curriculo ||
                    !bacharelado ||
                    !formacaoAcademica
                ) {

                    alert(
                        "Preencha todos os campos do professor."
                    );

                    return;
                }


                await cadastrarProfessor({

                    nome: nome,

                    email: email,

                    senha: senha,

                    telefone: telefone,

                    cpf: cpf,

                    cref: cref,

                    especialidade:
                        especialidade,

                    curriculo:
                        curriculo,

                    bacharelado:
                        bacharelado,

                    formacao_academica:
                        formacaoAcademica

                });

            }

        }
    );

});


// =====================================================
// CADASTRAR ALUNO
// POST /aluno/cadastro
// =====================================================

async function cadastrarAluno(dados) {

    try {

        const resposta =
            await fetch(
                `${API_URL}/aluno/cadastro`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        nome:
                            dados.nome,

                        email:
                            dados.email,

                        senha:
                            dados.senha,

                        telefone:
                            dados.telefone,

                        cpf:
                            dados.cpf

                    })

                }
            );


        const resultado =
            await resposta.json();


        console.log(
            "Resposta do cadastro do aluno:",
            resultado
        );


        // =============================================
        // ALUNO JÁ CADASTRADO
        // =============================================

        if (
            resultado.mensagem ===
            "E-mail ou CPF já cadastrado"
        ) {

            alert(
                "Aluno já cadastrado! O e-mail ou CPF informado já está cadastrado."
            );

            return;
        }


        // =============================================
        // OUTRO ERRO
        // =============================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        if (!resultado.aluno) {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        // =============================================
        // SUCESSO
        // =============================================

        alert(
            "Aluno cadastrado com sucesso!"
        );


        window.location.href =
            "login.html";

    }


    catch (erro) {

        console.error(
            "Erro ao cadastrar aluno:",
            erro
        );


        alert(
            "Não foi possível conectar ao servidor."
        );

    }

}


// =====================================================
// CADASTRAR PROFESSOR
// POST /professor/cadastro
// =====================================================

async function cadastrarProfessor(dados) {

    try {

        const resposta =
            await fetch(
                `${API_URL}/professor/cadastro`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                   body: JSON.stringify({

    nome: dados.nome,

    email: dados.email,

    senha: dados.senha,

    telefone: dados.telefone,

    cpf: dados.cpf,

    crf: dados.cref,

    registro_cref: dados.cref,

    especialidade: dados.especialidade,

    curriculo: dados.curriculo,

    bacharelado: dados.bacharelado,

    formacao_academica: dados.formacao_academica,

    status: "ativo"

})

                }
            );


        const resultado =
            await resposta.json();


        console.log(
            "Resposta do cadastro do professor:",
            resultado
        );


        // =============================================
        // PROFESSOR JÁ CADASTRADO
        // =============================================

        if (
            resultado.mensagem ===
            "E-mail ou CREF já cadastrado"
        ) {

            alert(
                "Professor já cadastrado! O e-mail ou CREF informado já está cadastrado."
            );

            return;
        }


        if (
            resultado.mensagem ===
            "E-mail já cadastrado"
        ) {

            alert(
                "Esse e-mail já está cadastrado."
            );

            return;
        }


        // =============================================
        // ERRO HTTP
        // =============================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        // =============================================
        // CADASTRO NÃO REALIZADO
        // =============================================

        if (!resultado.professor) {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        // =============================================
        // SUCESSO
        // =============================================

        alert(
            "Professor cadastrado com sucesso!"
        );


        window.location.href =
            "login.html";

    }


    catch (erro) {

        console.error(
            "Erro ao cadastrar professor:",
            erro
        );


        alert(
            "Não foi possível conectar ao servidor."
        );

    }

}


// =====================================================
// LOGIN DO ALUNO
// POST /aluno/login
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const formLogin =
        document.getElementById("formLogin");


    if (!formLogin) {
        return;
    }


    formLogin.addEventListener(
        "submit",
        async (event) => {

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


            // =========================================
            // VALIDAÇÃO
            // =========================================

            if (!email || !senha) {

                alert(
                    "Preencha o e-mail e a senha."
                );

                return;
            }


            try {

                const resposta =
                    await fetch(
                        `${API_URL}/aluno/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                email:
                                    email,

                                senha:
                                    senha

                            })

                        }
                    );


                const resultado =
                    await resposta.json();


                console.log(
                    "Resposta do login:",
                    resultado
                );


                // =====================================
                // LOGIN INCORRETO
                // =====================================

                if (
                    !resposta.ok ||
                    !resultado.aluno
                ) {

                    alert(
                        resultado.mensagem ||
                        "E-mail ou senha incorretos."
                    );

                    return;
                }


                // =====================================
                // SALVAR DADOS
                // =====================================

                localStorage.setItem(
                    "id_aluno",
                    resultado.aluno.id
                );


                localStorage.setItem(
                    "nome_aluno",
                    resultado.aluno.nome
                );


                localStorage.setItem(
                    "email_aluno",
                    resultado.aluno.email
                );


                // =====================================
                // SUCESSO
                // =====================================

                alert(
                    "Login realizado com sucesso!"
                );


                window.location.href =
                    "areaCliente.html";

            }


            catch (erro) {

                console.error(
                    "Erro no login:",
                    erro
                );


                alert(
                    "Não foi possível conectar ao servidor."
                );

            }

        }
    );

});


// =====================================================
// PROTEÇÃO DA ÁREA DO CLIENTE
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop();


    if (
        paginaAtual !==
        "areaCliente.html"
    ) {
        return;
    }


    const idAluno =
        localStorage.getItem(
            "id_aluno"
        );


    // =============================================
    // NÃO ESTÁ LOGADO
    // =============================================

    if (!idAluno) {

        alert(
            "Você precisa fazer login para acessar a área do cliente."
        );


        window.location.href =
            "login.html";


        return;
    }


    // =============================================
    // MOSTRAR NOME
    // =============================================

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

});


// =====================================================
// LISTAR PROFESSORES
// GET /professor
// =====================================================

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

        const resposta =
            await fetch(
                `${API_URL}/professor`
            );


        const professores =
            await resposta.json();


        console.log(
            "Professores recebidos:",
            professores
        );


        // =========================================
        // NENHUM PROFESSOR
        // =========================================

        if (
            !Array.isArray(professores) ||
            professores.length === 0
        ) {

            listaProfessores.innerHTML =
                "<p>Nenhum professor cadastrado.</p>";

            return;
        }


        listaProfessores.innerHTML =
            "";


        // =========================================
        // CRIAR CARDS
        // =========================================

        professores.forEach(professor => {

            const card =
                document.createElement(
                    "div"
                );


            card.classList.add(
                "card-professor"
            );


            const idProfessor =
                professor.id ||
                professor.id_professor;


            const cref =
                professor.crf ||
                professor.registro_cref ||
                "";


            card.innerHTML = `

                <div class="professor-info">

                    <h3>
                        ${professor.nome}
                    </h3>

                    <p>
                        ${professor.email}
                    </p>

                    ${
                        cref
                            ? `
                                <p>
                                    CREF: ${cref}
                                </p>
                              `
                            : ""
                    }

                    ${
                        professor.especialidade
                            ? `
                                <p>
                                    Especialidade:
                                    ${professor.especialidade}
                                </p>
                              `
                            : ""
                    }

                </div>

                <button
                    type="button"
                    class="btn-conectar-professor"
                    data-id="${idProfessor}"
                >
                    Se conectar
                </button>

            `;


            listaProfessores.appendChild(
                card
            );

        });


        // =========================================
        // BOTÕES SE CONECTAR
        // =========================================

        const botoes =
            document.querySelectorAll(
                ".btn-conectar-professor"
            );


        botoes.forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    const idProfessor =
                        botao.dataset.id;


                    conectarProfessor(
                        Number(idProfessor)
                    );

                }
            );

        });

    }


    catch (erro) {

        console.error(
            "Erro ao carregar professores:",
            erro
        );


        listaProfessores.innerHTML =
            "<p>Não foi possível carregar os professores.</p>";

    }

}


// =====================================================
// CONECTAR ALUNO AO PROFESSOR
// POST /professor-aluno
// =====================================================

async function conectarProfessor(
    idProfessor
) {

    const idAluno =
        localStorage.getItem(
            "id_aluno"
        );


    // =============================================
    // NÃO ESTÁ LOGADO
    // =============================================

    if (!idAluno) {

        alert(
            "Faça login para se conectar a um professor."
        );


        window.location.href =
            "login.html";


        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/professor-aluno`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

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
            await resposta.json();


        console.log(
            "Resposta da conexão:",
            resultado
        );


        alert(
            resultado.mensagem ||
            "Solicitação enviada."
        );

    }


    catch (erro) {

        console.error(
            "Erro ao conectar professor:",
            erro
        );


        alert(
            "Não foi possível realizar a conexão."
        );

    }

}


// =====================================================
// ABRIR MODAL DE PROFESSORES
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const abrirModalProfessores =
        document.getElementById(
            "abrirModalProfessores"
        );


    if (!abrirModalProfessores) {
        return;
    }


    abrirModalProfessores.addEventListener(
        "click",
        () => {

            carregarProfessores();

        }
    );

});

// =====================================================
// MEUS DADOS - ÁREA DO CLIENTE
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const dadosNome =
        document.getElementById("dadosNome");

    const dadosEmail =
        document.getElementById("dadosEmail");

    const dadosTelefone =
        document.getElementById("dadosTelefone");

    const dadosCpf =
        document.getElementById("dadosCpf");


    // ================================================
    // VERIFICAR SE ESTAMOS NA ÁREA DO CLIENTE
    // ================================================

    if (
        !dadosNome ||
        !dadosEmail ||
        !dadosTelefone ||
        !dadosCpf
    ) {
        return;
    }


    // ================================================
    // PEGAR DADOS DO LOCALSTORAGE
    // ================================================

    const nome =
        localStorage.getItem(
            "nome_aluno"
        );

    const email =
        localStorage.getItem(
            "email_aluno"
        );

    const telefone =
        localStorage.getItem(
            "telefone_aluno"
        );

    const cpf =
        localStorage.getItem(
            "cpf_aluno"
        );


    // ================================================
    // MOSTRAR DADOS
    // ================================================

    dadosNome.textContent =
        nome || "Não informado";


    dadosEmail.textContent =
        email || "Não informado";


    dadosTelefone.textContent =
        telefone || "Não informado";


    dadosCpf.textContent =
        cpf || "Não informado";

});


