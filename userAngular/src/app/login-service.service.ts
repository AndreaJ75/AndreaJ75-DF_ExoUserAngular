import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from './user';
import { Httpstatus } from './httpstatus.enum';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  ListUser : User[];


  constructor(private http: HttpClient) { }

  // get all list of user from User table
  getUser() : Observable<User[]> {
     return this.http.get<User[]>('http://localhost:8080/user');
  }

  // get a user from User table by its Id
  getUserById(userId : number) : Observable<User> {
    return this.http.get<User>('http://localhost:8080/user' + userId);
 }

  // delet user with specific user Id
  delUser(userId: number) : Observable<any> {
    return this.http.delete<any>('http://localhost:8080/user/'+userId);
 }

 // create user provided as parameter
 createUser(user:User) : Observable<User> {
  return this.http.post<User>('http://localhost:8080/user/', user);
}

// Update user provided as parameter
updateUser(user:User) {
  return this.http.put('http://localhost:8080/user/', user);
}


}
