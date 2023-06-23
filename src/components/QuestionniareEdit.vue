<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    methods: {
        // 淺層拷貝   1.自己的資料 2.要取用的方法
        // mapActions => pinia:actions
        ...mapActions(indexStore, ["updateLocation"])


    },
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["location", "getLocation"])
    },
    mounted(){
        this.updateLocation(21);
    }
}
</script>


<template>
    <div>
        <h2>questionnaire</h2>
    </div>
</template>

<style>
</style>