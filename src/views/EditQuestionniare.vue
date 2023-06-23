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
        
    }
}
</script>

<template>
    <div>
        <div class=" py-2 router-box flex rounded-md bg-slate-400">
            <RouterLink :class="{ local: location === 21}" class=" text-black mx-1 text-xl font-bold" to="/edit/questionniare">問卷</RouterLink>
            <RouterLink class=" text-black mx-1 text-xl font-bold " to="">題目</RouterLink>
            <RouterLink class=" text-black mx-1 text-xl font-bold" to="">問卷回饋</RouterLink>
            <RouterLink class=" text-black mx-1 text-xl font-bold" to="">統計</RouterLink>
        </div>
        <RouterView />
    </div>
</template>

<style lang="scss" scoped>
    .local{
        background-color: white;
        border-radius: 10px;
        padding: 0 5px;
    }
</style>