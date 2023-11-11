document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.product');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout');
    const closeCartButton = document.getElementById('close-cart');
    const overlayCart = document.getElementById('cart-overlay');
    const cartLink = document.getElementById('cart-link');
    const checkoutLink = document.getElementById('checkout-link');

    let cartItems = [];

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            const productId = addToCartButton.getAttribute('data-product');
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.replace(/[^\d.]/g, ""));

            addToCart({ id: productId, name: productName, price: productPrice });
        });
    });

    checkoutButton.addEventListener('click', () => {
        alert('Terima kasih atas pembelian Anda!');
        resetCart();

        const nomorWhatsApp = '087891768734';

        const tautanWhatsApp = `https://wa.me/${nomorWhatsApp}?text=Terima%20kasih%20atas%20pembelian%20Anda!`;

        window.open(tautanWhatsApp, '_blank');
    });

    closeCartButton.addEventListener('click', () => {
        overlayCart.style.display = 'none';
    });

    cartLink.addEventListener('click', () => {
        displayCart();
    });

    checkoutLink.addEventListener('click', () => {
        displayCart();
    });

    function addToCart(product) {
        cartItems.push(product);

        const cartItem = document.createElement('li');
        const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price);
        cartItem.textContent = `${product.name} - ${formattedPrice}`;
        cartItemsContainer.appendChild(cartItem);

        updateCartTotal();

        displayCart();
    }

    function updateCartTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
        });

        const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);
        cartTotalElement.textContent = formattedTotal;
    }

    function resetCart() {
        cartItems = [];
        cartItemsContainer.innerHTML = '';
        cartTotalElement.textContent = 'Rp0,00';

        overlayCart.style.display = 'none';
    }

    function displayCart() {
        overlayCart.style.display = 'block';
    }
});
