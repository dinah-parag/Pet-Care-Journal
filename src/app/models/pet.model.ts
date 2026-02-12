export interface PetEntry {
  id: string;
  categoria: 'Medicação' | 'Banho' | 'Alimentação' | 'Customizado';
  titulo: string;
  comentario: string;
  data: Date;
  proximaData?: Date; // Opcional
}

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  diario: PetEntry[]; // Lista de eventos
}