import { html } from "../../node_modules/lit-html/lit-html.js";
import { editItemById, getItemById } from "../api/data.js";
//import { getUserData } from "../utility.js";//logged or not info

const editTemplate = (item, onSubmit) => html`
  <!--TO DO -->
  <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
          value="${item.singer}"
        />
        <input
          type="text"
          name="album"
          id="album-album"
          placeholder="Album"
          value="${item.album}"
        />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
          value="${item.imageUrl}"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
          value="${item.release}"
        />
        <input
          type="text"
          name="label"
          id="album-label"
          placeholder="Label"
          value="${item.label}"
        />
        <input
          type="text"
          name="sales"
          id="album-sales"
          placeholder="Sales"
          value="${item.sales}"
        />
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

//edit
//.value,item,id,class,href,type,name,id,placeholder,@submit=${onSubmit}
//copy shape here:

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
      //copy shape from create.js

      singer: formData.get("singer").trim(),
      album: formData.get("album").trim(),
      imageUrl: formData.get("imageUrl").trim(),
      release: formData.get("release").trim(),
      label: formData.get("label").trim(),
      sales: formData.get("sales").trim(),
    };
    if (Object.values(editItem).some((x) => !x)) {
      return alert("All fields are required!");
    }
    await editItemById(itemId, editItem);
    item.target.reset();
    ctx.page.redirect(`/details/${itemId}`);
  }
}
