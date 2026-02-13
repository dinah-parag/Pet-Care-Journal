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

  getPets() { return this.pets; }

  addPet(pet: Pet) {
    this.pets.push(pet);
    this.petsSubject.next([...this.pets]);
  }

  excluirPet(id: number) {
    this.pets = this.pets.filter(p => p.id !== id);
    this.petsSubject.next([...this.pets]);
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
    }
  }
}