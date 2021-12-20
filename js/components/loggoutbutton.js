import { clearStorageUsername } from "../utils/storage.js";

export default function logoutButton() {
  const button = document.querySelector(".logout-button");

  if (button) {
    button.onclick = function () {
      const doLogout = confirm("Do yo want to logg out?");

      if (doLogout) {
        clearStorageUsername();
        location.href = "index.html";
      }
    };
  }
}
