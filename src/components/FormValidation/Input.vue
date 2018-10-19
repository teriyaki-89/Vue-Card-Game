<template>
    <div class="form-group" >
            <label>{{name}}</label> <i :class="className"></i>
            <input type=" text" class="form-control" :value="value" v-on:input="onInput(index, $event)">
    </div>
</template>
<script>
export default {
  props: ["name", "value", "pattern", "index", "total", "step"],
  data() {
    return {
      childProgress: []
    };
  },
  mounted() {},
  methods: {
    onInput(key, e) {
      //console.log(key);
      let status = 0;
      let valid = this.pattern.test(e.target.value);
      if (valid && !this.childProgress[key]) {
        status += this.step;
        this.childProgress[key] = true;
      } else if (!valid && this.childProgress[key]) {
        status -= this.step;
        this.childProgress[key] = false;
      }
      if (status !== 0) {
        this.$emit("child-input", {
          sum: this.total + status
        });
      }
      // sync component
      this.$emit("update:value", e.target.value);
    }
  },
  computed: {
    className(index) {
      if (this.value == "") {
        return "fa";
      } else if (this.pattern.test(this.value)) {
        return "fa fa-check-circle text-success";
      } else {
        return "fa fa-exclamation-circle text-danger";
      }
    }
  }
};
</script>
