# Desafio Técnico – Vaga Front-End

Este projeto foi desenvolvido como parte de um processo seletivo para a vaga de desenvolvedor front-end.

A proposta consistia em implementar uma aplicação Next.js com funcionalidades de CRUD de produtos e visualização de métricas, utilizando tecnologias modernas e boas práticas de desenvolvimento.

---

## Acessar projeto

[Acesse o projeto online](https://desafio-crud.vercel.app)

## 🚀 Tecnologias utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React 18+](https://reactjs.org/)
- [next-themes](https://github.com/pacocoursey/next-themes) - suporte a tema dark/light e system
- [Framer Motion](https://www.framer.com/motion/) - animações declarativas
- [TypeScript](https://www.typescriptlang.org) 
- [Tailwind](https://tailwindcss.com) 
- [Zod](https://zod.dev)
- [Zustand](https://zustand-demo.pmnd.rs)
- [HeroUI](https://www.heroui.com)
- [Vercel](https://vercel.com)

---

## ✅ Funcionalidades

- ✅ Autenticação com token (via API)
- ✅ CRUD completo de produtos (criar, editar, excluir, listar)
- ✅ Upload de imagem por **URL ou arquivo**
- ✅ Validação dos campos com **Zod**
- ✅ Exibição de gráfico de métricas (dados mockados)
- ✅ Interface responsiva com **modo escuro**
- ✅ Modal acessível com **Headless UI**

---

## 🧠 Diferenciais implementados

- 🧩 **Preview de imagem** ao selecionar ou colar URL
- ⚙️ **Separação de responsabilidades** clara (`store`, `schemas`, `api`, `dtos`, `components`)
- 💬 UX intuitiva com feedbacks claros (erros de validação, preview, loaders)
- 🌒 Dark Mode funcional via `next-themes`

---

## 📦 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/lPoltergeist/desafio_crud.git
cd desafio_crud

# Instale as dependências
npm install

# Rode o ambiente de desenvolvimento
npm run dev

# Acesse: http://localhost:3000
