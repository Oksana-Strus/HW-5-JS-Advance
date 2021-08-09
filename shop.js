class ProductStorage {
    constructor(price, count) {
        this.price = price;
        this.count = count;
    }

    getCount() {
        return this.count;
    }

    canSell(count) {
        return count <= this.count;
    }

    sell(count) {
        this.count -= count;
        let total = count * this.price;
        return total;
    }
}


let bank = 1000;

let storage = {
    beer: new ProductStorage(50, 100),
    vine: new ProductStorage(90, 50),
    pepsi: new ProductStorage(30, 80),
}

export function getBank() {
    return bank;
}

export function sellProduct(product, quantity) {
    if (storage[product].canSell(quantity)) {
        let total = storage[product].sell(quantity);
        bank += total;
        return total;
    } else {
        return "error"
    }
}

export function canSell(product, quantity) {
    return storage[product].canSell(quantity);
}

export function getProductQuantity(product) {
    return storage[product].getCount();
}