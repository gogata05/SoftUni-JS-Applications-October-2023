import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                value="${item.name}"
              />
              <input
              type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                value="${item.imageUrl}"
              />
              <textarea
              id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
              >${item.description}</textarea>
              
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
              >${item.nutrition}</textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
  const itemId = ctx.params.id;

  const item = await getItemById(itemId);
  ctx.render(editTemplate(item, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const editItem = {
      name: formData.get("name").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      description: formData.get("description").trim(),
      nutrition: formData.get("nutrition").trim(),
    };

    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editItemById(itemId, editItem);
    event.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
