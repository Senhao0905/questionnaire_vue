<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default{
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["answers", "resInfo"])
    },
    mounted(){
        console.log(this.answers);
        console.log(this.resInfo);

    }
}
</script>


<template>
    <div>
        <h2>check</h2>
    </div>
</template>

<style>
</style>