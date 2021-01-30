import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { InterfaceManagingService } from '../interface-managing.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  otpFieldVisible = false;
  passwordFieldVisible = false;
  emailFieldVisible = true;
  username : string;

  constructor(private route : Router , public fb : FormBuilder , public uInterface : InterfaceManagingService) { }

  mail = this.fb.group({
    username : ['']
  })

  otp = this.fb.group({
    otp : ['']
  })

  password = this.fb.group({
    password : [''],
    conPassword : ['']
  })


  ngOnInit() {

  }

  back(){
    this.emailFieldVisible = true;
    this.otpFieldVisible = false;
  }


 resetPassword(step,e){

  e.preventDefault();

  // switch(step){
  //   case 1:
  //     this.username = this.mail.value.username;
  //     this.dataService.resetPassword(step,this.mail.value).toPromise().then((response)=>{
  //       if(response.type == 'success'){
  //         this.emailFieldVisible = false;
  //         this.otpFieldVisible = true;
  //         setTimeout(() => {
  //         $('input').removeAttr('autofocus');
  //         $('#focus1').focus();  
  //         }, 100);
          
  //       }else{
  //         Swal.fire({
  //           background : this.uInterface.modalColor,
  //           type : response.type,
  //           text : response.text
  //         })
  //       }
  //     })
  //     break;

//       case 2:
//       this.dataService.resetPassword(step,this.otp.value).toPromise().then((response)=>{
//         if(response.type == 'success'){
//           this.otpFieldVisible = false;
//           this.passwordFieldVisible = true;
//           setTimeout(() => {
//             $('input').removeAttr('autofocus');
//             $('#focus2').focus();  
//             }, 100);
//         }else{
//           Swal.fire({
//             background : this.uInterface.modalColor,
//             type : response.type,
//             text : response.text
//           })
//         }
//       })
//       break;

//       case 3:
//       this.dataService.resetPassword(step,this.password.value).toPromise().then((response)=>{
//         if(response.type == 'success'){
//           this.route.navigate(['']);
//           this.uInterface.formVisibility = true;
//           this.uInterface.loginVisibility = true;
//           this.uInterface.registerVisibility = false;
//         }else{
//           Swal.fire({
//             background : this.uInterface.modalColor,
//             type : response.type,
//             text : response.text
//           })
//         }
//       })
//       break;
//   }

 }

}
