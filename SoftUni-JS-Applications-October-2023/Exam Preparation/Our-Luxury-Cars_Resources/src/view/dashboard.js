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
  <!-- Dashboard page -->
  <h3 class="heading">Our Cars</h3>
  <section id="dashboard">
    ${items.length == 0
      ? html`
          <!--Paste here: No items-->
          <!-- Display an h2 if there are no posts -->
          <h3 class="nothing">Nothing to see yet</h3>
        `
      : items.map(
          (x) => html`
            <!--Paste here: the rest-->
            <!-- Display a div with information about every post (if any)-->
            <div class="car">
              <img src="${x.imageUrl}" alt="example1" />
              <h3 class="model">${x.model}</h3>
              <div class="specs">
                <p class="price">Price: €${x.price}</p>
                <p class="weight">Weight: ${x.weight} kg</p>
                <p class="top-speed">Top Speed: ${x.speed} kph</p>
              </div>
              <a class="details-btn" href="/details/${x._id}">More Info</a>
            </div>
          `
        )}
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
