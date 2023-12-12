import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

} from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

const detailsTemplate = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

) => html`
<!--TO DO-->

`;

//details
//item,href,isOwner,isLoggedIn,alt,@click=${onDelete}
//id,class
//copy shape here:


const detailsTemplate2 = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

) => html`
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${item.imageUrl}" alt="example1" />
    <p id="details-title">${item.model}</p>
    <div id="info-wrapper">

      <div id="details-description">
        <p class="year">Year: ${item.year}</p>
        <p class="mileage">Mileage: ${item.mileage} km.</p>
        <p class="contact">Contact Number: ${item.contact}</p>
        <p id="motorcycle-description">${item.about}</p>
      </div>

      <div id="action-buttons">

      ${isOwner
        ? html`
        <a href="/edit/${item._id}" id="edit-btn">Edit</a>
        <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
        `
        : ""}
      </div>
    </div>
  </div>
  </section>
`;

export async function detailsPage(ctx) {
  const itemId = ctx.params.id;
  const item = await getItemById(itemId);
  const user = ctx.user;
  let userId;
  if (user != null) {
    userId = user._id;
  }
  const isOwner = user && item._ownerId == user._id;//isOwner
  const isLoggedIn = user !== undefined;//isLoggedIn

  ctx.render(detailsTemplate(
    item,
    isOwner,
    onDelete,
    isLoggedIn,

    ));
    
  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItemById(itemId);
      ctx.page.redirect("/dashboard");//"/"
    }
  }
}


