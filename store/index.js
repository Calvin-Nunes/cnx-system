// holds your root state
export const state = () => ({
	user: null,
	showPageFooter: true,
});

//Actions
export const actions = {
	setLoggedUser({ commit }, loggedUser) {
		commit("setUser", loggedUser);
	},
	tooglePageFooter({ commit }, shouldShow) {
		commit("setPageFooter", shouldShow);
	},
};

//Mutations
export const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	setPageFooter(state, shouldShow) {
		state.showPageFooter = shouldShow;
	},
};

//Getters
export const getters = {
	loggedUser(state) {
		return state.user;
	},
};
