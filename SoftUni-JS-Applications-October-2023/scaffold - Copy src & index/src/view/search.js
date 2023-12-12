//only if search its the bonus
import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from '../api/data.js';
import { getUserData } from '../utility.js';//logged or not info

const searchTemplate = (items, onSearch, user) => html`
 <!--TODO-->
 
`;
//Sometimes "Details/More Info" button with class="details-btn" only visible if user is logged in
//${user
//  ? html`
//      <div class="btn-group">
//        <a href="/details/${item._id}" id="details">Details</a>
//      </div>`: ""}
//copy shape here:


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
            <button type="button" @click=${onSearch} class="button-list">Search</button> 
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

    //async function onSearch(event) {
    //event.preventDefault(); //use "event" inside onSearch() with <button type="submit"//with <button type="button" proceed as normal
    async function onSearch() {
        const query = document.querySelector('#search-input').value;
        if (query !== '') {
            ctx.page.redirect(`/search?query=${query}`);
        } else {
            return alert('All fields are required!');
        }
    } 
}

//if the upper solution is not working then try these solutions:
//Solution 2:
// export async function searchPage(ctx) {
//     const userId = sessionStorage.getItem('userId');

//     const brand = ctx.querystring.split('=')[1];
//     const shoesList = brand == undefined ? [] : await search(brand);
//     render(searchTemplate(shoesList, userId, ctx), document.querySelector('main'));
//   }
// async function onSearch(event, ctx) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const query = formData.get('search').trim();
//     ctx.page.redirect(`/search?query=${query}`);
// }


