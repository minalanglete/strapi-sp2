import { getCartProducts } from "./ui/cartFuction.js";
import createMenu from "./components/createmenu.js";
//import { mainUrl } from "./components/api.js";
import { hamburgerMenu } from "./components/hamburgermenu.js";

createMenu();
hamburgerMenu();

const cart = getCartProducts();

const containerCart = document.querySelector(".container-cart");
const containerCartSum = document.querySelector(".sumcart");
const containerCartButton = document.querySelector(".remove-products");

if (cart.length === 0) {
  containerCart.innerHTML = `<div class="emptymessage">You have no item in your cart</div>
  <hr />`;
}
if (cart.length === 0) {
  containerCartButton.style.display = "none";
}

cart.forEach((shoe) => {
  containerCart.innerHTML += `<div class="container-shoes">
                                    <img class="productimage-productcart" src="${shoe.img}" alt="image of the product ${shoe.title}"/>
                                    <a class="shoes" href="productdetails.html?id=${shoe.id}">
                                    <h2>${shoe.title}</h2></a>
                                    <p class="price">${shoe.price},-</p>
                                </div>
                                <hr />`;
});

function clearCart() {
  const clearButton = document.querySelector(".remove-products");

  clearButton.addEventListener("click", clearProducts);

  function clearProducts() {
    if (confirm("Do you want to remove all item in your cart?")) {
      localStorage.removeItem("product");

      containerCart.innerHTML = `<div class="emptymessage">You have no item in your cart</div>
                                    <hr />`;

      containerCartSum.innerHTML = `<div class="container-total">
                                        <div class="Total">Total price in cart:</div> 
                                        <div class="sum">0,- </div>
                                    </div>`;
      containerCartButton.style.display = "none";
    }
  }
}

clearCart();

//console.log(cart);

const sumPrice = cart
  .map((item) => parseFloat(item.price))
  .reduce((prev, curr) => prev + curr, 0);
console.log(sumPrice);

containerCartSum.innerHTML = `<div class="container-total">
                                    <div class="Total">Total price in cart:</div> 
                                    <div class="sum">${sumPrice},-</div>
                                </div>`;
