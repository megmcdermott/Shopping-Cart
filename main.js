let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Milk',
        tag: 'milk',
        price: 2.99,
        inCart: 0
    },
    {
        name: 'Eggs',
        tag: 'eggs',
        price: 3.99,
        inCart: 0
    },
    {
        name: 'Bread',
        tag: 'bread',
        price: 2.25,
        inCart: 0
    },
    {
        name: 'Peanut Butter',
        tag: 'peanutbutter',
        price: 4.25,
        inCart: 0
    },
    {
        name: 'Jelly',
        tag: 'jelly',
        price: 3.50,
        inCart: 0
    },
    {
        name: 'Cheese',
        tag: 'cheddarcheese',
        price: 3.99,
        inCart: 0
    },
    {
        name: 'Butter',
        tag: 'butter',
        price: 2.50,
        inCart: 0
    },
    {
        name: 'Spaghetti',
        tag: 'spaghetti',
        price: 3.25,
        inCart: 0
    },
    {
        name: 'Cereal',
        tag: 'luckycharms',
        price: 4.50,
        inCart: 0
    },
    {
        name: 'Bananas',
        tag: 'bananas',
        price: 3.99,
        inCart: 0
    },
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(products, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(products);

}

function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {
        let currentProduct = products.tag;

        if(cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: products
            }
        }
        cartItems[currentProduct].inCart += 1;
    
    } else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        };
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products, action) {
    let cart = localStorage.getItem('totalCost');
    
    // console.log("My cartCost is", cartCost);
    // console.log(typeof cartCost);

    if(action) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart - products.price);

    } else if(cart != null) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + products.price);
    
    } else {
        localStorage.setItem("totalCost", products.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector(".products");

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML += `
            <div class="products">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/${item.tag}.jpeg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-back-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-forward-circle"></ion-icon>
            </div>
            <div class="total">${item.inCart * item.price}</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">${cart}</h4>
            </div>`;
        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if(cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.products ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
    }
}

onLoadCartNumbers();
displayCart();