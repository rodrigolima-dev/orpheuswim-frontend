# 🧶 Orpheuswim - Frontend

Interface web desenvolvida em **React + Vite** para a loja de crochê Orpheuswim. Este projeto consome a API REST do backend e oferece uma experiência de navegação fluida, responsiva e moderna para os usuários.

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Vercel](https://vercel.com/) — deploy contínuo
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — padronização de código

---

## 📦 Funcionalidades

- ✅ **Listagem de produtos** com filtros por categoria e busca
- ✅ **Visualização de lançamentos** (últimos produtos adicionados)
- ✅ **Página de detalhes** de cada produto
- ✅ **Carrinho de compras** com controle de quantidade e cálculo de total
- ✅ **Painel administrativo com autenticação** (JWT)
- ✅ Cadastro, edição e exclusão de produtos (admin)
- ✅ Design **responsivo**
- ✅ Integração com a **API REST** do backend

---

## 🛒 Carrinho de Compras

- Adição e remoção de produtos
- Controle de quantidade por item
- Visualização de subtotal e total
- Armazenamento persistente via `localStorage`

---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos

- Node.js 18+
- Yarn ou npm

### Passos

```bash
# Clone o repositório
git clone https://github.com/rodrigolima-dev/orpheuswim-frontend

# Acesse a pasta do projeto
cd orpheuswim-frontend

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
