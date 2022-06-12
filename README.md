<h1 align="center">
  <strong>Controle de revisão de veiculo</strong>
</h1>

&nbsp;

## 📚 Informações do projeto

- Projeto desenvolvido para auxiliar o controle de revisão de veiculo, realizando cadastro de cliente e criação de ordens de serviços.

&nbsp;

## 🛠️ Tecnologias/ferramentas utilizadas

- [React](https://pt-br.reactjs.org/E)

- [Nest.js](https://nestjs.com/)

- [Prisma](https://www.prisma.io/)

- [TypeScript](https://www.typescriptlang.org)

- [PostgreSQL](https://www.postgresql.org/)
  &nbsp;

## ⚙️ Installation

```
# Abra o terminal e clone os repositorios
```

```
# Acesse a pasta da aplicação

# Instale as dependencias
$ npm install
# or
$ yarn install

# Inicie a aplicação
$ yarn dev
#or
$ npm run dev

# Iremos precisar do docker para rodar aplicação, execute o comando abaixo para criar um container

$ docker run --name postgres -e "POSTGRES_USER=postgres" -e  "POSTGRES_PASSWORD=postgres" -p 5434:5432 -v C:\docker-postgres-volume:/var/lib/postgresql/data -d postgres

#Crie um banco de dados postgres e coloque o caminho dele no .env que está como exemplo no backend

#No frontend, adicione a url do backend
```
