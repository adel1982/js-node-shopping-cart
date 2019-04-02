const fs = require('fs'); // File Systeme
const path = require('path');

const appDir = path.dirname(require.main.filename);

const p = path.join(appDir, 'data', 'cart.json') // Chemin vers le fichier cart.json

class Cart {
	/*
		cart.json
		{ products: [{id: 123, qty: 1}, {}, {},],totalPrice: 0}
	*/
	static add(id, productPrice, callback) {

		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if(!err) {
				cart = JSON.parse(fileContent);
			}

			const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
			const existingProduct = cart.products[existingProductIndex];
			
			if(existingProduct) {	
				// si le produit existe, on modifie sa quantité 
				cart.products[existingProductIndex].qty = cart.products[existingProductIndex].qty + 1;
			} else {
				// si il n'existe pas, on l'ajoute au panoer
				cart.products.push({ id: id, qty: 1 });
			}

			cart.totalPrice = cart.totalPrice + +productPrice; // Ajouter un plus devant converti des strings (chiffre) en number 

			fs.writeFile(p, JSON.stringify(cart), err => {
				if (err) console.log(err);
				callback();
			});
		});
	}
	static getCart(callback) {
		fs.readFile(p, (err, fileContent) => {
			let cart = {products: [], totalPrice: 0}
			if(!err) {
				cart = JSON.parse(fileContent);
			}
			callback(cart);
		});
	}
}


module.exports = Cart;