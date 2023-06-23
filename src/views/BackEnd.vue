<script>
import { mapActions } from 'pinia';
import indexStore from '../stores/indexStore.js';
import ListPageView from "../components/ListPage.vue"
export default {
    components: {
        ListPageView
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"]),
        getToday(){
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let date = today.getDate();
            this.day = year + "-" + month +"-" +date;
            console.log(this.day);
        }
    },
    mounted() {
        this.updateLocation(20)
        this.getToday();
    },
    data() {
        return {
            day: null,
            isWrite :false
        }
    }
}
</script>

<template>
    <div class="border-2 border-black rounded-md h-5/6 my-3 flex flex-col justify-between">
        <ListPageView  :day="day" :isWrite="isWrite"/>
    </div>
</template>

<style></style>