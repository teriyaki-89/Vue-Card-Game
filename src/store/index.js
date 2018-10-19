import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards: [
      {
        amount: 8,
        card_suit: 3
      },
      {
        0: "spade",
        1: "clubs",
        2: "hearts",
        3: "diamonds"
      },
      {
        0: "6",
        1: "7",
        2: "8",
        3: "9",
        4: "10",
        5: "Jack",
        6: "Queen",
        7: "King",
        8: "Ace"
      }
    ],
    cards_state: []
  },
  getters: {
    getCardBase(state) {
      return state.cards[0];
    },
    getCardSuit(state) {
      return state.cards[1];
    },
    getCardsValues(state) {
      return state.cards[2];
    },
    getCardsState(state) {
      return state.cards_state;
    }
  },
  mutations: {
    makeCardState(state, array) {
      state.cards_state.push(array);
    },
    setCardState(state, obj) {
      let value = obj.value;
      state.cards_state[obj.index].opened = value;
      //console.log(store.state.cards_state[obj.index].opened);
    },
    setCardsStateFalse(state, index) {
      state.cards_state[index].clickable = false;
    }
  },
  actions: {},
  strict: process.env.NODE_ENV !== "production"
});
