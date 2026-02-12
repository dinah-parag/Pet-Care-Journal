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
  lista: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit() {
    // Inscreve-se para receber atualizações automáticas
    this.petService.pets$.subscribe(dados => {
      this.lista = dados;
    });
  }
}