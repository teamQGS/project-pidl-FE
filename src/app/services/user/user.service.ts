import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../../models/model";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrlUser: string = "http://localhost:8080/api/users"

  constructor(private http: HttpClient) {}
  createUser(customer: UserDTO): Observable<number>{
    return this.http.post<number>(this.apiUrlUser, customer).pipe(
      catchError(error => {
        console.log("Error on BE");
        return throwError(error);
      })
    )
  }

  deleteUser(user: UserDTO, userId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrlUser}/delete/${userId}`).pipe(
      catchError(error => {
        console.log("Error on BE");
        return throwError(error);
      })
    )
  }

}
