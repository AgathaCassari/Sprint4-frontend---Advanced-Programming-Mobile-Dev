# Sistema de Consultas — App Frontend (Sprint 4)

🎥 Vídeo de demonstração (YouTube, Não listado): <https://www.youtube.com/watch?v=CWpSwfw5hJQ>

## Descrição

App Expo/React Native para o Sistema de Consultas. Nas sprints anteriores, o app usava dados mockados. Agora ele consome a API real do grupo (entidades **Consulta**, **Médico**, **Paciente** e **Especialidade**), que está em um repositório separado: **https://github.com/AgathaCassari/Sprint4-backend---Advanced-Programming-Mobile-Dev**. O fluxo de escolha de especialidade e médico, agendamento e listagem agora lê e grava direto no backend — o mock deixou de ser a fonte de dados.

**Problema:** pacientes têm dificuldade para agendar consultas e acompanhar seus atendimentos, e os médicos precisam controlar as consultas marcadas na sua agenda. O sistema centraliza esse processo: o paciente escolhe a especialidade e o médico e agenda a consulta; o médico consulta e gerencia (confirma ou cancela) as consultas agendadas, com todos os dados persistidos na API.

**Entidade principal:** `Consulta` (`id`, `medico`, `paciente`, `dataHora`, `status`, `valor`, `observacoes`), que se relaciona com `Medico`, `Paciente` e `Especialidade`.

**Importante:** o backend precisa estar rodando em `http://localhost:8080` antes de abrir o app, ou as telas vão mostrar o estado de erro.

## Integrantes

| Nome | RM |
|---|---|
| Agatha Cassari Benedicto | 556251 |
| Gustavo Shinn Shyong Cheng | 559084 |
| Leonardo Fernandes Veleiro | 557773 |
| Sara Barbosa da Silva | 559042 |

## Repositórios

- Backend: https://github.com/AgathaCassari/Sprint4-backend---Advanced-Programming-Mobile-Dev
- Frontend (este repositório): https://github.com/AgathaCassari/Sprint4-frontend---Advanced-Programming-Mobile-Dev

## Pré-requisitos

- Java 17 e Maven (para o backend)
- Node.js (versão LTS) e npm
- Expo (usado com `npx expo start`, sem instalar global)
- Navegador, emulador ou o app Expo Go

## Como subir o frontend

1. Suba o backend antes (veja o README do repositório do backend).
2. Clone este repositório.
3. Instale as dependências:
```
npm install
```
4. Rode `npx expo start`.
5. Abra no navegador (tecla `w`, em `http://localhost:8081`), emulador ou no app Expo Go.

## Pasta `services`

A tela nunca chama `axios` nem monta URL — tudo passa por:

- `src/services/api.ts` — instância única do axios com `baseURL`, `timeout` de 10s e `Content-Type: application/json`. Também tem `isNetworkError()` (detecta quando o servidor não respondeu) e `healthCheck()` (`GET /health`, timeout de 3s).
- `src/services/especialidadeService.ts`, `medicoService.ts`, `pacienteService.ts` e `consultaService.ts` — funções que conhecem as rotas. As telas só chamam essas funções.

## BASE_URL

Definida em `src/services/api.ts` (constante `BASE_URL`):

- Web / simulador iOS → `http://localhost:8080`
- Emulador Android → `http://10.0.2.2:8080` (o Android mapeia esse IP para o localhost da máquina host)
- Celular físico via Expo Go → IP da máquina na rede local, ex. `http://192.168.1.100:8080` (edite a constante `BASE_URL` no arquivo; celular e computador na mesma rede)

## Endpoints usados pelo app

| Recurso | Método | Rota |
| --- | --- | --- |
| Health | GET | `/health` |
| Especialidades | GET | `/especialidades`, `/especialidades/{id}` |
| | POST | `/especialidades` |
| Médicos | GET | `/medicos`, `/medicos/{id}`, `/medicos/crm/{crm}`, `/medicos/especialidade/{id}` |
| | POST | `/medicos` |
| | PUT | `/medicos/{id}` |
| Pacientes | GET | `/pacientes`, `/pacientes/{id}`, `/pacientes/cpf/{cpf}` |
| | POST | `/pacientes` |
| Consultas | GET | `/consultas`, `/consultas/{id}`, `/consultas/medico/{id}`, `/consultas/paciente/{id}` |
| | POST | `/consultas` |
| | PUT | `/consultas/{id}` (confirmar e cancelar alteram o `status`) |

## Fluxo tela → serviço → endpoint

| Tela | Função do serviço | Endpoint |
| --- | --- | --- |
| Escolha de Especialidade | `listarEspecialidades()` | `GET /especialidades` |
| Escolha de Médico | `listarMedicosPorEspecialidade(id)` | `GET /medicos/especialidade/{id}` |
| <Tela de agendamento> | `agendarConsulta(...)` | `POST /consultas` |
| <Tela de consultas do paciente> | `listarConsultasPorPaciente(id)` | `GET /consultas/paciente/{id}` |
| <Tela de consultas do médico> | `listarConsultasPorMedico(id)` | `GET /consultas/medico/{id}` |
| <Detalhe da consulta> | `buscarConsultaPorId(id)` | `GET /consultas/{id}` |
| <Confirmar / cancelar> | `confirmarConsulta(...)` / `cancelarConsulta(...)` | `PUT /consultas/{id}` |

## Como cadastrar no app e conferir na API

1. Com backend e app rodando, na tela inicial escolha **Sou Paciente**.
2. Escolha a **especialidade** e o **médico**, preencha os dados e **agende a consulta**.
3. Confira que a consulta aparece na lista do app.
4. Confira na API: abra `http://localhost:8080/consultas` no navegador (ou `curl http://localhost:8080/consultas`). A consulta nova aparece no JSON, com o `id` gerado pelo backend.
5. (Opcional) Confira no console H2: `http://localhost:8080/h2-console`, JDBC URL `jdbc:h2:file:./data/consultas`.

## Como testar a integração

1. Suba o backend (repositório separado) e confirme `GET http://localhost:8080/consultas` retornando `[]` ou dados já salvos.
2. Suba este app, escolha **Sou Paciente** e veja a lista de especialidades e médicos — devem ser os mesmos dados da API.
3. Agende uma consulta pelo app e confira que ela aparece:
  - na lista do app;
  - no `GET /consultas` direto no navegador/Postman.
4. Para simular falha, pare o backend e recarregue o app.

## Comportamento com o backend parado

Cada tela tem três estados: **carregando**, **erro** e **sucesso**. As chamadas usam `try/catch/finally`, então uma falha de rede não trava a tela — ela mostra a mensagem de erro e permite tentar de novo assim que o backend voltar. Não há dados mockados no fluxo principal: com o backend parado, nenhum dado é exibido.

##Vídeo

🎥 <https://www.youtube.com/watch?v=CWpSwfw5hJQ> (YouTube, Não listado)
O vídeo mostra: README e repositórios → backend no ar com GET em JSON → app listando a API → cadastro no app e o dado no backend → backend parado → app recarregado sem dados (erro/loading, sem mock).
