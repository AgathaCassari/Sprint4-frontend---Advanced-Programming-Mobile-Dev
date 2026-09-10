import api from "./api";
import { Alerta, NovoAlerta } from "../types/Alerta";

// A tela nunca chama axios nem monta URL diretamente — ela sempre passa
// por essas funções, que sabem os endpoints e o formato dos dados.

export async function listar(): Promise<Alerta[]> {
  const resposta = await api.get<Alerta[]>("/alertas");
  return resposta.data;
}

export async function buscarPorId(id: number): Promise<Alerta> {
  const resposta = await api.get<Alerta>(`/alertas/${id}`);
  return resposta.data;
}

export async function criar(alerta: NovoAlerta): Promise<Alerta> {
  const resposta = await api.post<Alerta>("/alertas", alerta);
  return resposta.data;
}

// Opcionais (pedidos no enunciado, mas não obrigatórios nas telas):
export async function atualizar(
  id: number,
  alerta: NovoAlerta
): Promise<Alerta> {
  const resposta = await api.put<Alerta>(`/alertas/${id}`, alerta);
  return resposta.data;
}

export async function remover(id: number): Promise<void> {
  await api.delete(`/alertas/${id}`);
}

// A tela de Detalhe (DetalheAlertaScreen) usa listar() e buscarPorId()
// juntas com Promise.all — busca o alerta aberto e a lista completa em
// paralelo, para destacar outros alertas na mesma localização.
