import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//login
//add in </form>       @submit=${onSubmit}
//the image placeholder needs to have "URL" at the end
//id,class,href,placeholder,type,name,onSubmit
//copy shape here:
// model,
// imageUrl, 
// price, 
// weight,
// speed,
// about


const createTemplate = (onSubmit) => html`
<!--TODO-->
         <!-- Create Page (Only for logged-in users) -->
         <section id="create">
            <div class="form form-auto">
              <h2>Share Your Car</h2>
              <form class="create-form" @submit=${onSubmit}> <!--kuw toq space?-->
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="car-image"
                  placeholder="Your Car Image URL"
                />
                <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
              type="number"
              name="weight"
              id="weight"
              placeholder="Weight in Kg"
            />
            <input
              type="text"
              name="speed"
              id="speed"
              placeholder="Top Speed in Kmh"
            />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
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
