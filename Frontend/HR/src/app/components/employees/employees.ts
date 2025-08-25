import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  providers: [DatePipe], // Depndency Injcution
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees {

  @ViewChild ('closeButton') closeButton: ElementRef | undefined;// Get Element By ID

  employees : Employee[] = [
    {id: 1, name: "Emp1", isActive: true, startDate: new Date(2025, 11, 21), phone: "+96255895155", positionId: 1, positionName: "Manager",
      birthdate: new Date(1995,5,1), departmentId: 1, departmentName: "HR", managerId: null, managerName : null
    },
    {id: 2, name: "Emp2", isActive: true, startDate: new Date(2025, 6, 21), phone: "+9625466456", positionId: 1, positionName: "Manager",
      birthdate: new Date(1994,5,1), departmentId: 2, departmentName: "IT", managerId: null, managerName : null
    },
    {id: 3, name: "Emp3", isActive: false, startDate: new Date(2025, 5, 21), phone: "+9677777", positionId: 2, positionName: "Developer",
      birthdate: new Date(2000,5,1), departmentId: 2, departmentName: "IT", managerId: 2, managerName : "Emp2"
    },
    {id: 4, name: "Emp4", isActive: true, startDate: new Date(2025, 1, 11), phone: "+964534534534", positionId: 2, positionName: "Developer",
      birthdate: new Date(2001,5,1), departmentId: 2, departmentName: "IT", managerId: 2, managerName : "Emp2"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
    {id: 5, name: "Emp5", isActive: false, startDate: new Date(2025, 2, 25), phone: "+9622244552", positionId: 3, positionName: "HR",
      birthdate: new Date(1999,5,1), departmentId: 1, departmentName: "HR", managerId: 1, managerName : "Emp1"
    },
  ];

  employeesTableColumns: string[] = ["#", "Name", "Phone", "Birthdate","Status", "Start Date", "Position", "Department", "Manager"];

  departments = [
    {id: null, name: "Select Department"},
    {id: 1, name:"HR"},
    {id: 2, name:"IT"}
  ];

  positions = [
    {id: null, name: "Select Position"},
    {id:1, name: "Manager"},
    {id:2, name: "Developer"},
    {id:3, name: "HR"}
  ];

  managers = [
    {id: null, name: "Select Manager"},
    {id: 1, name: "Emp1"},
    {id: 2, name: "Emp2"}
  ];


  employeeForm : FormGroup = new FormGroup({
    Id: new FormControl(null),
    Name: new FormControl(null, [Validators.required]),
    Phone: new FormControl(null, [Validators.required]),
    Birthdate: new FormControl(null, [Validators.required]),
    StartDate: new FormControl(null, [Validators.required]),
    Department: new FormControl(null, [Validators.required]),
    Manager: new FormControl(null),
    Position: new FormControl(null, [Validators.required]),
    IsActive: new FormControl(true, [Validators.required])
  });

  paginationConfig = { itemsPerPage: 5, currentPage: 1};

  constructor(private _datePipe: DatePipe){

  }


  saveEmployee(){

    if(!this.employeeForm.value.Id){// Add Employee
    let newEmp : Employee = {
      id: this.employees[this.employees.length - 1].id + 1,
      name: this.employeeForm.value.Name,
      phone: this.employeeForm.value.Phone,
      birthdate: this.employeeForm.value.Birthdate,
      startDate: this.employeeForm.value.StartDate,
      isActive: this.employeeForm.value.IsActive,
      departmentId: this.employeeForm.value.Department,
      departmentName: this.departments.find(x => x.id == this.employeeForm.value.Department)?.name,
      managerId: this.employeeForm.value.Manager,
      managerName: this.employeeForm.value.Manager? this.managers.find(x => x.id == this.employeeForm.value.Manager)?.name : null,
      positionId: this.employeeForm.value.Position,
      positionName: this.positions.find(x => x.id == this.employeeForm.value.Position)?.name
    };

    this.employees.push(newEmp);
    }
    else{// Edit Employee
      let index = this.employees.findIndex(x => x.id == this.employeeForm.value.Id);// Returns the index


      this.employees[index].name = this.employeeForm.value.Name;
      this.employees[index].phone = this.employeeForm.value.Phone;
      this.employees[index].birthdate = this.employeeForm.value.Birthdate;
      this.employees[index].isActive = this.employeeForm.value.IsActive;
      this.employees[index].startDate = this.employeeForm.value.StartDate;
      this.employees[index].departmentId = this.employeeForm.value.Department;
      this.employees[index].departmentName =  this.departments.find(x => x.id == this.employeeForm.value.Department)?.name;
      this.employees[index].positionId = this.employeeForm.value.Position;
      this.employees[index].positionName = this.positions.find(x => x.id == this.employeeForm.value.Position)?.name;
      this.employees[index].managerId = this.employeeForm.value.Manager;
      this.employees[index].managerName =  this.employeeForm.value.Manager? this.managers.find(x => x.id == this.employeeForm.value.Manager)?.name : null;

    }


    this.closeButton?.nativeElement.click();
    this.clearEmployeeForm();
  }

  clearEmployeeForm(){

    this.employeeForm.reset({
      IsActive: true
    });
  }


  editEmployee(id: number){
    let employee = this.employees.find(x => x.id == id);

    if(employee != null){
      this.employeeForm.patchValue({
        Id: employee?.id,
        Name: employee?.name,
        Phone: employee?.phone,
        StartDate: this._datePipe.transform(employee?.startDate, 'yyyy-MM-dd'), // yyyy-mm-dd 2025-07-05
        Birthdate: this._datePipe.transform(employee?.birthdate, 'yyyy-MM-dd'),
        Department: employee?.departmentId,
        Manager: employee?.managerId,
        Position: employee?.positionId,
        IsActive: employee?.isActive
      })
    }
  }


  removeEmployee(id : number){
    this.employees = this.employees.filter(x => x.id !== id);

    // let index = this.employees.findIndex(x => x.id === id);
    // this.employees.splice(index, 1);
  }


  changePage(pageNumber : number){
    this.paginationConfig.currentPage = pageNumber;
  }

}

export interface Employee{
  id: number;
  name: string;
  positionId?: number;
  positionName?: string;
  birthdate?: Date;
  isActive: boolean;
  startDate: Date;
  phone?: string;
  managerId?: number | null; // Accept Multiple Data Types 
  managerName?: string | null; // Accept Multiple Data Types 
  departmentId?: number;
  departmentName?: string;
} 