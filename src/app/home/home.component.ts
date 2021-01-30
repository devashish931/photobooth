import { Component, OnInit } from '@angular/core';
import { InterfaceManagingService } from '../interface-managing.service';
import interact from 'interactjs';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {

 dynamicText : string;
 text = [
   {text: "Add Filters", color : '#000000'},
   {text: "Add Frames", color : '#ff0000'},
   {text: "Crop Images", color : '#00ff00'},
   {text: "Beautiful & funky stickers", color : '#0000ff'},
   {text: "Add Text", color : '#ffff00'},
   {text: "Write Quotes", color : '#00ffff'},
   {text: "Tune Images", color : '#ff00ff'},
   {text: "Make Collages", color : '#ffffff'}
 ]

  constructor(public uInterface : InterfaceManagingService) {
this.dynamicText = 'Add Filters';
   }

  ngOnInit() {
    let i = 0;
    setInterval(()=>{
  if(i == this.text.length){
    i = 0;
    this.dynamicText = this.text[i].text;
    $('.dynamic-text').css('color',this.text[i].color);
    i++;
  }else{
    this.dynamicText = this.text[i].text;
    $('.dynamic-text').css('color',this.text[i].color);
    i++;
}
    },1000);
     

  }

}
