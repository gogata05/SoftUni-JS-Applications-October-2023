import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById  } from "../api/data.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit">
  <div class="form">
  <h2>Edit Event</h2>
  <form class="edit-form" @submit=${onSubmit} >
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Event"
      value="${item.name}"
    />
    <input
      type="text"
      name="imageUrl"
      id="event-image"
      placeholder="Event Image"
      value="${item.imageUrl}"
    />
    <input
      type="text"
      name="category"
      id="event-category"
      placeholder="Category"
      value="${item.category}"
    />


    <textarea
      id="event-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    >${item.description}</textarea>
    
    <input
    type="text"
    name="date"
    id="date"
    placeholder="When?"
    value="${item.date}"
  />

    <button type="submit">Edit</button>
  </form>
  </div>
</section>
`;



export async function editPage(ctx) {
  const itemId = ctx.params.id;

  const item = await getItemById(itemId);
  ctx.render(editTemplate(item, onSubmit));

  async function onSubmit(item) {
    item.preventDefault();
    const formData = new FormData(item.target);

    const editItem = {
      name: formData.get("name").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      category: formData.get("category").trim(),
      description: formData.get("description").trim(),
      date: formData.get("date").trim(),
    };

    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
