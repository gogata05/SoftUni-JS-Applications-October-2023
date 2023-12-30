//only if profile its required
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMyItems } from "../api/data.js";
import { getUserData } from "../utility.js";

//dashboard:dash1
//replace text with variables:  ${items.name}
//replace src with image shape: src="${items.imageUrl}"
//fix href="#" :                href="/details/${x._id}"
//email/username variable       ${user.email} or ${user.username}
////copy shape here:


const profileTemplate = (items) => html`
<!--TODO-->

`;

//example
const profileTemplate2 = (items) => html`
  <section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
      ${items.length == 0
        ? html`
            <!--Paste here: No items-->
            <p class="no-cars">You haven't listed any cars yet.</p>
          `
        : items.map(
            (x) => html`
          <!--Paste here: the rest-->
          <div class="listing">
              <div class="preview">
                  <img src="${x.imageUrl}">
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
      </div>
      </section>
      `
          )}
    </div>
  </section>
`;

let page = null;
export async function profilePage(ctx) {
  page = ctx.page
  let user = JSON.parse(sessionStorage.getItem('user'))
  let data = await getAllMyItems();
  ctx.render(profileTemplate(data, user))
}