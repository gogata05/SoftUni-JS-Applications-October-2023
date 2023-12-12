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
<section id="dashboard">
          <h2>Job Offers</h2>
            ${items.length == 0
              ? html` <!--Paste here: No items-->
              <!-- Display an h2 if there are no posts -->
              <h2>No offers yet.</h2>
              `
              : items.map(
                  (x) => html`
                    <!--Paste here: the rest-->
                    <!--replace text with variables: ${x.name} -->
                    <!--replace scr with image shape:  src="${x.imageUrl}"-->

                    <!-- Display a div with information about every post (if any)-->
                    <div class="offer">
                      <img src="${x.imageUrl}" alt="example1" />
                      <p>
                        <strong>Title: </strong><span class="title">${x.title}</span>
                      </p>
                      <p><strong>Salary:</strong><span class="salary">${x.salary}</span></p>
                      <a class="details-btn" href="/details/${x._id}">Details</a>
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
