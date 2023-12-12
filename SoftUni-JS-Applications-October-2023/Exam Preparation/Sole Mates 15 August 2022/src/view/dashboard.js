import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (items) => html`
<section id="dashboard">
<h2>Collectibles</h2>
<ul class="card-wrapper">
<!-- Display a li with information about every post (if any)-->
${items.length == 0
  ? html`
    <h2>There are no items added yet.</h2>`
    : items.map(
      (x) => html` 
    <li class="card">
      <img src="${x.imageUrl}" alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${x.brand}</span>
      </p>
      <p>
        <strong>Model: </strong
        ><span class="model">${x.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${x.value}</span>$</p>
      <a class="details-btn" href="/details/${x._id}">Details</a>
    </li>`
      )}
      </ul>
</section>
`;

//dashboard
//check if the html is the same
//add into the html: replace all the text with variables! and 
//href="" with href="/details/${x._id}"
//if the html doesn't match make new version/ with gpt
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
