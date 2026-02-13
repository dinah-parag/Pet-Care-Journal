import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Pet, PetEntry } from '../models/pet.model';

@Injectable({ providedIn: 'root' })
export class PetService {
  private apiUrl = 'https://pet-backend-b5kh.onrender.com';

  private pets: Pet[] = [];
  private petsSubject = new BehaviorSubject<Pet[]>([]);
  pets$ = this.petsSubject.asObservable();

  private petParaEditarSubject = new BehaviorSubject<Pet | null>(null);
  petParaEditar$ = this.petParaEditarSubject.asObservable();

  constructor(private http: HttpClient) {
    this.carregarPetsDoServidor(); // <-- Corrigido aqui (sem o espaço!)
  }

  carregarPetsDoServidor() {
    this.http.get<Pet[]>(`${this.apiUrl}/pets`).subscribe({
      next: (dados) => {
        this.pets = dados;
        this.petsSubject.next([...this.pets]);
      },
      error: (err) => console.error('Erro ao buscar pets:', err)
    });
  }

  addPet(pet: Pet) {
    return this.http.post(`${this.apiUrl}/pets`, pet).pipe(
      tap(() => this.carregarPetsDoServidor())
    );
  }

  excluirPet(id: number) {
    this.http.delete(`${this.apiUrl}/pets/${id}`).subscribe({
      next: () => this.carregarPetsDoServidor(),
      error: (err) => console.error('Erro ao excluir pet:', err)
    });
  }

  atualizarPet(petAtualizado: Pet) {
    return this.http.post(`${this.apiUrl}/pets`, petAtualizado).pipe(
      tap(() => this.carregarPetsDoServidor())
    );
  }

  adicionarEvento(petId: number, evento: PetEntry) {
    const pet = this.pets.find(p => p.id === petId);
    if (pet) {
      const petAtualizado = { ...pet, diario: [evento, ...pet.diario] };
      this.atualizarPet(petAtualizado).subscribe();
    }
  }

  excluirEvento(petId: number, eventoId: string) {
    const pet = this.pets.find(p => p.id === petId);
    if (pet) {
      const petAtualizado = { ...pet, diario: pet.diario.filter(e => e.id !== eventoId) };
      this.atualizarPet(petAtualizado).subscribe();
    }
  }

  setPetParaEditar(pet: Pet) { this.petParaEditarSubject.next(pet); }
  limparPetParaEditar() { this.petParaEditarSubject.next(null); }
  getPets() { return this.pets; }
}