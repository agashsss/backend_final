function getAll() {

    const displayProduct = document.querySelector('.featured_block')

    const getAllurl = 'https://api.rainforestapi.com/request?api_key=6B456243B1284515820D3325014BD091&type=bestsellers&url=https://www.amazon.com/s/zgbs/pc/516866';

    fetch(getAllurl)
        .then(response => {return response.json()})
        .then(data => {
            data.forEach(product => {

                prodBlock = `<div class="_card">

            <div class="image">
                <img src="${product.image}" alt="">
            </div>

            <div class="prodinfo">
                <h3 class="prod_title">${product.title}</h3>
                <div class="subinfo">
                    <div class="price">${product.price}</div>

                    <div class="stars">
                        ${product.rating}
                    </div>


                </div>
            </div>

            <div class="overlay">
                <a href="cart" style="--i:1" class="fas fa-shopping-cart"></a>
                <a href="cart" style="--i:2" class="fas fa-heart"></a>
            </div>

        </div>`

                displayProduct.insertAdjacentHTML('afterend', prodBlock);
            })
        })
        .then(data => console.log(data))
}

getAll();