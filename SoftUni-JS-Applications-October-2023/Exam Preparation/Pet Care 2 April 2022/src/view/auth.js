import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api/api.js";
//login
//add in </form>       @submit=${onSubmit}
//add in href="#":     href="/register"
//id,class,href,placeholder,type,name,value
const loginTemplate = (onSubmit) => html`
<!--TODO-->
 <!--Login Page-->
 <section id="loginPage">
            <form class="loginForm" @submit=${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>
`;
//example
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

	//if the login is "username" not "email"
  //Replace "email" with "username" down below only
	//copy shape here:
  //email,
 //password

    const email = formData.get("email");
    const password = formData.get("password");
	
    if (!password || !email) {
      return alert("All fields are required!");//notify
    }
    await login(email, password);
    event.target.reset();
    ctx.setUserNav();
    ctx.page.redirect("/");
  }
}
//register
//add in </form>       @submit=${onSubmit}
//add in href="#":     href="/login"
//id,class,href,placeholder,type,name,value
const registerTemplate = (onSubmit) => html`
<!--TODO-->
<!--Register Page-->
<section id="registerPage">
            <form class="registerForm" @submit=${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a  href="/login">here</a></span>
                </p>
            </form>
        </section>
`;
//example
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

	//if the register is "username" not "email"
    //Replace "email" with "username" down below only
	//copy shape here:


    const email = formData.get("email");//!
    const password = formData.get("password");//!
    const repeatPass = formData.get("repeatPassword");//!
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
