import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteItemById,
  getItemById,

  getComments,
  makeComment
} from "../api/data.js";

const detailsTemplate = (
  item,
  onDelete,
  userData,
  isOwner,
  isLoggedIn,

  comments,
  onSubmit
) => html`
<!--TODO-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src="${item.imageUrl}" />
        <h1>${item.title}</h1>
        <span class="levels">MaxLevel: ${item.maxLevel}</span>
        <p class="type">${item.category}</p>
      </div>

      <p class="text">${item.summary}</p>

      <div class="details-comments">
        <h2>Comments:</h2>
        ${comments.length > 0
          ? html`
              <ul>
                ${comments.map(
                  (x) => html`
                    <li class="comment">
                      <p>Content: ${x.comment}</p>
                    </li>
                  `
                )}
              </ul>
            `
          : html` <p class="no-comment">No comments.</p> `}
      </div>

      ${isOwner
        ? html`
            <div class="buttons">
              <a href="/edit/${item._id}" class="button">Edit</a>
              <a href="javascript:void(0)" class="button" @click=${onDelete}
                >Delete</a
              >
            </div>
          `
        : null}
    </div>
    ${!isOwner && isLoggedIn
      ? html`
          <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${onSubmit}>
              <textarea name="comment" placeholder="Comment......"></textarea>
              <input class="btn submit" type="submit" value="Add Comment" />
            </form>
          </article>
        `
      : null}
  </section>
`;


const detailsTemplate2 = (
  item,
  onDelete,
  userData,
  isOwner,
  isLoggedIn,

  comments,
  onSubmit
) => html`
<!-- details
check if the html is the same,check id/class
add into the html: replace all the text with variables! 
add the isOwner code!-->
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src="${item.imageUrl}" />
        <h1>${item.title}</h1>
        <span class="levels">MaxLevel: ${item.maxLevel}</span>
        <p class="type">${item.category}</p>
      </div>

      <p class="text">${item.summary}</p>

      <div class="details-comments">
        <h2>Comments:</h2>
        ${comments.length > 0
          ? html`
              <ul>
                ${comments.map(
                  (x) => html`
                    <li class="comment">
                      <p>Content: ${x.comment}</p>
                    </li>
                  `
                )}
              </ul>
            `
          : html` <p class="no-comment">No comments.</p> `}
      </div>

      ${isOwner
        ? html`
            <div class="buttons">
              <a href="/edit/${item._id}" class="button">Edit</a>
              <a href="javascript:void(0)" class="button" @click=${onDelete}
                >Delete</a
              >
            </div>
          `
        : null}
    </div>
    ${!isOwner && isLoggedIn
      ? html`
          <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${onSubmit}>
              <textarea name="comment" placeholder="Comment......"></textarea>
              <input class="btn submit" type="submit" value="Add Comment" />
            </form>
          </article>
        `
      : null}
  </section>
`;

export async function detailsPage(ctx) {
    const itemId = ctx.params.id;
    const item = await getItemById(itemId);
    const user = ctx.user;
    let userId;
    const comments = await getComments(itemId);

    if (user != null) {
      userId = user._id;
    }
    const isOwner = user && item._ownerId == user._id;
    const isLoggedIn = user !== undefined;
    ctx.render(
      detailsTemplate(
        item,
        onDelete,
        user,
        isOwner,
        isLoggedIn,
        
        comments,
        onSubmit
      )
    );
    async function onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const comment = formData.get('comment');
      if (comment == "") {
        return alert("All fields are required");
      }
      await makeComment(itemId, comment);
      event.target.reset();
      const updatedComments = await getComments(itemId); 
      ctx.render(detailsTemplate(item, onDelete, user, isOwner, isLoggedIn, updatedComments, onSubmit)); 
    }
    
    async function onDelete() {
      const confirmed = confirm("Are you sure?");
      if (confirmed) {
        await deleteItemById(itemId);
        ctx.page.redirect("/");
      }
    }
  }


