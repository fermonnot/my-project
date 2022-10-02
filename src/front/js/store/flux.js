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
				try{
					let response = await fetch('http://127.0.0.1:3001/api/user',{
						method: 'POST',
						headers:  {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(user),
					});
					if (response.ok){
						return true;
					}
					return false;
				} catch (error) {
					console.log (`Error: ${error}`);
				}
			},
			Login: async (user) => {
				try{
					let response = await fetch('http://127.0.0.1:3001/api/login',{
						method: 'POST',
						headers:  {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(user),
					});
					if (response.ok){
						let data = await response.json();
						console.log(data);
					}
				}catch (error) {
					console.log(`Error: ${error}`);
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
		}
	};
};

export default getState;
