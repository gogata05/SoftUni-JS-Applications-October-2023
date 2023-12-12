import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

  getTotalGoes,
  didUserGo,
  go
} from "../api/data.js";

const detailsTemplate = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

  totalGoesCount,
  onClickGo,
  didUserGoin
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.name}</p>
            <p id="details-category">
              Category: <span id="categories">${item.category}</span>
            </p>
            <p id="details-date">
              Date: <span id="date">${item.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${item.description}</span>
              </div>
              <h3>Going: <span id="go">${totalGoesCount}</span> times.</h3>
              <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
      ${(() => {
        if (didUserGoin == 0) {
          if (isLoggedIn && !isOwner) {
            return html`<a href="javascript:void(0)"  @click=${onClickGo} id="go-btn">Going</a>`;
          }
        }
      })()}
    </div>
            </div>
`;

export async function detailsPage(ctx) {
  const itemId = ctx.params.id;
  const item = await getItemById(itemId);
  const user = ctx.user;

  let userId;
  let totalGoesCount;
  let didUserGoin;

  if (user != null) {
    userId = user._id;
    didUserGoin = await didUserGo(itemId, userId);
  }
  const isOwner = user && item._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalGoesCount = await getTotalGoes(itemId);
  ctx.render(detailsTemplate(item,isOwner,onDelete,isLoggedIn,totalGoesCount,onClickGo,didUserGoin));
  async function onClickGo() {
    const donation = {
       eventId: itemId,
    };
    await go(donation);
    totalGoesCount = await getTotalGoes(itemId);
    didUserGoin = await didUserGo(itemId, userId);
    ctx.render(detailsTemplate(item,isOwner,onDelete,isLoggedIn,totalGoesCount,onClickGo,didUserGo));}

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItemById(itemId);
      ctx.page.redirect("/dashboard");
    }
  }
}
