const h1 = document.querySelector("div.hello:first-child h1");
console.log(h1);
//var handleClickEvent = () => {

function handleClickEvent() {    
    const ACTIVE = 'active';
    const DEACTIVE = 'deactive';

    let oldClass = "";
    let newClass = "";
    /*
    if(h1.classList.contains(ACTIVE)) {
        oldClass = ACTIVE;
        newClass = DEACTIVE;
    } 
    else {
        oldClass = DEACTIVE;
        newClass = ACTIVE;
    }
    */
    h1.classList.toggle(ACTIVE);
    h1.classList.remove(oldClass);
    h1.classList.add(newClass);
}
h1.addEventListener('click', handleClickEvent);