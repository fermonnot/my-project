const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			token: localStorage.getItem("token") || "",
			urlBase: "http://127.0.0.1:3001/api",
			endPoint: "products",
			products: [],
			product: [],
			filterProducts: [],
			ordenCo: []
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
			userRegister: async (user) => {
				let store = getStore();
				try {
					let response = await fetch(`${store.urlBase}/user`, {

						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(user),
					});
					if (response.ok) {
						return true;
					}
					return false;
				} catch (error) {
					console.log(`Error: ${error}`);
				}
			},
			Login: async (user) => {

				let store = getStore()
				try {
					let response = await fetch(`${store.urlBase}/login`, {

						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(user),
					});
					if (response.ok) {
						let data = await response.json();
						setStore({ token: data.token });
						localStorage.setItem("token", data.token);
						return true;
					}
					return false;

				} catch (error) {
					console.log(`Error: ${error}`);
				}
			},


			logout: () => {
				localStorage.removeItem("token");

				setStore({ token: "" });
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


			getOrdenCo: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.urlBase}/ordenco`)
					let data = await response.json();
					console.log(data)
					if (response.ok) {
						setStore({
							...store,
							ordenCo: data
						})

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

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
			filterProducts: async (description) => {
				let store = getStore()
				let filtered = store.products.filter((product) => product.description.includes(description) == true)
				setStore({

					...store,
					filterProducts: filtered
				})
				console.log(filtered)
			}
		}

	};
};

export default getState;
