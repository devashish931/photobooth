import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class InterfaceManagingService {

  isMobScreen: boolean;
  loginVisibility: boolean;
  registerVisibility : boolean;
  isAdmin : boolean;
  formVisibility:boolean;
  photoFormVisibility : boolean;
  categoryCreateFormVisibility : boolean;
  isLoggedIn : boolean;
  modalColor:string;
  profileLink:string;
  imageFormVisibility:boolean;
  darkTheme : boolean
  imageViewerVisibility : boolean;
  toEdit : boolean;
  sideMenuVisibility : boolean;
  categories = [];
  publicImages = [];
  pageNo : number;
  toApply : boolean;

  constructor( public route : Router) {
    this.pageNo = 1;
    this.isLoggedIn = false;
    this.loginVisibility = true;
    this.registerVisibility = false ;
    this.photoFormVisibility = false;
    this.categoryCreateFormVisibility = false;
    this.formVisibility = false;
    this.darkTheme = false;
    this.imageViewerVisibility = false;
    this.toEdit = true;
    this.toApply = false;
    this.imageFormVisibility = false;
    this.modalColor = 'rgb(240,240,240)';
     if(screen.width > 640){
       this.isMobScreen = false ;
       this.sideMenuVisibility = true;
     }else{
       this.isMobScreen = true;
       this.sideMenuVisibility = false;
     }
     this.loginVisibility = false;
     this.registerVisibility = true;

   }

   toggleSideMenu(){
    this.sideMenuVisibility = this.sideMenuVisibility ? false : true;
  }


   closeWindow(){
     if(this.formVisibility){
       this.formVisibility = false;
     }else{
       this.formVisibility = true;
     }
    $('form').trigger('reset');
   }
   toggleForms(formType){
     this.formVisibility = true;
     if(formType == 'registration'){
     
       this.loginVisibility = false;
       this.registerVisibility = true;

     }else if(formType == 'login'){
      this.loginVisibility = true ;
      this.registerVisibility = false;
     }
    }

    linkSelect(from){
      $('.selected').removeClass('selected');
     let selected = window.location.hash.replace(from,'');
     $('#'+selected).addClass('selected');
    }

}

