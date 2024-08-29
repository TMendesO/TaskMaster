---

# TaskMaster

TaskMaster é um sistema avançado de gerenciamento de tarefas que oferece uma interface intuitiva para criar, gerenciar e visualizar tarefas, além de gráficos de produtividade para acompanhar o progresso. O projeto utiliza React.js no frontend e Go no backend, integrando diversas tecnologias para proporcionar uma experiência fluida e eficiente.


## 📋 Funcionalidades

- **📊 Dashboard**: Visão geral das tarefas com gráficos interativos de produtividade.
- **✅ Gerenciamento de Tarefas**: Adicione, edite, exclua e atualize o status das suas tarefas.
- **📈 Gráficos de Produtividade**: Monitore o progresso das tarefas ao longo do tempo.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React.js](https://reactjs.org/)
- **Backend**: [Go (Gin)](https://gin-gonic.com/)
- **Gráficos**: [Chart.js](https://www.chartjs.org/)
- **API**: [Axios](https://axios-http.com/) para requisições HTTP
- **Gerenciamento de Estado**: Hooks do React

## 📁 Estrutura do Projeto

- **Frontend**:
  - `src/components/TaskList.js`: Componente para exibição e gerenciamento de tarefas.
  - `src/components/ProductivityChart.js`: Componente que exibe gráficos de produtividade.
  - `src/services/taskService.js`: Serviço de API para tarefas.
  - `src/services/statsService.js`: Serviço de API para estatísticas.
  - `src/Dashboard.js`: Componente principal do dashboard.

- **Backend**:
  - `main.go`: Ponto de entrada para configuração do servidor.
  - `controllers/taskController.go`: Controladores para operações de tarefas.
  - `routes/router.go`: Configuração de rotas da API.
  - `middlewares/authMiddleware.go`: Middleware de autenticação.

## 🚀 Configuração e Execução

### 🖥️ Backend

1. **Clone o repositório do backend**:

   ```bash
   git clone https://github.com/TMendesO/taskmaster-backend.git
   cd taskmaster-backend
   ```

2. **Instale as dependências**:

   Certifique-se de ter o Go instalado e execute:

   ```bash
   go mod tidy
   ```

3. **Execute o servidor**:

   ```bash
   go run main.go
   ```

   O backend estará disponível em `http://localhost:8080`.

### 🌐 Frontend

1. **Clone o repositório do frontend**:

   ```bash
   git clone https://github.com/TMendesO/taskmaster-frontend.git
   cd taskmaster-frontend
   ```

2. **Instale as dependências**:

   Certifique-se de ter o Node.js e o npm instalados e execute:

   ```bash
   npm install
   ```

3. **Execute o frontend**:

   ```bash
   npm start
   ```

   O frontend estará disponível em `http://localhost:3000`.

## 🔗 Endpoints da API

- **GET** `/tasks`: Retorna todas as tarefas.
- **GET** `/tasks/:id`: Retorna uma tarefa específica por ID.
- **POST** `/tasks`: Cria uma nova tarefa.
- **PUT** `/tasks/:id`: Atualiza uma tarefa existente.
- **DELETE** `/tasks/:id`: Exclui uma tarefa.
- **GET** `/stats`: Retorna dados para os gráficos de produtividade.

## 💡 Exemplos de Uso

- **Adicionar uma Tarefa**: Utilize o formulário no `TaskForm` para adicionar novas tarefas.
- **Excluir uma Tarefa**: Clique em "Delete" para remover uma tarefa.
- **Atualizar Status**: clique e arraste a task para mudar de status.

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. **Faça um Fork do Repositório**.
2. **Crie uma Branch**: `git checkout -b minha-nova-funcionalidade`.
3. **Faça Commit das Alterações**: `git commit -am 'Adiciona nova funcionalidade'`.
4. **Push para a Branch**: `git push origin minha-nova-funcionalidade`.
5. **Crie um Pull Request**.

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
