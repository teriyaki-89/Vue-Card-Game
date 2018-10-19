<template>
<div class="wrapper">
          <div class="sample">
              <div v-if="visible" @submit.prevent="visible =! visible">
                  <form>
                      <div class="progress">
                          <div class="progress-bar bg-success" :style="getProgress"></div>
                      </div>
                      <!--<app-input v-for="(elem,key) in info" :key="key" :value="elem.value" :name="elem.name" :pattern="elem.pattern"
                          :index="key" :total="sum" :step="step" @child-input="onChildInput(key, $event )">
                      </app-input>-->               
                      <app-input v-for="(elem,key) in info" :key="key" :value.sync="elem.value" :name="elem.name" :pattern="elem.pattern"
                          :index="key" :total="sum" :step="step" @child-input="onChildInput(key, $event)">
                      </app-input>   
                      <button class="btn btn-primary" :disabled="sum < 100">
                          Send Data
                      </button>
                      <!--{{getProgress}} | {{sum}} -->
                  </form>
              </div>
              <div v-else>
                  <table class="table table-bordered">
                      <tr v-for="(value, key) in info" :key="key">
                          <td>{{value.name}}</td>
                          <td>{{value.value}}</td>
                      </tr>
                  </table>
                  <button class="btn btn-primary" type="button" v-on:click="visible =!visible">Go Back</button>
              </div>              
          </div>
    </div>
</template>
<script>
import AppInput from "./Input";
export default {
  data() {
    return {
      info: [
        {
          name: "Name",
          value: "",
          pattern: /^[a-zA-Z ]{2,30}$/
        },
        {
          name: "Phone",
          value: "",
          pattern: /^[0-9]{7,14}$/
        },
        {
          name: "Email",
          value: "",
          pattern: /.+/
        },
        {
          name: "Some Field 1",
          value: "",
          pattern: /.+/
        },
        {
          name: "Some Field 2",
          value: "",
          pattern: /.+/
        }
      ],
      styleArr: [],
      visible: true,
      sum: 0
      //ProgressChild: []
    };
  },
  methods: {
    onChildInput(key, e) {
      this.sum = e.sum;
      //this.info[key].value = e.value;
      /*if (e.valid && !this.ProgressChild[key]) {
        this.ProgressChild[key] = true;
        this.sum += step;
      } else if (!e.valid && this.ProgressChild[key]) {
        this.sum -= step;
        this.ProgressChild[key] = false;
      }*/
      console.log(e);
    }
  },
  computed: {
    step() {
      return (100 * 1) / this.info.length;
    },
    getProgress() {
      return {
        width: this.sum + "%"
      };
    }
  },
  components: {
    AppInput
  }
};
</script>