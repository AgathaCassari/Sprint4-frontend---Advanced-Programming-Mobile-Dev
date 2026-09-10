# PrevIA App — Frontend (Sprint 3)

## Descrição

App Expo/React Native para o sistema PrevIA. Nas Sprints 1 e 2, o app usava
dados mockados. Nesta sprint, o app passa a consumir a API real do grupo
(entidade **Alerta**), que está em um repositório separado:
**[nome/link do repo do backend]**. O fluxo de lista, cadastro e detalhe
agora lê e grava direto no backend — o mock deixou de ser a fonte de dados.

**Importante:** o backend precisa estar rodando em `http://localhost:8080`
antes de abrir o app, ou a tela de lista vai mostrar o estado de erro.

## Como subir o frontend

1. Clone este repositório.
2. Instale as dependências (se ainda não tiver):
   ```
   npx expo install axios
   npx expo install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   ```
3. Rode `npx expo start`.
4. Abra no navegador, emulador ou no app Expo Go.

## Pasta `services`

A tela nunca chama `axios` nem monta URL — tudo passa por:

- `src/services/api.ts` — instância única do axios com `baseURL`, `timeout`
  de 10s e `Content-Type: application/json`.
- `src/services/alertaService.ts` — funções `listar()`, `buscarPorId(id)`,
  `criar(novoAlerta)` e, opcionalmente, `atualizar(id, alerta)` e
  `remover(id)`. É esse arquivo que sabe as rotas; as telas só chamam essas
  funções.

## BASE_URL

Definida em `src/services/api.ts`, resolvida por plataforma:

- Web / simulador iOS → `http://localhost:8080`
- Emulador Android → `http://10.0.2.2:8080` (o Android mapeia esse IP para o
  localhost da máquina host)
- Celular físico via Expo Go → IP da máquina na rede local, ex.
  `http://192.168.0.10:8080` (edite a constante `IP_DA_MAQUINA` no arquivo e
  troque o `return` do `resolverBaseUrl()`)

## Como testar a integração

1. Suba o backend (repositório separado) e confirme
   `GET http://localhost:8080/alertas` retornando `[]` ou dados já salvos.
2. Suba este app e abra a tela de lista — ela deve carregar os mesmos dados.
3. Cadastre um alerta pelo app e confira que ele aparece:
   - na lista do app (ela recarrega ao voltar da tela de cadastro);
   - no `GET /alertas` direto no navegador/Postman.
4. Toque em um alerta da lista para abrir o detalhe — ele busca
   `GET /alertas/{id}` na hora, não reaproveita o objeto da lista. Essa tela
   também busca a lista completa (`GET /alertas`) em paralelo com
   `Promise.all`, para mostrar outros alertas cadastrados na mesma
   localização.
5. Para simular falha, pare o backend e reabra a tela de lista.

## Comportamento com o backend parado

Cada tela tem três estados: **carregando** (spinner), **erro** (mensagem +
botão "Tentar novamente" na lista) e **sucesso** (dados exibidos). As
chamadas usam `try/catch/finally`, então uma falha de rede não trava a tela —
ela mostra a mensagem de erro e permite tentar de novo assim que o backend
voltar.
