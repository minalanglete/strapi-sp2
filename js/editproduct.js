import message from "./components/message.js";
import { getToken } from "./utils/storage.js";
import { mainUrl } from "./components/api.js";
import createMenu from "./components/createmenu.js";
import deleteButton from "./components/deletebutton.js";
import { hamburgerMenu } from "./components/hamburgermenu.js";

createMenu();
hamburgerMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location = "index.html";
}

const productUrl = mainUrl + "/products/" + id;

const form = document.querySelector(".edit-form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image_url = document.querySelector("#image");
const idInput = document.querySelector("#id");
const featured = document.querySelector("#featured");
const containerMessage = document.querySelector(".container-message");
const featuredTrue = document.querySelector(".checkbox");

//console.log(featured);

(async function () {
  try {
    const response = await fetch(productUrl);
    const shoe = await response.json();

    let shoeImage = shoe.image_url;
    if (shoe.image_url === null || shoe.image_url.length === 0) {
      shoeImage = mainUrl + shoe.image.url;
    }

    title.value = shoe.title;
    price.value = shoe.price;
    description.value = shoe.description;
    image_url.value = shoeImage;
    idInput.value = shoe.id;
    featured.value = shoe.featured;

    console.log(featured.value);

    if (featured.value === "true") {
      featuredTrue.innerHTML = `
            <label for="featured"
              >Featured
              <input type="checkbox" id="featured" value="featured" checked />
            </label>`;
    }

    deleteButton(shoe.id);

    console.log(shoe);
  } catch (error) {
    console.log(error);
  } finally {
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  containerMessage.innerHTML = "";

  const tiltleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const imageValue = image_url.value.trim();
  const idValue = idInput.value;
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

  updateProduct(
    tiltleValue,
    priceValue,
    descriptionValue,
    imageValue,
    idValue,
    featuredValue
  );
}

async function updateProduct(
  title,
  price,
  description,
  image_url,
  id,
  featured
) {
  const url = mainUrl + "/products/" + id;
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: image_url,
    featured: featured,
  });

  const token = getToken();

  const options = {
    method: "PuT",
    body: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.updated_at) {
      message("success", "product updated", ".container-message");
    }
    if (json.error) {
      message("error", json.message, ".container-message");
    }
  } catch (error) {
    console.log(error);
    message("error", "an error has occured", ".container-message");
  }
}
