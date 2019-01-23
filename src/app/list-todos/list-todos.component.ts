import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos: Todo[];
  // todo: Todo;
  message: string;
  // = [
  //   new Todo(1, 'finish asap with this idiot', false, new Date()),
  //   new Todo(2, 'feed cato', false, new Date()),
  //   new Todo(3, 'do spring boot', false, new Date())
  // ];
  // todo = {
  //   id: 1,
  //   description: 'finish asap with this idiot'
  // };

  constructor(private todoService: TodoDataService, private router: Router) {}

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('cato').subscribe(response => {
      console.log(response);
      this.todos = response;
    });
  }

  deleteTodo(id: number) {
    // console.log(`Delete Todo  ${id}`);
    // console.log(typeof(id));
    this.todoService.deleteTodo('cato', id).subscribe(response => {
      console.log(response);
      this.message = `Successfully Deleted Todo with id ${id}`;
      this.refreshTodos();
    });
  }
  updateTodo(id: number) {
    console.log(`Update todo with id ${id}`);
    this.router.navigate(['/todos', id]);
  }
  addTodo() {
    console.log(`Add todo `);
    // this.todoService.addTodo().subscribe();
    this.router.navigate(['todos', -1]);
  }
}
