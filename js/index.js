import { mainUrl } from "./components/api.js";
import createMenu from "./components/createmenu.js";
import { hamburgerMenu } from "./components/hamburgermenu.js";

const productsUrl = mainUrl + "/products";

createMenu();

let strapiUrlImage = mainUrl;

(async function () {
  const container = document.querySelector(".container-featured");

  try {
    const response = await fetch(productsUrl);
    const json = await response.json();

    container.innerHTML = "";

    json.forEach(function (shoe) {
      let shoeImage = shoe.image_url;
      if (shoe.image_url === null || shoe.image_url.length === 0) {
        shoeImage = strapiUrlImage + shoe.image.url;
      }
      if (shoe.featured === true) {
        //console.log(shoe.image.url);
        console.log(shoe.image_url || shoe.image.url);

        container.innerHTML += `<a class="shoes" href="productdetails.html?id=${shoe.id}">
                                    <div class="container-shoe">
                                        <div class="shoes-img">
                                            <img src="${shoeImage}" class="productimage-home" alt="image of the product ${shoe.title}" />
                                        </div>    
                                        <div class="featured-info"> 
                                            <h2>${shoe.title}</h2>
                                            <p>you get it for ${shoe.price},-</p>
                                        </div>
                                    </div>
                                </a>`;
      }
    });
  } catch (error) {
    console.log(error);
  }
})();

hamburgerMenu();
