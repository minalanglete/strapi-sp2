import { renderShoes } from "./rendershoes.js";

export function searchShoes(shoes) {
  const search = document.querySelector(".search");

  search.onkeyup = function (event) {
    //console.log(event);

    const searchValue = event.target.value.trim().toLowerCase();

    const filteredShoes = shoes.filter(function (shoe) {
      if (
        shoe.description.toLowerCase().includes(searchValue) ||
        shoe.title.toLowerCase().includes(searchValue)
      ) {
        return true;
      }
    });

    renderShoes(filteredShoes);
  };
}
