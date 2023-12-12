const element = document.getElementById('errorBox');
const output = element.querySelector('span');//errror here:
//Cannot read properties of null (reading 'querySelector') at notify.js:2:24

export function notify(message) {
    output.textContent = message;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);
}

window.notify = notify;