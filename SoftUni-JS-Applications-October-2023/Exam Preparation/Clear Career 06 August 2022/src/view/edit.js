import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//edit
//add in </form>                       @submit=${onSubmit}
//add in </input>                      .value="${item.name}"
//replace text with variables:         ${item.name}
////copy shape here:


const editTemplate = (item, onSubmit) => html`
<!--TO DO -->
<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value="${item.title}"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value="${item.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value="${item.category}"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                .value="${item.description}"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                .value="${item.requirements}"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value="${item.salary}"
              />

              <button type="submit">post</button>
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
    // title,
    // imageUrl, 
    // category, 
    // description, 
    // requirements, 
    // salary
    
    title: formData.get("title").trim(),
    imageUrl: formData.get("imageUrl").trim(),
    category: formData.get("category").trim(),
    description: formData.get("description").trim(),
    requirements: formData.get("requirements").trim(),
    salary: formData.get("salary").trim(),
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
