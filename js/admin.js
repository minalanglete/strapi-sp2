import message from "./components/message.js";
import { getToken } from "./utils/storage.js";
import { mainUrl } from "./components/api.js";
import createMenu from "./components/createmenu.js";
import { hamburgerMenu } from "./components/hamburgermenu.js";

createMenu();
hamburgerMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image_url = document.querySelector("#image");
const containerMessage = document.querySelector(".container-message");
const featured = document.querySelector("#featured");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  //event.preventDefault();

  containerMessage.innerHTML = "";

  const tiltleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const imageValue = image_url.value.trim();
  const featuredValue = featured.checked;

  if (
    tiltleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0 ||
    imageValue.length === 0
  ) {
    return message("warning", "apply proper values", ".container-message");
  }

  addProduct(
    tiltleValue,
    priceValue,
    descriptionValue,
    imageValue,
    featuredValue
  );
}

async function addProduct(title, price, description, image_url, featured) {
  const url = mainUrl + "/products";

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: image_url,
    featured: featured,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      message("success", "product created", ".container-message");
    }
    if (json.error) {
      message("error", json.message, ".container-message");
    }
    console.log(json);
  } catch (error) {
    console.log(error);
    message("error", "an error has occured", ".container-message");
  }
}

const productsUrl = mainUrl + "/products";

async function productToUpdate() {
  const containerUpdate = document.querySelector(".container-producttoupdate");

  containerUpdate.innerHTML = "";

  const response = await fetch(productsUrl);
  const product = await response.json();

  product.forEach(function (data) {
    let shoeImage = data.image_url;
    if (data.image_url === null || data.image_url.length === 0) {
      shoeImage = mainUrl + data.image.url;
    }

    containerUpdate.innerHTML += `<a class="shoes" href="editproduct.html?id=${data.id}">
                                    <div class="container-shoe">
                                      <img class="productimage-update" src="${shoeImage}" alt="image of the product ${data.title}"/> 
                                      <h3>${data.title}</h3>
                                    </div>  
                                  </a>
                                  <hr />`;
  });
}
productToUpdate();
