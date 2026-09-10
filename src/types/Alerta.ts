// Alinhado ao JSON retornado pela API Spring Boot (entidade Alerta).
export type Alerta = {
  id: number;
  tipo: string;
  localizacao: string;
  nivelRisco: string;
  descricao: string;
};

// Usado ao criar um alerta novo: o id é gerado pelo backend (@GeneratedValue),
// então o corpo do POST não deve incluí-lo.
export type NovoAlerta = Omit<Alerta, "id">;
