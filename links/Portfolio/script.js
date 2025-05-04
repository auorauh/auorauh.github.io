function build(){
let tabs = document.querySelectorAll(".tab");
tabs.forEach(element => {
element.onclick = onClick;
});
}
const onClick = function() {
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(element => {
        element.classList.add("closed");
        element.classList.remove("open");
    });
    this.classList.add("open");
    this.classList.remove("closed");
}
build();