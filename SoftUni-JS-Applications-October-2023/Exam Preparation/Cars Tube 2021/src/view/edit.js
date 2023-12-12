import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//edit
//add in </form>                       @submit=${onSubmit}
//replace value="" with variables:    .value="${item.name}"
////copy shape here:
// brand,
// model,
// description,
// year,
// imageUrl,
// price


const editTemplate = (item, onSubmit) => html`
<!--TO DO -->
<!-- Edit Listing Page -->
<section id="edit-listing">
            <div class="container">

                <form id="edit-form" @submit=${onSubmit}>
                    <h1>Edit Car Listing</h1>
                    <p>Please fill in this form to edit an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand" .value="${item.brand}">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model" .value="${item.model}">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description" .value="${item.description}">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year" .value="${item.year}">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${item.imageUrl}">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price" .value="${item.price}">

                    <hr>
                    <input type="submit" class="registerbtn" value="Edit Listing">
                </form>
            </div>
        </section>
`;
//example
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
      //copy shape from create.js

      brand: formData.get("brand").trim(),
      model: formData.get("model").trim(),
      description: formData.get("description").trim(),
      year: Number(formData.get("year").trim()),
      imageUrl: formData.get("imageUrl").trim(),
      price: Number(formData.get("price").trim()),
    };
    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }
    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
