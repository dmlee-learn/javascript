const list = document.querySelectorAll('.tabnav li');
const ctTotal = list.length;
let currentCt = 0;
setTimeout(() => {
    list[currentCt].dispatchEvent(new Event("click"));
    currentCt += 1;
    if(ctTotal <= currentCt) currentCt = 0;
}, 1000);