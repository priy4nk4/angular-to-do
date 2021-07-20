import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {todoItemModel} from '../model/todoItem.model';
import {TagModel} from '../model/tag.model';
import { faCoffee , faPlus, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  activeList: todoItemModel[] = [];
  completedList: todoItemModel[] = [];
  @ViewChild('f') form: any;
  
  isInputValid: boolean = false;
  tags: TagModel[] = [{title: 'Work', color: 'blue'}, {title: 'Important', color: 'red'}]
  faCoffee = faCoffee;
  faPlus = faPlus;
  faCheckCircle = faCheckCircle;
  isNewTag: boolean = false;
  newTag!: string;
  activeTab: string = "active";
  constructor() {
  }

  ngOnInit(): void {
  
  }

  createNewTag() {
    this.isNewTag = true;
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
    this.activeList.push({title: this.form.value.title, isDone: false, tag: []})
    this.form.reset();
  }

  updateItem(event: any, index: number) {
    if(event.target?.checked){
      this.activeList[index].isDone = true;
      this.completedList.push(this.activeList[index]);
      console.log(this.completedList);
      this.activeList.splice(index, 1);
    } else {
      this.completedList[index].isDone = false;
      this.activeList.push(this.completedList[index]);
      console.log(this.completedList);
      this.completedList.splice(index, 1);
    }
    
  }

  removeItem(index: number) {
    if (this.activeTab == 'active') {
      this.activeList.splice(index, 1);
    } else {
      this.completedList.splice(index, 1);
    }
  }

  updateTag(event: any, index: number, tag: TagModel) {
    if(event.target.checked){
      this.activeList[index].tag.push(tag);
      console.log(this.activeList[index]);
    } else {
      let tagI =  this.activeList[index].tag.findIndex(ele => ele.title == tag.title);
      this.activeList[index].tag.splice(tagI, 1);
    }
  };

  isTagged(tag: TagModel, item: todoItemModel) {
    return item.tag.includes(tag);
  }

  addNewTag(){
    const randomHsl = () => `hsla(${Math.random() * 360}, 100%, 50%, 1)`
    if(this.newTag.trim().length> 0) {
      this.tags.push({title:this.newTag, color: randomHsl()});
      this.newTag = '';
    }

  }
  cancel() {
   $('.dropdown-menu').removeClass('show');
   $('.dropdown-toggle').removeClass('show');
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    event.stopPropagation()
  }

}
