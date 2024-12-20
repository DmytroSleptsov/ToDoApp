import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ToDoApp';
  isAuthenticated = false;
  
  private tokenSubscription: Subscription | null = null;;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.tokenSubscription = this.authService.token$.subscribe(token => {
      this.isAuthenticated = !!token;
    });
  }

  ngOnDestroy(): void {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }

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