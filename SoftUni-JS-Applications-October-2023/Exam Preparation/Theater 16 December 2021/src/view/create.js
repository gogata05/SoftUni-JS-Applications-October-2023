import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

//login
//add in </form>       @submit=${onSubmit}
//the image placeholder needs to have "URL" at the end
//id,class,href,placeholder,type,name,onSubmit
const createTemplate = (onSubmit) => html`
<!--TODO-->
<!--Create Page-->
<section id="createPage">
            <form class="create-form" @submit=${onSubmit}>
                <h1>Create Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" value=""><!--?-->
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year">
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author">
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description"></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
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
        // title,
        // date,
        // author,
        // imageUrl
        // description

        title: formData.get("title").trim(),
        date: formData.get("date").trim(),
        author: formData.get("author").trim(),
        imageUrl: formData.get("imageUrl").trim(),
        description: formData.get("description").trim(),
      //year: Number(formData.get("year").trim()),//if create makes correct API call test falls
      };
      if (Object.values(objectName).some((x) => !x)) {
        return alert("All fields are required!");
      }
      await addItem(objectName);
      event.target.reset();
      ctx.page.redirect("/");//"/"
    }
  }
