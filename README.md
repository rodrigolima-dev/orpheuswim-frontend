# Catálogo artesanal — frontend

Interface web desenvolvida em **React + Vite** para um e-commerce de catálogo artesanal. O frontend consome uma API REST separada e oferece catálogo, variações, carrinho local e uma solicitação preparada para WhatsApp.

## Demonstração local

O modo demo usa uma fixture fictícia, não chama a API nem abre o WhatsApp automaticamente.

```bash
npm install
npm run demo
```

Para usar a API local, execute `npm run dev` e configure `VITE_API_URL` em um arquivo `.env` sem versionar.

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Vercel](https://vercel.com/) — deploy contínuo
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — padronização de código

---

## 📦 Funcionalidades

- ✅ **Listagem de produtos** com filtros por categoria
- ✅ **Visualização de lançamentos** (últimos produtos adicionados)
- ✅ **Página de detalhes** de cada produto
- ✅ **Carrinho de compras** com controle de quantidade e cálculo de total
- ✅ **Painel administrativo com autenticação** (JWT)
- ✅ Cadastro, edição e exclusão de produtos (admin)
- ✅ Design **responsivo**
- ✅ Integração com a **API REST** do backend
- ✅ Prévia local da mensagem antes do encaminhamento opcional para WhatsApp

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
# Acesse a pasta da cópia local do frontend
cd <pasta-do-frontend>

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
