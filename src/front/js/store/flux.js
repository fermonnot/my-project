const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			urlBase: "http://127.0.0.1:3001/api",
			endPoint: "products",
			products: []

		},
		actions: {
			// Use getActions to call a function within a fuction
			getProducts: async () => {
				let store = getStore()
				try {
					let response = await fetch(`${store.urlBase}/products`)
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
						console.log(data);
					}
				} catch (error) {
					console.log(`Error: ${error}`);
				}
			},


		}
	};
};

export default getState;
