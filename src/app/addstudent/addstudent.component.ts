import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddstudentService } from './addstudent.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addstudent',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent {
  studentForm: FormGroup;
  courses: string[] = ['BTech', 'BCA', 'MBA','BBA','Diploma','BBA'];
  branches: string[] = ['Computer Science & Engineering','Information Technology','Mechanical Engineering','civil Engineering','chemical Engineering'];
  years: number[] = [1, 2, 3, 4];
  semesters: number[] = [1, 2, 3, 4, 5, 6,7,8];
  studentFromVisible:boolean=true;
  updateStudentForm:boolean=false;
  isFormVisible = false;
 


  constructor(private fb: FormBuilder,private router:Router,private addStudentService:AddstudentService,private snackBar: MatSnackBar) { 
    this.studentForm = this.fb.group({
      studentId: ['', [Validators.required]],
      studentName: ['', Validators.required],
      course: ['', Validators.required],
      branch: ['', Validators.required],
      year: ['', Validators.required],
      semester: ['', Validators.required]
    });
  
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formdata = this.studentForm.value;
      this.addStudentService.createStudent(formdata).subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          this.snackBar.open('Student added successfully!', 'OK', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            // this.router.navigate(['/dashboard']);
          });
          this.studentForm.reset();
        },
        error: (error) => {
          console.log('Error while adding student', error);
          this.snackBar.open('Error while adding the student', 'OK', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            // You can perform additional actions here if needed
          });
        }
      });
    } else {
      this.snackBar.open('Please enter valid student information and try again!', 'OK', {
        duration: 3000,
      });
    }
  }
  


  onBack() {
   this.router.navigate(['./dashboard'])
  }
   updateStudent(){
      this.studentFromVisible=false;
     this.updateStudentForm=true;
   }
   submitUpdate(): void {
    if (this.studentForm.valid) {
      const studentId = this.studentForm.get('studentId')?.value;
      const updateData = this.studentForm.value;
      this.addStudentService.updateStudent(studentId, updateData).subscribe({
        next: (updatedStudent) => {
          console.log('updated student data',updatedStudent);
          this.snackBar.open('Student updated successfully!', 'OK', { duration: 3000 });
          this.studentForm.reset();
          // this.studentFromVisible = true;
           //this.updateStudentForm = false;
        },
        error: (err) => {
          console.error('Error updating student:', err);
          this.snackBar.open('Failed to update student. Please try again.', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'OK', { duration: 3000 });
    }
  }
  
   
   onSearch(): void {
    const studentId = this.studentForm.get('studentId')?.value;
  
    if (studentId) {
      this.addStudentService.getStudentById(studentId).subscribe({
        next: student => {
          if (student) {
            this.studentForm.patchValue({
              studentName: student.studentName || '', 
              course: student.course || '',
              branch: student.branch || '',
              year: student.year || '',
              semester: student.semester || ''
            });
            this.isFormVisible = true;
          }
        },
        error: err => {
          console.log(err);
          this.snackBar.open('Please enter a valid student ID student not found!', 'OK', {
            duration: 3000,
          });
        }
      });
    }
  }
  
  onUpdateBack(){
    this.studentFromVisible=true;
    this.updateStudentForm=false;
    this.isFormVisible=false;
    this.studentForm.reset();
    this.router.navigate(['/dashboard/add-student']);
  }
}
