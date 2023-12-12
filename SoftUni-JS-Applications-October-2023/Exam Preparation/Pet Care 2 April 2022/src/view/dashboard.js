import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//dashboard:dash1
//replace text with variables:  ${x.name}
//replace src with image shape: src="${x.imageUrl}"
//fix href="#" :                href="/details/${x._id}"
//isLoggedIn,isOwner if needed
//copy shape here:


const dashboardTemplate = (items) => html`
  <!--TO DO-->
  <!--Dashboard-->
  <section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">

  ${items.length == 0
    ? html`
        <!--Paste here: No items-->
        <!--If there is no pets in dashboard-->
        <div>
          <p class="no-pets">No pets in dashboard</p>
        </div>
      `
    : items.map(
        (x) => html`
          <!--Paste here: the rest-->

              <div class="animals-board">
                <article class="service-img">
                  <img class="animal-image-cover" src="${x.image}" />
                </article>
                <h2 class="name">${x.name}</h2>
                <h3 class="breed">${x.breed}</h3>
                <div class="action">
                  <a class="btn" href="/details/${x._id}">Details</a>
                </div>
              </div>

              `
      )}
      </div>
    </section>
`;
//Sometimes "Details/More Info" button only visible if user is logged in
//${getUserData() ? html`
// <div class="btn-group">
//    <a href="/details/${x._id}" id="details">Details</a>
// </div>`: ''} 

//example
const dashboardTemplate2 = (items) => html`
<h2>Items</h2>
<section id="dashboard">
  
  ${items.length == 0
    ? html`
    <h2>No item info yet.</h2>`
    : items.map(
        (x) => html` 

          <div class="fruit">
            <img src="${x.imageUrl}" alt="example1" />
            <h3 class="title">The${x.name}</h3>
            <p class="description">"${x.description}"</p>
            <a class="details-btn" href="/details/${x._id}">More Info</a>
          </div>`
      )}
</section>
`;
export async function dashboardPage(ctx) {
  const items = await getAllItems();
  console.log(items);
  ctx.render(dashboardTemplate(items));
}
