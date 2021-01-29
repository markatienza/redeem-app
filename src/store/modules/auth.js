import router from '../../router'
import request from '../../api/request'
import {
    setToken,
    deleteToken,
    getToken
} from '../../helpers/token'
/**
 * State
 */

const state = () => ({
    user: {},
    isAuthenticate: false,
    error: {
        message: ''
    }
})


/**
 * Getters
 */
const getters = {};

/**
 * Action
 */
const actions = {
    login({
        commit
    }, data) {
        commit('setErrorMsg', '')
        request
            .post("/user/auth", data)
            .then((response) => {
                const {
                    data,
                    message
                } = response.data;
                if (!data) {
                    return commit('setErrorMsg', message)
                }
                setToken(data.token);
                router.replace({
                    name: "Home"
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    logout({
        commit
    }) {
        deleteToken();
        commit('setUser', {});
        commit('setIsAuthenticate', false);
        router.replace({
            name: "Login"
        });
    },
    updateUser({
        commit
    }) {
        const token = getToken();
        if (token) {
            request
                .post("/user/verify", {
                    token
                })
                .then((res) => {
                    const user = res.data.data.user;
                    commit('setUser', user);
                    commit('setIsAuthenticate', true);
                })
                .catch((err) => {
                    deleteToken();
                    console.log(err);
                });
        }
    },
    register({
        commit
    }, data) {
        if (
            !data.username ||
            !data.password | !data.confirmPassword ||
            !data.firstName ||
            !data.lastName
        ) {
            commit("setErrorMsg", "All fields are required!");
        } else if (data.password !== data.confirmPassword) {
            commit("setErrorMsg", "Password don't match!");
        } else {
            request
                .post("/user", data)
                .then((response) => {
                    const data = response.data;
                    if (!data.data) {
                        return commit("setErrorMsg", data.message);
                    }
                    router.replace({
                        name: "Login"
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};

/**
 * Mutations
 */
const mutations = {
    setErrorMsg(state, msg) {
        state.error.message = msg
    },
    setUser(state, user) {
        state.user = user;
    },
    setIsAuthenticate(state, status) {
        state.isAuthenticate = status;
    }
};



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}