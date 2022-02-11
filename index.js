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
let colorNav = document.querySelector('.subnav');
let colorSelect = document.querySelectorAll('.navitem');
colorSelect.forEach(item => {
   item.addEventListener('mouseover', function(){
      let hoverColor = (Math.floor(Math.random() * 7))+1;
      console.log(hoverColor);
   if (hoverColor == 1) {
      hoverColor = "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)";
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 2) {
      hoverColor = "linear-gradient(to top, #f6d365 0%, #fda085 100%)";
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 3) {
      hoverColor = "linear-gradient(to top, #f83600 0%, #f9d423 100%)";
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 4) {
      hoverColor = "linear-gradient(to top, #84fab0 0%, #8fd3f4 100%)"
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 5) {
      hoverColor = "linear-gradient(to top, #a1c4fd 0%, #c2e9fb 100%)"
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 6) {
      hoverColor = "linear-gradient(to top, #6a11cb 0%, #2575fc 100%)"
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 7) {
      hoverColor = "linear-gradient(to top, #ff0844 0%, #ffb199 100%)"
      item.style.backgroundImage = hoverColor;
   }
   });
   item.addEventListener('mouseout', function() {
      item.style.backgroundImage = "linear-gradient(to top, #000 0%, #000 100%)";
   })
})
let single = document.querySelector('.navitem');
