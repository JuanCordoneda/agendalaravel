import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiURL = "http://localhost:8000/api/person/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

 constructor(private httpClient: HttpClient) { }
 
//trae todos los contactos
  getAll(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
//crea un contacto
  create(person): Observable<Person> {
    return this.httpClient.post<Person>(this.apiURL, JSON.stringify(person), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
//encuentra un contacto
  find(id): Observable<Person> {
    return this.httpClient.get<Person>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
//modifica un contacto
  update(id, person): Observable<Person> {
    return this.httpClient.put<Person>(this.apiURL + id, JSON.stringify(person), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
//elimina un contacto
  delete(id){
    return this.httpClient.delete<Person>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
