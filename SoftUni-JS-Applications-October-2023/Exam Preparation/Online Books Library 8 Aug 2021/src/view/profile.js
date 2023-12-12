import { getAllMyItems } from "../api/data.js";
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../utility.js";//logged or not info

const profileTemplate = (items) => html`
<section id="my-books-page" class="my-books">
<h1>My Books</h1>
    ${items.length == 0
    ? html`<p class="no-books">No books in database!</p>`
    : html`<ul class="my-books-list">
        ${items.map(bookCard)}
    </ul>`}    
</section>`;

const bookCard = (item) => html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>
`;

// export async function catalogPage(context) {
//     const userData = getUserData();
//     const items = await getMyItems(userData.id);
//     context.render(catalogTemplate(items));
// }

let page = null;
export async function profilePage(ctx) {
  page = ctx.page
  let user = JSON.parse(sessionStorage.getItem('user'))
  let data = await getAllMyItems();
  ctx.render(profileTemplate(data, user))
}