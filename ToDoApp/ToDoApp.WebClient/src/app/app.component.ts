import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ToDoApp';

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  register(): void {
    this.router.navigate(['/registration']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
}