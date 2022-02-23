let span = document.querySelector('#openNav');
span.addEventListener('click', () => {
   openNav();
});
function openNav() {
   document.getElementById("navSide").style.width = "300px";
   let opened = document.querySelector('#openNav');
   opened.id = "xBtn"
   opened.replaceWith(opened.cloneNode(true));
   addClose();
 }
 function closeNav() {
   document.getElementById("navSide").style.width = "0";
   let close = document.querySelector('#xBtn');
   close.id = "openNav"
   let menu = document.querySelector('#openNav');
   menu.replaceWith(menu.cloneNode(true));
   addOpen();
 }
function removed() {
   console.log('removed')
}
function addClose() {
   let closed = document.querySelector('#xBtn');
   closed.addEventListener('click', closeNav);
}
function addOpen() {
   let open = document.querySelector('#openNav');
   open.addEventListener('click', openNav);
}
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}