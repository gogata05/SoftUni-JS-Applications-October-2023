import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//login
//add in </form>       @submit=${onSubmit}
//the image placeholder needs to have "URL" at the end
//id,class,href,placeholder,type,name,onSubmit
//copy shape here:
// name,
// imageUrl, 
// category, 
// description, 
// price

const createTemplate = (onSubmit) => html`
<!--TODO-->
<!-- Create Page (Only for logged-in users) -->
<section id="create">
          <div class="form">
            <h2>Add Product</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="product-image"
                placeholder="Product Image"
              />
              <input
                type="text"
                name="category"
                id="product-category"
                placeholder="Category"
              />
              <textarea
                id="product-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
                type="text"
                name="price"
                id="product-price"
                placeholder="Price"
              />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;
//example
const createTemplate2 = (onSubmit) => html`
<section id="create">
          <div class="form"  @submit=${onSubmit}>
            <h2>Add Fruit</h2>
            <form class="create-form">
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
        //fix properties
        //copy shape here:
        // name,
        // imageUrl, 
        // category, 
        // description, 
        // price
        
        name: formData.get("name").trim(),
        imageUrl: formData.get("imageUrl").trim(),
        category: formData.get("category").trim(),
        description: formData.get("description").trim(),
        price: formData.get("price").trim(),//number?
      //year: Number(formData.get("year").trim()),//if create makes correct API call test falls
      };
      if (Object.values(objectName).some((x) => !x)) {
        return alert("All fields are required!");
      }
      await addItem(objectName);
      event.target.reset();
      ctx.page.redirect("/dashboard");//"/"
    }
  }
