export type Consulta = {
  id: number;
  paciente: string;
  medico: string;
  especialidade: string;
  status: "Agendada" | "Concluída" | "Cancelada";
  data: string;
};