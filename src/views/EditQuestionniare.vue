<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    data() {
        return {
            isEdit: !!sessionStorage.getItem("isEdit"),
            questions: [],

        }
    },
    methods: {
        // 淺層拷貝   1.自己的資料 2.要取用的方法
        // mapActions => pinia:actions
        ...mapActions(indexStore, ["updateLocation", "setQuestionniare","setQuestions"]),
        getQuestion() {
            let body = {
                id: sessionStorage.getItem("id")
            }
            fetch("http://localhost:8080/questionniare_res", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    Object.keys(data.resMap).forEach(key => {
                        let id = key;
                        let name = null;
                        let type = null;
                        let answer = [];
                        let value = data.resMap[key];
                        Object.keys(value).forEach(key => {
                            name = key;
                            let value1 = value[key];
                            Object.keys(value1).forEach(key => {
                                type = key;
                                let value2 = value1[key];
                                Object.keys(value2).forEach(key => {
                                    answer.push({
                                        id: key,
                                        answerValue: value2[key]
                                    })
                                })
                            })
                        })
                        this.questions.push({
                            id: id,
                            name: name,
                            type: type,
                            answer: answer
                        })
                    })
                    console.log(this.questions);

                    this.setQuestions(this.questions);

                    this.$router.push({
                        name: 'edit.questionniare'
                    })
                })
        },
        getQuestionniare() {
            console.log(this.id);
            let body = {
                id: sessionStorage.getItem("id")
            }

            let questionnaire = {
                id: sessionStorage.getItem("id"),
                name: null,
                describeText: null,
                start: null,
                end: null
            }

            console.log(body);
            fetch("http://localhost:8080/questionniare_res", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    questionnaire.name = data.questionnaire.name;
                    questionnaire.describeText = data.questionnaire.describeText;
                    questionnaire.start = data.questionnaire.start;
                    questionnaire.end = data.questionnaire.end;
                    console.log(questionnaire)
                    this.setQuestionniare(questionnaire);
                    this.getQuestion();
                })
        }


    },
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["location", "getLocation"])
    }
    , created() {
        if (this.isEdit) {
            this.getQuestionniare();
        }
    },
    mounted() {

        console.log("到了edit");

    }
}
</script>

<template>
    <div>
        <div class=" py-2 router-box flex rounded-md bg-slate-400">
            <RouterLink :class="{ local: location === 21 }" class=" text-black mx-1 text-xl font-bold"
                to="/edit/questionniare">問卷</RouterLink>
            <RouterLink :class="{ local: location === 22 }" class=" text-black mx-1 text-xl font-bold " to="/edit/question">
                題目</RouterLink>
        </div>
        <RouterView :isEdit="isEdit" />
    </div>
</template>

<style lang="scss" scoped>
.local {
    background-color: white;
    border-radius: 10px;
    padding: 0 5px;
}
</style>