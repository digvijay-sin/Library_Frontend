import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddbookService {

  constructor(private http: HttpClient,private urlService:UrlService) {}

  createBook(bookData: any): Observable<any> {
    return this.http.post<any>(`${this.urlService.getAddbookUrl()}`, bookData);
  }
}
