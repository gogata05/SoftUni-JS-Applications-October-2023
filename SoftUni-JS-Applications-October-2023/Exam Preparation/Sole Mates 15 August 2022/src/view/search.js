//only if search its the bonus
import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from '../api/data.js';
import { getUserData } from '../utility.js';

const searchTemplate = (items, onSearch, user) => html`
 <!--TODO-->
 <section id="search">
        <h2>Search by Brand</h2>
        <form class="search-wrapper cf">
        <input
            id="search-input"
            type="text"
            name="search"
            placeholder="Search here..."
            required
        />
        <button type="submit"  @click=${onSearch}>Search</button>
        </form>

        <h3>Results:</h3>

        ${items != undefined ? html `
        <div id="search-container">
        <ul class="card-wrapper">

        ${items.length == 0 ? html`
        <h2>There are no results found.</h2>` 
        : 
        items.map(x => html`

       <li class="card">
        <img src="${x.imageUrl}" alt="travis" />
        <p>
            <strong>Brand: </strong><span class="brand">${x.brand}</span>
        </p>
        <p>
            <strong>Model: </strong
            ><span class="model">${x.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${x.value}</span>$</p>

        <a class="details-btn" href="/details/${x._id}">Details</a>
       </li>`)
            }
       </ul>
        </div>
       `: ''}
    </section>
`;

const searchTemplate2 = (items, onSearch, user) => html`
 <section id="search">
        <div class="form">
          <h4>Search</h4>
          <form class="search-form">
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button type="submit" onclick="console.log('Button clicked')">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
        
            ${items != undefined ? html `

                <div class="search-result">
                ${items.length == 0 ? html`
                <h2 class="no-avaliable">No result.</h2>` 
                : 
                items.map(x => html`

                <div class="motorcycle">
                <img src="${x.imageUrl}" alt="example1" />
                <h3 class="model">${x.model}</h3>
                <a class="details-btn" href="/details/${x._id}">More Info</a>
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

    async function onSearch(event) {
          event.preventDefault();  
          const query = document.querySelector('#search-input').value;
          if (query !== "") {
              ctx.page.redirect(`/search?query=${query}`);
          } else {
              return alert('All fields are required!');
          }
  }
}


