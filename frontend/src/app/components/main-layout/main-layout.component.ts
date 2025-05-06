import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class MainLayoutComponent {
  constructor(private router: Router) {}

  navegarAPokemons() {
    this.router.navigate(['/pokemons']);
  }
}