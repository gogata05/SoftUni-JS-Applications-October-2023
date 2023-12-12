//location and methods
import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { logout as apiLogout } from "./api/api.js";
import { getUserData } from "./utility.js";
import { loginPage, registerPage } from "./view/auth.js";
import { homePage } from "./view/home.js";
import { dashboardPage } from "./view/dashboard.js";

import { createPage } from "./view/create.js";
import { detailsPage } from "./view/details.js";
import { editPage } from "./view/edit.js";

import { profilePage } from "./view/profile.js";//remove if not bonus

const main = document.querySelector("#content");//main class "content" index.html//or ".content"

setUserNav();

document.getElementById("logout-btn").addEventListener("click", onLogout);//Logout html id

//href and methods
page("/", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/dashboard", decorateContext, dashboardPage);

page("/add-item", decorateContext, createPage);//"add-item" its the url in index.html
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);

page("/profile", decorateContext, profilePage);//remove if not bonus
page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();
  next();
}

//variable
//when u have variable in index.html
//check if '#user'(Logged users) in index.html is the same
//check if '#guest'(Guest users) in index.html is the same
//check if '#user a'(id element//the location of the variable) in html
// a can be anything: p,span...

function setUserNav() {
  const userData = getUserData();
//or .
  if (userData) {
      document.querySelector('.user').style.display = 'block';//!
      document.querySelector('.guest').style.display = 'none';//!
      document.querySelector('.user span').textContent = 
      `Welcome, ${userData.email}`;//text with variable//email or username is login information
      //`Welcome, ${userData.username}
  } else {
      document.querySelector('.user').style.display = 'none';//!
      document.querySelector('.guest').style.display = 'block';//!
  }
}

//Logout button
async function onLogout() {
  await apiLogout();
  setUserNav();
  page.redirect("/");
}
