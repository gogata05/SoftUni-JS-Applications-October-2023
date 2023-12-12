import { html } from "../../node_modules/lit-html/lit-html.js";
import { getHome } from "../api/data.js";////for home when its with if else ? :
//import { getUserData } from "../utility.js";//logged or not info

//Just copy/paste the original here
//fix href="#" if exists one
//replace text with variables:  ${x.name}
//replace src with image shape: src="${x.imageUrl}"
//fix href="#" :                href="/details/${x._id}"
//isLoggedIn,isOwner if needed
const homeTemplate = (items) => html`
<!--TODO-->
<!--Home Page-->
<section class="welcomePage">
            <div id="welcomeMessage">
                <h1>My Theater</h1>
                <p>Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI Cooperating Members, theatre
                    professionals, theatre organizations, theatre universities and theatre lovers all over the world on
                    the 27th of March. This day is a celebration for those who can see the value and importance of the
                    art
                    form “theatre”, and acts as a wake-up-call for governments, politicians and institutions which have
                    not
                    yet recognised its value to the people and to the individual and have not yet realised its potential
                    for
                    economic growth.</p>
            </div>
            <div id="events">
                <h1>Future Events</h1>
                <div class="theaters-container">

  ${items.length == 0
    ? html` <!--Paste here: No items-->
    <!--No Theaters-->
    <h4 class="no-event">No Events Yet...</h4>
    `
    : items.map(
        (x) => html`
          <!--Paste here: the rest-->
          <!--replace text with variables: ${x.name} -->
          <!--replace scr with image shape:  src="${x.imageUrl}"-->
           <!--Created Events-->
           <div class="eventsInfo">
                        <div class="home-image">
                            <img src="${x.imageUrl}">
                        </div>
                        <div class="info">
                            <h4 class="title">${x.title}</h4>
                            <h6 class="date">${x.date}</h6>
                            <h6 class="author">${x.author}</h6>
                            <div class="info-buttons">
                                <a class="btn-details" href="/details/${x._id}">Details</a>
                            </div>
                        </div>
                    </div>    
        `
      )}
                </div>
            </div>
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

// export function homePage(ctx) {
//     ctx.render(homeTemplate);
// }
//for home view: when its with if else ? :
export async function homePage(ctx) {
const items = await getHome();
ctx.render(homeTemplate(items));
}