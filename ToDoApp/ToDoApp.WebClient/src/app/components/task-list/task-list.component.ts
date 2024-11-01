import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  
  constructor(private taskService: TaskService, private router: Router){}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.reverse();
    });

    this.tasks = this.tasks.reverse()
  }

  removeTask(id: number, event: Event): void{
    event.stopPropagation();

    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  openTask(id: number) {
    this.router.navigate(['/tasks', id]);
  }

  completeTask(id: number, event: Event): void{
    event.stopPropagation();
    
    let task = this.tasks.find(task => task.id == id);
    task!.isCompleted = !task!.isCompleted;
    this.taskService.updateTask(id, task!).subscribe();
  }
}
