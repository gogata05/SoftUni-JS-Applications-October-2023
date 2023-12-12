import { html } from "../../node_modules/lit-html/lit-html.js";
import { addItem } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <!--TODO-->

  <section class="createPage">
    <form @submit=${onSubmit}>
      <fieldset>
        <legend>Add Album</legend>

        <div class="container">
          <label for="name" class="vhide">Album name</label>
          <input
            id="name"
            name="name"
            class="name"
            type="text"
            placeholder="Album name"
          />

          <label for="imgUrl" class="vhide">Image Url</label>
          <input
            id="imgUrl"
            name="imgUrl"
            class="imgUrl"
            type="text"
            placeholder="Image Url"
          />

          <label for="price" class="vhide">Price</label>
          <input
            id="price"
            name="price"
            class="price"
            type="text"
            placeholder="Price"
          />

          <label for="releaseDate" class="vhide">Release date</label>
          <input
            id="releaseDate"
            name="releaseDate"
            class="releaseDate"
            type="text"
            placeholder="Release date"
          />

          <label for="artist" class="vhide">Artist</label>
          <input
            id="artist"
            name="artist"
            class="artist"
            type="text"
            placeholder="Artist"
          />

          <label for="genre" class="vhide">Genre</label>
          <input
            id="genre"
            name="genre"
            class="genre"
            type="text"
            placeholder="Genre"
          />

          <label for="description" class="vhide">Description</label>
          <textarea
            name="description"
            class="description"
            placeholder="Description"
          ></textarea>

          <button class="add-album" type="submit">Add New Album</button>
        </div>
      </fieldset>
    </form>
  </section>
`;
//login
//check if the html is the same
//1.1.add into the html: @submit=${onSubmit} and change:
//1.2.placeholder="Fruit Image" to
//1.3.placeholder="Fruit Image URL"
//if the html doesn't match remove it,paste the original and fix it with gpt
const createTemplate2 = (onSubmit) => html`
  <section id="create">
    <div class="form" @submit=${onSubmit}>
      <h2>Add Fruit</h2>
      <form class="create-form">
        <input type="text" name="name" id="name" placeholder="Fruit Name" />
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
  //export function addPage(ctx) {
  //render(createTemplate(ctx), document.querySelector('main'));}
  //async function onSubmit(event, ctx) {
  //event.preventDefault();
  //const formData = new FormData(event.target);

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const objectName = {
      //fix names
      //copy shape here:
      // name,
      // imgUrl,
      // price,
      // releaseDate,
      // artist,
      // genre,
      // description

      name: formData.get("name").trim(),
      imgUrl: formData.get("imgUrl").trim(),
      price: formData.get("price").trim(),
      releaseDate: formData.get("releaseDate").trim(),
      artist: formData.get("artist").trim(),
      genre: formData.get("genre").trim(),
      description: formData.get("description").trim(),
    };
    if (Object.values(objectName).some((x) => !x)) {
      return alert("All fields are required!");
    }
    await addItem(objectName);
    event.target.reset();
    ctx.page.redirect("/dashboard"); //"/"
  }
}
