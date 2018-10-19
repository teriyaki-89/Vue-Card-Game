<template>
<div class="wrapper">
    <render-card :parent_val="card_arr" :parent_card_state="card_state" @childtouch="onChildaction($event)">

    </render-card>
    <div class="sample">
    </div>
</div>
</template>
<script>
import RenderCard from "./RenderCard";
export default {
  data() {
    return {
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
      card_arr: [],
      card_state: [],
      pairs: []
    };
  },
  methods: {
    onChildaction(index) {
      let state = this.card_state[index].opened;
      let flipCard = index => {
        state = this.card_state[index].opened;
        //console.log(state);
        state = !state;
        this.card_state[index].opened = state;
        this.$set(this.card_state, index, this.card_state[index]);
        return;
      };
      flipCard(index);
      //console.log("step done");
      // add 2 elements to array to compare
      // and remove closed ones
      if (!this.pairs.includes(index)) {
        if (state === true) {
          this.pairs.push(index);
          //console.log("added " + this.pairs);
        }
      } else {
        if (state === false) {
          let position = this.pairs.indexOf(index);
          this.pairs.splice(position, 1);
          //console.log("deleted " + this.pairs);
        }
      }
      if (this.pairs.length == 2) {
        console.log("2 elements");
        let ii = this.pairs[0];
        let jj = this.pairs[1];
        if (
          this.card_arr[ii][0] == this.card_arr[jj][0] &&
          this.card_arr[ii][1] == this.card_arr[jj][1]
        ) {
          console.log("match");
          this.card_state[ii].clickable = false;
          this.card_state[jj].clickable = false;
          this.pairs = [];
        } else {
          console.log("no match" + ii + " | " + jj);
          this.pairs = [];
          setTimeout(() => {
            flipCard(jj);
          }, 300);

          setTimeout(() => {
            flipCard(ii);
          }, 700);
        }
      }
    }
  },
  created() {
    let count = 0;
    let amount = this.cards[0].amount;
    let card_suit = this.cards[0].card_suit;
    let card_suit_text = this.cards[1];
    let card_suit_value = this.cards[2];
    let iter = 0;
    let number,
      suit_rand = 0;
    while (count < 8) {
      number = Math.floor(Math.random() * (amount + 1));
      suit_rand = Math.floor(Math.random() * (card_suit + 1));
      if (!this.card_arr.includes([suit_rand, number])) {
        for (let j = 1; j <= 2; j++) {
          this.card_arr.push([
            card_suit_text[suit_rand],
            card_suit_value[number]
          ]);
          this.card_state.push({ opened: false, clickable: true });
        }
        count++;
      }
    }
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    this.card_arr = shuffle(shuffle(this.card_arr));
  },
  computed: {},
  components: {
    RenderCard
  }
};
</script>