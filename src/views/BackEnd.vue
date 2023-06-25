<script>
import { mapActions } from 'pinia';
import indexStore from '../stores/indexStore.js';
import ListPageView from "../components/ListPage.vue"
export default {
    components: {
        ListPageView
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation", "reset","setQuestionniare","setQuestions"]),
        getToday() {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            if (month < 10) {
                month = '0' + month
            }
            let date = today.getDate();
            if (date < 10) {
                date = '0' + date
            }
            this.day = year + "-" + month + "-" + date;
            this.start = this.day;
            console.log(this.day);
        }
    },
    mounted() {
        this.updateLocation(20)
        
        let questionnaire = {
            id: null,
            name: null,
            describeText: null,
            start: null,
            end: null
        }
        this.setQuestionniare(questionnaire);
        let questions = [];
        this.setQuestions(questions);
        sessionStorage.setItem("id",null);
        this.getToday();

    },
    data() {
        return {
            day: null,
            isWrite: false
        }
    }
}
</script>

<template>
    <div class="border-2 border-black rounded-md h-5/6 my-3 flex flex-col justify-between">
        <ListPageView :day="day" :isWrite="isWrite" />
    </div>
</template>

<style></style>