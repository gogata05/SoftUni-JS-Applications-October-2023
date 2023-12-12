import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";

const createTemplate = (onSubmit) => html`
<!--TODO-->
<section id="create-page" class="auth">
    <form id="create" @submit=${onSubmit}>
      <div class="container">

        <h1>Create Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter game title..."
        />

        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter game category..."
        />

        <label for="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min="1"
          placeholder="1"
        />

        <label for="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Upload a photo..."
        />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary"></textarea>
        <input class="btn submit" type="submit" value="Create Game" />
      </div>
    </form>
  </section>
`;
//login
//check if the html is the same
//1.1.add into the html: @submit=${onSubmit} and change:
//1.2.placeholder="Fruit Image" to
//1.3.placeholder="Fruit Image URL"

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
    //async function onSubmit(event, ctx) {
    //event.preventDefault();
    //const formData = new FormData(event.target);

    async function onSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const objectName = {
        //fix names
        //copy shape here:

      title: formData.get("title").trim(),
      category: formData.get("category").trim(),
      maxLevel: formData.get("maxLevel").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      summary: formData.get("summary").trim(),
      };
      if (Object.values(objectName).some((x) => !x)) {
        return alert("All fields are required!");
      }
      await addItem(objectName);
      event.target.reset();
      ctx.page.redirect("/");//"/"
    }
  }

