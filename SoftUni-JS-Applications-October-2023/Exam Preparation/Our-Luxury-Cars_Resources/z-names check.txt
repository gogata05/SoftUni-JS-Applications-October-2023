to check name="name" is the same as the shape
 
 <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value="${item.singer}" />
            <input type="text" name="album" id="album-album" placeholder="Album" .value="${item.album}"/>
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value="${item.imageUrl}" />
            <input type="text" name="release" id="album-release" placeholder="Release date" .value="${item.release}" />
            <input type="text" name="label" id="album-label" placeholder="Label" .value="${item.label}" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value="${item.sales}"/>

            <button type="submit">post</button>
          </form>
        </div>
      </section>