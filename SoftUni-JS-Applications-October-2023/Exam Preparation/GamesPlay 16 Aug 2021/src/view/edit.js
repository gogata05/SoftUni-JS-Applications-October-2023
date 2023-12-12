import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";

const editTemplate = (item, onSubmit) => html`
<!--TO DO -->
<section id="edit-page" class="auth">
  <form id="edit" @submit=${onSubmit}>
    <div class="container">

      <h1>Edit Game</h1>
      <input type="text" id="title" name="title" placeholder="Title" value="${item.title}" />
      <input type="text" id="category" name="category" placeholder="Category" value="${item.category}" />
      <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="Max Level" value="${item.maxLevel}" />
      <input type="text" id="imageUrl" name="imageUrl" placeholder="Image URL" value="${item.imageUrl}" />
      <textarea name="summary" id="summary" placeholder="Summary">${item.summary}</textarea>
      <input class="btn submit" type="submit" value="Edit Game" />
	  
    </div>
  </form>
</section>
`;
//edit
//check if the html is the same
//1.1.add into the html: @submit=${onSubmit} and 
//1.2.add at every end: value=${item.shapeName}

const editTemplate2 = (item, onSubmit) => html`
<section id="edit">
		<h2>Edit Motorcycle</h2>
		<div class="form">
			<h2>Edit Motorcycle</h2>
			<form class="edit-form" @submit=${onSubmit}>
				<input
					type="text"
					name="model"
					id="model"
					placeholder="Model"
					.value=${item.model}
				/>
				<input
					type="text"
					name="imageUrl"
					id="moto-image"
					placeholder="Moto Image"
					.value=${item.imageUrl}
				/>

				<input
					type="number"
					name="year"
					id="year"
					placeholder="Year"
					.value=${item.year}
				/>
				<input
					type="number"
					name="mileage"
					id="mileage"
					placeholder="mileage"
					.value=${item.mileage}
				/>
				<input
					type="number"
					name="contact"
					id="contact"
					placeholder="contact"
					.value=${item.contact}
				/>
				<textarea
					id="about"
					name="about"
					placeholder="about"
					rows="10"
					cols="50"
					.value=${item.about}
				></textarea>
				<button type="submit">Edit Motorcycle</button>
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
    //fix names
    //copy shape here:
	//copy shape from create.js

    
	title: formData.get("title").trim(),
	category: formData.get("category").trim(),
	maxLevel: formData.get("maxLevel").trim(),
	imageUrl: formData.get("imageUrl").trim(),
	summary: formData.get("summary").trim(),
    };
    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }
    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);//dashboard
  }
}
