import request from '../../api/request'
/**
 * State
 */

const state = () => ({
    items: [],
    isLoading: true,
    selectedItem: {},
    title: "Are you sure?",
    isConfirm: true,
    isNotValid: false,
})


/**
 * Getters
 */
const getters = {};

/**
 * Action
 */
const actions = {
    setItems({
        commit
    }) {
        request
            .get("/prizes")
            .then((response) => {
                if (response.data) {
                    const items = response.data.data;
                    commit('setItems', items);
                    commit('setLoading', false);
                }
            })
            .catch((err) => console.log(err));
    },
    selectItem({
        commit
    }, item) {
        if (!item.name) return commit('setSelectedItem', item);
        request
            .get("/prizes/" + item.name)
            .then((response) => {
                if (response.data) {
                    const item = response.data.data;
                    console.log(item)
                    commit('setSelectedItem', item);
                    commit('setLoading', false);
                }
            })
            .catch((err) => console.log(err));
    },
    confirmRedeem({
        commit,
        dispatch,
        state
    }, name) {
        request
            .post("/prizes/deductQuantity", {
                name
            })
            .then((response) => {
                const data = response.data.data;
                if (data) {
                    dispatch('selectItem', data)
                    commit('setConfirm', !state.isConfirm)
                    commit('setTitle', "Congratulations!")
                }
            })
            .catch((err) => {
                console.log(err);
                commit('setTitle', "Please Login!")
                commit('setValid', true)
            });
    }
};

/**
 * Mutations
 */
const mutations = {
    setItems(state, items) {
        state.items = items;
    },
    setLoading(state, status) {
        state.isLoading = status;
    },
    setSelectedItem(state, item) {
        state.selectedItem = item;
    },
    setConfirm(state, status) {
        state.isConfirm = status;
    },
    setTitle(state, title) {
        state.title = title;
    },
    setValid(state, status) {
        state.isNotValid = status;
    },
};



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}