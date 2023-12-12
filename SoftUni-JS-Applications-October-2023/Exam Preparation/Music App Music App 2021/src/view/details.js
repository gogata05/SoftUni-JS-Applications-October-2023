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
<!--TO DO-->
<section id="detailsPage">
    <div class="wrapper">
      <div class="albumCover">
        <img src="${item.imgUrl}" />
      </div>
      <div class="albumInfo">
        <div class="albumText">
          <h1>Name: ${item.name}</h1>
          <h3>Artist: ${item.artist}</h3>
          <h4>Genre: ${item.genre}</h4>
          <h4>Price: ${item.price}</h4>
          <h4>Date: ${item.releaseDate}</h4>
          <p>Description: ${item.description}</p>
        </div>
        ${isOwner
          ? html` 
            <div class="actionBtn">
              <a href="/edit/${item._id}" class="edit">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" class="remove"
                >Delete</a
              >
            </div>`
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
<!-- details
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

//Comment bonus task

// export async function detailsPage(ctx) {
//     const id = ctx.params.id;
//     const game = await getById(id);
//     const userData = getUserData();
//     const comments = await getComments(id);
  
//     if (userData) {
//       game.isOwner = game._ownerId == userData._id;
//     }
//     ctx.render(
//       detailsTemplate(
//         game,
//         onDelete,
//         comments,
//         userData,
//         createSubmitHandler(onSubmit)
//       )
//     );
//     async function onSubmit({ comment }, form) {
//       if (comment == "") {
//         return alert("All fields are required");
//       }
//       await makeComment(id, comment);
//       form.reset();
//       ctx.page.redirect("/catalog/" + id);
//     }
//     async function onDelete() {
//       const confirmed = confirm("Are you sure?");
//       if (confirmed) {
//         await deleteGame(id);
//         ctx.page.redirect("/");
//       }
//     }
//   }


