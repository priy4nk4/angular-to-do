import { Component, OnInit, ViewChild } from '@angular/core';
import { todoItemModel } from '../model/todoItem.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  itemList: todoItemModel[] = []; completedTask:todoItemModel[] = [];
  @ViewChild('f') form: any;
  constructor() { }

  ngOnInit(): void {
  }

  onInputValueChanged(event: Event){
    console.log(event);
  }
  addItem() {
    this.itemList.push({title: this.form.value.title, isDone: false, tag: 'add tag'})
    this.form.reset();
  }
  updateItem(event: Event, index: number){
    this.itemList[index].isDone = !this.itemList[index].isDone;this.completedTask = this.itemList.filter(item=> item.isDone== true);
  }
  removeItem(index: number){
    this.itemList.splice(index, 1);
  }
}
