import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";

const editTemplate = (item, onSubmit) => html` 
<!--TO DO --> 
<section class="editPage">
    <form @submit=${onSubmit}>
      <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
          <label for="name" class="vhide">Album name</label>
          <input
            id="name"
            name="name"
            class="name"
            type="text"
            .value=${item.name}
          />

          <label for="imgUrl" class="vhide">Image Url</label>
          <input
            id="imgUrl"
            name="imgUrl"
            class="imgUrl"
            type="text"
            .value=${item.imgUrl}
          />

          <label for="price" class="vhide">Price</label>
          <input
            id="price"
            name="price"
            class="price"
            type="text"
            .value=${item.price}
          />

          <label for="releaseDate" class="vhide">Release date</label>
          <input
            id="releaseDate"
            name="releaseDate"
            class="releaseDate"
            type="text"
            .value=${item.releaseDate}
          />

          <label for="artist" class="vhide">Artist</label>
          <input
            id="artist"
            name="artist"
            class="artist"
            type="text"
            .value=${item.artist}
          />

          <label for="genre" class="vhide">Genre</label>
          <input
            id="genre"
            name="genre"
            class="genre"
            type="text"
            .value=${item.genre}
          />

          <label for="description" class="vhide">Description</label>
          <textarea
            name="description"
            .value=${item.description}
            class="description"
            rows="10"
            cols="10"
          ></textarea>

          <button class="edit-album" type="submit">Edit Album</button>
        </div>
      </fieldset>
    </form>
  </section>
`;
//edit
//check if the html is the same
//1.1.add into the html: @submit=${onSubmit} and
//1.2.add at every end: value=${item.shapeName}

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
    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }
    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
