let cartItems = []; // Carrito
// LocalStorage
function loadItems() {
    localStorage.getItem('cartItems')
    ? (cartItems = JSON.parse(localStorage.getItem('cartItems')),renderCartItems())
    :null;
}
const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout');
const totalContainer = document.getElementById('total');
const purchaseMessage = document.getElementById('purchase-message');
// agrega al carrito 
function addToCart(product) {
    purchaseMessage.innerText = ''; 
    cartItems.push(product); 
    updateLocalStorage();
    renderCartItems();
}
// muestro las raciones que tengo en venta
function showProducts() {
    fetch('../json/products.json')
    .then(resp=> resp.json())
    .then(products=>{
        productList.innerHTML = '';
        
        products.forEach((post) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${post.image}" alt="${post.name}">
                <h3>${post.name}</h3>
                <p>Precio: $${post.price}</p>
                <button class="add-to-cart-btn button" data-id="${post.id}">Agregar al Carrito</button>
            `;
            productList.appendChild(productCard);

            const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', () => {
                const productId = parseInt(addToCartBtn.getAttribute('data-id'));
                const selectedProduct = products.find(post => post.id === productId);
                addToCart(selectedProduct);
            });
        });
    })
    .catch(error => {
        console.error('Error al obtener los datos:', error);
    });
}
//borra del carrito
function removeProductFromCart(index) {
    index >= 0 && index < cartItems.length
    ? (cartItems = [...cartItems.slice(0, index), ...cartItems.slice(index+1)], updateLocalStorage(), renderCartItems())
    :null;
}
//recarga en el carrito lo que estaba 
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}
//calcula el total
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
            <button class="remove-from-cart-btn button" data-index="${index}">Eliminar</button>
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
        cartItems.length > 0
        ? Swal.fire({icon: 'success', title: '¡Compra realizada con éxito!', text: 'Gracias por tu compra.', confirmButtonText: 'Cerrar'})
        :  Swal.fire({icon: 'error', title: '¡El carrito esta vacio!', text: 'Seleccione articulos para comprar', confirmButtonText: 'Cerrar'});
    cartItems = []; 
    updateLocalStorage();
    renderCartItems();
});
showProducts();
loadItems();


