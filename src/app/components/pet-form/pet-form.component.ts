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
  exibirFormNovoPet: boolean = false;

  novoAnimal: Pet = this.resetAnimal();
  novaEntrada: PetEntry = this.resetEntrada();

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.petService.pets$.subscribe(dados => this.listaDePets = dados);
  }

  onSelectChange() {
    this.exibirFormNovoPet = (this.petSelecionadoId === 'novo');
  }

  salvarPet() {
    this.novoAnimal.id = Date.now();
    this.petService.addPet({ ...this.novoAnimal });
    this.petSelecionadoId = this.novoAnimal.id.toString();
    this.exibirFormNovoPet = false;
    this.novoAnimal = this.resetAnimal();
  }

  salvarNoDiario() {
    this.petService.adicionarEvento(Number(this.petSelecionadoId), { ...this.novaEntrada });
    this.novaEntrada = this.resetEntrada();
  }

  private resetAnimal(): Pet {
    return { id: 0, nome: '', especie: 'Gato', idade: 0, sexo: 'Macho', diario: [] };
  }

  private resetEntrada(): PetEntry {
    return { id: Math.random().toString(), categoria: 'Alimentação', titulo: '', comentario: '', data: new Date() };
  }
}