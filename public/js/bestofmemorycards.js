
let http = new XMLHttpRequest();

const api_get_req = 'https://api.rainforestapi.com/request?api_key=6B456243B1284515820D3325014BD091&type=bestsellers&url=https://www.amazon.com/s/zgbs/pc/516866';

http.open('get', api_get_req, true);


http.send();


http.onload = function(){

    if(this.readyState == 4 && this.status == 200){

        let products = JSON.parse(this.responseText);


        let output = "";


        for(let item of products){
            output += `
				<div class="_card">

        <div class="image">
            <img src="${item.image}" alt="">
        </div>

        <div class="prodinfo">
            <h3 class="prod_title">${item.title}</h3>
            <div class="subinfo">
                <div class="price"> ${item.price.raw}</div>

                <div class="stars">

                </div>


            </div>
        </div>

        <div class="overlay">
            <a href="cart" style="--i:1" class="fas fa-shopping-cart"></a>
            <a href="cart" style="--i:2" class="fas fa-heart"></a>
        </div>

    </div>
			`;
        }

        document.querySelector(".products").innerHTML = output;
    }
} 