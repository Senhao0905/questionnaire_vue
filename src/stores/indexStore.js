import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore("indexStore", {
  // data
  state: () => ({
    location: 0,
    answers: {},
    resInfo: {
      questionnaireId: null,
      name: null,
      phone: null,
      email: null,
      age: null
    },
    questions: [],
    questionnaire: {
      id: null,
      name: null,
      describeText: null,
      start: null,
      end: null
    },
    waitSaveQuestionniare: null,
    questEdit: []
  }),
  // computed
  getters: {
    getLocation: (state) => `現在的位置是: ${state.location}`,
    getAnswer(state) {
      return state.answers
    },
    getInfo(state) {
      return state.resInfo
    }
  },
  // methods
  // 可以用this 的區域
  actions: {
    reset() {
      this.questionnaire = {
        id: null,
        name: null,
        describeText: null,
        start: null,
        end: null
      }
    },
    updateLocation(local) {
      this.location = local;
    },
    setAnswer(answer) {
      this.answers = answer;
    },
    setInfo(info) {
      this.resInfo = info;
    },
    setQuestions(questions) {
      this.questions = questions;
    },
    updateQuestions(questions) {
      this.questions.forEach(i => {
        console.log(i);
        if (i.name == questions.name) {
          console.log("找到")
          i.id = questions.id;
          i.name = questions.name;
          i.type = questions.type;
          i.answer = questions.answer;
        }
      })
      console.log(this.questions);
    },
    delQuestions(name) {
      this.questions = this.questions.filter(item => {
        return item.name !== name;
    })
      console.log(this.questions);
    },
    insertQuestions(question){
      this.questions.push(question);
    },
    setQuestionniare(questionniare) {
      this.questionnaire = questionniare;
    },
    setQuestion(questEdit) {
      this.questEdit = questEdit;
    },
    updateEdit(questEdit) {
      this.questEdit.forEach(i => {
        console.log(i.id);
        if (i.id == questEdit.seq) {
          console.log(i.id);
          console.log(questEdit.seq)
          i = questEdit;
          console.log(i)
        }
      })
    }
  }
});