import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";

const editTemplate = (item, onSubmit) => html`
<section id="edit">
  <div class="form">
  <h2>Edit Fact</h2>
  <form class="edit-form" @submit=${onSubmit} >


    <input
     type="text"
     name="category"
     id="category"
     placeholder="Category"
     value="${item.category}"
    />
    <input
    type="text"
    name="image-url"
    id="image-url"
    placeholder="Image URL"
      value="${item.imageUrl}"
    />

    <textarea
    id="description"
    name="description"
    placeholder="Description"
    rows="10"
    cols="50"
    >${item.description}</textarea>  

    <textarea
    id="additional-info"
    name="additional-info"
    placeholder="Additional Info"
    rows="10"
    cols="50"
    >${item.moreInfo}</textarea> 

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
      category: formData.get("category").trim(),
      imageUrl: formData.get("image-url").trim(),
      description: formData.get("description").trim(),
      moreInfo: formData.get("additional-info").trim(),
    };

    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
