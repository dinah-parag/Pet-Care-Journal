import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  private pets: Pet[] = [
    { id: 1, nome: 'Melissa', especie: 'Gato', idade: 2, ultimaAtividade: 'Alimentado' },
    { id: 2, nome: 'Nibs', especie: 'Gato', idade: 6, ultimaAtividade: 'Dormindo' }
  ];

  private petsSubject = new BehaviorSubject<Pet[]>(this.pets);
  
  // Transformamos o assunto em um Observable (apenas leitura)
  pets$ = this.petsSubject.asObservable();

  addPet(pet: Pet) {
    this.pets.push(pet);
    // Notificamos todos os inscritos que a lista mudou
    this.petsSubject.next([...this.pets]);
  }
}