//only if profile its required
import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMyItems } from "../api/data.js";
import { getUserData } from "../utility.js";

//dashboard:dash1
//replace text with variables:  ${items.name}
//replace src with image shape: src="${items.imageUrl}"
//fix href="#" :                href="/details/${x._id}"
////copy shape here:

// const profileTemplate = (items,isLoggedIn,userData) => html`
//   <!--TODO-->
//         <!-- Profile Page ( Only for logged users ) -->
//         <section id="user-profile-page" class="user-profile">
//           <article class="user-info">
//             <img
//               id="user-avatar-url"
//               alt="user-profile"
//               src="/images/${userData.gender}.png">
//             />
//             <div class="user-content">
//               <p>Username: ${userData.username}</p><!--?-->
//               <p>Email: ${userData.email}</p><!--?-->
//               <p>My memes count: ${items.length}</p>
//             </div>
//           </article>
//           <h1 id="user-listings-title">User Memes</h1>
//           <div class="user-meme-listings">
//             ${items.length == 0
//               ? html`
//                   <!--Paste here: No items-->
//                   <!-- Display : If user doesn't have own memes  -->
//                   <p class="no-memes">No memes in database.</p>
//                 `
//               : items.map(
//                   (x) => html`
//                     <!--Paste here: the rest-->
//                     <!-- Display : All created memes by this user (If any) -->
//                     <div class="user-meme">
//                       <p class="user-meme-title">${x.name}</p>
//                       <img
//                         class="userProfileImage"
//                         alt="meme-img"
//                         src="${x.imageUrl}"
//                       />
//                       <a class="button" href="/details/${x._id}">Details</a>
//                     </div>
//                     </div>
//                   `
//                 )}
//           </div>
//         </section>
// `;
// let page = null;
// export async function profilePage(ctx) {
//   page = ctx.page;
//   let user = JSON.parse(sessionStorage.getItem("user"));
//   let data = await getAllMyItems();
//   ctx.render(profileTemplate(data, user));
// }


const profileTemplate = (items, userData) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${userData.gender}.png">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${items.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${items.length == 0
            ? html`<p class="no-memes">No memes in database.</p>`
            : items.map(memeCard)}    
    </div>
</section>`;

const memeCard = (item) => html`
<div class="user-meme">
    <p class="user-meme-title">${item.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${item.imageUrl}">
    <a class="button" href="/details/${item._id}">Details</a>
</div>`;

export async function profilePage(context) {
    const userData = getUserData();
    const memes = await getAllMyItems(userData.id);
    context.render(profileTemplate(memes, userData));

    // let page = null;
// export async function profilePage(ctx) {
//   page = ctx.page;
//   let user = JSON.parse(sessionStorage.getItem("user"));
//   let data = await getAllMyItems();
//   ctx.render(profileTemplate(data, user));
// }

}