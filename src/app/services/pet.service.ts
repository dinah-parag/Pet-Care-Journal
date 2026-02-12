import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  private pets: Pet[] = [
    { id: 1, nome: 'Melissa', especie: 'Gato', idade: 2, ultimaAtividade: 'Alimentado' },
    { id: 2, nome: 'Nibs', especie: 'Gato', idade: 3, ultimaAtividade: 'Dormindo' }
  ];

  getPets() { return this.pets; }

  addPet(pet: Pet) { this.pets.push(pet); }
}