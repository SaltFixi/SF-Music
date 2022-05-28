import Cookies from "js-cookie";

export default {
  namespaced: true,
  state: {
    userId: "",
    userProfile: "",
    token: "",
    loginState: false,
    roles: ""
  },
  mutations: {
  },
  actions: {
    setInfo ({ commit, state }, data) {
      // console.log('userInfo', data);
      state.userId = data.account.id;
      state.userProfile = data.profile;
      state.token = data.token;
      state.loginState = true;
      state.roles = ["user"];
      Cookies.set("UserToken", data.token, { expires: 1 });
    },
    cleanInfo ({ commit, state }) {
      state.userId = "";
      state.userProfile = "";
      state.token = "";
      state.loginState = false;
      state.roles = [];
      Cookies.remove("UserToken");
    }
  },
};
