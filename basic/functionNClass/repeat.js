const clock = document.querySelector('h2#clock');

let intervelClock = () => {
    let date = new Date();
    clock.innerText = date.toString();
}

setInterval(intervelClock, 5000);