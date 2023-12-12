import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
import { getUserData } from "../utility.js";//logged or not info
import { notify } from "../notify.js";

//isLoggedIn?

//login
//add in </form>       @submit=${onSubmit}
//the image placeholder needs to have "URL" at the end
//id,class,href,placeholder,type,name,onSubmit
const createTemplate = (onSubmit, isLoggedIn) => html`
<!--TODO-->
   <!-- Create Meme Page ( Only for logged users ) -->
   <section id="create-meme">
               <form id="create-form" @submit=${onSubmit}>
                   <div class="container">
                       <h1>Create Meme</h1>
                       <label for="title">Title</label>
                       <input id="title" type="text" placeholder="Enter Title" name="title">
                       <label for="description">Description</label>
                       <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                       <label for="imageUrl">Meme Image</label>
                       <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                       <input type="submit" class="registerbtn button" value="Create Meme">
                   </div>
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
        //title,
        //description,
        //imageUrl


        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        imageUrl: formData.get("imageUrl").trim(),
      //year: Number(formData.get("year").trim()),//if create makes correct API call test falls
      };
      if (Object.values(objectName).some((x) => !x)) {
        return notify("All fields are required!");
      }
      await addItem(objectName);
      event.target.reset();
      ctx.page.redirect("/dashboard");//"/"
    }
  }
