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
  <!-- All Memes Page ( for Guests and Users )-->
  <section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
      ${items.length == 0
        ? html`
            <!--Paste here: No items-->
            <!-- Display : If there are no memes in database -->
            <p class="no-memes">No memes in database.</p>
          `
        : items.map(
            (x) => html`
              <!--Paste here: the rest-->
              <!-- Display : All memes in database ( If any ) -->
              <div class="meme">
                <div class="card">
                  <div class="info">
                    <p class="meme-title">${x.title}</p>
                    <img
                      class="meme-image"
                      alt="meme-img"
                      src="${x.imageUrl}"
                    />
                  </div>
                  <div id="data-buttons">
                    <a class="button" href="/details/${x._id}">Details</a>
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
