import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { User } from '../user';
import { FormBuilder } from '@angular/forms';
import { Httpstatus } from '../httpstatus.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userList: User[];
  delResult: BigInteger;
  userForm;


  constructor(private loginService: LoginServiceService,
    private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group(
      {
        id : '',
        name: '',
        firstName: '',
        email: ''
      }
    )
  }

  ngOnInit() {

    this.loginService.getUser().subscribe(
      users => {
        this.userList = users;
      },
      err => { console.log('Return service not OK') }
    );

  }

  onDeleteUser(userToDelete: User) {

    const index: number = this.userList.indexOf(userToDelete);
    console.log('user a deleter : ' + userToDelete.name);

    if (confirm('Do you really want to Delete user : ' + userToDelete.name)) {
      this.loginService.delUser(userToDelete.id).subscribe(
        status => this.userList.splice(index, 1),
        err => console.log('KO' + err)
      )
    }
  }

  // onSubmit(userToAdd: User) {

  //   // request for user creation to user service
  //   this.loginService.createUser(userToAdd).subscribe(
  //     user => { this.userList.push(user) }
  //   );
  //   console.warn('User was submitted', userToAdd);

  //   // clean user creation form once creation completed
  //   this.userForm.reset();
  //   console.warn('After reset ', userToAdd);
  // }

  onAdduser(userToAddNew: User) {
    this.loginService.createUser(userToAddNew).subscribe(
      user => { this.userList.push(user) }
    )
    this.userForm.reset();
  }

  editUserData(userToUpdate: User) {

    // pre-filled the form with existing user's data
    this.userForm = this.formBuilder.group(userToUpdate);

  }

  editUserById(userId : number) {

    // Retrieve user data from database using its userId
    this.loginService.getUserById(userId).subscribe(
      user => {
        // If Response Entity OK => pre-fill the form with user's retrieved data
        this.userForm = this.formBuilder.group(user);
        alert ('Please update required fields');
      },
      err => alert ('User data retrieval failure : ' + err)
    )
  }

  onUpdate(userToUpdate: User) {

    this.loginService.updateUser(userToUpdate).subscribe(
      user => {
      // MAJ de l'ensemble de la liste des utilisateurs
        this.loginService.getUser().subscribe(
          userList => this.userList = userList
        )
      }
    )
    this.userForm.reset();
  }
}
