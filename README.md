
# Sistema de gerencimento de filas – Next.js

Este é um sistema de **gerenciamento de filas** desenvolvido com [Next.js](https://nextjs.org), ideal para controlar, visualizar e interagir com filas em tempo real. O projeto foi iniciado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) e segue a estrutura recomendada da Vercel.

## ⚙️ Configuração Inicial

Antes de rodar o projeto, é necessário configurar as variáveis de ambiente:

1. Duplique o arquivo `.env.example` e renomeie como `.env`.
2. Preencha as variáveis conforme sua necessidade, como URLs de APIs, tokens de autenticação, etc.

```bash
cp .env.example .env
```
NEXT_PUBLIC_API_URL = url da api 


## 🚀 Rodando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
# ou
yarn dev
# ou
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador para visualizar a aplicação.

## 🛠️ Funcionalidades

* Listagem de filas disponíveis
* Conexão e desconexão de filas
* Interface responsiva e moderna
* Armazenamento temporário no `sessionStorage`/`localStorage` para controle de sessões
* Exportação de arquivos csv e excel.

## 🖋️ Estrutura e Estilo

* Utiliza `Tailwind CSS` para estilização
* Organização modular com componentes reutilizáveis
* Utilização do `next/font` com a fonte [Geist](https://vercel.com/font)

## 📦 Deploy

A forma mais rápida de publicar o sistema é com a plataforma da Vercel:

[Deploy com Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

Para mais opções, veja a [documentação oficial de deploy](https://nextjs.org/docs/app/building-your-application/deploying).

## 📚 Aprendizado

* [Documentação do Next.js](https://nextjs.org/docs)
* [Curso interativo de Next.js](https://nextjs.org/learn)
