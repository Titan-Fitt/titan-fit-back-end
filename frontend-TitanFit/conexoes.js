
const API_URL = "http://localhost:3000";


/* =====================================================
   LOGIN DO ALUNO
   POST /aluno/login
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("formLogin");

    if (!formLogin) {
        return;
    }


    formLogin.addEventListener("submit", async (event) => {

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


        if (!email || !senha) {

            alert("Preencha o e-mail e a senha.");

            return;
        }


        try {

            const resposta = await fetch(
                `${API_URL}/aluno/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                }
            );


            const resultado =
                await resposta.json();


            /*
                O seu NestJS atualmente retorna
                uma mensagem mesmo quando o login
                não é encontrado.

                Por isso verificamos se veio
                o objeto aluno.
            */

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


            /* =========================================
               LOGIN CORRETO
            ========================================= */

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


            alert(
                "Login realizado com sucesso!"
            );


            /*
                Só depois que o backend confirmou
                o login o usuário entra na área.
            */

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

    });

});


/* =====================================================
   PROTEÇÃO DA ÁREA DO CLIENTE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*
        Verifica se a página atual é
        areaCliente.html.
    */

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


    /*
        Procura o aluno que fez login.
    */

    const idAluno =
        localStorage.getItem("id_aluno");


    /*
        Se não existir id_aluno,
        significa que não houve login.
    */

    if (!idAluno) {

        alert(
            "Você precisa fazer login para acessar a área do cliente."
        );


        window.location.href =
            "login.html";

    }

});


/* =====================================================
   BUSCAR PROFESSORES
   GET /professor
===================================================== */

async function carregarProfessores() {

    const listaProfessores =
        document.getElementById(
            "listaProfessores"
        );


    if (!listaProfessores) {
        return;
    }


    listaProfessores.innerHTML = `
        <div class="sem-professores">
            Carregando professores...
        </div>
    `;


    try {

        const resposta =
            await fetch(
                `${API_URL}/professor`
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar professores."
            );

        }


        const professores =
            await resposta.json();


        if (
            !professores ||
            professores.length === 0
        ) {

            listaProfessores.innerHTML = `
                <div class="sem-professores">
                    Sem professores no momento.
                </div>
            `;

            return;
        }


        listaProfessores.innerHTML = "";


        professores.forEach(
            function (professor) {

                const card =
                    document.createElement("div");


                card.classList.add(
                    "professor-card"
                );


                card.innerHTML = `

                    <div class="professor-info">

                        <h3>
                            ${professor.nome}
                        </h3>

                        <p>
                            CREF:
                            ${professor.crf || "Não informado"}
                        </p>

                        <p>
                            ${professor.telefone || "Telefone não informado"}
                        </p>

                    </div>


                    <button
                        type="button"
                        class="professor-botao"
                    >
                        SE CONECTAR
                    </button>

                `;


                const botao =
                    card.querySelector(
                        ".professor-botao"
                    );


                botao.addEventListener(
                    "click",
                    function () {

                        conectarProfessor(
                            professor.id
                        );

                    }
                );


                listaProfessores.appendChild(
                    card
                );

            }
        );

    }

    catch (erro) {

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
   CONECTAR ALUNO AO PROFESSOR
   POST /professor-aluno
===================================================== */

async function conectarProfessor(
    idProfessor
) {

    /*
        Pega o aluno que fez login.
    */

    const idAluno =
        Number(
            localStorage.getItem(
                "id_aluno"
            )
        );


    if (!idAluno) {

        alert(
            "Não foi possível identificar o aluno. Faça login novamente."
        );

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
                            idAluno,

                        status:
                            "pendente"

                    })
                }
            );


        const resultado =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                resultado.mensagem ||
                "Erro ao conectar professor."
            );

        }


        if (
            resultado.mensagem ===
            "Esse professor já está vinculado a esse aluno"
        ) {

            alert(
                "Você já está vinculado a esse professor."
            );

            return;
        }


        alert(
            "Professor vinculado ao aluno com sucesso!"
        );


        const modalProfessores =
            document.getElementById(
                "modalProfessores"
            );


        if (modalProfessores) {

            modalProfessores.classList.remove(
                "ativo"
            );

        }


        document.body.style.overflow = "";

    }

    catch (erro) {

        console.error(
            "Erro ao conectar com professor:",
            erro
        );


        alert(
            erro.message ||
            "Erro ao conectar com o professor."
        );

    }

}


/* =====================================================
   ABRIR MODAL E CARREGAR PROFESSORES
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

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

    }
);


// =====================================================
// CADASTRO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const formCadastro = document.getElementById("formCadastro");

    if (!formCadastro) {
        return;
    }


    // Elementos
    const botoesTipo = document.querySelectorAll(".botao-escolha");
    const tipoInput = document.getElementById("tipoInput");
    const camposProfessor = document.getElementById("camposProfessor");

    const crefInput = document.getElementById("cref");
    const especialidadeInput = document.getElementById("especialidade");


    // =================================================
    // ESCOLHER ALUNO OU PROFESSOR
    // =================================================

    botoesTipo.forEach(botao => {

        botao.addEventListener("click", () => {

            // Remove ativo dos dois botões
            botoesTipo.forEach(item => {
                item.classList.remove("ativo");
            });

            // Ativa o botão clicado
            botao.classList.add("ativo");

            // Pega o tipo
            const tipo = botao.dataset.tipo;

            // Atualiza campo escondido
            tipoInput.value = tipo;


            // =========================================
            // PROFESSOR
            // =========================================

            if (tipo === "professor") {

                camposProfessor.style.display = "block";

                crefInput.required = true;
                especialidadeInput.required = true;

            }


            // =========================================
            // ALUNO
            // =========================================

            else {

                camposProfessor.style.display = "none";

                crefInput.required = false;
                especialidadeInput.required = false;

                crefInput.value = "";
                especialidadeInput.value = "";

            }

        });

    });


    // =================================================
    // ENVIO DO CADASTRO
    // =================================================

    formCadastro.addEventListener("submit", async (event) => {

        event.preventDefault();


        // =============================================
        // PEGAR DADOS DO FORMULÁRIO
        // =============================================

        const tipo = tipoInput.value;

        const nome = document.getElementById("nome").value.trim();

        const email = document.getElementById("email").value.trim();

        const telefone = document.getElementById("telefone").value.trim();

        const cpf = document.getElementById("cpf").value.trim();

        const senha = document.getElementById("senha-cadastro").value;

        const confirmarSenha =
            document.getElementById("confirmar-senha").value;


        // =============================================
        // VALIDAÇÕES
        // =============================================

        if (!nome || !email || !telefone || !cpf || !senha) {

            alert("Preencha todos os campos obrigatórios.");

            return;
        }


        // Senha mínima
        if (senha.length < 6) {

            alert("A senha deve ter pelo menos 6 caracteres.");

            return;
        }


        // Confirmar senha
        if (senha !== confirmarSenha) {

            alert("As senhas não coincidem.");

            return;
        }


        // =============================================
        // CADASTRO DO ALUNO
        // =============================================

        if (tipo === "usuario") {

            await cadastrarAluno({
                nome,
                email,
                senha,
                telefone,
                cpf
            });

        }


        // =============================================
        // CADASTRO DO PROFESSOR
        // =============================================

        else if (tipo === "professor") {

            const cref = crefInput.value.trim();

            const especialidade =
                especialidadeInput.value.trim();


            if (!cref || !especialidade) {

                alert(
                    "Preencha o CREF e a especialidade."
                );

                return;
            }


            await cadastrarProfessor({
                nome,
                email,
                senha,
                telefone,
                cpf,
                cref,
                especialidade
            });

        }

    });

});


// =====================================================
// CADASTRAR ALUNO
// =====================================================

async function cadastrarAluno(dados) {

    try {

        const resposta = await fetch(
            `${API_URL}/aluno/cadastro`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
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


        const resultado = await resposta.json();


        console.log("Resposta do cadastro:", resultado);


        // =============================================
        // ERRO
        // =============================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        // =============================================
        // E-MAIL JÁ EXISTE
        // =============================================

        if (
            resultado.mensagem ===
            "E-mail já cadastrado"
        ) {

            alert("Esse e-mail já está cadastrado.");

            return;
        }


        // =============================================
        // SUCESSO
        // =============================================

        alert(
            "Aluno cadastrado com sucesso!"
        );


        // Vai para o login
        window.location.href = "login.html";


    } catch (erro) {

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
// =====================================================

async function cadastrarProfessor(dados) {

    try {

        const resposta = await fetch(
            `${API_URL}/professor/cadastro`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: dados.nome,
                    email: dados.email,
                    senha: dados.senha,
                    telefone: dados.telefone,
                    cpf: dados.cpf,

                    // O backend atual utiliza "crf"
                    crf: dados.cref,

                    // Mantemos no envio.
                    // Se o backend não possuir esse campo,
                    // ele simplesmente não será salvo.
                    especialidade: dados.especialidade
                })
            }
        );


        const resultado = await resposta.json();


        console.log(
            "Resposta do cadastro do professor:",
            resultado
        );


        // =============================================
        // ERRO
        // =============================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                "Não foi possível realizar o cadastro."
            );

            return;
        }


        // =============================================
        // E-MAIL JÁ EXISTE
        // =============================================

        if (
            resultado.mensagem ===
            "E-mail já cadastrado"
        ) {

            alert("Esse e-mail já está cadastrado.");

            return;
        }


        // =============================================
        // SUCESSO
        // =============================================

        alert(
            "Professor cadastrado com sucesso!"
        );


        // Vai para o login
        window.location.href = "login.html";


    } catch (erro) {

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


            if (!email || !senha) {

                alert(
                    "Preencha o e-mail e a senha."
                );

                return;
            }


            try {

                const resposta = await fetch(
                    `${API_URL}/aluno/login`,
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


                const resultado =
                    await resposta.json();


                console.log(
                    "Resposta do login:",
                    resultado
                );


                if (!resultado.aluno) {

                    alert(
                        resultado.mensagem ||
                        "E-mail ou senha incorretos."
                    );

                    return;
                }


                // Salva informações do aluno
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


                alert(
                    "Login realizado com sucesso!"
                );


                window.location.href =
                    "areaCliente.html";


            } catch (erro) {

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


    if (paginaAtual !== "areaCliente.html") {
        return;
    }


    const idAluno =
        localStorage.getItem("id_aluno");


    // Não está logado
    if (!idAluno) {

        alert(
            "Você precisa fazer login para acessar essa página."
        );

        window.location.href =
            "login.html";

        return;
    }


    // Coloca o nome do aluno na tela
    const nomeAluno =
        localStorage.getItem("nome_aluno");


    const elementoNome =
        document.getElementById("nomeAluno");


    if (elementoNome && nomeAluno) {

        elementoNome.textContent =
            `Olá, ${nomeAluno}`;

    }

});


// =====================================================
// LISTAR PROFESSORES
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

        const resposta = await fetch(
            `${API_URL}/professor`
        );


        const professores =
            await resposta.json();


        console.log(
            "Professores:",
            professores
        );


        if (
            !Array.isArray(professores) ||
            professores.length === 0
        ) {

            listaProfessores.innerHTML =
                "<p>Nenhum professor cadastrado.</p>";

            return;
        }


        listaProfessores.innerHTML = "";


        professores.forEach(professor => {

            const card =
                document.createElement("div");


            card.classList.add(
                "card-professor"
            );


            card.innerHTML = `

                <div class="professor-info">

                    <h3>
                        ${professor.nome}
                    </h3>

                    <p>
                        ${professor.email}
                    </p>

                    ${
                        professor.crf
                            ? `<p>CREF: ${professor.crf}</p>`
                            : ""
                    }

                </div>

                <button
                    type="button"
                    class="btn-conectar-professor"
                    data-id="${professor.id}">

                    Se conectar

                </button>

            `;


            listaProfessores.appendChild(card);

        });


        // =============================================
        // BOTÕES DE CONEXÃO
        // =============================================

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


    } catch (erro) {

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
// =====================================================

async function conectarProfessor(
    idProfessor
) {

    const idAluno =
        localStorage.getItem("id_aluno");


    if (!idAluno) {

        alert(
            "Faça login para se conectar a um professor."
        );

        window.location.href =
            "login.html";

        return;
    }


    try {

        const resposta = await fetch(
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


    } catch (erro) {

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
// ABRIR LISTA DE PROFESSORES
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