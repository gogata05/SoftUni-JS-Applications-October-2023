import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTemplate = html`
  <!--TODO-->
  <section id="welcomePage">
    <div id="welcome-message">
                   <h1>Welcome to</h1>
                   h1>My Music Application!</h1>
             </div>

    <div class="music-img">
      <img src="./images/musicIcons.webp" />
    </div>
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
export function homePage(ctx) {
    ctx.render(homeTemplate);
}
