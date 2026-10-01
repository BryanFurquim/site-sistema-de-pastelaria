# 🍽️ Sistema de Pedidos para Pastelaria

Sistema web desenvolvido para digitalizar o processo de atendimento e pedidos de uma pastelaria.

A aplicação permite que clientes acessem o cardápio através de um **QR Code**, escolham seus produtos, montem o pedido e enviem diretamente pelo sistema. Os pedidos são disponibilizados em uma **área administrativa**, permitindo que o estabelecimento acompanhe os pedidos recebidos.

O projeto foi desenvolvido com foco em **experiência do usuário, organização do código e integração com banco de dados em tempo real**.

---

## 📸 Visão geral

### Cardápio

O cliente pode acessar o sistema pelo celular, visualizar os produtos disponíveis e adicionar os itens desejados ao pedido.

### Carrinho e pedido

Após selecionar os produtos, o cliente pode revisar os itens, conferir os valores e finalizar o pedido.

### Área administrativa

O estabelecimento possui uma área separada para acompanhar e gerenciar os pedidos realizados pelos clientes.

---

## ✨ Funcionalidades

### 👤 Cliente

* Visualização do cardápio
* Organização dos produtos por categoria
* Seleção de produtos
* Adição e remoção de itens do carrinho
* Alteração de quantidade
* Cálculo automático do total
* Finalização de pedidos
* Interface otimizada para dispositivos móveis

### 🔐 Administração

* Área administrativa separada
* Visualização dos pedidos
* Acompanhamento dos pedidos recebidos
* Atualização do status dos pedidos
* Integração com o banco de dados

### 📱 Acesso por QR Code

O sistema pode ser disponibilizado através de um **QR Code**, permitindo que o cliente acesse o cardápio diretamente pelo celular.

---

## 🛠️ Tecnologias utilizadas

| Tecnologia     | Utilização                        |
| -------------- | --------------------------------- |
| **React**      | Construção da interface           |
| **JavaScript** | Lógica da aplicação               |
| **Supabase**   | Banco de dados e serviços backend |
| **HTML5**      | Estrutura da aplicação            |
| **CSS3**       | Estilização e responsividade      |

---

## 🏗️ Arquitetura

A aplicação é dividida em duas principais áreas:

```text
                    SISTEMA
                       │
          ┌────────────┴────────────┐
          │                         │
       CLIENTE                  ADMINISTRAÇÃO
          │                         │
       Cardápio                  Pedidos
          │                         │
       Carrinho                 Status
          │                         │
       Pedido                       │
          │                         │
          └────────────┬────────────┘
                       │
                   SUPABASE
                       │
                   DATABASE
```

O frontend desenvolvido em React se comunica com o Supabase para armazenar e consultar os dados dos produtos e pedidos.

---

# 🚀 Como executar o projeto

## 1. Pré-requisitos

Antes de começar, você precisa ter instalado:

* [Node.js](https://nodejs.org/)
* npm
* Git

Para verificar se estão instalados:

```bash
node --version
npm --version
git --version
```

---

## 2. Clonar o repositório

Clone o projeto utilizando:

```bash
git clone https://github.com/BryanFurquim/site-sistema-de-pastelaria.git
```

Entre na pasta:

```bash
cd site-sistema-de-pastelaria
```

---

## 3. Instalar as dependências

Execute:

```bash
npm install
```

Esse comando instala todas as dependências necessárias para executar o projeto.

---

## 4. Configurar as variáveis de ambiente

Crie um arquivo chamado:

```text
.env
```

Na raiz do projeto.

Adicione as variáveis necessárias para conexão com o Supabase:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_do_supabase
```

> **Importante:** não publique o arquivo `.env` no GitHub.
> Ele deve permanecer no `.gitignore`.

---

## 5. Executar o projeto

Depois de instalar as dependências e configurar o ambiente:

```bash
npm run dev
```

O Vite iniciará o servidor local.

Normalmente, a aplicação estará disponível em:

```text
http://localhost:5173
```

---

# 🗄️ Banco de dados

O projeto utiliza o **Supabase** para armazenamento dos dados.

A estrutura do banco é responsável por armazenar informações utilizadas pelo sistema, como:

* Produtos
* Categorias
* Pedidos
* Itens dos pedidos
* Status dos pedidos

Para executar o projeto localmente utilizando seu próprio banco, é necessário configurar um projeto no Supabase e fornecer as respectivas credenciais através das variáveis de ambiente.

---

# 📁 Estrutura do projeto

A estrutura pode variar conforme a evolução da aplicação, mas a organização principal segue o conceito:

```text
site-sistema-de-pastelaria/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── assets/
│   └── ...
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

---

# 🔒 Segurança

As informações sensíveis do projeto não devem ser armazenadas diretamente no código-fonte.

Variáveis de ambiente devem ser utilizadas para configurações como:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Além disso, as regras de acesso do banco devem ser configuradas adequadamente no Supabase para controlar quais operações podem ser realizadas pelo cliente.

---

# 📌 Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de aplicar conhecimentos de **desenvolvimento web, React, integração com banco de dados, criação de interfaces responsivas e desenvolvimento de uma aplicação baseada em um caso de uso real onde o cliente tinha uma dor de organização e fluxos e fui e solucionei a dor dele**.

Além da parte visual, o projeto envolve um fluxo completo:

```text
Cliente
   ↓
QR Code
   ↓
Cardápio
   ↓
Carrinho
   ↓
Pedido
   ↓
Banco de Dados
   ↓
Área Administrativa
   ↓
Gerenciamento do Pedido
```

---

# 👨‍💻 Desenvolvedor

**Bryan Furquim**

Desenvolvedor em formação, focado em desenvolvimento web e construção de aplicações completas.

* GitHub: https://github.com/BryanFurquim

---

## 📄 Licença

Este projeto foi desenvolvido para fins de venda, estudo, desenvolvimento e demonstração de habilidades técnicas.
