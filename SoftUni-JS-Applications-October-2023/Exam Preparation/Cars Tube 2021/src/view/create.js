import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem} from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//login
//add in </form>       @submit=${onSubmit}
//the image placeholder needs to have "URL" at the end
//id,class,href,placeholder,type,name,onSubmit
const createTemplate = (onSubmit) => html`
<!--TODO-->
<!-- Create Listing Page -->
<section id="create-listing">
            <div class="container">
                <form id="create-form" @submit=${onSubmit}>
                    <h1>Create Car Listing</h1>
                    <p>Please fill in this form to create an listing.</p>
                    <hr>

                    <p>Car Brand</p>
                    <input type="text" placeholder="Enter Car Brand" name="brand">

                    <p>Car Model</p>
                    <input type="text" placeholder="Enter Car Model" name="model">

                    <p>Description</p>
                    <input type="text" placeholder="Enter Description" name="description">

                    <p>Car Year</p>
                    <input type="number" placeholder="Enter Car Year" name="year">

                    <p>Car Image</p>
                    <input type="text" placeholder="Enter Car Image" name="imageUrl">

                    <p>Car Price</p>
                    <input type="number" placeholder="Enter Car Price" name="price">

                    <hr>
                    <input type="submit" class="registerbtn" value="Create Listing">
                </form>
            </div>
        </section>
`;
//example
const createTemplate2 = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onSubmit}>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`;
export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));
   
    async function onSubmit(event) {
      event.preventDefault(
      );
      const formData = new FormData(event.target);
      const objectName = {
        //fix names
        //copy shape here:
        //brand,
        //model,
        //description,
        //year,
        //imageUrl,
        //price

        brand: formData.get("brand").trim(),
        model: formData.get("model").trim(),
        description: formData.get("description").trim(),
        year: Number(formData.get("year").trim()), 
        imageUrl: formData.get("imageUrl").trim(),
        price: Number(formData.get("price").trim()),
      };
      if (Object.values(objectName).some((x) => !x)) {
        return alert("All fields are required!");
      }
      console.log(objectName);
      await addItem(objectName);
      event.target.reset();
      ctx.page.redirect("/dashboard");//"/"
    }
  }
