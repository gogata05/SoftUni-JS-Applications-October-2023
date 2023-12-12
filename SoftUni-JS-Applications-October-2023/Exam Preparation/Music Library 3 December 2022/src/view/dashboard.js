import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

const dashboardTemplate = (items) => html`
<!--TO DO-->
<!--This is html that need to be fixed similar to Template2-->
<!--you are not allowed to change  -->

<section id="dashboard">
  <h2>Albums</h2>
  <ul class="card-wrapper">
    
    ${items.length === 0
      ? html`<h2>There are no albums added yet.</h2>`
      : items.map(
          (item) => html`

            <li class="card">
              <img src="${item.imageUrl}" alt="travis" />
              <p><strong>Singer/Band: </strong><span class="singer">${item.singer}</span></p>
              <p><strong>Album name: </strong><span class="album">${item.name}</span></p>
              <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
              <a class="details-btn" href="/details/${item._id}">Details</a>
            
            </li>`
        )}
  </ul>
</section>


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
