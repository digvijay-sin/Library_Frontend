import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddstudentService {

  constructor(private http: HttpClient,private urlService:UrlService) {}

  createStudent(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.urlService.getAddStudentUrl()}`, studentData);
  }
  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlService.getStudentIdUrl()}/${id}`);
  }

  updateStudent(id: number, updateStudent:any): Observable<any> {
    return this.http.put<any>(`${this.urlService.getUpdateStudentUrl()}/${id}`, updateStudent);
  }
}
