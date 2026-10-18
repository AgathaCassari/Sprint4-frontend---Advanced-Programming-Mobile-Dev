# PrevIA — App (Frontend) · Sprint 4 · Entrega Final

App Expo / React Native integrado à API Spring Boot do PrevIA.

## 1. Projeto e problema

Em ambientes industriais, a segurança exige monitoramento contínuo e resposta rápida para evitar acidentes e proteger os operadores. Muitos riscos, como a ausência de EPI (capacete, colete, luvas), posturas inadequadas, aproximação de áreas perigosas ou condições invisíveis a olho nu, só são percebidos quando o incidente já ocorreu.

O **PrevIA** é um sistema de prevenção de acidentes inspirado nesse desafio: a visão computacional identifica situações de risco e o sistema registra **alertas** de segurança (ausência de EPI, comportamento de risco etc.). Este app mobile permite **listar, cadastrar e consultar** esses alertas, consumindo a API Spring Boot do grupo, para que a equipe acompanhe os riscos e aja de forma preventiva..

**Entidade principal:** `Alerta`

| Campo | Descrição |
|---|---|
| `id` | Gerado pelo backend |
| `tipo` | Tipo do alerta (ex.: ausência de EPI) |
| `localizacao` | Onde ocorreu |
| `nivelRisco` | Nível de risco |
| `descricao` | Descrição do ocorrido |

## 2. Integrantes

| Nome | RM |
|---|---|
| Agatha Cassari Benedicto | 556251 |
| Gustavo Shinn Shyong Cheng | 559084 |
| Leonardo Fernandes Veleiro | 557773 |
| Sara Barbosa da Silva | 559042 |

## 3. Repositórios

| Parte | Link |
|---|---|
| Backend (Spring Boot) | https://github.com/AgathaCassari/Sprint1-backend---Advanced-Programming-Mobile-Dev |
| Frontend (Expo) — este repositório | https://github.com/AgathaCassari/Sprint2-frontend---Advanced-Programming-Mobile-Dev |

## 4. Pré-requisitos

- **Java 17**
- **Maven 3.9+** (o backend também traz o wrapper `./mvnw`)
- **Node.js** (versão LTS) e **npm**
- **Expo**: não precisa instalar globalmente, usa-se `npx expo start`
- Para rodar o app: navegador, emulador (Android Studio / Xcode) **ou** celular com o app **Expo Go**

## 5. Como subir o backend (porta 8080)

```bash
git clone https://github.com/AgathaCassari/Sprint1-backend---Advanced-Programming-Mobile-Dev.git
cd Sprint1-backend---Advanced-Programming-Mobile-Dev
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run  (ou: mvn spring-boot:run)
```

- A API sobe em `http://localhost:8080`.
- Teste no navegador: `http://localhost:8080/alertas` deve devolver um JSON (`[]` ou a lista de alertas).
- Banco **H2 em arquivo** (`jdbc:h2:file:./data/previa`): os dados persistem entre execuções.
- Console H2 (opcional): `http://localhost:8080/h2-console` — JDBC URL `jdbc:h2:file:./data/previa`, usuário `sa`, senha em branco.
- CORS liberado no `AlertaController` com `@CrossOrigin(origins = "*")`.

## 6. Como subir o frontend

Em **outro terminal**, com o backend já rodando:

```bash
git clone https://github.com/AgathaCassari/Sprint2-frontend---Advanced-Programming-Mobile-Dev.git
cd Sprint2-frontend---Advanced-Programming-Mobile-Dev
npm install
npx expo start
```

Depois, no terminal do Expo:
- tecle `w` para abrir no navegador;
- tecle `a` para abrir no emulador Android;
- tecle `i` para abrir no simulador iOS (somente macOS);
- ou leia o QR Code com o **Expo Go** no celular.

## 7. BASE_URL

Definida em `src/services/api.ts`, na função `resolverBaseUrl()`:

| Onde o app roda | BASE_URL |
|---|---|
| Navegador (web) / simulador iOS | `http://localhost:8080` |
| Emulador Android | `http://10.0.2.2:8080` (o Android mapeia esse IP para o `localhost` do computador) |
| Celular físico (Expo Go) | `http://<IP_DA_MAQUINA>:8080`, ex.: `http://192.168.0.10:8080` |

Para o celular físico: o celular e o computador precisam estar na **mesma rede Wi-Fi**. Edite a constante `IP_DA_MAQUINA` em `src/services/api.ts`. Para descobrir o IP, use `ipconfig` (Windows) ou `ifconfig` / `ip a` (Linux/macOS).

## 8. Endpoints usados pelo app

| Ação | Método | Rota |
|---|---|---|
| Listar alertas | GET | `/alertas` |
| Buscar alerta por ID | GET | `/alertas/{id}` |
| Cadastrar alerta | POST | `/alertas` |
| Atualizar alerta (opcional) | PUT | `/alertas/{id}` |
| Remover alerta (opcional) | DELETE | `/alertas/{id}` |

Exemplo de corpo do `POST /alertas`:

```json
{
  "tipo": "Ausência de EPI",
  "localizacao": "Setor A",
  "nivelRisco": "Alto",
  "descricao": "Funcionário sem capacete na área de carga"
}
```

## 9. Fluxo tela → serviço → endpoint

As telas **nunca** chamam `axios` nem montam URL. Tudo passa por `src/services/`:

- `src/services/api.ts`: instância única do axios (`baseURL`, `timeout` de 10 s, `Content-Type: application/json`).
- `src/services/alertaService.ts`: funções que conhecem as rotas.

| Tela | Função do serviço | Endpoint |
|---|---|---|
| Lista de alertas | `listar()` | `GET /alertas` |
| Cadastro de alerta | `criar(novoAlerta)` | `POST /alertas` |
| Detalhe do alerta | `buscarPorId(id)` + `listar()` (em paralelo, via `Promise.all`) | `GET /alertas/{id}` e `GET /alertas` |

Fluxo: **Tela → `alertaService` → `api.ts` (axios) → API Spring Boot → H2 (arquivo)**.

## 10. Como cadastrar no app e conferir na API

1. Com backend e app rodando, abra a **Lista** e veja os alertas atuais.
2. Vá para **Cadastro**, preencha `tipo`, `localização`, `nível de risco` e `descrição` e salve.
3. Ao voltar, a lista recarrega e mostra o novo alerta.
4. Confira na API: abra `http://localhost:8080/alertas` no navegador (ou `curl http://localhost:8080/alertas`). O alerta novo aparece no JSON com o `id` gerado pelo backend.
5. (Opcional) Confira no console H2 em `http://localhost:8080/h2-console`.

## 11. Como parar o backend e ver o app sem dados

1. No terminal do backend, pressione `Ctrl + C`.
2. No app, recarregue a lista (botão **"Tentar novamente"** ou recarregue o Expo com `r`).
3. Resultado esperado: **nenhum dado é exibido**, só a mensagem de erro de conexão.

Não existe mock no fluxo principal. Cada tela tem três estados (**carregando**, **erro** e **sucesso**), tratados com `try/catch/finally`. Quando o backend volta, basta tocar em "Tentar novamente".
