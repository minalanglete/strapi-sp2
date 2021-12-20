import { getCartProducts } from "./cartFuction.js";

export default function handleClick(event) {
  console.log(event);

  const id = event.target.dataset.id;
  const name = event.target.dataset.title;
  const price = event.target.dataset.price;
  const image = event.target.dataset.img;

  console.log(id, name, price, image);

  const currentCart = getCartProducts();
  console.log(currentCart);

  const productExists = currentCart.find(function (cartItem) {
    return cartItem.id === id;
  });

  if (productExists === undefined) {
    const item = { id: id, title: name, price: price, img: image };
    currentCart.push(item);
    saveCart(currentCart);
  } else {
    const newCart = currentCart.filter((cartItem) => cartItem.id !== id);
    saveCart(newCart);
  }
}

function saveCart(cartItems) {
  localStorage.setItem("product", JSON.stringify(cartItems));
}
