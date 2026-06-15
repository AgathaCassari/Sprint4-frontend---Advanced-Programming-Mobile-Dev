import { Consulta } from "../types/Consulta";

export const consultasMock: Consulta[] = [
  {
    id: 1,
    paciente: "Maria Silva",
    medico: "Dr. João Pereira",
    especialidade: "Cardiologia",
    status: "Agendada",
    data: "20/06/2026",
  },

  {
    id: 2,
    paciente: "Pedro Santos",
    medico: "Dra. Ana Souza",
    especialidade: "Dermatologia",
    status: "Concluída",
    data: "15/06/2026",
  },

  {
    id: 3,
    paciente: "Juliana Costa",
    medico: "Dr. Carlos Lima",
    especialidade: "Ortopedia",
    status: "Cancelada",
    data: "18/06/2026",
  },
];