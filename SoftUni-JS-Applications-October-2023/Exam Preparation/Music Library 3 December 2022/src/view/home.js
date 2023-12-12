import { html } from "../../node_modules/lit-html/lit-html.js";
//import { getHome } from "../api/data.js";////for home when its with if else ? :
//import { getUserData } from "../utility.js";//logged or not info

const homeTemplate = html` 
<!--TODO-->
<section id="home">
    <img src="./images/landing.png" alt="home" />
    <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right here!</span></h2>
</section>
`;

//Just copy/paste the original here
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