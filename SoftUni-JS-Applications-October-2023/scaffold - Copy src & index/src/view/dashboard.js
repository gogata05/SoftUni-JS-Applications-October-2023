import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

const dashboardTemplate = (items) => html`
<!--TO DO-->

`;
//Sometimes "Details/More Info" button only visible if user is logged in
//${getUserData() ? html`
// <div class="btn-group">
//    <a href="/details/${x._id}" id="details">Details</a>
// </div>`: ''} 

//dashboard
//x,href,id,class,isLoggedIn,isOwner,alt,

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
