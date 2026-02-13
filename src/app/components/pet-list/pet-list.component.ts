import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export class PetListComponent implements OnInit {
  meusPets: Pet[] = [];

  constructor(private petService: PetService) {}
editarPet(pet: Pet) {
  this.petService.setPetParaEditar(pet);
  // Opcional: rolar a página para cima para ver o formulário
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


  ngOnInit() {
    this.petService.pets$.subscribe(dados => {
      this.meusPets = dados;
    });
  }

  apagarPet(id: number) {
    if (confirm('Deseja excluir este pet e todo o seu diário?')) {
      this.petService.excluirPet(id);
    }
  }

  excluirRegistro(petId: number, eventoId: string) {
    this.petService.excluirEvento(petId, eventoId);
  }
}