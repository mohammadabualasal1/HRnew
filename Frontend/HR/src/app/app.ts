import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor, NgClass, NgStyle, CommonModule } from '@angular/common';
import { RandomColor } from './directives/random-color';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, FormControlName, Validators } from '@angular/forms';
import { ReversePipe } from './pipes/reverse-pipe';
import { Employees } from './components/employees/employees'
@Component({ // Decorator
  selector: 'app-root',
  imports: [//RouterOutlet,
   // RandomColor,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReversePipe,
    Employees
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})// ts, html, css | Component
export class App {


}
