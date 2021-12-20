import { mainUrl } from "./components/api.js";

const bannerUrl = mainUrl + "/home";

const mainBannerUrl = mainUrl;

async function getHerobanner() {
  const container = document.querySelector(".herobanner");

  try {
    const response = await fetch(bannerUrl);
    const image = await response.json();

    const herobanner = image.hero_banner.url;

    container.innerHTML += `<img class="herobanner" src="${mainBannerUrl}${herobanner}"  alt="background effect image"/>
                                    `;
  } catch (error) {
    console.log(error);
  }
}
getHerobanner();
