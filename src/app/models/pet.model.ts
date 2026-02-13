export interface PetEntry {
  id: string;
  categoria: 'Medicação' | 'Banho' | 'Alimentação' | 'Customizado';
  titulo: string;
  comentario: string;
  data: Date;
  proximaData?: Date;
}


export interface Pet {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  sexo: 'Macho' | 'Fêmea';
  imagemUrl?: string;
  diario: PetEntry[];
}