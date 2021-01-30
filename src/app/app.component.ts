import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger , query , state , style ,transition, animate } from '@angular/animations';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'photoBooth';
  isStarted = false;

  constructor(){
    setTimeout(() => {
      this.isStarted = true;
    }, 2000);
  }

}


