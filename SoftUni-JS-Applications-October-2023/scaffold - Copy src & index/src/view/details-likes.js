import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

  getTotalLikes,
  like,
  didUserLiked
} from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

const detailsTemplate = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

  totalLikesCount,
  onClickLike,
  userLiked
) => html`
<!--TO DO-->

`;

//details
//item,href,isOwner,isLoggedIn,@click=${onDelete},@click=${onClickLike}
//getTotalLikes,like,didUserLiked
//totalLikesCount,onClickLike,userLiked
//id,class
//copy shape here:


const detailsTemplate2 = (
  item,
  isOwner,
  onDelete,
  isLoggedIn,

  totalLikesCount,
  onClickLike,
  userLiked
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-category">${item.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${item.description}</p>
                <p id ="more-info">${item.moreInfo}</p>
              </div>
              <h3>Likes:<span id="likes">${totalLikesCount}</span></h3>
              <div id="action-buttons">

      ${isOwner
        ? html`<a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
     ${(() => {
  if (userLiked == 0) {
    if (isLoggedIn && !isOwner) {
      return html` <a href="javascript:void(0)" @click=${onClickLike} id="like-btn">Like</a>`;
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

  let totalLikesCount;
  let userLiked;

  if (user != null) {
    userId = user._id;

    userLiked = await didUserLiked(itemId, userId);
  }
  const isOwner = user && item._ownerId == user._id;//isOwner
  const isLoggedIn = user !== undefined;//isLoggedIn

  totalLikesCount = await getTotalLikes(itemId);

  ctx.render(detailsTemplate(
    item,
    isOwner,
    onDelete,
    isLoggedIn,

    totalLikesCount,
    onClickLike,
    userLiked
    ));  

  async function onClickLike() {
    const likes = {
       changeNameId: itemId,//changeNameId: check data.js for URL
    };
    await like(likes);
    totalLikesCount = await getTotalLikes(itemId);
    userLiked = await didUserLiked(itemId, userId);
    ctx.render(detailsTemplate(item,isOwner,onDelete,isLoggedIn,totalLikesCount,onClickLike,didUserLiked));
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItemById(itemId);
      ctx.page.redirect("/dashboard");//"/"
    }
  }
}


