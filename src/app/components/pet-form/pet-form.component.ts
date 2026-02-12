import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  novoPet: Pet = { id: 0, nome: '', especie: '', idade: 0 };

  constructor(private petService: PetService) {}

salvar() {
    this.novoPet.id = Date.now();
    this.petService.addPet({ ...this.novoPet });
    // Limpa o formulário após salvar
    this.novoPet = { id: 0, nome: '', especie: '', idade: 0 };
    alert('Pet adicionado! 🐾');
  }
}