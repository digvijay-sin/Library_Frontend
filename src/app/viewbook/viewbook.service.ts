import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewbookService {

  constructor(private http: HttpClient,private urlService:UrlService) {}
  bookId:number=0;
  getBooks():Observable<any[]>{
    return this.http.get<any>(`${this.urlService.getAllBookUrl()}`);
  }

  searchBook(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlService.getSearchUrl()}`, {
      params: { q: query }
    });
  }

  sendIssueBookId(id:number){
    this.bookId=id;
  }

  getBookId():number{
    return this.bookId;
  }
  
  deleteBook(id:number):Observable<any>{
     return this.http.delete<any>(`${this.urlService.getDeleteBookUrl()}/${id}`);
  }
}
