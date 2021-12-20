import { mainUrl } from "./components/api.js";
import { searchShoes } from "./components/searchproducts.js";
import { renderShoes } from "./components/rendershoes.js";
import createMenu from "./components/createmenu.js";
import { hamburgerMenu } from "./components/hamburgermenu.js";

const productsUrl = mainUrl + "/products";

createMenu();
hamburgerMenu();

async function getProducts() {
  try {
    const response = await fetch(productsUrl);
    const shoes = await response.json();

    //console.log(shoes);

    renderShoes(shoes);
    searchShoes(shoes);
  } catch (error) {
    console.log(error);
  }
}

getProducts();
