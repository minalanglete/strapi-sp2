import { mainUrl } from "./api.js";

export function renderShoes(shoesToRender) {
  const container = document.querySelector(".container-products");

  container.innerHTML = "";

  shoesToRender.forEach(function (data) {
    let shoeImage = data.image_url;
    if (data.image_url === null || data.image_url.length === 0) {
      shoeImage = mainUrl + data.image.url;
    }

    container.innerHTML += `<a class="shoes" href="productdetails.html?id=${data.id}">
                              <div class="container-shoe">
                                <div class="shoe-image">
                                  <img class="productimage-products" src="${shoeImage}" alt="image of the product ${data.title}"/>
                                </div>
                                <h2>${data.title}</h2>
                                <p>${data.price},-</p>
                              </div>
                            </a>`;
  });
}
