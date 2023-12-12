import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

  getTotalLikes,
  like,
  didUserLiked,
} from "../api/data.js";
//import { getUserData } from "../utility.js"; //logged or not info

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

  <section id="details">
    <div id="details-wrapper">
      <div id="img-wrapper">
        <img src="${item.imageUrl}" alt="example1" />
      </div>
      <div id="info-wrapper">
        <p>
          <strong>Band:</strong><span id="details-singer">${item.singer}</span>
        </p>
        <p>
          <strong>Album name:</strong
          ><span id="details-album">${item.album}</span>
        </p>
        <p>
          <strong>Release date:</strong
          ><span id="details-release">${item.release}</span>
        </p>
        <p>
          <strong>Label:</strong><span id="details-label">${item.label}</span>
        </p>
        <p>
          <strong>Sales:</strong><span id="details-sales">${item.sales}</span>
        </p>
      </div>
      <div id="likes">
        Likes: <span id="likes-count">${totalLikesCount}</span>
      </div>
      <div id="action-buttons">

        ${(() => {
          if (userLiked == 0) {
            if (isLoggedIn && !isOwner) {
              return html` <a
                href="javascript:void(0)"
                @click=${onClickLike}
                id="like-btn"
                >Like</a
              >`;
            }
          }
        })()}

        ${isOwner
          ? html`
              <a href="/edit/${item._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn"
                >Delete</a
              >
            `
          : ""}
      </div>
    </div>
  </section>
`;

//details
//item,href,isOwner,isLoggedIn,@click=${onDelete},@click=${onClickLike}
//totalLikesCount,onClickLike,didUserLiked
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
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${item.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
            <p><strong>Album name:</strong><span id="details-album">${item.album}</span></p>
            <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${item?.totalLikes}</span></div>

        ${item.viewerId
            ? html`
                  <div id="action-buttons">
                      ${item.viewerId === item._ownerId
                          ? html`
                                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                                <a href="javascript:void(0)" @click=${() => item.del(item._id)} id="delete-btn">Delete</a>
                            `
                          : html`${item.hasLiked === 0 ? html`<a href="javascript:void(0)" id="like-btn" @click=${() => item.addLikes(item._id)}>Like</a>` : ""}`}
                  </div>
              `
            : ""}
    </div>
</section>
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

    userLiked = await didUserLiked(itemId, userId); //like
  }
  const isOwner = user && item._ownerId == user._id; //isOwner
  const isLoggedIn = user !== undefined; //isLoggedIn

  totalLikesCount = await getTotalLikes(itemId); //like

  ctx.render(
    detailsTemplate(
      item,
      isOwner,
      onDelete,
      isLoggedIn,

      totalLikesCount,
      onClickLike,
      userLiked
    )
  );

  async function onClickLike() {
    const likes = {
      albumId: itemId,
    };
    await like(likes);
    totalLikesCount = await getTotalLikes(itemId);
    userLiked = await didUserLiked(itemId, userId);
    ctx.render(
      detailsTemplate(
        item,
        isOwner,
        onDelete,
        isLoggedIn,

        totalLikesCount,
        onClickLike,
        didUserLiked
      )
    );
  } //like

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteItemById(itemId);
      ctx.page.redirect("/dashboard"); //"/"
    }
  }
}
