import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from '../api/data.js';
import { getUserData } from '../utility.js';

const searchTemplate = (items, onSearch, user) => html`
<section id="search">
<div class="form">
  <h2>Search</h2>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button type="button" @click=${onSearch} class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
        
            ${items != undefined ? html `
                <div class="search-result">
                ${items.length == 0 ? html`
                <p class="no-result">No result.</p>` : 
                items.map(p => html`
                <div class="fruit">
                <img src="${p.imageUrl}" alt="example1" />
                <h3 class="title">${p.name}</h3>
                <p>"${p.description}"</p>
                <a class="details-btn" href="/details/${p._id}">More Info</a>
                </div>`)
                            }
            </div>
            `: ''}
        </section>
`;

export async function searchPage(ctx) {
  let user = getUserData(ctx.user);
  console.log(user);
  let items = undefined;

const name = ctx.querystring.split('=')[1];
    if(name !== undefined) {
      items = await search(name);
    }
    console.log(items);
    ctx.render(searchTemplate(items, onSearch, user));

    async function onSearch() {
        const query = document.querySelector('#search-input').value;
        if (query !== '') {
            ctx.page.redirect(`/search?query=${query}`);
        } else {
            return alert('All fields are required!');
        }
    }
}