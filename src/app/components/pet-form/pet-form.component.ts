import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { Pet, PetEntry } from '../../models/pet.model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent implements OnInit {
  listaDePets: Pet[] = [];
  petSelecionadoId: string = ''; 

  // Objeto para a nova entrada do diário
  novaEntrada: PetEntry = this.limparEntrada();

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.listaDePets = this.petService.getPets();
  }

  limparEntrada(): PetEntry {
    return {
      id: Math.random().toString(),
      categoria: 'Alimentação',
      titulo: '',
      comentario: '',
      data: new Date()
    };
  }

  salvarNoDiario() {
    if (!this.petSelecionadoId) {
      alert('Por favor, escolha um gatinho primeiro! 🐈');
      return;
    }

    this.petService.adicionarEvento(Number(this.petSelecionadoId), { ...this.novaEntrada });
    this.novaEntrada = this.limparEntrada();
    alert('Acontecimento registrado! ✨');
  }
}