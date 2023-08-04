// Paso 3.1: Creamos un array de productos para simular una base de datos
const products = [
    {
        id: 1,
        name: 'Connie chica',
        price: 250,
        image: "../assets/image/connie.webp"
    },
    {
        id: 2,
        name: 'Connie mediano',
        price: 500,
        image: 'assets/image/connie.webp'
    },
    {
        id: 3,
        name: 'Connie grande',
        price: 750,
        image: "./assets/image/connie.webp"
    },
    {
        id: 4,
        name: 'Equilibrio chica',
        price: 500,
        image: "/assets/image/equilibrio.webp"
    },
    {
        id: 5,
        name: 'Equilibrio mediano',
        price: 1000,
        image: './assets/image/equilibrio.webp'
    },
    {
        id: 6,
        name: 'Equilibrio grande',
        price: 1500,
        image: '/assets/image/equilibrio.webp'
    },
    {
        id: 7,
        name: 'Hills chica',
        price: 1000,
        image: "assets/image/hills.jpg"
    },
    {
        id: 8,
        name: 'Hills mediano',
        price: 2000,
        image: '../assets/image/hills.jpg'
    },
    {
        id: 9,
        name: 'Hills grande',
        price: 3000,
        image: '../assets/image/hills.jpg'
    }
];

let cartItems = []; // Carrito

// LocalStorage
function loadItems() {
    if (localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        renderCartItems();
    }
}
const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout');
const totalContainer = document.getElementById('total');
const purchaseMessage = document.getElementById('purchase-message');

function addToCart(product) {
    purchaseMessage.innerText = ''; // borrar mensaje si se hizo una compra
    cartItems.push(product); // Agrega el producto al carrito
    updateLocalStorage();
    renderCartItems();
}
// muestro las raciones que tengo en venta
function showProducts() {
    productList.innerHTML = '';
 
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button class="add-to-cart-btn boton" data-id="${product.id}">Agregar al Carrito</button>
        `;
        productList.appendChild(productCard);

        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            const productId = parseInt(addToCartBtn.getAttribute('data-id'));
            const selectedProduct = products.find(product => product.id === productId);
            addToCart(selectedProduct);
        });
    });
}

function removeProductFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1); // Elimina el producto del carrito por su índice
        updateLocalStorage();
        renderCartItems();
    }
}

function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}



function calculateTotal() {
    const total = cartItems.reduce((acc, product) => acc + product.price, 0);
    return total;
}
//Mostramos en el carrito
function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    cartItems.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button class="remove-from-cart-btn boton" data-index="${index}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        const removeFromCartBtn = cartItem.querySelector('.remove-from-cart-btn');
        removeFromCartBtn.addEventListener('click', () => {
            const index = parseInt(removeFromCartBtn.getAttribute('data-index'));
            removeProductFromCart(index);
        });

     
    });
    const total = calculateTotal();
    totalContainer.innerText = `Total: $${total}`;
}


checkoutBtn.addEventListener('click', () => {

     if (cartItems.length > 0) {
        purchaseMessage.innerText = 'Compra realizada con éxito. Gracias por tu compra.';
    }else{
        purchaseMessage.innerText = 'El carrito esta vacio';
    }
    cartItems = []; // Limpiamos el carrito después de la compra
    updateLocalStorage();
    renderCartItems();
});
showProducts();
loadItems();


