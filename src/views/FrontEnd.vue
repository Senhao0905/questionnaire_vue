<script>
import { mapActions } from 'pinia';
import indexStore from '../stores/indexStore.js';
import ListPageView from '../components/ListPage.vue';

export default {
    components:{
        ListPageView
    },
    data() {
        return {
            day: null
        }
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
        this.updateLocation(1);
        this.getToday();
    }
}

</script>

<template>
    
    <div class="border-2 border-black rounded-md h-2/3 my-3">
        <ListPageView :day="day"/>
    </div>
</template>

<style lang="scss" scoped>


</style>