import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{Employee}from'./employee/employee'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReversePipe } from './pipes/reverse-pipe';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule,ReversePipe,Employee],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
}
