import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

  getTotalLikes,
  like,
  didUserLiked
} from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//details: owner1,login1,like1
//replace text with variables:     ${item.name}
//replace src with image shape:    src="${item.imageUrl}"
//fix href="#" on "Edit" button:   href="/edit/${item._id}"
//add to "Delete" button:          @click=${onDelete} href="javascript:void(0)"
//replace likes count w variable:  ${totalLikesCount}
//add to "Like" button             href="javascript:void(0)" @click=${onClickLike}
//use "owner1" for isOwner 
//use "like1" for userLiked
////copy shape here:

// title,
// description,
// imageUrl,
// date,
// author

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
 <!--Details Page-->
 <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${item.title}</h1>
                    <div>
                        <img src="${item.imageUrl}" />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${item.description}</p>
                    <h4>Date: ${item.date}</h4>
                    <h4>Author: ${item.author}</h4>
                    <div class="buttons">
                      ${isOwner
                      ? html`
                      <!--only for creator-->
                      <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                      <a class="btn-edit" href="/edit/${item._id}">Edit</a>
                      ` 
                      : ""}<!--if not creator null-->
                      ${(() => {
                        if (userLiked == 0) {
                          if (isLoggedIn && !isOwner) {
                            return html` 
                            <!--Like button: only for logged-in users ( not authors -->
                              <a class="btn-like" href="javascript:void(0)" @click=${onClickLike}>Like</a>
                            `;
                          }
                        }
                      })()}
                    </div>
                    <p class="likes">Likes: ${totalLikesCount}</p>
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
      theaterId: itemId,//changeNameId: check data.js for URL
    };
    await like(likes);
    totalLikesCount = await getTotalLikes(itemId);
    userLiked = await didUserLiked(itemId, userId);
    ctx.render(detailsTemplate(item,isOwner,onDelete,isLoggedIn,totalLikesCount,onClickLike,userLiked));//?
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItemById(itemId);
      ctx.page.redirect("/");//"/"
    }
  }
}


