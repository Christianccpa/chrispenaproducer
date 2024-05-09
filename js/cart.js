document.addEventListener("DOMContentLoaded", function () {
    // Array para almacenar los elementos del carrito
    let cart = [];
    // Umbral para aplicar descuento del 10%
    const discountsThreshold = 2;

    // Objetos de servicios con nombre y precio
    const services = [
        { name: "Music production", price: 200 },
        { name: "Audio Editing", price: 50 },
        { name: "Audio Mixing", price: 100 },
        { name: "Mastering", price: 30 },
        { name: "Reamping", price: 20 }
    ];

    // Función para cargar el carrito desde el localStorage al cargar la página
    function loadCartFromStorage() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCart();
        }
    }

    // Función para agregar un servicio al carrito
    function addToCart(serviceName) {
        const service = services.find(s => s.name === serviceName);
        if (service) {
            cart.push(service);
            updateCart();
        } else {
            console.log("Servicio no encontrado");
        }
    }

    // Función para eliminar un servicio del carrito
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Función para actualizar el carrito y el total
    function updateCart() {
        let total = 0;
        const cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = '';

        cart.forEach((item, index) => {
            total += item.price;

            // Crear elemento de lista para cada servicio en el carrito
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name}: $${item.price}`;

            // Botón para eliminar el elemento del carrito
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.addEventListener('click', () => removeItemFromCart(index));
            listItem.appendChild(removeButton);

            cartItemsList.appendChild(listItem);
        });

        // Aplicar descuento del 10% si hay más de 2 elementos en el carrito
        if (cart.length > discountsThreshold) {
            total *= 0.9;
        }

        // Actualizar el total en el DOM
        const cartTotal = document.getElementById('cart-total');
        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Guardar el carrito en el localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Obtener todos los botones "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    // Agregar manejadores de eventos a los botones "Agregar al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const serviceName = button.dataset.service;
            addToCart(serviceName);
        });
    });

    // Cargar el carrito desde el localStorage al cargar la página
    loadCartFromStorage();
});
