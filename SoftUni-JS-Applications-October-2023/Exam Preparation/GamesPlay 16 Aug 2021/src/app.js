
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

const main = document.querySelector("#main-content");//main class "content" index.html

setUserNav();

document.getElementById("logout-btn").addEventListener("click", onLogout);//logout button index.html

page("/", decorateContext, homePage);
page("/login", decorateContext, loginPage);
page("/register", decorateContext, registerPage);
page("/dashboard", decorateContext, dashboardPage);

page("/add-item", decorateContext, createPage);//"add-item" its the url in index.html
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();
  next();
}
//Guest view and Login view
//check if "user" and "guest" class/id are correct!
function setUserNav() {
  const userAsJson = sessionStorage.getItem("user");
  const user = userAsJson && JSON.parse(userAsJson);
  const guestDiv = document.querySelector("#guest");
  const userDiv = document.querySelector("#user");
  user != null
    ? [
        (userDiv.style.display = "inline-block"),
        (guestDiv.style.display = "none"),
      ]
    : [
        (userDiv.style.display = "none"),
        (guestDiv.style.display = "inline-block"),
      ];
}

//only use when we dont have <div>s but <li>s in the index.html for "All user","Only guest" and "Only user" views
// function setUserNav() {
//   const user = getUserData()
//   if (user) {
//     document.querySelectorAll('.user').forEach(x => x.style.display = 'inline');
//     document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
//   } else {
//     document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
//     document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline');
//   }
// }
//Logout button
async function onLogout() {
  await apiLogout();
  setUserNav();
  page.redirect("/");
}
