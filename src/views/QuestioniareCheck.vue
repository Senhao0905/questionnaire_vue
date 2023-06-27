<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    props: ["propText"],
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["answers", "resInfo", "questions"])
    },
    mounted() {
        console.log(this.answers);
        console.log(this.resInfo);
        console.log(this.propText)
    },
    methods: {
        bacePage() {
            this.$router.back();
        },
        saveQuestioniare() {
            let body = {
                record: this.resInfo,
                answers: this.answers
            }

            console.log(body);

            fetch("http://localhost:8080/add_record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.message === "Successful !") {
                        alert("謝謝您的回答 !");
                        location.href = "/"
                    }
                    else {
                        alert("伺服器錯誤")
                    }
                })
        }
    }
}
</script>


<template>
    <div class=" w-full h-auto border border-black rounded-md">
        <h1 class=" text-4xl font-bold font-mono text-center">{{ propText === undefined ? "" : propText }}</h1>
        <div class=" my-2 flex w-full justify-start items-center">
            <h3 class="mx-5 font-bold">姓名 :</h3>
            <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.name }}</h3>
        </div>
        <div class="my-2 flex w-full justify-start items-center">
            <h3 class=" mx-5 font-bold">手機 :</h3>
            <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.phone }}</h3>
        </div>
        <div class="my-2 flex w-full justify-start items-center">
            <h3 class="mx-5 font-bold">信箱 :</h3>
            <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.email }}</h3>
        </div>
        <div class="my-2 flex w-full justify-start items-center">
            <h3 class="mx-5 font-bold">年齡 :</h3>
            <h3 class="mx-5 font-bold">{{ resInfo === null ? "" : resInfo.age }}</h3>
        </div>

        <!-- 題目區 -->

        <div v-if="questions !== null">
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
                                <input :disabled="true" type="checkbox" :name="item.name" :id="item.id + i.id"
                                    :checked="true">
                                <label :for="item.id + i.id">{{ i.answerValue }}</label>
                            </div>
                            <div v-if="key == index + 1 && !value.includes(i.id)">
                                <input :disabled="true" type="radio" :name="item.name" :id="item.id + i.answerValue"
                                    :checked="false">
                                <label :for="item.id + i.answerValue">{{ i.answerValue }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 按鈕功能區 -->
        <div class=" w-full flex justify-center items-center">
            <button class=" mx-3 bg-blue-500 px-2 rounded-md text-white font-bold hover:bg-blue-400" type="button"
                @click="bacePage">返回修改</button>
            <button class=" mx-3 bg-blue-500 px-2 rounded-md text-white font-bold hover:bg-blue-400" type="button"
                @click="saveQuestioniare">送出問卷</button>
        </div>
    </div>
</template>

<style></style>