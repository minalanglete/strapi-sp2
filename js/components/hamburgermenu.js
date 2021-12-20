export function hamburgerMenu() {
  const hamburgermenu = document.querySelector(".hamburgermenu");
  const nav = document.querySelector(".nav");

  hamburgermenu.onclick = function () {
    if (nav.style.display === "block") {
      nav.style.display = "none";
    } else {
      nav.style.display = "block";
    }
  };
}
