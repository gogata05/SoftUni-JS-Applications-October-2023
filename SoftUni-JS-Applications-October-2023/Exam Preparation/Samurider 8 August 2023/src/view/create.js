import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";

const createTemplate = (onSubmit) => html`
<!--TODO-->
<section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form" >
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
            </form>
          </div>
        </section>
`;
//create
//check if the html is the same
//1.1.add into the html: @submit=${onSubmit} and change:
//1.2.placeholder="Fruit Image" to
//1.3.placeholder="Fruit Image URL"
//if the html doesn't match remove it,paste the original and fix it with gpt
const createTemplate2 = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onSubmit}>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`;
export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));
    //export function addPage(ctx) {
    //render(createTemplate(ctx), document.querySelector('main'));}
    //async function onSubmit(event, ctx) {
    //event.preventDefault();
    //const formData = new FormData(event.target);

    async function onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const objectName = {
        //fix names
        //copy shape here:

        model: formData.get("model").trim(),
        imageUrl: formData.get("imageUrl").trim(),
        year: formData.get("year").trim(),
        mileage: formData.get("mileage").trim(),
        contact: formData.get("contact").trim(),
        about: formData.get("about").trim(),
      };
      if (Object.values(objectName).some((x) => !x)) {
        return alert("All fields are required!");
      }
      await addItem(objectName);
      event.target.reset();
      ctx.page.redirect("/dashboard");//"/"
    }
  }
