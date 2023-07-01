<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
import { reactive } from "vue";
export default {
    props: ["id"],
    data() {
        return {
            questionniare: null,
            questions: [],
            resAnswer: {},
        }
    },
    mounted() {
        console.log(this.answers);
        this.getQuestion();
    },
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["answers", "getAnswer", "resInfo"])
    },
    methods: {
        ...mapActions(indexStore, ["setAnswer", "setInfo", "setQuestions"]),
        getQuestion() {
            let body = {
                id: this.id
            }
            this.resInfo.questionnaireId = this.id;
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
                            answer: answer,
                            check: true,
                            error: false
                        })
                    })

                    console.log(this.questions);
                    if (Object.keys(this.answers).length == 0) {
                        this.questions.forEach((i, index) => {
                            console.log(index);
                            this.answers[index + 1] = []
                        })
                    }
                })

        },
        addValue(id, answer) {
            console.log(id);
            this.answers[id] = []
            this.answers[id].push(answer)
            this.answers[id].forEach(i => {
                console.log(i);
            })
            console.log(this.answers);
        },
        addValueCheck(id, answer, checked) {
            let check = document.getElementById(`${checked}`).checked;
            console.log(check);
            if (this.answers[id] == undefined) {
                this.answers[id] = [];
            }
            if (check) {
                this.answers[id].push(answer);
            }
            else {
                let arr = [];
                this.answers[id].forEach(i => {
                    if (i != answer) {
                        arr.push(i);
                    }
                })
                this.answers[id] = arr;
            }
            console.log(this.answers)
        },
        saveAnswer() {
            console.log(this.resInfo);
            console.log(this.resAnswer);
            this.questions.forEach((i, index) => {
                i.error = false;
            })
            if (this.resInfo.name === null || this.resInfo.name === "") {
                return alert("請輸入姓名 !");
            }
            if (this.resInfo.phone === null || this.resInfo.phone === "") {
                return alert("請輸入手機號碼 !");
            }
            if (this.resInfo.email === null || this.resInfo.email === "") {
                return alert("請輸入信箱 !");
            }
            if (this.resInfo.age === null) {
                return alert("請輸入年齡 !");
            }
            // if (Object.keys(this.answers).length !== this.questions.length) {
            //     return alert("請選擇答案後再送出 !");
            // }
            this.questions.forEach((item, index) => {
                if (item.check) {
                    if (this.answers[index + 1].length == 0) {
                        item.error = true;
                    }
                }
            })
            let errorCheck = false;
            this.questions.forEach(item => {
                if (item.error) {
                    errorCheck = true
                }
            })
            if (errorCheck) {
                alert("必填問題尚未選取");
                return;
            }
            else {
                console.log("123");
                this.setInfo(this.resInfo);
                this.setQuestions(this.questions);
                console.log(this.questionniare.name);
                this.$router.push({
                    name: 'check',
                    params: {
                        propText: this.questionniare.name
                    }
                })
            }

        },
        checkAge() {
            console.log("1")
            if (this.resInfo.age < 0) {
                alert("歲數不可小於0");
                this.resInfo.age = 0;
            }
        }
    }
}
</script>


<template>
    <div class=" w-full h-auto border border-black rounded-md">
        <h1 class=" text-center text-4xl font-mono">{{ questionniare === null ? "" : questionniare.name }}</h1>
        <h2 class=" my-5 mx-5 font-bold  text-xl font-mono">{{ questionniare === null ? "" : questionniare.describeText }}
        </h2>
        <div class=" my-2 flex w-full justify-start items-center">
            <h3 class="mx-5 font-bold">姓名 :</h3>
            <input type="text" class=" mx-5 border rounded-md border-black" v-model="resInfo.name">
        </div>
        <div class="my-2 flex w-full justify-start items-center">
            <h3 class=" mx-5 font-bold">手機 :</h3>
            <input type="text" class=" mx-5 border rounded-md border-black" v-model="resInfo.phone">
        </div>
        <div class="my-2 flex w-full justify-start items-center">
            <h3 class="mx-5 font-bold">信箱 :</h3>
            <input type="text" class=" mx-5 border rounded-md border-black" v-model="resInfo.email">
        </div>
        <div class="my-2 flex w-full justify-start items-center">
            <h3 class="mx-5 font-bold">年齡 :</h3>
            <input v-on:input="checkAge" type="number" class=" mx-5 border rounded-md border-black" v-model="resInfo.age">
        </div>

        <!-- 題目區 -->
        <div v-if="questions !== null">
            <div :class="{ error: item.error }" class="m-3  px-2 rounded-md" v-for="(item, index ) in questions">
                <h3>題號 :{{ index + 1 }}</h3>
                <div class=" flex">
                    <h3>Q : {{ item.name }}</h3>
                    <p class=" mx-2 text-red-500">(必填)</p>
                </div>

                <div v-if="item.type === '單選'">
                    <div v-for="i in item.answer">
                        <div v-if="Object.keys(this.answers).length === this.questions.length"
                            v-for="(value, key) in answers">

                            <div v-if="key == index + 1 && value.includes(i.id)">
                                <input type="radio" :name="item.name" :id="item.id + i.answerValue" :checked="true"
                                    @change="addValue((index + 1), i.id)" v-bind:value="i.id">
                                <label :for="item.id + i.answerValue">{{ i.answerValue }}</label>
                            </div>

                            <div v-if="key == index + 1 && !value.includes(i.id)">
                                <input type="radio" :name="item.name" :id="item.id + i.answerValue" :checked="false"
                                    @change="addValue((index + 1), i.id)" v-bind:value="i.id">
                                <label :for="item.id + i.answerValue">{{ i.answerValue }}</label>
                            </div>
                        </div>
                        <div v-else>
                            <input type="radio" :name="item.name" :id="item.id + i.answerValue"
                                @change="addValue((index + 1), i.id)" v-bind:value="i.id">
                            <label :for="item.id + i.answerValue">{{ i.answerValue }}</label>

                        </div>

                    </div>
                </div>
                <div v-else>
                    <div v-for="i in item.answer">
                        <div v-if="Object.keys(this.answers).length === this.questions.length"
                            v-for="(value, key) in answers">

                            <div v-if="key == index + 1 && value.includes(i.id)">

                                <input type="checkbox" :name="item.name" :id="item.id + i.id" :checked="true"
                                    @change="addValueCheck((index + 1), i.id, (item.id + i.id))" v-bind:value="i.id">
                                <label :for="item.id + i.id">{{ i.answerValue }}</label>
                            </div>

                            <div v-if="key == index + 1 && !value.includes(i.id)">
                                <input type="checkbox" :name="item.name" :id="item.id + i.id" :checked="false"
                                    @change="addValueCheck((index + 1), i.id, (item.id + i.id))" v-bind:value="i.id">
                                <label :for="item.id + i.id">{{ i.answerValue }}</label>
                            </div>
                        </div>
                        <div v-else>
                            <input type="checkbox" :name="item.name" :id="item.id + i.id"
                                @change="addValueCheck((index + 1), i.id, (item.id + i.id))" v-bind:value="i.id">
                            <label :for="item.id + i.id">{{ i.answerValue }}</label>

                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="w-full flex justify-center items-center">
            <button @click="saveAnswer" class="bg-blue-500 hover:bg-blue-400 text-white font-bold px-3 rounded-md my-2"
                type="button">預覽答案</button>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.error {
    border: 2px red solid;
    border-radius: 5px;
}
</style>