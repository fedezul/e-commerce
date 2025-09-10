const productCatalog = [
    { id: 1, name: "Quaderno", price: 10, image: "📓" },
    { id: 2, name: "Penna", price: 2, image: "🖊️" },
    { id: 3, name: "Zaino", price: 30, image: "🎒" },
    { id: 4, name: "Calcolatrice", price: 15, image: "🧮" },
    { id: 5, name: "Righello", price: 3, image: "📏" },
    { id: 6, name: "Matita", price: 8, image: "✏️" }
];


let cart = [];

function showCatalog() {
    const catalogContainer = document.getElementById('catalog');
    let catalogHTML = '';


    for (let i = 0; i < productCatalog.length; i++) {
        const product = productCatalog[i];

        catalogHTML = catalogHTML + `
            <div class="product-card">
                <div class="product-image">${product.image}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">€${product.price}.00</div>
                <button class="btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    }

    catalogContainer.innerHTML = catalogHTML;


    const addButtons = document.querySelectorAll('[data-id]');
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', handleAddToCart);
    }
}


function handleAddToCart(event) {

    const productId = parseInt(event.target.getAttribute('data-id'));


    let existingItem = null;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            existingItem = cart[i];
            break;
        }
    }

    if (existingItem) {
        existingItem.quantity = existingItem.quantity + 1;
    } else {
        cart.push({ productId: productId, quantity: 1 });
    }

    updateCart();
    updateTotal();
}


function updateCart() {
    const cartContainer = document.getElementById('cart');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="cart-empty">il carrello è vuoto</div>';
        return;
    }

    let cartHTML = '';
    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];

     
        let product = null;
        for (let j = 0; j < productCatalog.length; j++) {
            if (productCatalog[j].id === cartItem.productId) {
                product = productCatalog[j];
                break;
            }
        }

        if (product) {
            const subtotal = product.price * cartItem.quantity;

            cartHTML = cartHTML + `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-details">
                            Quantity: ${cartItem.quantity} × €${product.price} = €${subtotal}
                        </div>
                    </div>
                    <button class="btn btn-remove" data-id="${product.id}">Rimuovi</button>
                </div>
            `;
        }
    }

    cartContainer.innerHTML = cartHTML;

    const removeButtons = cartContainer.querySelectorAll('.btn-remove');
    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', handleRemoveFromCart);
    }
}

function handleRemoveFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === productId) {
            if (cart[i].quantity > 1) {
                cart[i].quantity = cart[i].quantity - 1;
            } else {
                cart.splice(i, 1);
            }
            break;
        }
    }

    updateCart();
    updateTotal();
}

function updateTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];

        for (let j = 0; j < productCatalog.length; j++) {
            if (productCatalog[j].id === cartItem.productId) {
                const subtotal = productCatalog[j].price * cartItem.quantity;
                total = total + subtotal;
                break;
            }
        }
    }

    document.getElementById('total').textContent = '€' + total + '.00';
}

function clearCart() {
    cart = [];
    updateCart();
    updateTotal();
}

document.addEventListener('DOMContentLoaded', function () {
   
    showCatalog();
    updateCart();

    document.getElementById('clear-cart').addEventListener('click', clearCart);
});