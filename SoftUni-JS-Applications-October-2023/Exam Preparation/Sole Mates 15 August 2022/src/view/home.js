import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTemplate = html` 
<!--TODO-->
<section id="home">
      <h1>Welcome to Sole Mates</h1>
      <img src="./images/home.jpg" alt="home" />
      <h2>Browse through the shoe collectibles of our users</h2>
      <h3>Add or manage your items</h3>
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
