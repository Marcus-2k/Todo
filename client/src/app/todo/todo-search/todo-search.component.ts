import { Component } from '@angular/core';
import { TodoService } from 'src/app/shared/service/todo.service';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss'],
})
export class TodoSearchComponent {
  constructor(private todoService: TodoService) {}

  inputSearchPipe(value: string) {
    this.todoService.newSearchPipe(value);
  }
}
