<script>
import { mapActions } from 'pinia';
import indexStore from '../stores/indexStore.js';
import ListPageView from '../components/ListPage.vue';

export default {
    components: {
        ListPageView
    },
    data() {
        return {
            day: null,
            isWrite: true
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation", "setInfo", "setQuestions", "setAnswer"]),
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

        this.updateLocation(10);
        let resInfo = {
            questionnaireId: null,
            name: null,
            phone: null,
            email: null,
            age: null
        };

        this.setInfo(resInfo);
        let answer = {};
        this.setAnswer(answer)
        sessionStorage.setItem("id", null);
        this.getToday();
    }
}

</script>

<template>
    <div class="border-2 border-black rounded-md h-5/6 my-3 ">
        <ListPageView :day="day" :isWrite="isWrite" />
    </div>
</template>

<style lang="scss" scoped></style>