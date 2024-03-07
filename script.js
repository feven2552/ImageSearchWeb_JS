const access_key = "ivGWNGMK0AcM6hkfadcVeBgG5E8-uxrw6DxnLHgyVrc";
const formElem = document.querySelector("form");
const inputElem = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElem.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access_key}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imagelink);
    searchResults.appendChild(imageWrapper);
  });

  page++
  if (page >1){
    showMore.style.display= "block";
  }
}


formElem.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click",()=>{
 
    searchImages();
});