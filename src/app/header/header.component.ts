import { Component, OnInit } from '@angular/core';
import { InterfaceManagingService } from '../interface-managing.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $:any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations : [
    trigger('showHideRegisterMenu',[
      state('show',style({
        top:'50px'
      })),
      state('hide',style({
        top:'-300px'
      })),
      transition('show => hide',[
        animate('.3s')
      ]),
      transition('hide => show',[
        animate('.2s')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  menuVisibility : boolean;
  darkTheme:boolean;
  response : any;
  profilePic ;
  constructor(public uInterface : InterfaceManagingService, private route : Router) { 
    this.menuVisibility = false;
    this.uInterface.profileLink = '/profile/';

  }

  ngOnInit() {

    this.profilePic = localStorage.getItem('profilePic');
    
      if(localStorage.getItem('darkTheme') == 'true'){
        this.darkTheme = true;
        this.uInterface.darkTheme = true;
        this.enableDarkTheme();
        $('.mat-slide-toggle-input').attr('checked','true');
      }
           
  }


  toggleMenuView(){
    this.menuVisibility = true;
  }


  showHideMenu(){
      if(this.menuVisibility){
        
        this.menuVisibility = false;

      }else{

        this.menuVisibility = true;

      }
  }

  toggleTheme(toggleButton){
    
     this.darkTheme = toggleButton.checked;
     if(!this.darkTheme){
      this.darkTheme = false;
      localStorage.setItem('darkTheme','false');
      this.uInterface.darkTheme = false;
      this.disableDarkTheme();
     
     }else{
      this.darkTheme = true;     
      localStorage.setItem('darkTheme','true');
      this.uInterface.darkTheme = true;
      this.enableDarkTheme();
     }

  }
  
  

  enableDarkTheme(){
    document.documentElement.style
    .setProperty('--themeColor', 'rgb(40,40,40)');
    document.documentElement.style
    .setProperty('--fontColor' , 'rgb(17, 141, 199)');
    document.documentElement.style
      .setProperty('--formTheme' , 'rgb(40,40,40)');
        document.documentElement.style
        .setProperty('--formFieldText' , '#eee');
        document.documentElement.style
        .setProperty('--themeFont' , 'rgb(22, 164, 230)');
        document.documentElement.style
        .setProperty('--bodyColor' , '#414141');
        document.documentElement.style
        .setProperty('--editorFont' , '#c2c0c0');
        this.uInterface.modalColor = 'rgb(40,40,40)';
        
  }

  disableDarkTheme(){
    document.documentElement.style
      .setProperty('--themeColor', 'rgb(17, 141, 199)');
      document.documentElement.style
      .setProperty('--fontColor' , '#e1e1e1');
        document.documentElement.style
        .setProperty('--formTheme' , 'rgb(240,240,240)');
        document.documentElement.style
        .setProperty('--formFieldText' , '#333');
        document.documentElement.style
        .setProperty('--themeFont' , 'rgb(17, 141, 199)');
        document.documentElement.style
        .setProperty('--bodyColor' , '#f1f1f1');
        document.documentElement.style
        .setProperty('--editorFont' , '#242323');
        this.uInterface.modalColor = 'rgb(240,240,240)';
  }
  
  hideRegisterOptions(){
    this.menuVisibility = false;
  }

  showForm(formType){
    this.menuVisibility = false;
    this.uInterface.toggleForms(formType);

  }

}
