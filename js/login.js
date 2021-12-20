import message from "./components/message.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { mainUrl } from "./components/api.js";
import createMenu from "./components/createmenu.js";
import { hamburgerMenu } from "./components/hamburgermenu.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const containerMessage = document.querySelector(".container-message");

createMenu();
hamburgerMenu();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  containerMessage.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return message("warning", "invalid values", ".container-message");
  }
  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  const url = mainUrl + "/auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "content-type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);

    if (json.user) {
      message("success", "successfully logged in", ".container-message");

      saveToken(json.jwt);
      saveUser(json.user);

      location.href = "admin.html";
    }
    if (json.error) {
      message("warning", "invalid login details", ".container-message");
    }
  } catch (error) {
    console.log(error);
  }
}
