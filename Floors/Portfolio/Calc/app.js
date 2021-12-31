//create the number divs with classes and ID's and Numbers for each selection

function numCreate() {
for (i=1; i<10; i++){
    const numPad = document.querySelector('.numPad');
    const nums = document.createElement('div');
nums.classList.add('number');
nums.id = String(i);
nums.textContent += String(i);
numPad.appendChild(nums);
}
const numPad = document.querySelector('.numPad');
const zero = document.createElement('div');
zero.classList.add('number');
zero.classList.add('zero');
zero.id = 0;
zero.textContent += 0;
numPad.appendChild(zero);

}
numCreate();

let var1 = 0;
let var2 = 0;

let add = false;
let sub = false;
let multi = false;
let divi = false;

// add number display on calcualtor 
const zero = document.getElementById('0');
zero.addEventListener('click', () => {
    const displayZero = document.querySelector('.display');
    displayZero.textContent +=0;
});
const one = document.getElementById('1');
one.addEventListener('click', () => {
    const displayOne = document.querySelector('.display');
    displayOne.textContent +=1;
});
const two = document.getElementById('2');
two.addEventListener('click', () => {
    const displayTwo = document.querySelector('.display');
    displayTwo.textContent +=2;
});
const three = document.getElementById('3');
three.addEventListener('click', () => {
    const displayThree = document.querySelector('.display');
    displayThree.textContent +=3;
});
const four = document.getElementById('4');
four.addEventListener('click', () => {
    const displayFour = document.querySelector('.display');
    displayFour.textContent +=4;
});
const five = document.getElementById('5');
five.addEventListener('click', () => {
    const displayFive = document.querySelector('.display');
    displayFive.textContent +=5;
});
const six = document.getElementById('6');
six.addEventListener('click', () => {
    const displaySix = document.querySelector('.display');
    displaySix.textContent +=6;
});
const seven = document.getElementById('7');
seven.addEventListener('click', () => {
    const displaySeven = document.querySelector('.display');
    displaySeven.textContent +=7;
});
const eight = document.getElementById('8');
eight.addEventListener('click', () => {
    const displayEight = document.querySelector('.display');
    displayEight.textContent +=8;
});
const nine = document.getElementById('9');
nine.addEventListener('click', () => {
    const displayNine = document.querySelector('.display');
    displayNine.textContent +=9;
});
const reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    var1 = 0;
    var2 = 0;
    resetEm();
});
const plus = document.getElementById('plus');
plus.addEventListener('click', () => {
    add = !add;
    makeVal1();
});
const minus = document.getElementById('minus');
minus.addEventListener('click', () => {
    sub = !sub;
    makeVal1();
});
const times = document.getElementById('times');
times.addEventListener('click', () => {
    multi = !multi;
    makeVal1();
});
const divide = document.getElementById('divide');
divide.addEventListener('click', () => {
    divi = !divi;
    makeVal1();
});
const equals = document.getElementById('equals');
equals.addEventListener('click', () => {
    totalEm();
});

function makeVal1() {
    var1 = document.querySelector('.display').childNodes[0].nodeValue;
    resetEm();
    const val1 = document.querySelector('.val1');
    val1.textContent = var1;
}

function totalEm() {
    if (var1 == 0) {
        alert('enter a number higher than zero');
    } else if (var2 == 0 && divi == true){
        alert('you really shouldn\'t divide by zero...')
    } else {
        val2 = document.querySelector('.display');
        var2 = document.querySelector('.display').childNodes[0].nodeValue;
        var1 = parseInt(var1);
        var2 = parseInt(var2);
        let totaled = 0;
        if (divi == true) {
            totaled = var1 / var2;
            divi = !divi;
        } else if (multi == true) {
             totaled = var1 * var2;
             multi = !multi;
        } else if (sub == true) {
             totaled = var1 - var2;
             sub = !sub;
        } else if (add == true) {
            totaled = var1 + var2;
            add = !add;
        }
        resetEm();
        const newTotal = document.querySelector('.display');
        newTotal.textContent = totaled;
    }
}
function resetEm() {
    const resetDisp = document.querySelector('.display');
    resetDisp.removeChild(resetDisp.childNodes[0]);
    const resetVal = document.querySelector('.val1');
    resetVal.textContent = 0;
}