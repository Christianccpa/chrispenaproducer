document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM completamente cargado y analizado");

    // Array para almacenar los servicios agregados al carrito
    let cart = [];
    // Umbral de descuento
    const discountsThreshold = 2;

    // Elementos del DOM para el carrito
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    let servicesData; // Variable para almacenar los datos de los servicios

    // Función para agregar un servicio al carrito
    function addToCart(serviceName, servicePrice) {
        const service = { name: serviceName, price: servicePrice };
        cart.push(service);
        updateCart();
    }

    // Función para eliminar un servicio del carrito
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

// Función para actualizar el contenido del carrito en el DOM
function updateCart() {
    let total = 0;
    cartItemsList.innerHTML = '';

    // Objeto para almacenar servicios agrupados por nombre
    const groupedCart = {};

    // Agrupar servicios por nombre y calcular total
    cart.forEach(item => {
        if (groupedCart[item.name]) {
            groupedCart[item.name].quantity++;
            groupedCart[item.name].totalPrice += item.price;
        } else {
            groupedCart[item.name] = {
                quantity: 1,
                totalPrice: item.price
            };
        }
        total += item.price;
    });

    // Mostrar servicios agrupados en el carrito
    for (const serviceName in groupedCart) {
        const item = groupedCart[serviceName];
        const listItem = document.createElement('li');
        listItem.textContent = `${serviceName} x${item.quantity}: $${item.totalPrice}`;

        // Botón para eliminar el servicio del carrito
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        removeButton.addEventListener('click', () => removeItemFromCart(serviceName));
        listItem.appendChild(removeButton);

        cartItemsList.appendChild(listItem);
    }

    // Aplicar descuento si se supera el umbral de descuento
    if (cart.length > discountsThreshold) {
        total *= 0.9;
    }

    // Actualizar el total en el DOM
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Almacenar el carrito en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para cargar los datos de los servicios desde el archivo JSON
function loadServices() {
    fetch('data/services.json') // Ruta ajustada
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            servicesData = data; // Almacenar los datos en la variable servicesData
        })
        .catch(error => {
            // Manejar errores
            console.error('Se produjo un error al cargar los servicios:', error);
        });
}


    // Llamar a la función para cargar los servicios cuando se cargue la página
    loadServices();

    // Obtener todos los botones "Add to Cart" y agregarles un event listener
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.parentElement.querySelector('.services__content-tittle').textContent;
            const servicePrice = parseFloat(button.getAttribute('data-price'));
            addToCart(serviceName, servicePrice);
        });
    });

    // Cargar el carrito desde el almacenamiento local al cargar la página
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
});
