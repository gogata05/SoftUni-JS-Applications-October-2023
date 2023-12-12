import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info
const dashboardTemplate = (items) => html`
  <!--TO DO-->
  <section id="catalog-page">
    <h1>All Games</h1>
    ${items.length > 0
      ? items.map(
          (x) => html` <div class="allGames">
            <div class="allGames-info">
              <img src="${x.imageUrl}" />
              <h6>${x.category}</h6>
              <h2>${x.title}</h2>
              <a href="/details/${x._id}" class="details-button">Details</a>
            </div>
          </div>`
        )
      : html`
      <h3 class="no-articles">No articles yet</h3>`}
  </section>
`;

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
