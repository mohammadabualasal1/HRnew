import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Employee } from '../../interfaces/employee-interface';
import { ConfirmationDialog } from '../../shared-components/confirmation-dialog/confirmation-dialog';
import { EmployeesService } from '../../services/employees.service';
import { List } from '../../interfaces/list-interface';
import { DepartmentsService } from '../../services/departments.service';
import { LookupsService } from '../../services/lookups.service';
import { LookupsMajorCodes } from '../../enums/major-codes';
@Component({
  selector: 'app-employees',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, ConfirmationDialog],
  providers: [DatePipe], // Depndency Injcution
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees implements OnInit  {

  @ViewChild ('closeButton') closeButton: ElementRef | undefined;// Get Element By ID

  employees : Employee[] = [];

  employeesTableColumns: string[] = ["#", "Name", "Phone", "Birthdate","Status", "Start Date", "Position", "Department", "Manager"];

  departments : List[]= [];

  positions : List[] = [];

  managers : List[] = [];


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

  deleteDialogTitle : string = "Delete Confirmation";
  deleteDialogBody : string = "Are you sure you want to delete this employee?";
  showConfirmationDialog : boolean = false;
  employeeIdToBeDeleted : number | null = null;

  constructor(private _datePipe: DatePipe,
    private _employeeService : EmployeesService,
    private _departmentsService : DepartmentsService,
    private _lookupsService : LookupsService
  ){

  }

  ngOnInit(): void { // Life Cycle Hook
    this.loadEmployees();
    this.loadManagersList();
  }
  
  ngOnDestroy(){
    console.log("Component Detroyed");
  }

  

  loadEmployees(){
    this.employees = [];

   this._employeeService.getAll().subscribe(
    {
      next : (res : any) => { // Succesful Request
        if(res?.length > 0){
          
          res.forEach((x : any) => {
            let employee : Employee = {
              id: x.id,
              name: x.name,
              phone: x.phone,
              birthdate: x.birthDate,
              isActive: x.isActive,
              startDate: x.startDate,
              positionId: x.positionId,
              positionName: x.positionName,
              departmentId: x.departmentId,
              departmentName: x.departmentName,
              managerId: x.managerId,
              managerName: x.managerName
            };
            this.employees.push(employee);
          });
        }
        else{
        }
      },
      error : err => { // Failed Request | 400, 500
        console.log(err.message);
      }
    }
   );
  }

  loadManagersList(employeeId?:number){
    this.managers = [
      {id: null, name: "Select Manager"}
    ];

    this._employeeService.getManagers(employeeId).subscribe({
      next: (res : any) =>{
        if(res?.length > 0){
          res.forEach((x : any)=>{
            let manager : List = {id: x.id, name: x.name};
            this.managers.push(manager);
          })
        }
      },
      error : err => {
        console.log(err.message);
      }
    })
  }

  loadDepartmentsList(){

    this.departments = [
      {id: null, name:"Select Department"}
    ];

    this._departmentsService.getDepartmentsList().subscribe({
      next: (res : any) => {
        if(res?.length > 0){
          this.departments = this.departments.concat(
            res.map((x : any) => ({id: x.id, name: x.name} as List))
          )
        }
      },
      error: err => {
        console.log(err.message);
      }
    })
  }

  loadPositionsList(){
    this.positions = [
      {id: null, name: "Select Position"}
    ];

    this._lookupsService.getByMajorCode(LookupsMajorCodes.Positions).subscribe({
      next: (res : any) => {
        if(res?.length > 0){
          this.positions = this.positions.concat(
            res.map((x : any) => ({id: x.id, name: x.name} as List))
          )
        }
      },
      error: err => {
        console.log(err.message);
      }
    })
  }




  saveEmployee(){
    let employeeId = this.employeeForm.value.Id ?? 0;
    let newEmp : Employee = {
      id: employeeId,
      name: this.employeeForm.value.Name,
      phone: this.employeeForm.value.Phone,
      birthdate: this.employeeForm.value.Birthdate,
      startDate: this.employeeForm.value.StartDate,
      isActive: this.employeeForm.value.IsActive,
      departmentId: this.employeeForm.value.Department,
      managerId: this.employeeForm.value.Manager,
      positionId: this.employeeForm.value.Position,
    };

    if(!this.employeeForm.value.Id){// Add Employee
    this._employeeService.add(newEmp).subscribe({
      next: res =>{
        this.loadEmployees();
      },
      error: err =>{
        console.log(err.message);
      }
    })
    }
    else{// Edit Employee


      this._employeeService.update(newEmp).subscribe({
      next: res =>{
        this.loadEmployees();
      },
      error: err =>{
        console.log(err.message);
      }
    })
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
    this.loadSaveDialog(id);
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


  removeEmployee(){
    this.employees = this.employees.filter(x => x.id !== this.employeeIdToBeDeleted);

    // let index = this.employees.findIndex(x => x.id === id);
    // this.employees.splice(index, 1);
  }


  changePage(pageNumber : number){
    this.paginationConfig.currentPage = pageNumber;
  }


  showConfirmDialog(empId : number){
    this.employeeIdToBeDeleted = empId; // save employee id to be used later
    this.showConfirmationDialog = true; // show confirmation dialog
  }

  confrimEmployeeDelete(isConfirmed : boolean){
    if(isConfirmed){
      this.removeEmployee();
    }

    this.employeeIdToBeDeleted = null; // remove saved employee id
    this.showConfirmationDialog = false; // hide confirmation dialog
  }


  loadSaveDialog(employeeId?: number){
    this.clearEmployeeForm();
    this.loadManagersList(employeeId);
    this.loadDepartmentsList();
    this.loadPositionsList();
  }

}

