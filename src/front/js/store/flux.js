const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			urlBase: "http://127.0.0.1:3001/api",
			endPoint: "products",
			products: [],
			filterProducts: []
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

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

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
