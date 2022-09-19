const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			userRegister: async (user) => {
				try{
					let response = await fetch('http://127.0.0.1:3001/api/user',{
						method: 'POST',
						Headers:  {
							'Content-Type': 'aplication/json',
						},
						body: JSON.stringify(user),
					});
					if (response.ok){
						return true;
					}
					return false;

				}catch (error) {
					console.log ('Error: ${error}');
				}
			},
		},
	};
};

export default getState;
