import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IstdArr } from '../models/students';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  isEditMode :boolean = false
  @ViewChild('fname') fnameRef ! : ElementRef
  @ViewChild('lname') lnameRef ! : ElementRef
  @ViewChild('email') emailRef ! : ElementRef
  @ViewChild('contact') contactRef ! : ElementRef
  constructor(private _matSnackBar : MatSnackBar) { }

  ngOnInit(): void {
  }
  stdArr : Array<IstdArr> = [
    {
      fname : 'Jhon',
      lname : 'Doe',
      email : 'jhon@gmail.com',
      contact : 1234567890,
      stdId : '123'
    },
    {
      fname : 'May',
      lname : 'Doe',
      email : 'may@gmail.com',
      contact : 1234567890,
      stdId : '124'
    },
    {
      fname : 'June',
      lname : 'Doe',
      email : 'june@gmail.com',
      contact : 1234567890,
      stdId : '125'
    },
    {
      fname : 'July',
      lname : 'Doe',
      email : 'july@gmail.com',
      contact : 1234567890,
      stdId : '126'
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


onAddStd():void{
  let stdObj ={
    fname : this.fnameRef.nativeElement.value,
    lname : this.lnameRef.nativeElement.value,
    email : this.emailRef.nativeElement.value,
    contact : this.contactRef.nativeElement.value,
    stdId : this.Uuid()
  }
  console.log(stdObj)
  this.stdArr.push(stdObj)
  this.fnameRef.nativeElement.value = ''
  this.lnameRef.nativeElement.value = ''
  this.emailRef.nativeElement.value = ''
  this.contactRef.nativeElement.value = ''
  this._matSnackBar.open(`The student ${stdObj.fname} ${stdObj.lname} is added successfully !!!`,'close',{
    duration : 2000,
    verticalPosition: 'top',
    horizontalPosition : 'left'
  })
}

onStdEdit(std:IstdArr):void{
  let Edit_Id = std.stdId;
  // console.log(Edit_Id)
  localStorage.setItem('Edit_Id', Edit_Id)
  this.fnameRef.nativeElement.value = std.fname
  this.lnameRef.nativeElement.value = std.lname
  this.emailRef.nativeElement.value = std.email
  this.contactRef.nativeElement.value = std.contact
  this.isEditMode = true
}

onStdUpdate():void{
  let Updated_Id = localStorage.getItem('Edit_Id')
  console.log(Updated_Id)
  if(Updated_Id){
    let Updated_Obj = {
    fname : this.fnameRef.nativeElement.value,
    lname : this.lnameRef.nativeElement.value,
    email : this.emailRef.nativeElement.value,
    contact : this.contactRef.nativeElement.value,
    stdId : Updated_Id
  }
  let getIndex = this.stdArr.findIndex(std =>std.stdId === Updated_Id)
  this.stdArr[getIndex] = Updated_Obj
  }
  this.fnameRef.nativeElement.value = ''
  this.lnameRef.nativeElement.value = ''
  this.emailRef.nativeElement.value = ''
  this.contactRef.nativeElement.value = ''
  this.isEditMode = false
  this._matSnackBar.open(`The student with id ${Updated_Id} is updated successfully`, 'close',{
    duration:2000,
    verticalPosition:'top',
    horizontalPosition : 'left'
  })
}

onStdRemove(std:IstdArr):void{
  let isConfirm = confirm(`Are you sure want to remove this std details !!!`)
  if(isConfirm){
    let Remove_Id = std.stdId;
  let getIndex = this.stdArr.findIndex(std=>std.stdId === Remove_Id)
  this.stdArr.splice(getIndex, 1)
  this._matSnackBar.open(`The student with remove id ${Remove_Id} is removed successfully !!!`, 'close',{
    duration: 2000,
    verticalPosition:'top',
    horizontalPosition: 'left'
  })
  }
}

}