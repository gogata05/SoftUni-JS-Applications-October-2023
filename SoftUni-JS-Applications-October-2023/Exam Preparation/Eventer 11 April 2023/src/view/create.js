import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form" @submit=${onSubmit}>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
                />

              <button type="submit">Add</button>
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
      name: formData.get("name").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      category: formData.get("category").trim(),
      description: formData.get("description").trim(),
      date: formData.get("date").trim(),
    };

    if (Object.values(objectName).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addItem(objectName);
    event.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
