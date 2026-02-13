import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pet, PetEntry } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  private pets: Pet[] = [
    { id: 1, nome: 'Melissa', especie: 'Gato', idade: 2, sexo: 'Fêmea', diario: [] },
    { id: 2, nome: 'Nibs', especie: 'Gato', idade: 6, sexo: 'Fêmea', diario: [] }
  ];

  private petsSubject = new BehaviorSubject<Pet[]>(this.pets);
  pets$ = this.petsSubject.asObservable();

  private petParaEditarSubject = new BehaviorSubject<Pet | null>(null);
  petParaEditar$ = this.petParaEditarSubject.asObservable();

  setPetParaEditar(pet: Pet) {
    this.petParaEditarSubject.next(pet);
  }

  limparPetParaEditar() {
    this.petParaEditarSubject.next(null);
}

  getPets() { return this.pets; }

  addPet(pet: Pet) {
    this.pets.push(pet);
    this.petsSubject.next([...this.pets])
    this.salvarNoDisco();
}

  excluirPet(id: number) {
    this.pets = this.pets.filter(p => p.id !== id);
    this.petsSubject.next([...this.pets]);
  }

  atualizarPet(petAtualizado: Pet) {
    const index = this.pets.findIndex(p => p.id === petAtualizado.id);
    if (index !== -1) {
      this.pets[index] = { ...petAtualizado, diario: this.pets[index].diario };
      this.petsSubject.next([...this.pets]);
    }
  }

  adicionarEvento(petId: number, evento: PetEntry) {
    const pet = this.pets.find(p => p.id === petId);
    if (pet) {
      pet.diario.unshift(evento);
      this.petsSubject.next([...this.pets]);
    }
  }

excluirEvento(petId: number, eventoId: string) {
  const pet = this.pets.find(p => p.id === petId);
  if (pet) {
    pet.diario = pet.diario.filter(e => e.id !== eventoId);
    this.petsSubject.next([...this.pets]);
    this.salvarNoDisco();
  }
}

  constructor() {
  const dadosSalvos = localStorage.getItem('pet_journal_data');
  if (dadosSalvos) {
    this.pets = JSON.parse(dadosSalvos);
    this.petsSubject.next([...this.pets]);
  }
}

private salvarNoDisco() {
  localStorage.setItem('pet_journal_data', JSON.stringify(this.pets));
}
}