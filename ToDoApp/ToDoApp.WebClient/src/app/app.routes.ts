import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
    { path: 'tasks/add', component: TaskAddComponent, canActivate: [authGuard] },
    { path: 'tasks/:id', component: TaskFormComponent, canActivate: [authGuard] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
];
