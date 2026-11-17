let count = 0;
const display = document.getElementById('num');

function updateDisplay() {
    display.textContent = count;
    if(count>0){
    display.style.color="green";
}
else if(count<0){
    display.style.color="red";
}
else{
    display.style.color="black";
}
}

document.getElementById('incre').addEventListener('click', () => {
    count++;
    updateDisplay();
});

document.getElementById('decre').addEventListener('click', () => {
    count--;
    updateDisplay();
});
document.getElementById('incre5').addEventListener('click', () => {
    count=count+5;
    updateDisplay();
});
document.getElementById('decre5').addEventListener('click', () => {
    count=count-5;
    updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

updateDisplay();
