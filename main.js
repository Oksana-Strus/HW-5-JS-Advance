// Завдання 2.

// Напишіть модуть який буде обробляти покупку товарів. В модулі має бути тільки логіка, весь зв’язок з html, 
// тобто кліки, зміна даних в html робити там не потрібно. Все має працювати як на відео shopsModule. Можете добавити додатковий функціонал від себе. 
// В середині модуля використовуємо тільки логіку(змінні, функції і т.д.), ніякого зв’язку з DOM не має бути.

import {
    getBank,
    canSell,
    getProductQuantity,
    sellProduct
} from './shop.js'


let basket = {
    beer: 0,
    vine: 0,
    pepsi: 0
}

$('#add-product-form').on('submit', function (event) {
    event.preventDefault();

    const product = event.target['product'].value;
    const quantity = +event.target['quantity'].value;

    if (canSell(product, basket[product] + quantity)) {
        basket[product] += quantity;

        displayBasket();
    } else {
        $('#modalWindow').modal('show');
        $('#modalWindow .modal-body').html(`На складі залишилося ${getProductDisplayName(product).toLowerCase()} ${getProductQuantity(product)} штук.`);

    }

    event.target['quantity'].value = '';
})

$('#buy-products').on('click', function (event) {
        $('.container-for-sum').html($(textAreaForAddItems).val().replace('\n', '</br>'));
        let totalAmount = sellBasket();
        $('.total-prise').html('Всього: ' + totalAmount + ' гривень');
        displayBasket();
        refreshStorageInfo();   

        console.log(totalAmount);
    }

)

function sellBasket() {
    let total = 0;
    Object.keys(basket).forEach(product => {
        const quantity = basket[product];

        if (quantity > 0) {
            total += sellProduct(product, quantity);
            basket[product] = 0;
        }
    })

    return total;
}


function refreshStorageInfo() {
    $('#bank').val(`${getBank()} грн`);
    $('#beer-storage-quantity').val(`${getProductQuantity('beer')} шт.`);
    $('#vine-storage-quantity').val(`${getProductQuantity('vine')} шт.`);
    $('#pepsi-storage-quantity').val(`${getProductQuantity('pepsi')} шт.`);
}

function displayBasket() {
    let basketString = '';

    Object.keys(basket).forEach(product => {
        const quantity = basket[product];
        const productName = getProductDisplayName(product);

        if (quantity > 0) {
            basketString += `${productName}: ${quantity} шт.\n`
        }
    })
    $('#textAreaForAddItems').val(basketString);
}

function getProductDisplayName(product) {
    return $(`#add-product-form label[for='product-${product}']`).html();
}

refreshStorageInfo();


// Завдання 1.

// Напишіть функцію яка приймає одне число. При першому виклику, вона його запам'ятовує, при другому -
//  сумує з попереднім і так далі. Для виконання цього завдання використайте замикання. 
// Наприклад:
// sum(3) = 3
// sum(5) = 8
// sum(228) = 236

// ------------------------------------------------------------------------------------------

// let summa = () => {
//     let store = {
//         num: 0
//     }
//     return function (simpleNumber = 0) {
//         store.num += simpleNumber;
//         return store.num
//     }
// }

// let sum = summa();
// console.log(sum(3));
// console.log(sum(5));
// console.log(sum(228));