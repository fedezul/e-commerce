const productCatalog = [
    { id: 1, name: "Notebook", price: 10, imageUrl: "https://picsum.photos/200?random=1" },
    { id: 2, name: "Pen", price: 2, imageUrl: "https://picsum.photos/200?random=2" },
    { id: 3, name: "Backpack", price: 30, imageUrl: "https://picsum.photos/200?random=3" },
    { id: 4, name: "Calculator", price: 15, imageUrl: "https://picsum.photos/200?random=4" },
    { id: 5, name: "Ruler", price: 3, imageUrl: "https://picsum.photos/200?random=5" },
    { id: 6, name: "Pencil Case", price: 8, imageUrl: "https://picsum.photos/200?random=6" }
];

let cart = [];

function showCatalog() {
    const catalogContainer = document.getElementById('catalog');
    let catalogHTML = '';

    for (let i = 0; i < productCatalog.length; i++) {
        const product = productCatalog[i];

        catalogHTML = catalogHTML + `
         <div class="product-card">
                <div class="product-image">${product.imageUrl}</div>
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