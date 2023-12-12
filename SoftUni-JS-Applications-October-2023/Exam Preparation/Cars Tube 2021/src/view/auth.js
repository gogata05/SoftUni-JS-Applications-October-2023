import { html } from "../../node_modules/lit-html/lit-html.js";
import { login, register } from "../api/api.js";
//login
//add in </form>       @submit=${onSubmit}
//add in href="#":     href="/register"
//id,class,href,placeholder,type,name,value
const loginTemplate = (onSubmit) => html`
<!--TODO-->
<section id="login">
            <div class="container">
                <form @submit=${onSubmit} id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
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
    const username = formData.get("username");
    const password = formData.get("password");

    if (!password || !username) {
      return alert("All fields are required!");
    }
    await login(username, password);
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
<section id="register">
            <div class="container">
                <form @submit=${onSubmit} id="register-form">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>

                    <p>Username</p>
                    <input type="text" placeholder="Enter Username" name="username" required>

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>

                    <input type="submit" class="registerbtn" value="Register">
                </form>
                <div class="signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.
                    </p>
                </div>
            </div>
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
    const username = formData.get("username");//!
    const password = formData.get("password");//!
    const repeatPass = formData.get("repeatPass");//!

    if (!password || !username) {
      return alert("All fields are required!");
    } 
    else if (password != repeatPass) {
      return alert("Password don't match");
    }
    await register(username, password);
    event.target.reset();
    ctx.setUserNav();
    ctx.page.redirect("/");
  }
}
