<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    data() {
        return {
            day: null,
            start: null,
            end: null,
            name: null,
            textValue: null,
            questions: []
        }
    },
    methods: {
        // 淺層拷貝   1.自己的資料 2.要取用的方法
        // mapActions => pinia:actions
        ...mapActions(indexStore, ["updateLocation", "setQuestionniare", "setQuestion"]),
        getToday() {
            console.log("取時間")
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            if (month < 10) {
                month = '0' + month
            }
            let endMonth = today.getMonth() + 1;
            let date = today.getDate();
            if (date < 10) {
                date = '0' + date
            }

            let endDate = today.getDate() + 7;
            const lastDayOfMonth = new Date(year, month, 0).getDate();
            if (endDate > lastDayOfMonth) {
                endMonth += 1;
                endDate -= lastDayOfMonth;
                if (endMonth < 10) {
                    endMonth = '0' + endMonth;
                }
                if (endDate < 10) {
                    endDate = '0' + endDate
                }
            }
            this.day = year + "-" + month + "-" + date;
            this.end = year + "-" + endMonth + "-" + endDate;
            this.start = this.day;
            console.log(this.day);
            console.log(this.end);
        },
        saveQuestionniare() {
            console.log(sessionStorage.getItem("id"));
            if (this.name === "" || this.name == null || this.textValue === "" || this.textValue == null
                || this.start == null || this.end == null) {

                alert("內容有誤");
                return;
            }

            let questionnaire = {
                id: sessionStorage.getItem("id") != null ? sessionStorage.getItem('id') : null,
                name: this.name,
                describeText: this.textValue,
                start: this.start,
                end: this.end
            }

            this.setQuestionniare(questionnaire);
            console.log(questionnaire);
            this.$router.push({
                name: 'edit.question'
            })

        },
        getQuestionniare() {
            console.log(this.questionnaire);
            if (this.questionnaire.name != null) {
                this.name = this.questionnaire.name;
                console.log(this.name)
                this.textValue = this.questionnaire.describeText;
                this.start = this.questionnaire.start;
                this.end = this.questionnaire.end;
            }

        }

    },
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["location", "getLocation", "questionnaire"])
    },
    mounted() {
        console.log("到了questionniare");
        this.updateLocation(21);
        this.getToday();
        this.getQuestionniare();

    },
    props: ["isEdit"]
}
</script>


<template>
    <div class=" border-2 border-black rounded-md my-2">
        <div class="flex px-2 my-2">
            <h2>問卷名稱 : </h2>
            <input class=" border border-black rounded-md mx-2" type="text" v-model="name">
        </div>

        <div class=" flex px-2 my-2">
            <h2>描述內容 :</h2>
            <textarea class=" border resize-none border-black rounded-md mx-2" resize="none" name="" id="" cols="50" rows="5"
                v-model="textValue"></textarea>
        </div>

        <div class=" flex px-2 my-2">
            <h2>開始時間 :</h2>
            <input class="border border-black rounded-md px-2 mx-2" type="date" v-model="start" :min="day">
        </div>

        <div class=" flex px-2 my-2">
            <h2>結束時間 :</h2>
            <input class="border border-black rounded-md px-2 mx-2" type="date" v-model="end" :min="start">
        </div>

        <div class=" w-full flex justify-end ">
            <i class=" mx-2 fa-solid fa-arrow-right-long text-4xl hover:scale-105  cursor-pointer"
                @click="saveQuestionniare"></i>
        </div>
    </div>
</template>

<style></style>