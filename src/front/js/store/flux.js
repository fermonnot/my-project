const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: localStorage.getItem("token") || "",

		},
		actions: {
			userRegister: async (user) => {
				let store = getStore();
				try {
					let response = await fetch('http://127.0.0.1:3001/api/user', {
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
				try {
					let response = await fetch('http://127.0.0.1:3001/api/login', {
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
		},
	};
};

export default getState;
