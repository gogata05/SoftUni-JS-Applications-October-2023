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


const detailsTemplate = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

) => html`
<!--TO DO-->
<!-- Details Meme Page (for guests and logged users) -->
<section id="meme-details">
            <h1>Meme Title: ${item.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${item.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>${item.description}</p>
                    ${isOwner
                    ? html`
                    <!--only for creator-->
                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    <a class="button warning" href="/edit/${item._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>
                    ` 
                    : ""}<!--if not creator null-->
                    
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


