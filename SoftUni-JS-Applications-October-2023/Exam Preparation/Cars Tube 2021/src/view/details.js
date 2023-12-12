import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

} from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info


//details: owner1,login1
//replace text with variables:     ${item.name}
//replace src with image shape:    src="${item.imageUrl}"
//fix href="#" on "Edit" button:   href="/edit/${item._id}"
//add to "Delete" button:          @click=${onDelete} href="javascript:void(0)"
//use "owner1" for isOwner 
//use "login1" for isLoggedIn
////copy shape here:
// brand,
// model,
// description,
// year,
// imageUrl,
// price

//@click=${onDelete}
const detailsTemplate = (item, isOwner, onDelete, isLoggedIn) => html`
  <!--TO DO-->
  <!-- Listing Details Page -->
  <section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
      <img src="${item.imageUrl}" />
      <hr />
      <ul class="listing-props">
        <li><span>Brand:</span>${item.brand}</li>
        <li><span>Model:</span>${item.model}</li>
        <li><span>Year:</span>${item.year}</li>
        <li><span>Price:</span>${item.price}$</li>
      </ul>
      <p class="description-para">${item.description}</p>

      <div class="listings-buttons">
        ${isOwner
          ? html`
              <!--only for creator-->
              <a href="/edit/${item._id}" class="button-list">Edit</a>
              <a
                @click=${onDelete}
                href="javascript:void(0)"
                class="button-list"
                >Delete</a
              >
            `
          : ""}<!--if not creator null-->
      </div>
    </div>
  </section>
`;

//example
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


