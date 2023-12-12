import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

const dashboardTemplate = (books) => html` <section
  id="dashboard-page"
  class="dashboard">
  <h1>Dashboard</h1>
  ${books.length == 0
    ? html`<p class="no-books">No books in database!</p>`
    : html`<ul class="other-books-list">
        ${books.map(bookPreview)}
      </ul>`}
</section>`;

const bookPreview = (book) => html` <li class="otherBooks">
  <h3>${book.title}</h3>
  <p>Type: ${book.type}</p>
  <p class="img"><img src="${book.imageUrl}" /></p>
  <a class="button" href="/details/${book._id}">Details</a>
</li>`;

const dashboardTemplate2 = (items) => html`
  <h2>Items</h2>
  <section id="dashboard">
    ${items.length == 0
      ? html` <h2>No item info yet.</h2>`
      : items.map(
          (x) => html` <div class="fruit">
            <img src="${x.imageUrl}" alt="example1" />
            <h3 class="title">The${x.name}</h3>
            <p class="description">"${x.description}"</p>
            <a class="details-btn" href="/details/${x._id}">More Info</a>
          </div>`
        )}
  </section>
`;
export async function dashboardPage(ctx) {
  const items = await getAllItems();
  console.log(items);
  ctx.render(dashboardTemplate(items));
}
