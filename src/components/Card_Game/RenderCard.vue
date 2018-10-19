<template>
<div style="width:500px;">  
    <div v-for="(value, index) in parent_val" :key="index">        
        <transition  enter-active-class="animated flipInY" >
            <div :key="1" class="card" v-if="!parent_card_state[index].opened" v-on:click="ChildTouchCard(index)">
            </div>
            <div :key="2" class="card" v-else v-on:click="ChildTouchCard(index)">
                <div class="card_suit" :class="RenderCardSuit(value)"></div>
                <div class="card_value">{{value[1]}}</div>
            </div>
        </transition>
        
    </div>
</div>
</template>
<script>
export default {
  props: ["parent_val", "parent_card_state"],
  data() {
    return {};
  },
  methods: {
    RenderCardSuit(value) {
      let result = "";
      if (value[0] == "hearts") {
        result = "fas fa-heart";
      } else if (value[0] == "spade") {
        result = "fas fa-gem";
      } else if (value[0] == "clubs") {
        result = "fas fa-spa";
      } else if (value[0] == "diamonds") {
        result = "fas fa-crown";
      }
      return result;
    },
    ChildTouchCard(index) {
      if (this.parent_card_state[index].clickable) {
        this.$emit("childtouch", index);
      }
    }
  }
};
</script>
<style>
.card {
  width: 100px;
  height: 200px;
  background: #ccc;
  float: left;
  margin: 10px;
  border-radius: 5px;
  position: relative;
}
.fa-heart,
.fa-spa {
  color: red;
}
.card_suit {
  /* position: absolute;*/
  bottom: 30px;
  margin: 100% auto 0 auto;
}
.card_value {
  bottom: 20px;
  position: absolute;
  text-align: center;
  width: 100%;
}
.animated {
  transition-duration: 2s;
}
</style>    