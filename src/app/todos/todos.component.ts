import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Itodos } from '../models/todos';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  isUpdateMode : boolean = false;
  @ViewChild('todoName') todoRef! : ElementRef
  constructor(private _matSnackBar : MatSnackBar) { }
  todoArr : Array<Itodos>  = [
    {
    todoItem : 'HTML',
    todoId : '123'
  },
  {
    todoItem : 'CSS',
    todoId : '124'
  },
  {
    todoItem : 'JS',
    todoId : '125'
  },
  {
    todoItem : 'Anular',
    todoId : '126'
  },
  {
    todoItem : 'TypeScript',
    todoId : '127'
  },
  {
    todoItem : 'SASS',
    todoId : '128'
  }
  ]
Uuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
  ngOnInit(): void {
  }

  onAddTodo():void{
    let Obj ={
      todoItem : this.todoRef.nativeElement.value,
      todoId : this.Uuid()
    }
    // console.log(Obj)
    this.todoArr.unshift(Obj)
    this.todoRef.nativeElement.value = ''
    this._matSnackBar.open(`The todo item with id ${Obj.todoId} is added successfully !!!`, 'close',{
      duration: 2000,
      horizontalPosition:'left',
      verticalPosition:'top'
    })
  }

  onEditTodo(ele : Itodos):void{
    this.isUpdateMode = true
    let Edit_Id = ele.todoId
    localStorage.setItem('Edit_Id', Edit_Id )
    this.todoRef.nativeElement.value = ele.todoItem
}
onUpdateTodo():void{
let Updated_Id = localStorage.getItem('Edit_Id')
localStorage.removeItem('Edit_Id')
if(Updated_Id){
  let Updated_Obj = {
 todoItem : this.todoRef.nativeElement.value,
 todoId : Updated_Id
}
let Updated_Index = this.todoArr.findIndex(todo => todo.todoId === Updated_Id)
this.todoArr[Updated_Index] = Updated_Obj
this.todoRef.nativeElement.value = ''
this.isUpdateMode = false
this._matSnackBar.open(`The todo item with id ${Updated_Obj.todoId} is updated successfully !!!`, 'close',{
  duration:2000,
  horizontalPosition : 'left',
  verticalPosition : 'top'
})
}
}

onRemoveTodo(ele : Itodos):void{
  let isConfirm = confirm('Are you sure want to remove this todo item !!!')
if(isConfirm){
  let remove_Id = ele.todoId
let getIndex = this.todoArr.findIndex(todo=>todo.todoId === remove_Id)
this.todoArr.splice(getIndex, 1)
this._matSnackBar.open(`The todo item with id ${remove_Id} is removed successfully !!!`, 'close',{
  duration : 2000,
  verticalPosition : 'top',
  horizontalPosition : 'left'
})
}
}


}