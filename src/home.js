import "../styles/home.scss";

const loadHomeData = async () => {
    try {
        const productsUrl = "http://localhost:3200/categories";
        const resJson = await fetch(productsUrl);
        const categories = await resJson.json();

        const categoriesItem = document.getElementById("categories");

        for (let itm = 0; itm < categories.length; itm++) {
            const element = categories[itm];
            const itemsDiv = document.createElement("div")
            itemsDiv.className = "categories__item";

            itemsDiv.innerHTML = `
                            <div>
                                <img src=${element.imageUrl} alt="${element.name} Image">
                            </div>
                            <div>
                                <h1>${element.name}</h1>
                                <p>${element.description}</p>
                                <button type="button" class="btn">Explore ${element.name} </button>
                            </div>
                       `
            categoriesItem.appendChild(itemsDiv)
        }

    } catch (error) {
        console.log("Error>>>",error)
    }
}
loadHomeData()


////////////////////////////////git

let url='http://localhost:3200/'

let sectionForBanners = document.getElementById("section-for-banners")

let loadedBanners=[]

let slideIndex=0
let node;

const bannerLoader = async ()=>{
    try {
        const response = await fetch(`${url}banner`);
        loadedBanners = await response.json();
        printBanners(loadedBanners)
        console.log(loadedBanners,"<<<<loadedBanners")
    }
    catch(error){
        console.log(error)
    }
}



const printBanners = data => {

    for (let i = 0; i < data.length; i++) {
        let banner = document.createElement('div')
        banner.setAttribute('class','banner')
        banner.setAttribute('id',data[i].order)

        let imageOfBanner = document.createElement('img')
        imageOfBanner.setAttribute('class','myBannerImage')
        imageOfBanner.src = data[i].bannerImageUrl
        imageOfBanner.alt = data[i].bannerImageAlt

        banner.hidden = true

        // let nextButton = document.createElement('button')
        // let prevButton = document.createElement('button')

        // nextButton.classList.add('w3-button', 'w3-display-right')
        // prevButton.classList.add('w3-button', 'w3-display-left')
        // nextButton.innerText = ">"
        // prevButton.innerText = "<"

        // nextButton.addEventListener('click',plusDivs(+1))
        // prevButton.addEventListener('click',plusDivs(-1))

        banner.appendChild(imageOfBanner)

        sectionForBanners.appendChild(banner)
        // sectionForBanners.appendChild(nextButton)
        // sectionForBanners.appendChild(prevButton)

    }
    // showNextImage();
    bannerImageDisplay(slideIndex)
}


// const showNextImage= ()=> {
//   bannerImageSelection(slideIndex);
// }



 const bannerImageDisplay = index => {
  if (node) {
    node.hidden = true;
  }
  if (index >= loadedBanners.length) {
    slideIndex = 0;
  }

  let newImg = document.getElementById(slideIndex + 1);
  if (newImg) {
    newImg.hidden = false;
    node = newImg;
  }
  slideIndex++;

  setTimeout(() => {
    // showNextImage();
    bannerImageDisplay(slideIndex)
  }, 5000);
}

bannerLoader()
