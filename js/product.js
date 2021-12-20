import { mainUrl } from "./components/api.js";
import handleClick from "./ui/addtocart.js";
import createMenu from "./components/createmenu.js";
import { hamburgerMenu } from "./components/hamburgermenu.js";

createMenu();
hamburgerMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

let strapiUrlImage = mainUrl;

if (!id) {
  document.location.href = "/";
}

const productUrl = mainUrl + "/products/" + id;

console.log(productUrl);

async function getProduct() {
  try {
    const response = await fetch(productUrl);
    const product = await response.json();

    document.title = product.title;

    const container = document.querySelector(".container-product");

    let shoeImage = product.image_url;
    if (product.image_url === null || product.image_url.length === 0) {
      shoeImage = strapiUrlImage + product.image.url;
    }

    container.innerHTML = `<div class="product">
                              <div class="breadcrumb product"><a href="index.html">Home</a> / <a href="products.html">Products</a> / <a href="productdetails.html?id=${product.id}">${product.title}</a></div>
                              <img class="productimage-product" src="${shoeImage}" alt="image of the product ${product.title}"/>
                              <h1 class="product-title">${product.title}</h1>
                              <h2>Description</h2>
                              <hr />
                              <p>${product.description}</p>
                              <hr />
                              <p class="price-product">${product.price},-</p>
                              <div class="add-button">
                                <button class="add-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${shoeImage}">add to cart</button>
                              </div> 
                            </div>`;
  } catch (error) {
    console.log(error);
  }
  const addToCartButton = document.querySelectorAll(".add-button");

  console.log(addToCartButton);

  addToCartButton.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
}

getProduct();
