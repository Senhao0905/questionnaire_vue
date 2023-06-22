import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore("indexStore", {
  // data
  state: () => ({
      location : 0,
      answers : {},
      resInfo : {
        questionnaireId:null,
        name : null ,
        phone : null ,
        email : null ,
        age : null 
      },
      questions : null
  }),
  // computed
  getters: {
      getLocation: (state) => `現在的位置是: ${state.location}`,
      getAnswer(state){
        return state.answers
      },
      getInfo(state){
        return state.resInfo
      }
  },
  // methods
  // 可以用this 的區域
  actions:{
      updateLocation(local){
          this.location = local;
      },
      setAnswer(answer){
        this.answers = answer;
      },
      setInfo(info){
        this.resInfo = info;
      },
      setQuestions(questions){
        this.questions = questions;
      }
  }
});