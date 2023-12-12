import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api/api.js";

const loginTemplate = (onSubmit) => html`
<!--TODO-->
<section id="login-page" class="login">
    <form @submit=${onSubmit} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>
`;

//login
//check if the html is the same
//add into the html: @submit=${onSubmit} and replace href="#" with href="/register"
//id,class,href,placeholder,type,name,value
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
<section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

//register
//check if the html is the same
//add into the html: @submit=${onSubmit} and replace href="#" with href="/login"
//id,class,href,placeholder,type,name,value
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
    const repeatPass = formData.get("confirm-pass");//
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
