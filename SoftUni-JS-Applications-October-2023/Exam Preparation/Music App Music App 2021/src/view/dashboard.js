import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
import { getUserData } from "../utility.js"; // Import getUserData

const dashboardTemplate = (items) => html`
  <section id="catalogPage">
    <h1>All Albums</h1>

    ${items.length == 0
      ? html` <h2>No Albums in Catalog!</h2>`
      : items.map(
          (x) => html` 
          <div class="card-box">
            <img src="${x.imgUrl}" />
            <div>
              <div class="text-center">
                <p class="name">Name: ${x.name}</p>
                <p class="artist">Artist: ${x.artist}</p>
                <p class="genre">Genre: ${x.genre}</p>
                <p class="price">Price: ${x.price}</p>
                <p class="date">Release Date: ${x.releaseDate}</p>
              </div>
              <!-- Conditionally render the Details button -->
              ${getUserData() ? html`
              <div class="btn-group">
                        <a href="/details/${x._id}" id="details">Details</a>
                       </div>`
                : ''}
            </div>
          </div>`
        )}
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
