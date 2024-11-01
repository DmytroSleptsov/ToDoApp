import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  task: Task = { id: 0, name: '', description: '', isCompleted: false };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {
    
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.taskService.getTask(+id!).subscribe(task => {
        this.task = task;
    })
  }

  saveTask(): void {
    this.taskService.updateTask(this.task.id, this.task).subscribe(task =>{
      this.router.navigate([''])
    });
  }
}
