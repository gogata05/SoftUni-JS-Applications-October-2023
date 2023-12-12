import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api/api.js";

const loginTemplate = (onSubmit) => html`
<!--TODO-->
<section id="loginPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Login</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" 
                    class="email" 
                    name="email" 
                    type="text" 
                    placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" 
                    class="password" 
                    name="password" 
                    type="password" 
                    placeholder="Password">

                    <button type="submit" class="login">Login</button>

                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

//login
//check if the html is the same
//add into the html: @submit=${onSubmit} and replace href="#" with href="/register"
const loginTemplate2 = (onSubmit) => html` 
<section id="login">
	<div class="form">
		<h2>Login</h2>
		<form class="login-form" @submit=${onSubmit}>
			<input type="text" name="email" id="email" placeholder="email" />
			<input
				type="password"
				name="password"
				id="password"
				placeholder="password"
			/>
			<button type="submit">login</button>
			<p class="message">
				Not registered? <a href="/register">Create an account</a>
			</p>
		</form>
	</div>
</section>`;

export async function loginPage(ctx) {
  ctx.render(loginTemplate(onSubmit));
  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!password || !email) {
      return alert("All fields are required!");
    }
    await login(email, password);
    event.target.reset();
    ctx.setUserNav();
    ctx.page.redirect("/");
  }
}

const registerTemplate = (onSubmit) => html`
<!--TODO-->
<section id="registerPage">
            <form @submit=${onSubmit}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="/login">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
`;

//register
//check if the html is the same
//add into the html: @submit=${onSubmit} and replace href="#" with href="/login"
//if the html doesn't match remove it,paste the original and fix it with gpt
const registerTemplate2 = (onSubmit) => html`
	<section id="register">
		<div class="form">
			<h2>Register</h2>
			<form class="register-form" @submit=${onSubmit}>
				<input
					type="text"
					name="email"
					id="register-email"
					placeholder="email"
				/>
				<input
					type="password"
					name="password"
					id="register-password"
					placeholder="password"
				/>
				<input
					type="password"
					name="re-password"
					id="repeat-password"
					placeholder="repeat password"
				/>
				<button type="submit">register</button>
				<p class="message">Already registered? <a href="/login">Login</a></p>
			</form>
		</div>
	</section>
`;
//Check if all:email,password,re-password are the same
export async function registerPage(ctx) {
  ctx.render(registerTemplate(onSubmit));
  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPass = formData.get("conf-pass");//re-password
    if (!password || !email) {
      return alert("All fields are required!");
    } else if (password != repeatPass) {
      return alert("Password don't match");
    }
    await register(email, password);
    event.target.reset();
    ctx.setUserNav();
    ctx.page.redirect("/");
  }
}
