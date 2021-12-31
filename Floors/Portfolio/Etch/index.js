let cnvSize = 36;

// create individual div pixels
for (i=0; i<cnvSize; i++){

const canvas = document.querySelector('#canvas');

const pixel = document.createElement('div');
pixel.classList.add('pixel');

canvas.appendChild(pixel);
} 

 let draw = document.querySelector('div');
 draw.addEventListener('mouseover', function(event){
    event.target.classList.replace('pixel', 'line');
 });

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
   blank();
});

function blank() {
   for (i=0; i<cnvSize; i++){ 
      let reset = document.querySelector('.line');
   reset.classList.replace('line','pixel');
}
}
const sml = document.querySelector('#small');
sml.addEventListener('click', () => {
   if (cnvSize = 64 || cnvSize == 128) {
      downSize = document.querySelector('#canvas');
      downSize.classList.remove('gridL');
      downSize.classList.remove('gridM');
      downSize.classList.add('canvas');
   }
   let gridS = document.querySelector('#canvas');
   gridS.classList.replace('canvas', 'gridS');
   cnvSize = 36;
   createCnv();
});
const med = document.querySelector('#med');
med.addEventListener('click', () => {
   if (cnvSize = 36 || cnvSize == 128) {
      downSize = document.querySelector('#canvas');
      downSize.classList.remove('gridL');
      downSize.classList.remove('gridS');
      downSize.classList.add('canvas');
   }
   let gridM = document.querySelector('#canvas');
   gridM.classList.replace('canvas', 'gridM');
   cnvSize = 64;
   createCnv();
});

const large = document.querySelector('#large');
large.addEventListener('click', () => {
   if (cnvSize = 36 || cnvSize == 64) {
      downSize = document.querySelector('#canvas');
      downSize.classList.remove('gridM');
      downSize.classList.remove('gridS');
      downSize.classList.add('canvas');
   }

   let gridL = document.querySelector('#canvas');
   gridL.classList.replace('canvas', 'gridL');
   cnvSize = 128;
   createCnv();
});

function createCnv() {
   for (i=0; i<cnvSize; i++){
      const makeCanvas = document.querySelector('#canvas');
      
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      
      makeCanvas.appendChild(pixel);
      }
}