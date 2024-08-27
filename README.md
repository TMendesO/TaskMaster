# TaskMaster

TaskMaster é um sistema de gerenciamento de tarefas com uma interface de usuário para exibir e gerenciar tarefas, além de visualizações de produtividade através de gráficos. Este projeto utiliza React no frontend e Go no backend.

## Funcionalidades

- **Dashboard**: Exibe uma visão geral com gráficos de produtividade e a lista de tarefas.
- **Lista de Tarefas**: Permite adicionar, excluir e atualizar tarefas.
- **Gráficos de Produtividade**: Mostra gráficos sobre o progresso das tarefas.

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Go (Gin)
- **Gráficos**: Chart.js
- **Gerenciamento de Estado**: Hooks do React
- **API**: Axios para chamadas HTTP

## Estrutura do Projeto

- **Frontend**:

  - `src/components/TaskList.js`: Componente que exibe a lista de tarefas e permite gerenciamento de tarefas.
  - `src/components/ProductivityChart.js`: Componente que exibe gráficos de produtividade.
  - `src/services/taskService.js`: Serviço para chamadas à API relacionadas a tarefas.
  - `src/services/statsService.js`: Serviço para chamadas à API relacionadas a estatísticas.
  - `src/Dashboard.js`: Componente principal do dashboard.

- **Backend**:
  - `main.go`: Arquivo principal para configurar o servidor.
  - `controllers/taskController.go`: Controladores para gerenciar tarefas.
  - `routes/router.go`: Configuração das rotas da API.
  - `middlewares/authMiddleware.go`: Middleware para autenticação.

## Configuração e Execução

### Configuração do Backend

1. **Clone o repositório do backend**:

   ```bash
   git clone <>
   cd <taskmaster-backend>
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

### Configuração do Frontend

1. **Clone o repositório do frontend**:

   ```bash
   git clone <>
   cd <taskmaster-frontend>
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

## Endpoints da API

- **GET** `/tasks`: Lista todas as tarefas.
- **GET** `/tasks/:id`: Obtém uma tarefa específica por ID.
- **POST** `/tasks`: Cria uma nova tarefa.
- **PUT** `/tasks/:id`: Atualiza uma tarefa existente.
- **DELETE** `/tasks/:id`: Exclui uma tarefa existente.
- **GET** `/stats`: Obtém dados para gráficos de produtividade.

## Exemplos de Uso

- **Adicionar uma Tarefa**: Preencha o formulário no componente `TaskForm` para adicionar uma nova tarefa.
- **Excluir uma Tarefa**: Clique no botão "Delete" ao lado da tarefa para removê-la.
- **Atualizar o Status da Tarefa**: Use o menu suspenso ao lado de cada tarefa para atualizar seu status.

## Contribuição

Se você deseja contribuir para o projeto, siga estas etapas:

1. **Faça um Fork do Repositório**.
2. **Crie uma Branch**: `git checkout -b minha-nova-funcionalidade`.
3. **Faça Commit das Suas Alterações**: `git commit -am 'Adiciona nova funcionalidade'`.
4. **Push para a Branch**: `git push origin minha-nova-funcionalidade`.
5. **Crie um Pull Request**.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
