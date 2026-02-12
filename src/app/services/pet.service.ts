import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pet, PetEntry } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  // Inicializamos com seus 4 gatos para o diário já ter conteúdo
  private pets: Pet[] = [
    { id: 1, nome: 'Melissa', especie: 'Gato', idade: 2, diario: [] },
    { id: 2, nome: 'Nibs', especie: 'Gato', idade: 6, diario: [] },

  ];

  private petsSubject = new BehaviorSubject<Pet[]>(this.pets);
  pets$ = this.petsSubject.asObservable(); // A lista que os componentes vão "ouvir"

  getPets() {
    return this.pets;
  }

  // Para cadastrar um novo pet no futuro
  addPet(pet: Pet) {
    this.pets.push(pet);
    this.petsSubject.next([...this.pets]);
  }

  // A função principal do seu Journal: adicionar uma entrada a um pet específico
  adicionarEvento(petId: number, evento: PetEntry) {
    const pet = this.pets.find(p => p.id === petId);
    if (pet) {
      pet.diario.unshift(evento); // O evento novo entra no topo da lista
      this.petsSubject.next([...this.pets]); // Notifica o app da mudança
    }
  }
}