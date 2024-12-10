import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnbookService {

  constructor(private http: HttpClient,private urlService:UrlService) {}

  getStudentAndBookData(studentId:number,bookId:number):Observable<any>{
    return this.http.get<any>(`${this.urlService.getreturnBookInformationUrl()}`, {
      params: { studentId: studentId,
        bookId:bookId
       }
    });
  }

  returnBook(returnBookData:any):Observable<any>{
   return this.http.post<any>(`${this.urlService.getReturnBookUrl()}`,returnBookData);
  }
}
