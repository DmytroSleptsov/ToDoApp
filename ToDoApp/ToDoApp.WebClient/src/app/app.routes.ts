import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

export const routes: Routes = [
    {path: '', redirectTo: '/tasks', pathMatch: 'full' },
    {path: 'tasks', component: TaskListComponent},
    {path: 'tasks/add', component: TaskAddComponent},
    {path: 'tasks/:id', component: TaskFormComponent},
];
