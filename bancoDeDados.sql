-- =========================================================
-- BANCO DE DADOS TITANFIT
-- Versão atualizada com os ajustes da última revisão
-- =========================================================

CREATE DATABASE IF NOT EXISTS titanfit;

USE titanfit;


-- =========================================================
-- TABELA: professor
-- =========================================================

CREATE TABLE professor (
    id_professor       INT AUTO_INCREMENT PRIMARY KEY,
    nome               VARCHAR(150) NOT NULL,
    email              VARCHAR(150) NOT NULL,
    senha              VARCHAR(255) NOT NULL,
    curriculo          TEXT NOT NULL,
    registro_cref      VARCHAR(20) NOT NULL,
    especialidade      VARCHAR(100) NOT NULL,
    bacharelado        VARCHAR(150) NOT NULL,
    formacao_academica VARCHAR(150) NOT NULL,
    status             VARCHAR(20) NOT NULL DEFAULT 'ativo',

    CONSTRAINT uq_professor_email
        UNIQUE (email),

    CONSTRAINT uq_professor_cref
        UNIQUE (registro_cref)
);


-- =========================================================
-- TABELA: aluno
-- =========================================================

CREATE TABLE aluno (
    id_aluno      INT AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(150) NOT NULL,
    email         VARCHAR(150) NOT NULL,
    senha         VARCHAR(255) NOT NULL,
    cpf           VARCHAR(14) NOT NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_aluno_email
        UNIQUE (email),

    CONSTRAINT uq_aluno_cpf
        UNIQUE (cpf)
);


-- =========================================================
-- TABELA: professor_aluno
-- Relacionamento N:N entre professor e aluno
-- =========================================================

CREATE TABLE professor_aluno (
    id_professor_aluno INT AUTO_INCREMENT PRIMARY KEY,
    id_professor       INT NOT NULL,
    id_aluno           INT NOT NULL,
    data_vinculo       DATE NOT NULL,
    status             VARCHAR(20) NOT NULL DEFAULT 'ativo',

    CONSTRAINT fk_professor_aluno_professor
        FOREIGN KEY (id_professor)
        REFERENCES professor (id_professor),

    CONSTRAINT fk_professor_aluno_aluno
        FOREIGN KEY (id_aluno)
        REFERENCES aluno (id_aluno),

    CONSTRAINT uq_professor_aluno
        UNIQUE (id_professor, id_aluno)
);


-- =========================================================
-- TABELA: ficha_aluno
-- Cada aluno possui uma única ficha (1:1), atualizada ao longo do tempo
-- =========================================================

CREATE TABLE ficha_aluno (
    id_ficha          INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno          INT NOT NULL,
    idade             INT NOT NULL,
    peso              DECIMAL(5,2) NOT NULL,
    altura            DECIMAL(4,2),
    objetivo          VARCHAR(100) NOT NULL,
    tempo_disponivel  VARCHAR(50) NOT NULL,
    data_atualizacao  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ficha_aluno_aluno
        FOREIGN KEY (id_aluno)
        REFERENCES aluno (id_aluno),

    CONSTRAINT uq_ficha_aluno
        UNIQUE (id_aluno)
);


-- =========================================================
-- TABELA: evolucao
-- Histórico de peso corporal do aluno (RF17)
-- Carga por exercício é rastreada em treino_exercicio, não aqui
-- =========================================================

CREATE TABLE evolucao (
    id_evolucao   INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno      INT NOT NULL,
    peso          DECIMAL(5,2) NOT NULL,
    data_registro DATE NOT NULL,

    CONSTRAINT fk_evolucao_aluno
        FOREIGN KEY (id_aluno)
        REFERENCES aluno (id_aluno)
);


-- =========================================================
-- TABELA: treino
-- Cada treino está relacionado a uma ficha e a um professor
-- =========================================================

CREATE TABLE treino (
    id_treino     INT AUTO_INCREMENT PRIMARY KEY,
    id_ficha      INT NOT NULL,
    id_professor  INT NOT NULL,
    nome_treino   VARCHAR(100) NOT NULL,
    tipo_treino   VARCHAR(50) NOT NULL,
    objetivo      VARCHAR(100) NOT NULL,
    data_criacao  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ativo         BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_treino_ficha
        FOREIGN KEY (id_ficha)
        REFERENCES ficha_aluno (id_ficha),

    CONSTRAINT fk_treino_professor
        FOREIGN KEY (id_professor)
        REFERENCES professor (id_professor)
);


-- =========================================================
-- TABELA: exercicio
-- Biblioteca de exercícios
-- =========================================================

CREATE TABLE exercicio (
    id_exercicio    INT AUTO_INCREMENT PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    grupo_muscular  VARCHAR(50) NOT NULL,
    video           VARCHAR(255)
);


-- =========================================================
-- TABELA: treino_exercicio
-- Relacionamento N:N entre treino e exercício
-- Sem UNIQUE(id_treino, id_exercicio): permite o mesmo exercício
-- aparecer mais de uma vez no mesmo treino (ex.: bi-set, blocos distintos)
-- =========================================================

CREATE TABLE treino_exercicio (
    id_treino_exercicio INT AUTO_INCREMENT PRIMARY KEY,
    id_treino           INT NOT NULL,
    id_exercicio        INT NOT NULL,
    ordem               INT NOT NULL,
    serie               INT NOT NULL,
    repeticoes          INT NOT NULL,
    carga               DECIMAL(6,2) NOT NULL,
    descanso            INT,
    observacao          TEXT,

    CONSTRAINT fk_treino_exercicio_treino
        FOREIGN KEY (id_treino)
        REFERENCES treino (id_treino),

    CONSTRAINT fk_treino_exercicio_exercicio
        FOREIGN KEY (id_exercicio)
        REFERENCES exercicio (id_exercicio)
);


-- =========================================================
-- TABELA: plano
-- Planos oferecidos pelo TitanFit
-- =========================================================

CREATE TABLE plano (
    id_plano     INT AUTO_INCREMENT PRIMARY KEY,
    nome         VARCHAR(50) NOT NULL,
    descricao    TEXT NOT NULL,
    valor        DECIMAL(6,2) NOT NULL,
    tipo_plano   VARCHAR(20) NOT NULL
);


-- =========================================================
-- TABELA: aluno_plano
-- Relacionamento entre aluno e plano
-- data_vencimento habilita a regra de bloqueio após 3 dias (RF07)
-- =========================================================

CREATE TABLE aluno_plano (
    id_aluno_plano   INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno         INT NOT NULL,
    id_plano         INT NOT NULL,
    data_inicio      DATE NOT NULL,
    data_vencimento  DATE NOT NULL,
    data_fim         DATE,
    status           VARCHAR(20) NOT NULL DEFAULT 'ativo',

    CONSTRAINT fk_aluno_plano_aluno
        FOREIGN KEY (id_aluno)
        REFERENCES aluno (id_aluno),

    CONSTRAINT fk_aluno_plano_plano
        FOREIGN KEY (id_plano)
        REFERENCES plano (id_plano)
);


-- =========================================================
-- TABELA: pagamento
-- Pagamentos das contratações
-- =========================================================

CREATE TABLE pagamento (
    id_pagamento    INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno_plano  INT NOT NULL,
    valor           DECIMAL(6,2) NOT NULL,
    metodo          VARCHAR(30) NOT NULL,
    status          VARCHAR(20) NOT NULL DEFAULT 'pendente',
    data            DATE NOT NULL,
    comprovante     VARCHAR(255),

    CONSTRAINT fk_pagamento_aluno_plano
        FOREIGN KEY (id_aluno_plano)
        REFERENCES aluno_plano (id_aluno_plano)
);


-- =========================================================
-- TABELA: notificacao
-- Notificações recebidas pelo aluno (RF15)
-- =========================================================

CREATE TABLE notificacao (
    id_notificacao INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno       INT NOT NULL,
    titulo         VARCHAR(150) NOT NULL,
    mensagem       TEXT NOT NULL,
    data_envio     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lida           BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_notificacao_aluno
        FOREIGN KEY (id_aluno)
        REFERENCES aluno (id_aluno)
);