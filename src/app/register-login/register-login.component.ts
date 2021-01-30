import { Component, OnInit } from '@angular/core';
import { InterfaceManagingService } from '../interface-managing.service';
import { FormBuilder , Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-registration',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css'],
})
export class RegisterLoginComponent implements OnInit {

  passwordHidden : boolean;
  response : any;

  constructor(public uInterface : InterfaceManagingService, private fb : FormBuilder , private route : Router) {
    this.passwordHidden = true;
   }

  registerData = this.fb.group({
    name : ['' , Validators.required ],
    mobileNo : ['' , [Validators.required , Validators.minLength(10) , Validators.maxLength(10)]],
    email : ['' , [Validators.required, Validators.email] ],
    password : ['',[Validators.required,Validators.minLength(8)]],
    conPassword : ['',[Validators.required,Validators.minLength(8)]]
  })
  loginData = this.fb.group({
    username : ['' , [Validators.required , Validators.email]],
    password : ['' , Validators.required ]
  });

  ngOnInit() {


  }

  forgetPassword(){
    this.uInterface.formVisibility = false;
    this.route.navigate(['/reset-password']);
  }


  get(control){

    return this.registerData.get(control);

  }

 registerUser(e){
   e.preventDefault();
//    this.database.register(this.registerData.value).toPromise().then((res)=>{
//      this.response = res;
//      let errors ='';
//      if(this.response.type == 'error'){
//       for(let i =0; i < this.response.error.errors.length ; i++){
//        errors = errors+`<p style='color:#d55;'>${this.response.error.errors[i].msg}<p>`;
//      }
//      for(let i =1; i < this.response.customErrors.length ; i++){
//       errors = errors+`<p style='color:#d55;'>${this.response.customErrors[i].msg}<p>`;
//     }
//     }else{
//       this.uInterface.closeWindow();
//     }
//        swal.fire({
//          background : this.uInterface.modalColor,
//          type : this.response.type,
//          text : this.response.msg,
//          html : errors
         
//        })
//    });
 }

 loginUser(e){
   e.preventDefault();
//    this.database.login(this.loginData.value).toPromise().then((res)=>{
//        this.response = res;
//        let error ='';
//        if(this.response.type == 'error'){
//         error = `<p style='color:#d55;'>${this.response.error}</p>`;
//       }else{
//         this.uInterface.closeWindow();
//         if(this.response.isLoggedIn){
//           this.uInterface.isLoggedIn = true;
//           localStorage.setItem('profilePic',`userData/${this.response.id}/${this.response.profile_pic}`);
//           this.uInterface.profileLink = this.uInterface.profileLink + this.response.id;
//           if(this.response.userType == 'admin'){
//           this.route.navigate(['/admin']);
//           }else{
//             this.route.navigate(['/profile']);
//           }
//         }
//       }

//        swal.fire({
//         background : this.uInterface.modalColor,
//         type : this.response.type,
//         text : this.response.msg,
//         html : error
        
        
//       })

//    })

 }

  togglePasswordState(){
    if(this.passwordHidden){
      this.passwordHidden = false ;
      $(".login-form #password").attr('type','text');
    }else{
      this.passwordHidden = true ;
      $(".login-form #password").attr('type','password');
    }
  }


  getloginData(control){

    return this.loginData.get(control);

  }



}
