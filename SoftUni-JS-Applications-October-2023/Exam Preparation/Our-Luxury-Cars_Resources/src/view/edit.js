import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//edit
//add in </form>                       @submit=${onSubmit}
//add in </input>                      placeholder="Name" (most of the time its already added)
//add in </input>                      .value="${item.name}"
//replace text with variables:         ${item.name}
////copy shape here:
// model,
// imageUrl, 
// price, 
// weight,
// speed,
// about


const editTemplate = (item, onSubmit) => html`
<!--TO DO -->
          <!-- Edit Page (Only for logged-in users) -->
          <section id="edit">
              <div class="form form-auto">
                <h2>Edit Your Car</h2>
                <form class="edit-form" @submit=${onSubmit}>
                  <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value="${item.model}"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="car-image"
                  placeholder="Your Car Image URL"
                  .value="${item.imageUrl}"
                />
                <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value="${item.price}"
              />
              <input
              type="number"
              name="weight"
              id="weight"
              placeholder="Weight in Kg"
              .value="${item.weight}"
            />
            <input
              type="text"
              name="speed"
              id="speed"
              placeholder="Top Speed in Kmh"
              .value="${item.speed}"
            />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                .value="${item.about}"
                rows="10"
                cols="50"
              ></textarea>
                  <button type="submit">Edit</button>
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
    //fix properties
    //copy shape here:
    // model,
    // imageUrl, 
    // price, 
    // weight,
    // speed,
    // about

    
    model: formData.get("model").trim(),
    imageUrl: formData.get("imageUrl").trim(),
    price: formData.get("price").trim(),
    weight: formData.get("weight").trim(),
    speed: formData.get("speed").trim(),
    about: formData.get("about").trim(),
    //shapeName: formData.get("name="name" ").trim(),// shape : name=""
	//year: Number(formData.get("year").trim()),//if edit makes correct API call test falls
    };
    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }
    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
