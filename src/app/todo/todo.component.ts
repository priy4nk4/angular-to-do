import {Component, OnInit, ViewChild} from '@angular/core';
import {todoItemModel} from '../model/todoItem.model';
import {TagModel} from '../model/tag.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  itemList: todoItemModel[] = [];
  completedTask: todoItemModel[] = [];
  @ViewChild('f') form: any;
  isInputValid: boolean = false;
  tags: TagModel[] = [{title: 'work', color: 'blue'}, {title: 'important', color: 'red'}]

  constructor() {
  }

  ngOnInit(): void {
  }

  onInputValueChanged(event: Event) {
    let title = this.form.value.title.trim();
    if (title.length && this.form.valid) {
      this.isInputValid = true;
    } else {
      this.isInputValid = false
    }
  }

  addItem() {
    this.itemList.push({title: this.form.value.title, isDone: false, tag: 'add tag'})
    this.form.reset();
  }

  updateItem(event: Event, index: number) {
    this.itemList[index].isDone = !this.itemList[index].isDone;
    this.getCompletedItem()
  }

  removeItem(index: number) {
    this.itemList.splice(index, 1);
    this.getCompletedItem();
  }

  getCompletedItem() {
    this.completedTask = this.itemList.filter(item => item.isDone == true);

  }

  updateTag(index: number, tag: string) {
    this.itemList[index].tag = tag
  };
}
