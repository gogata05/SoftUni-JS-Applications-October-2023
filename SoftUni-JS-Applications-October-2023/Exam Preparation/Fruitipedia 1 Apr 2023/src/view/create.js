import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
const createTemplate = (onSubmit) => html`
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

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const objectName = {
      //fix names
      //copy shape here:

      name: formData.get("name").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      description: formData.get("description").trim(),
      nutrition: formData.get("nutrition").trim(),
    };

    if (Object.values(objectName).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addItem(objectName);
    event.target.reset();
    ctx.page.redirect("/dashboard");//"/"
  }
}
