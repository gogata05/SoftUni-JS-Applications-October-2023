import { html } from "../../node_modules/lit-html/lit-html.js";
//import { getHome } from "../api/data.js";////for home when its with if else ? :
//import { getUserData } from "../utility.js";//logged or not info

//Just copy/paste the original here
//fix href="#" if exists one
const homeTemplate = html` 
<!--TODO-->
<section id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img class="hero" src="/images/car-png.webp" alt="carIntro">
                <h2>To see all the listings click the link below:</h2>
                <div>
                    <a href="/dashboard" class="button">Listings</a>
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
// export async function homePage(ctx) {
// 	const items = await getHome();
// 	ctx.render(homeTemplate(items));
//   }//for home when its with if else ? :