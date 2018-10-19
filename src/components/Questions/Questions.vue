<template>
<div class="wrapper">
    <div class="sample">
        <!--<div v-if="!showRes">-->
            <form  @submit.prevent="">            
                <div v-for="(instance, index) in questionnaire" :key="index">                                                
                    <div style="min-height:240px" class="form-group" v-if="( (index >= iteration*per_page) && (index< (iteration+1)*per_page ) )" >
                        <div>{{instance.question}}</div>
                        <p v-for="(value, option, key) in instance.options" :key="key">
                            <input :type="instance.option_type" :name="index" :value="option" 
                            v-on:change="checkprogress(index, key, $event, option)" v-model="instance.answered"  >
                            {{value}}
                        </p>
                    </div>
                </div>  
                <div style="margin:10px; position:relative;">
                  <button v-if="iteration>0"  class="btn" v-on:click="iteration--">Back</button>
                  <button v-if="(iteration+1<this.questionnaire.length)" class="btn" v-on:click="iteration++">Next</button>
                  <div style="position:absolute; top:0px; left:130px;">
                    <button style="margin:0 3px" v-on:click="iteration=index"  class="btn"
                        v-for="(value, index) in pagi_arr" :key="index+'abc'">{{value}} 
                     </button>
                  </div>                
                </div>
                <button class="btn btn-primary" @click="showRes= !showRes">Check Answers</button>
            </form>    
            <div>
              <br>
              <table class="table table-striped ">
                <thead>
                    <tr>
                      <th>Question</th>
                      <th>Your answer</th>
                      <th>Points</th>
                    </tr>                    
                  </thead>
                <tbody>                  
                  <tr v-for="(instance, index) in questionnaire" :key="index" > 
                      <td>
                          <div>{{instance.question}}</div>
                      </td>
                      <td>
                          <ul>
                            <li v-for="(ans, i) in instance.answered" :key="i">{{ instance.options[ans]}}</li>
                          </ul>
                      </td>
                      <td>
                        {{instance.points }} / {{instance.correct.length}} 
                      </td>
                  </tr>
                </tbody>                  
              </table>
            </div>             
      
        <!--<button style="margin:10px;" class="btn btn-outline-info" v-on:click="show=!show" >Animate</button>  
        <transition  enter-active-class="animated lightSpeedIn" >
          <div :key="1" class="content alert alert-info  " v-if="show" >
            <p>some text for test purposes</p>
            <p>some text for test purposes</p>
            <p>some text for test purposes</p>
            <p>some text for test purposes</p>
          </div> 
          <div :key="2" class="content alert alert-warning " v-else >
            <p>some text for test purposes</p>
            <p>some text for test purposes</p>
            <p>some text for test purposes</p>
            <p>some text for test purposes</p>
          </div>
          </transition> -->           
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      per_page: 1,
      iteration: 0,
      showRes: false,
      pagi_arr: [],
      questionnaire: [
        {
          question: "which tag is used for ordered lists?",
          options: {
            a: "ul",
            b: "ol",
            c: "bl",
            d: "pl"
          },
          correct: ["b"],
          option_type: "radio"
        },
        {
          question: "which tag is used for css markup?",
          options: {
            a: "head",
            b: "body",
            c: "table",
            d: "style",
            e: "class"
          },
          correct: ["d", "e"],
          option_type: "checkbox"
        },
        {
          question: "which programming language is the best?",
          options: {
            a: "python",
            b: "java",
            c: "c++",
            d: "node.js",
            e: "all"
          },
          correct: ["e"],
          option_type: "checkbox"
        }
      ]
    };
  },
  beforeMount() {
    let j = Math.round(this.questionnaire.length / this.per_page);
    for (let i = 0; i < j; i++) {
      this.$set(this.pagi_arr, i, i + 1);
    }
  },
  created() {
    this.questionnaire.forEach(elem => {
      elem.answered = [];
      elem.points = 0;
    });
  },
  methods: {
    checkprogress(index, key, e, answer) {
      let instance = this.questionnaire[index];

      let length = instance.answered.length;

      let count = 0;
      for (let i = 0; i < length; i++) {
        let check = instance.answered[i];
        if (instance.correct.includes(check)) {
          count++;
        } else {
          count--;
        }
      }
      count < 0 ? (count = 0) : count;
      this.questionnaire[index].points = count;
      this.$set(this.questionnaire, index, this.questionnaire[index]);
    }
  },
  computed: {
    getAnswered() {
      return this.questionnaire[1].answered;
    }
  }
};
</script>