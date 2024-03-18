import { Component } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private api:AppService){}
  registerDetails:any= {
    username:"",
    email:"",
    password:""
  }
  registerUser(){
    console.log(this.registerDetails)
    const {username, email, password} = this.registerDetails;
    if(!username || !email || !password){
      alert("Please fill the form completely")
    }
    else{
      this.api.registerApi(this.registerDetails).subscribe({
        next:(res:any)=>{
          alert("user registered successfully")
        },
        error:(res:any)=>{
          console.log(res)
        }
      })
    }
  }

}
