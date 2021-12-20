import { getUsername } from "../utils/storage.js";
import logoutButton from "./loggoutbutton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const container = document.querySelector(".conatiner-menu");

  const username = getUsername();

  console.log(username);

  let authLink = `<a href="login.html" class="topnav ${
    pathname === "/login.html" ? "active" : ""
  }"><i class="fas fa-user-cog"></i>Log in</a>`;

  if (username) {
    authLink = `<a href="admin.html" class="topnav ${
      pathname === "/admin.html"
        ? "active"
        : "" || pathname === "/editproduct.html"
        ? "active"
        : ""
    }"><i class="fas fa-user-cog"></i>${username}</a> 
      <button class="logout-button"> log out </button>`;
  }

  container.innerHTML = `
    <nav class="nav">
      <a href="cart.html"><div class="topnav ${
        pathname === "/cart.html" ? "active" : ""
      }">
        <i class="fas fa-shopping-cart"></i>Cart</div></a>
        ${authLink}
    </nav>`;

  logoutButton();
}
