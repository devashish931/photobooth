import { Component, OnInit } from '@angular/core';
import { InterfaceManagingService } from '../interface-managing.service';
import { ManipulationService } from '../manipulation.service';
import Swal from 'sweetalert2';
import { ResizeEvent } from 'angular-resizable-element';

declare var $: any;
declare var Caman: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  selectedTool: string;
  unsavedChanges: boolean;
  imageOptionsVisibility: boolean;
  isImageLoaded: boolean;
  cameraVisibility : boolean;
  editOptionsVisibility : boolean;
  toolOptionsVisibility : boolean;
  imageSelected : any;
  rotationApply = false;
  textAlign : any;
  cnvs : any;
  ctx : any;

  constructor(public uInterface: InterfaceManagingService, public manipulate : ManipulationService) {
    this.selectedTool = 'none';
    this.unsavedChanges = true;
    this.imageOptionsVisibility = false;
    this.isImageLoaded = false;
    this.cameraVisibility = false;
    this.editOptionsVisibility = false;
    this.toolOptionsVisibility = false;
    this.textAlign = "center";
  }

  ngOnInit() {
  }

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 200;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  hideToolOptions(){
    this.toolOptionsVisibility = false;
    this.editOptionsVisibility = false;
    if(this.isImageLoaded){

      this.imageOptionsVisibility = false;
    }
    if(this.uInterface.isMobScreen){
      $('.selected').removeClass('selected');
    }
  }

  drawImage(event) {
    let reader = new FileReader();
    this.imageOptionsVisibility = false;
    reader.onload = () => {
      let p = new Promise((resolve,reject)=>{
        let image = reader.result;
        this.imageSelected = image;
        // $('#editImage').attr('src', image);
        let img = document.getElementById('editImage');
        this.isImageLoaded = true;
        $('#editCanvas').attr('src',image);
        $('#rawImage').attr('src',image);
        // this.context.drawImage(img,0,0);
        $('input').val('');
        resolve('loaded');
      });
      

      
      p.then((resolve)=>{
        
        this.adjustImage();
        Caman('#editCanvas',function(){
          this.brightness(0).render();
            })
            setTimeout(()=>{
              this.manipulate.canvas = document.getElementById('editCanvas');
              this.manipulate.context = this.manipulate.canvas.getContext('2d');
              this.manipulate.undoStack.push(this.manipulate.context.getImageData(0,0,this.manipulate.canvas.width,this.manipulate.canvas.height));

            },100);
          
        
      })
    }
    reader.readAsDataURL(event.target.files[0]);

  }




  adjustImage(){
    let height = $('.edit-area').height();
    let width = $('.edit-area').width();
    let widthCanvas = $('.editCanvas').width();
    let heightCanvas = $('.editCanvas').height();
    $('.canvas-wrap').css('margin-top',`calc(${height/2}px - ${$('#editCanvas').height()/2}px)`);
    $('.manipulation-wrap').css('top',`calc(${height/2}px - ${$('#editCanvas').height()/2 - 10}px)`);
    $('.manipulation-wrap').css('left',`calc(${width/2}px - ${$('#editCanvas').width()/2 - 10}px)`);
    $('.manipulation-wrap').css('width',`${widthCanvas}px`);
    $('.manipulation-wrap').css('height',`${heightCanvas}px`);
  }

  imageOptions() {
    this.editOptionsVisibility = false;
    this.imageOptionsVisibility = this.imageOptionsVisibility ? false : true;
  }

  selectTool(event) {
    if(this.imageSelected){
      let target = event.currentTarget;
      this.selectedTool = $(target).attr('id');
      if(this.manipulate.toApply){
        this.manipulate.revert();
        this.manipulate.toApply = false;
      }
      $('.selected').removeClass('selected');
      $(target).addClass('selected');
      this.editOptionsVisibility = false;
      this.imageOptionsVisibility = false;
      if(this.uInterface.isMobScreen){
        this.toolOptionsVisibility = true;      
      }

    }else{
      Swal.fire({
        background : this.uInterface.modalColor,
        type : 'error' ,
        text : 'select Image'
      })
    }
    
  }

  enterText(event){
    event.preventDefault();
    if($('.textArea').text() == 'Right click here to write'){

      $('.textArea').text('');    
    }

  }

  changeTextColor(fontSize){
$('.textArea').css('color',$('#textColor').val());
$('.textArea').css('font-size',`${fontSize}px`);
$('.textColor').css('background',$('#textColor').val());
  }

  rotateCanvas(angle){
     $('#editCanvas').css('transform',`rotate(${angle}deg)`);
  }

  align(value){
    $('.textArea').css('text-align',value);
    this.textAlign = value;
  }

  drawText(font,color){
    let widthCanvas = $('.editCanvas').width();
    let heightCanvas = $('.editCanvas').height();
    let width = this.manipulate.undoStack[this.manipulate.undoStack.length - 1].width;
    let height = this.manipulate.undoStack[this.manipulate.undoStack.length - 1].height;
    this.manipulate.context.font = `${this.imageCanvasRatio(width,widthCanvas,font)}px Arial`;
    this.manipulate.context.fillStyle = color;
    // this.manipulate.context.textAlign = this.textAlign;
    let coords = $('.textArea').css('transform').replace('matrix(','').replace(')','').split(', ');
    if(!coords[4]){
      coords[4] = 0 , coords[5] = 0;
    }
    let left = this.imageCanvasRatio(width,widthCanvas,coords[4]);
    let top = this.imageCanvasRatio(height,heightCanvas,coords[5]);
    console.log(`${this.imageCanvasRatio(width,widthCanvas,12)} + ${left}`);
    console.log(`${this.imageCanvasRatio(height,heightCanvas,12)} + ${top}`);
    let text = $('.textArea').html().replace(/<\/div>/g,'').replace(/<br>/g,'').replace(/&nbsp;/g,'').replace(/<div>/g,',').split(',');
    for(let i = 0 ; i < text.length ; i++){
      this.manipulate.context.fillText(text[i], (this.imageCanvasRatio(width,widthCanvas,12) + left) , (this.imageCanvasRatio(height,heightCanvas,12) + top + (this.imageCanvasRatio(width,widthCanvas,font) + 5)*i ));
    } 
    this.applyManipulation();
    $('.textArea').text('');
 }

 resizeCropper(event){
console.log(event)
 }

imageCanvasRatio(image,canvas,value){
return (image * (parseInt(value)/canvas*100))/100
}

  applyRotation(angle){
     let image = this.manipulate.canvas.toDataURL('image/png;base64');
     this.manipulate.context.clearRect(0,0,this.manipulate.canvas.width,this.manipulate.canvas.height);
     this.manipulate.context.translate(this.manipulate.canvas.width/2,this.manipulate.canvas.height/2);
     this.manipulate.context.rotate(angle * Math.PI / 180);
     this.manipulate.context.translate(-this.manipulate.canvas.width/2,-this.manipulate.canvas.height/2);
     this.manipulate.context.drawImage(image,0,0);
     this.manipulate.context.restore();
     $('#editCanvas').css('Transform','rotate(0deg)');
  }
  
  flipX(){
    let image = this.manipulate.getImage();
    console.log(image);
   this.manipulate.context.translate(this.manipulate.canvas.width,0);
   this.manipulate.context.scale(-1,0);
   this.manipulate.context.putImageData(image,0,0);
  }


  startCamera(){
    if(navigator.mediaDevices){
      let p = new Promise((resolve,reject)=>{
        let stream = navigator.mediaDevices.getUserMedia({
          video : true,
          audio : false
        })
        stream ? resolve(stream) : reject('permission denied')
      })

      p.then((stream)=>{
this.cameraVisibility = true;
let video = document.getElementById('video');

    //  video.srcObject = stream;
      }).catch((reject)=>{
        alert(reject);
      })
      
    }else{
      alert('your Device doesn\'t support media access');
    }
  }

  editOptionsToggle(){
    this.imageOptionsVisibility = false;
    this.toolOptionsVisibility = false;
    this.editOptionsVisibility = this.editOptionsVisibility ? false : true;
  }


  applyManipulation(){
    let p = new Promise((resolve,reject)=>{
      let image = this.manipulate.getImage();
      this.manipulate.undoStack.push(image);
      this.manipulate.toApply = false;
      if(this.uInterface.isMobScreen){
        this.toolOptionsVisibility = false;      
      }
      $('form').trigger('reset');
      this.manipulate.imageData = image;
      let canvasData = this.manipulate.canvas.toDataURL('image/png');
      let canvas = document.getElementById('editCanvas');
      canvas.parentNode.removeChild(canvas);
      canvas = document.createElement('img');
      canvas.className = 'editCanvas';
      canvas.id = 'editCanvas';
      canvas = document.getElementById('edit-area').appendChild(canvas);
      $('#editCanvas').css({
        'max-width' : '100%',
        'max-height' : 'calc(100vh - 135px)'
      })
      $('#editCanvas').attr('src',canvasData);
      resolve('');
    })
    p.then((resolve)=>{
setTimeout(() => {
  this.adjustImage();
  Caman('#editCanvas',function(){
    this.brightness(0).render();
      })
      setTimeout(()=>{
        this.manipulate.canvas = document.getElementById('editCanvas');
        this.manipulate.context = this.manipulate.canvas.getContext('2d');
        this.manipulate.imageData = this.manipulate.context.getImageData(0,0,this.manipulate.canvas.width,this.manipulate.canvas.height);
      },100);
    
}, 100);   
    })
    
  }

  undo(){
if(this.manipulate.undoStack.length > 1){
  let image = this.manipulate.undoStack.pop();
  this.manipulate.redoStack.push(image);
  this.manipulate.context.putImageData(this.manipulate.undoStack[this.manipulate.undoStack.length-1],0,0);
}
  }

  redo(){
 if(this.manipulate.redoStack.length > 0){
  let image = this.manipulate.redoStack.pop();
  this.manipulate.undoStack.push(image);
  this.manipulate.context.putImageData(this.manipulate.undoStack[this.manipulate.undoStack.length-1],0,0);
}   
  }

  tune(filter , value){
      this.manipulate.tuneValues[filter] = value;
      this.manipulate.tune();
  }

  drawWatermark(){
    this.manipulate.context.fillStyle = 'rgba(70,70,70,.5)';
    this.manipulate.context.fillRect((this.manipulate.canvas.width - 160),(this.manipulate.canvas.height - 90),130,60);
    this.manipulate.context.fill();
   this.manipulate.context.drawImage(document.getElementById('watermark'),(this.manipulate.canvas.width - 155),(this.manipulate.canvas.height - 90),120,60);
  }

  downloadImage(){
    this.download('my-image.png')
  
  }

  resize(width,height){
    let p = new Promise((resolve,reject)=>{
      Caman('#editCanvas',function(){
        this.resize({
          width : width,
          height : height
        })
        this.render();
      });
      resolve('');
this.manipulate.toApply = true;
    });
    p.then((resolve)=>{

      this.adjustImage();
  })
    
  }

  download(filename) {
    if(this.isImageLoaded){
      this.drawWatermark();
    var lnk = document.createElement('a');
    lnk.download = filename;
    lnk.href = this.manipulate.canvas.toDataURL("image/png;base64");
    document.body.appendChild( lnk );
    lnk.click();
    this.editOptionsVisibility = false;
    document.body.removeChild( lnk );    
  }else{
    Swal.fire({
      background : this.uInterface.modalColor,
      type : 'error' ,
      text : 'select Image'
    })
  }

}


applyFilter(event){
let filter = $(event.currentTarget).attr('id');
let text;
console.log(filter);
  switch (filter) {
    case 'vintage':
      this.manipulate.toApply = true;
      this.manipulate.revert();
      text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      Caman('#editCanvas',function(){
        this.vintage().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'lomo':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.lomo().render();
        $(`#${filter}`).text(text);
          })
          case 'love':
            this.manipulate.toApply = true;
            text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.love().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'sinCity':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.sinCity().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'clarity':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.clarity().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'sunrise':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.sunrise().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'crossProcess':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.crossProcess().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'orangePeel':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.orangePeel().render();
        $(`#${filter}`).text(text);
      })
      break;
          case 'grungy':
            this.manipulate.toApply = true;
            text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.grungy().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'jarques':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.jarques().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'pinhole':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.pinhole().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'oldBoot':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.oldBoot().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'glowingSun':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.glowingSun().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'hazyDays':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.hazyDays().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'herMajesty':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.herMajesty().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'nostalgia':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.nostalgia().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'hemingway':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.hemingway().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'concentrate':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        this.concentrate().render();
        $(`#${filter}`).text(text);
      })
      break;
      case 'posterize':
        this.manipulate.toApply = true;
        text = $(`#${filter}`).text();
      $(`#${filter}`).text('rendering...');
      console.log(filter);
      this.manipulate.revert();
      Caman('#editCanvas',function(){
        $(`#${filter}`).text(text);
        this.posterize().render();
      })
    default:
      break;
  }

}

}
