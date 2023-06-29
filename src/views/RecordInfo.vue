<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    props: ["seq","qid","isBack"],
    data() {
        return {
            resInfo: null,
            questionniare: null,
            questions: [],
            answers: null,
            resData: []
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation", "setData"]),
        getRecordInfo() {
            let body = {
                seq: this.seq
            }

            console.log(body)

            fetch("http://localhost:8080/get_record_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.answers = data.answers
                    this.resInfo = data.record
                    console.log(this.resInfo)
                    console.log(this.answers)
                    this.getQuestion(this.resInfo.questionnaireId);
                })
        },
        getQuestion(questioniareId) {
            console.log(questioniareId);

            let body = {
                id: questioniareId
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
                    this.questionniare = data.questionnaire;
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
                })
        },
        backPage() {
            this.$router.back();
        },
        getAnswer() {
            let body = {
                seq: this.qid
            }
            console.log(body);
            fetch("http://localhost:8080/get_record_count", {
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

                        this.resData.push(data.resMap[key])
                    })

                    this.setData(this.resData);
                })
        }
    },
    mounted() {
        this.getRecordInfo();
        // this.getAnswer();
    }
}
</script>

<template>
    <i class="fa-solid fa-arrow-left-long text-4xl hover:scale-105 cursor-pointer" @click="backPage"></i>
    <div class=" my-2">
        <div class=" w-full h-auto border border-black rounded-md">
            <div class=" my-2 flex w-full justify-start items-center">
                <h3 class="mx-5 font-bold">姓名 :</h3>
                <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.name }}</h3>


                <h3 class=" mx-5 font-bold">手機 :</h3>
                <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.phone }}</h3>
            </div>
            <div class="my-2 flex w-full justify-start items-center">
                <h3 class="mx-5 font-bold">信箱 :</h3>
                <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.email }}</h3>

                <h3 class="mx-5 font-bold">年齡 :</h3>
                <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.age }}</h3>
            </div>
        </div>
    </div>


    <div class=" border border-black rounded-md " v-if="questions !== null">
        <div class="m-3" v-for=" ( item, index ) in questions">
            <h3>題號 :{{ index + 1 }}</h3>
            <h3>Q : {{ item.name }}</h3>
            <div v-if="item.type === '單選'">
                <div v-for="i in item.answer">
                    <div v-for="(value, key) in answers">
                        <div v-for="ans in value">
                            <div v-if="key == index + 1 && ans === i.id">
                                <input :disabled="true" type="radio" :name="item.name" :id="item.id + i.answerValue"
                                    :checked="true">
                                <label :for="item.id + i.answerValue">{{ i.answerValue }}</label>
                            </div>
                            <div v-if="key == index + 1 && ans !== i.id">
                                <input :disabled="true" type="radio" :name="item.name" :id="item.id + i.answerValue"
                                    :checked="false">
                                <label :for="item.id + i.answerValue">{{ i.answerValue }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div v-for="i in item.answer">
                    <div v-for="(value, key) in answers">
                        <div v-if="key == index + 1 && value.includes(i.id)">
                            <input :disabled="true" type="checkbox" :name="item.name" :id="item.id + i.id" :checked="true">
                            <label :for="item.id + i.id">{{ i.answerValue }}</label>
                        </div>
                        <div v-if="key == index + 1 && !value.includes(i.id)">
                            <input :disabled="true" type="checkbox" :name="item.name" :id="item.id + i.answerValue"
                                :checked="false">
                            <label :for="item.id + i.answerValue">{{ i.answerValue }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>