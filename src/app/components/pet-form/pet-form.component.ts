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

  modoEdicao: boolean = false;

  novoAnimal: Pet = this.resetAnimal();
  novaEntrada: PetEntry = this.resetEntrada();

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.petService.pets$.subscribe(dados => this.listaDePets = dados);

        this.petService.petParaEditar$.subscribe(petParaEditar => {
      if (petParaEditar) {
        // Entra no modo de edição
        this.modoEdicao = true;
        this.exibirFormNovoPet = true;
        this.petSelecionadoId = 'novo'; 
        this.novoAnimal = { ...petParaEditar };
      }
    });
  }

  onSelectChange() {
    if (this.petSelecionadoId === 'novo') {
      this.exibirFormNovoPet = true;
      this.modoEdicao = false; 
      this.novoAnimal = this.resetAnimal();
    } else {
      this.exibirFormNovoPet = false;
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.novoAnimal.imagemUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  
  salvarPet() {
    this.novoAnimal.id = Date.now();
    this.petService.addPet({ ...this.novoAnimal });
    this.finalizarCadastro(this.novoAnimal.id.toString());
  }

  
  atualizarPetExistente() {
    this.petService.atualizarPet({ ...this.novoAnimal });
    this.finalizarCadastro('');
    alert('Pet atualizado com sucesso!');
  }

  cancelarEdicao() {
    this.finalizarCadastro('');
  }

  private finalizarCadastro(selecionarId: string) {
    this.petSelecionadoId = selecionarId;
    this.exibirFormNovoPet = false;
    this.modoEdicao = false;
    this.novoAnimal = this.resetAnimal();
    this.petService.limparPetParaEditar(); 
  }

  salvarNoDiario() {
    if (!this.petSelecionadoId || this.petSelecionadoId === 'novo') return;
    this.petService.adicionarEvento(Number(this.petSelecionadoId), { ...this.novaEntrada });
    this.novaEntrada = this.resetEntrada();
  }

  private resetAnimal(): Pet {
    return { id: 0, nome: '', especie: 'Gato', idade: 0, sexo: 'Macho', imagemUrl: 'https://marketeer.b-cdn.net/wp-content/uploads/2025/10/Pet-for-Your-Home-and-Lifestyle.jpeg', diario: [] };
  }

  private resetEntrada(): PetEntry {
    return { id: Math.random().toString(), categoria: 'Alimentação', titulo: '', comentario: '', data: new Date() };
  }
}