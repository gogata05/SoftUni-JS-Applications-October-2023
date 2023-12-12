import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

  //remove if bonus not likes!
  //getTotalLikes,
  //like,
  //didUserLiked
} from "../api/data.js";

const detailsTemplate = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

  //remove if bonus not likes!
  //totalLikesCount,
  //onClickLike,
  //didUserLiked
) => html`
<section id="details">
      <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
          <img src="${item.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
          <p>Brand: <span id="details-brand">${item.brand}</span></p>
          <p>
            Model: <span id="details-model">${item.model}</span>
          </p>
          <p>Release date: <span id="details-release">${item.release}</span></p>
          <p>Designer: <span id="details-designer">${item.designer}</span></p>
          <p>Value: <span id="details-value">${item.value}</span></p>
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
    </section>
`;

const detailsTemplate2 = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

  //remove if bonus not likes!
  //totalLikesCount,
  //onClickLike,
  //didUserLiked
) => html`
<!-- dashboard
check if the html is the same,check id/class
add into the html: replace all the text with variables! and 
add the isOwner code!-->

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

  //remove if bonus not likes!
  //let totalLikesCount;
  //let didUserLiked;
  if (user != null) {
    userId = user._id;

    //remove if bonus not likes!
    //didUserLiked = await didUserLiked(itemId, userId);
  }
  const isOwner = user && item._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  //remove if bonus not likes!
  //totalLikesCount = await getTotalLikes(itemId);

  ctx.render(detailsTemplate(
    item,
    isOwner,
    onDelete,
    isLoggedIn,

    //remove if bonus not likes!
    //totalLikesCount,
    //onClickLike,
    //didUserLiked
    ));

  //remove if bonus not likes!
  // async function onClickLike() {
  //   const likes = {
  //      itemId: itemId,
  //   };
  //   await like(likes);
  //   totalLikesCount = await getTotalLikes(itemId);
  //   didUserLiked = await didUserLiked(itemId, userId);
  //   ctx.render(detailsTemplate(item,isOwner,onDelete,isLoggedIn,totalLikesCount,onClickLike,didUserLiked));
  // }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItemById(itemId);
      ctx.page.redirect("/dashboard");
    }
  }
}



