import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,
} from "../api/data.js";
const detailsTemplate = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,
) => html`

<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${item.description}</p>
                <p id = "nutrition">Nutrition</p>
                <p id = "details-nutrition">
                      ${item.nutrition}
                      </p>
                      
              </div>
              <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
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
  const isOwner = user && item._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  ctx.render(
    detailsTemplate(
      item,
      isOwner,
      onDelete,
      isLoggedIn,
    )
  );
  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItemById(itemId);
      ctx.page.redirect("/dashboard");
    }
  }
}
