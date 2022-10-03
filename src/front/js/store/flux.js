const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			// urlBase: "https://districlick.herokuapp.com/api",
			urlBase: "http://127.0.0.1:3001/api",
			endPoint: "products",
			products: [],
			product: [],
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			getProducts: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.urlBase}/${store.endPoint}`)
					let data = await response.json();
					console.log(data)
					if (response.ok) {
						setStore({
							...store,
							products: data
						})

					}
				} catch (error) {

					console.log(error)
				}
			},

			


			addProduct: async (product) => {
				let store = getStore()


				try {
					let response = await fetch(`${store.urlBase}/products`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(product)
					})
					console.log(response)
					if (response.ok) {
						
						console.log("me guardé")
					}

				} catch (error) {
					
					console.log("explote"(error))
				}

			},
			
			deleteProduct: async (product_id) => {
				console.log(product_id)
				let store = getStore()
				try {
					let response = await fetch(`${store.urlBase}/products/${product_id}`, {
						method: "DELETE",
						
					})
					console.log(response)
					if (response.ok) {
						console.log("me borré")
					}

				} catch (error) {
					console.log(error)
				}

			},







			// deleteProduct: async (product_id) => {
			// 	let store = getStore()
			// 	let newProducts = store.products.filter((item, index) => {
			// 		return (product_id !== index)
			// 	});
			// 	try {
			// 		let response = await fetch(`${store.urlBase}/products/<int:product_id>`, {
			// 			method: "PUT",
			// 			headers: { "Content-Type": "application/json" },
			// 			body: JSON.stringify(newProducts)
			// 		});
			// 		if (response.ok) {
			// 			console.log("me borre")
			// 		};
			// 	} catch (error) {
			// 		console.log((error))
			// 	}
			// },
			
		}
	};
};

export default getState;
