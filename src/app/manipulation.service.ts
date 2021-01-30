import { Injectable } from '@angular/core';
declare var Caman:any;


@Injectable({
  providedIn: 'root'
})
export class ManipulationService {

  undoStack = [];
  redoStack = [];
  toApply : boolean;
  context : any;
  canvas : any;
  imageData : any;
  tuneValues : any;

  constructor() {
    this.toApply = false;
    this.tuneValues = {};
   }

   drawOnCanvas(image){
       this.context.putImageData(image,0,0);
  }

  revert(){
    Caman('#editCanvas',function(){
      this.reset(true);
    })
  }

   getImage(){
    this.canvas = document.getElementById('editCanvas');
    this.context = this.canvas.getContext('2d');
    let imageData = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
    return imageData;
   }

  // structure(filter,image){
  //   this.toApply = true;
  //   Caman(image,function(){
  //     // console.log(this);
  //     this.clarity(10).render();
  //   })
  // }

  // change(val){
  //   let data = this.context.getImageData(0,0,this.canvas.width,this.canvas.height);
  //   for(let i = 0 ; i < data.data.length; i += 4){
  //     data.data[i] = data.data[i]/val; 
  //     data.data[i+1] = data.data[i+1]/val; 
  //     data.data[i+2] = data.data[i+2]/val; 
  //     data.data[i+3] = data.data[i+3]/val; 
  //   }
    
  //   this.drawOnCanvas(data);
    
  // }
  
  tune(){
    this.toApply = true;
    let values = this.tuneValues;
    this.revert();
      Caman('#editCanvas',function(){
    if(values.brightness){
      this.brightness(values.brightness);
    }
    if(values.hue){
      this.hue(values.hue);
    }
    if(values.vibrance){
      this.vibrance(values.vibrance);
    }
    if(values.saturation){
      this.saturation(values.saturation);
    }
    if(values.contrast){
      this.contrast(values.contrast);
    }
    this.render();
    }) 
  }
  
//   brightness(value){
//     console.log(1);
//     Caman('#editCanvas',function(){
//       this.brightness(this.tuneValues.brightness);
//     })
//   }
  
//   saturation(value){
//     console.log(2);
//   Caman('#editCanvas',function(){
//     this.saturation(this.tuneValues.saturation);
//   })
// }


// hue(value){
//   console.log(3);
//     Caman('#editCanvas',function(){
//       this.hue(this.tuneValues.hue);
//     })
//   }
  
//   vibrance(value){
//     console.log(4);
//       this.vibrance(this.tuneValues.vibrance);
//     })
  // }




}
