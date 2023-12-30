

//if bonus is notifications replace "Alert" everywhere(usually login,reg,create,edit.js and api.js)
//add import import { notify } from "../notify.js";//(usually login,reg,create,edit.js files)
//also add the <!--Notifications--> html in index.html above "navigation"//Meme Lounge for more info
const element = document.getElementById('errorBox');
const output = element.querySelector('span');

export function notify(message) {
    output.textContent = message;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);
}

window.notify = notify;