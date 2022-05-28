import Cookies from "js-cookie";
import storage from 'utils/storage.js';
import createPersistedState from "vuex-persistedstate";


export default {
  namespaced: true,
  state: {
    userId: storage.get('userInfo') ? storage.get('userInfo').userId : '',
    userProfile: storage.get('userInfo') ? storage.get('userInfo').userProfile : {},
    token: Cookies.get('UserToken') ? Cookies.get('UserToken') : '',
    loginState: storage.get('userInfo') ? storage.get('userInfo').loginState : false,
    roles: storage.get('userInfo') ? storage.get('userInfo').roles : ''
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
