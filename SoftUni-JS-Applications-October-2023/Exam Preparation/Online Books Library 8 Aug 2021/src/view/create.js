import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";
import { getUserData } from "../utility.js";//logged or not info

const createTemplate = (onSubmit) => html`
<!--TODO-->
<section id="create-page" class="create">
            <form @submit=${onSubmit} id="create-form" action="" method="">
                <fieldset>
                    <legend>Add new Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" placeholder="Title">
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" placeholder="Image">
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type">
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Add Book">
                </fieldset>
            </form>
        </section>
`;
//login
//check if the html is the same
//1.1.add into the html: @submit=${onSubmit} and change:
//the image placeholder needs to have "URL" at the end
//id,class,href,placeholder,type,name,onSubmit

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
        //fix names
        //copy shape here:

        title: formData.get("title").trim(),
        description: formData.get("description").trim(),
        imageUrl: formData.get("imageUrl").trim(),
        type: formData.get("type").trim(),
      };
      if (Object.values(objectName).some((x) => !x)) {
        return alert("All fields are required!");
      }
      await addItem(objectName);

      event.target.reset();
      ctx.page.redirect("/");//"/"
    }
  }
