import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PetFormComponent } from './components/pet-form/pet-form.component';
import { PetListComponent } from './components/pet-list/pet-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PetFormComponent, PetListComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}