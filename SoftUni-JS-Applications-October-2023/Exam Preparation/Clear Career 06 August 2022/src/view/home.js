import { html } from "../../node_modules/lit-html/lit-html.js";
//import { getHome } from "../api/data.js";////for home when its with if else ? : //when "home" and "dashboard" are both collections
import { getUserData } from "../utility.js";//logged or not info

//Just copy/paste the original here
//fix href="#" if exists one

//only if "home" is "dashboard" otherwise skip this
//dashboard:dash1
//replace text with variables:  ${x.name}
//replace src with image shape: src="${x.imageUrl}"
//fix href="#" :                href="/details/${x._id}"
//isLoggedIn,isOwner if needed
const homeTemplate = html` 
<!--TODO-->
<!-- Home page -->
<section id="home">
          <img
            src="./images/pngkey.com-hunting-png-6697165-removebg-preview.png"
            alt="home"
          />
          <h2>Searching for a job?</h2>
          <h3>The right place for a new career start!</h3>
        </section>
`;
//example
const homeTemplate2 = html` 
<section id="home">
	<h1>
		Welcome to <span>Samurider</span> moto market, your premier destination
		for Japanese motorcycles.
	</h1>
	<img src="./images/motorcycle.png" alt="home" />
</section>
`;
//example
const homeTemplate3 = (items) => html`
  <!--TODO-->
  <section id="welcome-world">
    <div class="welcome-message">
      <h2>ALL new games are</h2>
      <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero" />

    <div id="home-page">
      <h1>Latest Games</h1>
      ${items.length > 0
        ? items.map(
        (x) => html`
            <div class="game">
              <div class="image-wrap">
                <img src="${x.imageUrl}" />
              </div>
              <h3>${x.title}</h3>
              <div class="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span
                ><span>☆</span>
              </div>
              <div class="data-buttons">
                <a href="/details/${x._id}" class="btn details-btn"
                  >Details</a
                >
              </div>
            </div>`)
			
        : html`<p class="no-articles">No games yet</p>`}
    </div>
  </section>
`;

export function homePage(ctx) {
    ctx.render(homeTemplate);
}

//for home view: when its with if else ? :
//when "home" and "dashboard" are both collections
//delete not if used
export async function homePage2(ctx) {
const items = await getHome();
ctx.render(homeTemplate(items));
}

//When guests in "/" home see the "homepage" but logged in users actually see the "dashboard"
//delete not if used
const homeTemplate4 = () => html`
  <!-- Welcome Page (Only for guest users) -->
  <section id="welcome">
    <div id="welcome-container">
      <h1>Welcome To Meme Lounge</h1>
      <img src="/images/welcome-meme.jpg" alt="meme">
      <h2>Login to see our memes right away!</h2>
      <div id="button-div">
        <a href="/login" class="button">Login</a>
        <a href="/register" class="button">Register</a>
      </div>
    </div>
  </section>
`;
//delete not if used
export function homePage4(ctx) {
  const userData = getUserData();
  //Logged in users are redirect to "dashboard"
  if (userData) {
    ctx.page.redirect('/dashboard');
    return;
  }
  ctx.render(homeTemplate());
}