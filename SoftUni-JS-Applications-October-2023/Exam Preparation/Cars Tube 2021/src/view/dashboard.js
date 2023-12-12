import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//dashboard:dash1
//replace text with variables:  ${x.name}
//replace src with image shape: src="${x.imageUrl}"
//fix href="#" :                href="/details/${x._id}"
//isLoggedIn,isOwner if needed
//copy shape here:
  // brand,
  // model,
  // description,
  // year,
  // imageUrl,
  // price

const dashboardTemplate = (items) => html`
  <!--TO DO-->
  <!-- All Listings Page -->
  <section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
      <!-- Display all records -->
      ${items.length == 0
        ? html`
            <!--Paste here: No items-->
            <p class="no-cars">No cars in database.</p>
          `
        : items.map(
            (x) => html`
              <!--Paste here: the rest-->
              <!--replace text with variables: ${x.name} -->
              <!--replace scr with image shape:  src="${x.imageUrl}"-->
              
              <div class="listing">
                <div class="preview">
                  <img src="${x.imageUrl}" />
                </div>

                <h2>${x.brand} ${x.model}</h2>
                <div class="info">
                  <div class="data-info">
                    <h3>Year: ${x.year}</h3>
                    <h3>Price: ${x.price} $</h3>
                  </div>
                  <div class="data-buttons">
                    <a href="/details/${x._id}" class="button-carDetails">Details</a>
                  </div>
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
      ? html` <h2>No item info yet.</h2>`
      : items.map(
          (x) => html` <div class="fruit">
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
