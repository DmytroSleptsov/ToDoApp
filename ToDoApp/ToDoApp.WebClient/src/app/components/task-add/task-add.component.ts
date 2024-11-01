import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent{
  constructor(
    private taskService: TaskService,
    private router: Router,
  ) { }

  task: Task = { id: 0, name: '', description: '', isCompleted: false };

  onSubmit(): void{
    this.taskService.createTask(this.task).subscribe(() => 
      this.router.navigate([''])
    );
  }
}
