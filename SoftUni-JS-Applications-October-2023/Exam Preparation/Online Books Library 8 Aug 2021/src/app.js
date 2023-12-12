

import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

import { getUserData } from "./utility.js";
import { logout as apiLogout } from "./api/api.js";
import { loginPage, registerPage } from "./view/auth.js";
import { dashboardPage } from "./view/dashboard.js";

import { profilePage } from './view/profile.js';//!!

import { createPage } from "./view/create.js";
import { detailsPage } from "./view/details.js";
import { editPage } from "./view/edit.js";

const main = document.querySelector("#site-content");//main class "content" index.html//or ".content"

setUserNav();

document.getElementById("logout-btn").addEventListener("click", onLogout);//logout button index.html

page("/", decorateContext, dashboardPage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);

page("/add-item", decorateContext, createPage);//"add-item" its the url in index.html
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);

page('/profile', decorateContext, profilePage);//!!!!

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();
  next();
}

//when u have variable in index.html
function setUserNav() {
  const userData = getUserData();

  if (userData) {
      document.querySelector('#user').style.display = 'block';//or .
      document.querySelector('#guest').style.display = 'none';
      document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
  } else {
      document.querySelector('#user').style.display = 'none';
      document.querySelector('#guest').style.display = 'block';
  }
}
//Logout button
async function onLogout() {
  await apiLogout();
  setUserNav();
  page.redirect("/");
}
