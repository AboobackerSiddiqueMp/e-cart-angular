import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private api: AppService, private route: Router) { }
  loginDetails: any = {
    email: "",
    password: ""
  }

  loginUser() {
    console.log(this.loginDetails)
    const { email, password } = this.loginDetails;
    if (!email || !password) {
      alert("Please fill the form completely")
    }
    else {
      this.api.loginApi(this.loginDetails).subscribe({
        next: (res: any) => {
          sessionStorage.setItem("username", res.existingUser.username)
          sessionStorage.setItem("token", res.token)
          this.route.navigateByUrl('')
        },
        error: (res: any) => {
          alert(res.error)
        }
      })
    }
  }

}
