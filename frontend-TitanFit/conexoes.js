// =====================================================
// TITAN FIT - CONEXOES.JS
// Conexões com o Back-end / API
// =====================================================


// =====================================================
// CONFIGURAÇÃO DA API
// =====================================================

const API_URL = "http://localhost:3000";


// =====================================================
// FUNÇÃO PARA LER RESPOSTA DO BACKEND
// =====================================================

async function lerResposta(resposta) {

    const texto = await resposta.text();

    if (!texto) {
        return {};
    }

    try {

        return JSON.parse(texto);

    } catch (erro) {

        return {
            mensagem: texto
        };

    }
}


// =====================================================
// TOKEN / AUTENTICAÇÃO
// =====================================================

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


// =====================================================
// SALVAR DADOS DO ALUNO
// =====================================================

function salvarDadosAluno(aluno) {

    if (!aluno) {
        return;
    }


    // =================================================
    // ID
    // =================================================

    const idAluno =
        aluno.id_aluno ??
        aluno.id;


    if (
        idAluno !== undefined &&
        idAluno !== null
    ) {

        localStorage.setItem(
            "id_aluno",
            String(idAluno)
        );

    }


    // =================================================
    // NOME
    // =================================================

    if (aluno.nome) {

        localStorage.setItem(
            "nome_aluno",
            aluno.nome
        );

    }


    // =================================================
    // E-MAIL
    // =================================================

    if (aluno.email) {

        localStorage.setItem(
            "email_aluno",
            aluno.email
        );

    }


    // =================================================
    // CPF
    // =================================================

    if (aluno.cpf) {

        localStorage.setItem(
            "cpf_aluno",
            aluno.cpf
        );

    }

}


// =====================================================
// ESCOLHA ALUNO / PROFESSOR
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

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


    if (!tipoInput) {
        return;
    }


    botoesTipo.forEach((botao) => {

        botao.addEventListener("click", () => {

            botoesTipo.forEach((item) => {

                item.classList.remove("ativo");

            });


            botao.classList.add("ativo");


            const tipo = botao.dataset.tipo;


            if (tipoInput) {

                tipoInput.value = tipo;

            }


            // =================================================
            // PROFESSOR
            // =================================================

            if (tipo === "professor") {

                if (camposProfessor) {

                    camposProfessor.style.display = "block";

                }

                if (crefInput) {

                    crefInput.required = true;

                }

                if (especialidadeInput) {

                    especialidadeInput.required = true;

                }

                if (curriculoInput) {

                    curriculoInput.required = true;

                }

                if (bachareladoInput) {

                    bachareladoInput.required = true;

                }

                if (formacaoAcademicaInput) {

                    formacaoAcademicaInput.required = true;

                }

            }


            // =================================================
            // ALUNO
            // =================================================

            else {

                if (camposProfessor) {

                    camposProfessor.style.display = "none";

                }

                if (crefInput) {

                    crefInput.required = false;
                    crefInput.value = "";

                }

                if (especialidadeInput) {

                    especialidadeInput.required = false;
                    especialidadeInput.value = "";

                }

                if (curriculoInput) {

                    curriculoInput.required = false;
                    curriculoInput.value = "";

                }

                if (bachareladoInput) {

                    bachareladoInput.required = false;
                    bachareladoInput.value = "";

                }

                if (formacaoAcademicaInput) {

                    formacaoAcademicaInput.required = false;
                    formacaoAcademicaInput.value = "";

                }

            }

        });

    });

});


// =====================================================
// CADASTRO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const formCadastro =
        document.getElementById("formCadastro");


    if (!formCadastro) {
        return;
    }


    formCadastro.addEventListener("submit", async (event) => {

        event.preventDefault();


        // =================================================
        // TIPO
        // =================================================

        const tipoInput =
            document.getElementById("tipoInput");

        const tipo =
            tipoInput
                ? tipoInput.value
                : "";


        // =================================================
        // CAMPOS
        // =================================================

        const nomeElement =
            document.getElementById("nome");

        const emailElement =
            document.getElementById("email");

        const cpfElement =
            document.getElementById("cpf");

        const senhaElement =
            document.getElementById("senha-cadastro");

        const confirmarSenhaElement =
            document.getElementById("confirmar-senha");


        const nome =
            nomeElement
                ? nomeElement.value.trim()
                : "";

        const email =
            emailElement
                ? emailElement.value.trim()
                : "";

        const cpf =
            cpfElement
                ? cpfElement.value.trim()
                : "";

        const senha =
            senhaElement
                ? senhaElement.value
                : "";

        const confirmarSenha =
            confirmarSenhaElement
                ? confirmarSenhaElement.value
                : "";


        // =================================================
        // VALIDAÇÃO
        // =================================================

        if (
            !tipo ||
            !nome ||
            !email ||
            !cpf ||
            !senha
        ) {

            alert(
                "Preencha todos os campos obrigatórios."
            );

            return;

        }


        // =================================================
        // SENHA
        // =================================================

        if (senha.length < 6) {

            alert(
                "A senha deve ter pelo menos 6 caracteres."
            );

            return;

        }


        // =================================================
        // CONFIRMAÇÃO
        // =================================================

        if (senha !== confirmarSenha) {

            alert(
                "As senhas não coincidem."
            );

            return;

        }


        // =================================================
        // CADASTRAR ALUNO
        // =================================================

        if (tipo === "aluno") {

            await cadastrarAluno({

                nome: nome,
                email: email,
                senha: senha,
                cpf: cpf

            });

            return;

        }


        // =================================================
        // CADASTRAR PROFESSOR
        // =================================================

        if (tipo === "professor") {

            const crefInput =
                document.getElementById("cref");

            const especialidadeInput =
                document.getElementById("especialidade");

            const curriculoInput =
                document.getElementById("curriculo");

            const bachareladoInput =
                document.getElementById("bacharelado");

            const formacaoInput =
                document.getElementById(
                    "formacao_academica"
                );


            const cref =
                crefInput
                    ? crefInput.value.trim()
                    : "";

            const especialidade =
                especialidadeInput
                    ? especialidadeInput.value.trim()
                    : "";

            const curriculo =
                curriculoInput
                    ? curriculoInput.value.trim()
                    : "";

            const bacharelado =
                bachareladoInput
                    ? bachareladoInput.value.trim()
                    : "";

            const formacaoAcademica =
                formacaoInput
                    ? formacaoInput.value.trim()
                    : "";


            // =================================================
            // VALIDAR PROFESSOR
            // =================================================

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
                cref: cref,
                especialidade: especialidade,
                curriculo: curriculo,
                bacharelado: bacharelado,
                formacao_academica: formacaoAcademica

            });

        }

    });

});


// =====================================================
// CADASTRAR ALUNO
// POST /aluno/cadastro
// =====================================================

async function cadastrarAluno(dados) {

    try {

        console.log(
            "Enviando cadastro do aluno:",
            dados
        );


        const resposta =
            await fetch(
                `${API_URL}/aluno/cadastro`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            nome: dados.nome,
                            email: dados.email,
                            senha: dados.senha,
                            cpf: dados.cpf

                        })
                }
            );


        const resultado =
            await lerResposta(resposta);


        console.log(
            "Status do cadastro do aluno:",
            resposta.status
        );

        console.log(
            "Resposta do cadastro do aluno:",
            resultado
        );


        // =================================================
        // ERRO
        // =================================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                resultado.message ||
                "Não foi possível realizar o cadastro."
            );

            return;

        }


        // =================================================
        // ALUNO RETORNADO
        // =================================================

        if (!resultado.aluno) {

            alert(
                resultado.mensagem ||
                "Cadastro realizado, mas o servidor não retornou os dados do aluno."
            );

            return;

        }


        // =================================================
        // SALVAR DADOS
        // =================================================

        salvarDadosAluno(
            resultado.aluno
        );


        localStorage.setItem(
            "nome_aluno",
            dados.nome
        );

        localStorage.setItem(
            "email_aluno",
            dados.email
        );

        localStorage.setItem(
            "cpf_aluno",
            dados.cpf
        );


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

                    body:
                        JSON.stringify({

                            nome: dados.nome,
                            email: dados.email,
                            senha: dados.senha,

                            registro_cref:
                                dados.cref,

                            especialidade:
                                dados.especialidade,

                            curriculo:
                                dados.curriculo,

                            bacharelado:
                                dados.bacharelado,

                            formacao_academica:
                                dados.formacao_academica,

                            status:
                                "ativo"

                        })
                }
            );


        const resultado =
            await lerResposta(resposta);


        console.log(
            "Resposta do cadastro do professor:",
            resultado
        );


        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                resultado.message ||
                "Não foi possível realizar o cadastro do professor."
            );

            return;

        }


        if (!resultado.professor) {

            alert(
                resultado.mensagem ||
                "Cadastro realizado, mas o servidor não retornou os dados do professor."
            );

            return;

        }


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


            const emailElement =
                document.getElementById(
                    "username-email"
                );

            const senhaElement =
                document.getElementById(
                    "senha"
                );


            const email =
                emailElement
                    ? emailElement.value.trim()
                    : "";

            const senha =
                senhaElement
                    ? senhaElement.value
                    : "";


            if (!email || !senha) {

                alert(
                    "Preencha o e-mail e a senha."
                );

                return;

            }


            try {

             const resposta = await fetch(
    `${API_URL}/auth/aluno`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    email: email,
                                    senha: senha

                                })
                        }
                    );


                const resultado =
                    await lerResposta(resposta);


                console.log(
                    "Resposta do login:",
                    resultado
                );


                // =================================================
                // VERIFICAR LOGIN
                // =================================================

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


                // =================================================
                // SALVAR TOKEN JWT
                // =================================================

                if (resultado.token) {

                    localStorage.setItem(
                        "token",
                        resultado.token
                    );

                }
                else {

                    alert(
                        "O servidor não retornou o token de autenticação."
                    );

                    return;

                }


                // =================================================
                // SALVAR DADOS DO ALUNO
                // =================================================

                salvarDadosAluno(
                    resultado.aluno
                );


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

    const token =
        localStorage.getItem(
            "token"
        );


    // =================================================
    // VERIFICAR LOGIN
    // =================================================

    if (!idAluno || !token) {

        alert(
            "Você precisa fazer login para acessar a área do cliente."
        );

        window.location.href =
            "login.html";

        return;

    }


    // =================================================
    // MOSTRAR NOME
    // =================================================

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
// MEUS DADOS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const dadosNome =
        document.getElementById(
            "dadosNome"
        );

    const dadosEmail =
        document.getElementById(
            "dadosEmail"
        );

    const dadosCpf =
        document.getElementById(
            "dadosCpf"
        );


    if (
        !dadosNome &&
        !dadosEmail &&
        !dadosCpf
    ) {

        return;

    }


    // =================================================
    // PEGAR DADOS
    // =================================================

    const nome =
        localStorage.getItem(
            "nome_aluno"
        );

    const email =
        localStorage.getItem(
            "email_aluno"
        );

    const cpf =
        localStorage.getItem(
            "cpf_aluno"
        );


    // =================================================
    // MOSTRAR NOME
    // =================================================

    if (dadosNome) {

        dadosNome.textContent =
            nome ||
            "Não informado";

    }


    // =================================================
    // MOSTRAR E-MAIL
    // =================================================

    if (dadosEmail) {

        dadosEmail.textContent =
            email ||
            "Não informado";

    }


    // =================================================
    // MOSTRAR CPF
    // =================================================

    if (dadosCpf) {

        dadosCpf.textContent =
            cpf ||
            "Não informado";

    }

});


// =====================================================
// FICHA DO ALUNO
// =====================================================


// =====================================================
// MOSTRAR FICHA NA TELA
// =====================================================

function mostrarDadosFicha(ficha) {

    const fichaIdade =
        document.getElementById(
            "fichaIdade"
        );

    const fichaAltura =
        document.getElementById(
            "fichaAltura"
        );

    const fichaPeso =
        document.getElementById(
            "fichaPeso"
        );

    const fichaObjetivo =
        document.getElementById(
            "fichaObjetivo"
        );


    // =================================================
    // IDADE
    // =================================================

    if (fichaIdade) {

        fichaIdade.textContent =
            ficha.idade !== null &&
            ficha.idade !== undefined &&
            ficha.idade !== ""
                ? ficha.idade
                : "Não informado";

    }


    // =================================================
    // ALTURA
    // =================================================

    if (fichaAltura) {

        fichaAltura.textContent =
            ficha.altura !== null &&
            ficha.altura !== undefined &&
            ficha.altura !== ""
                ? ficha.altura
                : "Não informado";

    }


    // =================================================
    // PESO
    // =================================================

    if (fichaPeso) {

        fichaPeso.textContent =
            ficha.peso !== null &&
            ficha.peso !== undefined &&
            ficha.peso !== ""
                ? ficha.peso
                : "Não informado";

    }


    // =================================================
    // OBJETIVO
    // =================================================

    if (fichaObjetivo) {

        fichaObjetivo.textContent =
            ficha.objetivo !== null &&
            ficha.objetivo !== undefined &&
            ficha.objetivo !== ""
                ? ficha.objetivo
                : "Não informado";

    }

}


// =====================================================
// MOSTRAR FICHA NÃO INFORMADA
// =====================================================

function mostrarFichaNaoInformada() {

    const campos = [

        "fichaIdade",
        "fichaAltura",
        "fichaPeso",
        "fichaObjetivo"

    ];


    campos.forEach((id) => {

        const elemento =
            document.getElementById(id);


        if (elemento) {

            elemento.textContent =
                "Não informado";

        }

    });

}


// =====================================================
// CARREGAR FICHA DO BANCO
// GET /ficha-aluno/aluno/:id
// =====================================================

async function carregarFicha() {

    const idAluno =
        obterIdAluno();

    const token =
        obterToken();


    if (!idAluno || !token) {

        console.log(
            "Aluno não autenticado para carregar a ficha."
        );

        return;

    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/ficha-aluno/aluno/${idAluno}`,
                {
                    method: "GET",

                    headers:
                        obterHeadersAutenticacao()
                }
            );


        const dados =
            await lerResposta(resposta);


        console.log(
            "Ficha recebida:",
            dados
        );


        // =================================================
        // FICHA NÃO ENCONTRADA
        // =================================================

        if (
            dados.mensagem ===
            "Ficha não encontrada"
        ) {

            mostrarFichaNaoInformada();

            return;

        }


        // =================================================
        // ERRO
        // =================================================

        if (!resposta.ok) {

            console.error(
                "Erro ao carregar ficha:",
                dados
            );

            return;

        }


        // =================================================
        // MOSTRAR FICHA
        // =================================================

        mostrarDadosFicha(dados);

    }
    catch (erro) {

        console.error(
            "Erro ao carregar ficha:",
            erro
        );

    }

}


// =====================================================
// SALVAR / ATUALIZAR FICHA
// POST /ficha-aluno
// PUT /ficha-aluno/aluno/:id
// =====================================================

async function salvarFicha() {

    const idAluno =
        obterIdAluno();

    const token =
        obterToken();


    if (!idAluno || !token) {

        alert(
            "Você precisa estar logado para salvar sua ficha."
        );

        return;

    }


    // =================================================
    // CAMPOS DO MODAL
    // =================================================

    const idadeElement =
        document.getElementById(
            "modalIdade"
        );

    const alturaElement =
        document.getElementById(
            "modalAltura"
        );

    const pesoElement =
        document.getElementById(
            "modalPeso"
        );

    const objetivoElement =
        document.getElementById(
            "modalObjetivo"
        );


    const idade =
        idadeElement
            ? idadeElement.value.trim()
            : "";

    const altura =
        alturaElement
            ? alturaElement.value.trim()
            : "";

    const peso =
        pesoElement
            ? pesoElement.value.trim()
            : "";

    const objetivo =
        objetivoElement
            ? objetivoElement.value
            : "";


    // =================================================
    // OBJETIVO É OBRIGATÓRIO NO BACKEND
    // =================================================

    if (!objetivo) {

        alert(
            "Selecione um objetivo."
        );

        return;

    }


    // =================================================
    // DADOS ENVIADOS
    // =================================================

    const dados = {

        id_aluno:
            Number(idAluno),

        idade:
            idade
                ? Number(idade)
                : null,

        altura:
            altura || null,

        peso:
            peso || null,

        objetivo:
            objetivo

    };


    try {

        // =================================================
        // VERIFICAR SE JÁ EXISTE FICHA
        // =================================================

        const consulta =
            await fetch(
                `${API_URL}/ficha-aluno/aluno/${idAluno}`,
                {
                    method: "GET",

                    headers:
                        obterHeadersAutenticacao()
                }
            );


        const fichaAtual =
            await lerResposta(consulta);


        console.log(
            "Ficha atual:",
            fichaAtual
        );


        let resposta;


        // =================================================
        // JÁ POSSUI FICHA → ATUALIZAR
        // =================================================

        if (
            consulta.ok &&
            fichaAtual.id_ficha
        ) {

            resposta =
                await fetch(
                    `${API_URL}/ficha-aluno/aluno/${idAluno}`,
                    {
                        method: "PUT",

                        headers:
                            obterHeadersAutenticacao(),

                        body:
                            JSON.stringify(dados)
                    }
                );

        }


        // =================================================
        // NÃO POSSUI FICHA → CADASTRAR
        // =================================================

        else {

            resposta =
                await fetch(
                    `${API_URL}/ficha-aluno`,
                    {
                        method: "POST",

                        headers:
                            obterHeadersAutenticacao(),

                        body:
                            JSON.stringify(dados)
                    }
                );

        }


        const resultado =
            await lerResposta(resposta);


        console.log(
            "Resposta ao salvar ficha:",
            resultado
        );


        // =================================================
        // ERRO
        // =================================================

        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                resultado.message ||
                "Não foi possível salvar a ficha."
            );

            return;

        }


        // =================================================
        // ATUALIZAR TELA
        // =================================================

        if (resultado.ficha) {

            mostrarDadosFicha(
                resultado.ficha
            );

        }


        // =================================================
        // FECHAR MODAL
        // =================================================

        fecharModalFicha();


        // =================================================
        // SUCESSO
        // =================================================

        alert(
            resultado.mensagem ||
            "Ficha salva com sucesso!"
        );

    }
    catch (erro) {

        console.error(
            "Erro ao salvar ficha:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );

    }

}


// =====================================================
// FORMULÁRIO DA FICHA
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const formFicha =
        document.getElementById(
            "formFicha"
        );


    if (!formFicha) {

        return;

    }


    formFicha.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            await salvarFicha();

        }
    );

});


// =====================================================
// CARREGAR FICHA AO ABRIR ÁREA DO CLIENTE
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


    carregarFicha();

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
            await lerResposta(resposta);


        console.log(
            "Professores recebidos:",
            professores
        );


        if (!resposta.ok) {

            listaProfessores.innerHTML =
                "<p>Não foi possível carregar os professores.</p>";

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


            card.classList.add(
                "card-professor"
            );


            const idProfessor =
                professor.id_professor ??
                professor.id;


            const cref =
                professor.registro_cref ??
                professor.cref ??
                "";


            card.innerHTML = `

                <div class="professor-info">

                    <h3>
                        ${professor.nome ?? "Professor"}
                    </h3>

                    <p>
                        ${professor.email ?? ""}
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


        const botoes =
            document.querySelectorAll(
                ".btn-conectar-professor"
            );


        botoes.forEach((botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const idProfessor =
                        botao.dataset.id;


                    if (!idProfessor) {

                        alert(
                            "Não foi possível identificar o professor."
                        );

                        return;

                    }


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

async function conectarProfessor(idProfessor) {

    const idAluno =
        obterIdAluno();

    const token =
        obterToken();


    if (!idAluno || !token) {

        alert(
            "Faça login para se conectar a um professor."
        );

        window.location.href =
            "login.html";

        return;

    }


    if (!idProfessor) {

        alert(
            "Professor inválido."
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

                    body:
                        JSON.stringify({

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
            "Resposta da conexão:",
            resultado
        );


        if (!resposta.ok) {

            alert(
                resultado.mensagem ||
                resultado.message ||
                "Não foi possível realizar a conexão."
            );

            return;

        }


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