const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getIndex = (req,res) => {
	Product.findAll(products => {
		res.render('index', {
			title: 'Bienvenue sur votre boutique',
			path: '/',
			products: products
		});
	});
}

const getProductDetails = (req, res) => {
	Product.findById(req.params.id, product => {
		res.render('product-details', {
			title: product.name,
			product: product
		});
	});
}

const getCart = (req,res) => {
	Cart.getCart(cart => {
		if(cart.products.length > 0) {
			Product.findAll(products => {
				let cartProducts = [];
	
				products.forEach(product => {
					const productData = cart.products.find(prod => prod.id === product.id)
					if(productData) {
						cartProducts.push({product: product, qty: productData.qty})
					}
				});
				res.render('cart', {
					title: "Panier",
					path: '/panier',
					cartProducts: cartProducts,
					totalPrice: cart.totalPrice,
					hasProducts: true
				});
			});
		} else {
			res.render('cart', {
				title: "Panier",
				path: '/panier',
				hasProducts: false
			});
		}
	});
}

const postCart = (req,res) => {
	Product.findById(req.body.productId, product => {
		Cart.add(req.body.productId, product.price, () => {
			res.redirect('/panier');
		});
	});
}

module.exports = {
	getIndex: getIndex,
	getProductDetails: getProductDetails,
	getCart: getCart,
	postCart: postCart
}