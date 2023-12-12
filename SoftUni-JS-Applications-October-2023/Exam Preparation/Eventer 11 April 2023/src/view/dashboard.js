import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";

const dashboardTemplate = (items) => html`<h2>Current Events</h2>
<section id="dashboard">
  ${items.length == 0
    ? html`<h4>No Events yet.</h4>`
    : items.map(
        (e) => html`       
        <div class="event">
    <img src="${e.imageUrl}" alt="example1" />
    <p class="title">
    ${e.name}
    </p>
    <p class="date">${e.date}</p>
    <a class="details-btn" href="/details/${e._id}">Details</a>
  </div>
        `
      )}
</section>`;


export async function dashboardPage(ctx) {
  const items = await getAllItems();
  console.log(items);
  ctx.render(dashboardTemplate(items));
}
