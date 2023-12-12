import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";

const editTemplate = (item, onSubmit) => html`
<!--TO DO -->
<section id="edit">
      <div class="form">
        <h2>Edit item</h2>
        <form class="edit-form" @submit=${onSubmit}>
          <input
            type="text"
            name="brand"
            id="shoe-brand"
            placeholder="Brand"
            value=${item.brand}
          />
          <input
            type="text"
            name="model"
            id="shoe-model"
            placeholder="Model"
            value=${item.model}
          />
          <input
            type="text"
            name="imageUrl"
            id="shoe-img"
            placeholder="Image url"
            value=${item.imageUrl}
          />
          <input
            type="text"
            name="release"
            id="shoe-release"
            placeholder="Release date"
            value=${item.release}
          />
          <input
            type="text"
            name="designer"
            id="shoe-designer"
            placeholder="Designer"
            value=${item.designer}
          />
          <input
            type="text"
            name="value"
            id="shoe-value"
            placeholder="Value"
            value=${item.value}
          />

          <button type="submit">post</button>
        </form>
      </div>
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
  //ctx.render(editTemplate({ submit: onSubmit, data: offer }));
  //render(editTemplate(shoe, ctx), document.querySelector('main'));}
  //async function onSubmit(event, ctx) {
  //event.preventDefault();
  //const id = ctx.params.id;
  //const formData = new FormData(event.target);

  async function onSubmit(item) {
    item.preventDefault();
    const formData = new FormData(item.target);
    const editItem = {
    //fix names
    //copy shape here:

    
    brand: formData.get('brand').trim(),
    model: formData.get('model').trim(),
    imageUrl: formData.get('imageUrl').trim(),
    release: formData.get('release').trim(),
    designer: formData.get('designer').trim(),
    value: formData.get('value').trim(),
    };
    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }
    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
