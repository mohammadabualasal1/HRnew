import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';

@Component({ // Decorator
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, NgFor, NgClass, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.css'
})// ts, html, css | Component
export class App {

  //  title : string= "Welcome to Angular From Typescript";
  //  num : number = 52.4549;
  //  bool : boolean = true;
  //  arr : string[] = ["one","two","three"];
  
  students = [
    {name : 'stu_1', mark : 49},
    {name : 'stu_2', mark : 88},
    {name : 'stu_3', mark : 56},
    {name : 'stu_4', mark : 32},
    {name : 'stu_5', mark : 98},
    {name : 'stu_6', mark : 66},
  ];
}
