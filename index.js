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
   if (hoverColor == 1) {
      hoverColor = "linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(255,104,104,1) 100%)";
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 2) {
      hoverColor = "linear-gradient(180deg, rgba(255,198,104,1) 0%, rgba(255,159,0,1) 100%)";
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 3) {
      hoverColor = "linear-gradient(180deg, rgba(254,255,229,1) 0%, rgba(245,255,0,1) 100%)";
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 4) {
      hoverColor = "linear-gradient(180deg, rgba(191,255,187,1) 0%, rgba(12,177,0,1) 100%)"
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 5) {
      hoverColor = "linear-gradient(180deg, rgba(0,185,255,1) 0%, rgba(124,219,255,1) 100%)"
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 6) {
      hoverColor = "linear-gradient(180deg, rgba(106,114,255,1) 0%, rgba(0,14,255,1) 100%)"
      item.style.backgroundImage = hoverColor;
   } else if (hoverColor == 7) {
      hoverColor = "linear-gradient(0deg, rgba(127,0,181,1) 0%, rgba(195,55,255,1) 100%)"
      item.style.backgroundImage = hoverColor;
   }
   });
   item.addEventListener('mouseout', function() {
      item.style.backgroundImage = "linear-gradient(to top, #000 0%, #000 100%)";
   })
})
let single = document.querySelector('.navitem');
(function() {
   const root = document.documentElement;
   const newTheme = root.className === 'indigo' ? 'indigo' : 'indigo';
   root.className = newTheme;
 })()

 let colors = document.querySelectorAll('.color')
  colors= Array.from(colors);
  console.log(colors)
  for (i=0;i<colors.length;i++){
   let child = colors[i];
   child.addEventListener('click',function(){
      setTheme(child)
   })
  }
  function setTheme(child) {
   const root = document.documentElement;
   console.log(child)
   const newTheme = root.className === 'indigo' ? child['id'] : child['id'];
   root.className = newTheme;
 }