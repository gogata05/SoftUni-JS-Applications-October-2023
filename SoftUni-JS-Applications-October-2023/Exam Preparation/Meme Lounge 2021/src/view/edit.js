import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";
import { notify } from "../notify.js";
//import { getUserData } from "../utility.js";//logged or not info

//edit
//add in </form>                       @submit=${onSubmit}
//add in </input>                      .value="${item.name}"
//replace text with variables:         ${item.name}
////copy shape here:
// edit:
//   title,
//   description,
//   imageUrl


const editTemplate = (item, onSubmit) => html`
<!--TO DO -->
 <!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
 <section id="edit-meme">
            <form id="edit-form" @submit=${onSubmit}>
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title"  .value="${item.title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description">${item.description}</textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl"  .value="${item.imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme"  value="Edit Meme">
                </div>
            </form>
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
      //fix properties
      //copy shape here:
      //copy shape from create.js
      //   title,
      //   description,
      //   imageUrl

      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      imageUrl: formData.get("imageUrl").trim(),
    };
    if (Object.values(editItem).some((x) => !x)) {
      return notify("All fields are required!");
    }
    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
