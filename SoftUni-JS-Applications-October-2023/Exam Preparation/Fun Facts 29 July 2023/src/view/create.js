import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";

const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit=${onSubmit}>
            <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(item) {
    item.preventDefault();
    const formData = new FormData(item.target);

    const newItem = {
      category: formData.get("category").trim(),
      imageUrl: formData.get("image-url").trim(),
      description: formData.get("description").trim(),
      moreInfo: formData.get("additional-info").trim(),
    };

    if (Object.values(newItem).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addItem(newItem);
    item.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
