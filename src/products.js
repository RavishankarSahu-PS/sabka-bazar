
import '../styles/products.scss';

window.addEventListener("popstate", (e) => {
    const category = e.state;
    console.log(category);
    loadProducts()
})

const loadProducts = async () => {
    try {
        const productsUrl = "http://localhost:3200/products"

        const params = new URLSearchParams(window.location.search);
        console.log(params);

        const res = await Promise.all([
            fetch("http://localhost:3200/categories"),
            fetch(productsUrl),
        ]);
        const json = await Promise.all([
            res[0].json(),
            res[1].json(),
        ]);

        console.log(json);

        const productsSection = document.getElementById("products");

        // display categories

        const aside = document.getElementsByTagName("aside")

        const asideSection = document.getElementById("aside_container");


        for (let i = 0; i < json[0].length; i++) {
            const element = json[0][i];
            const li = document.createElement("li");
            li.innerHTML = `<a href = ${element.key}> ${element.name} </a>`
            asideSection.appendChild(li);
        }

        // display products
        for (let i = 0; i < json[1].length; i++) {

            const element = json[1][i];
            const itemsDiv = document.createElement("div");

            itemsDiv.className = "products__item";

            itemsDiv.innerHTML = `
                <h2>${element.name}</h2>
                <img src="${element.imageURL}" alt="${element.name} Image" />
                <p>${element.description}</p>
                <span>MRP ${new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency"
                }).format(element.price)}</span>
                <button class="btn">Buy Now</button>
                <button class="btn-price">Buy Now @ ${new Intl.NumberFormat("en-IN", {
                    currency: "INR",
                    style: "currency"
                }).format(element.price)}</button>
            `;

            productsSection.appendChild(itemsDiv);
        }

        console.log(json);
    } catch (error) {

    }
}

loadProducts()