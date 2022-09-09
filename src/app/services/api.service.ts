import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEntry(data: any) {
    return this.http.post<any>('http://localhost:3000/courseList/', data);
  }
  getRecord() {
    return this.http.get<any>('http://localhost:3000/courseList/');
  }
  putRecord(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/courseList/' + id, data);
  }
  deleteRecord(id: number) {
    return this.http.delete<any>('http://localhost:3000/courseList/' + id);
  }
}
