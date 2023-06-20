<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default{
    methods: {
        // 淺層拷貝   1.自己的資料 2.要取用的方法
        // mapActions => pinia:actions
        ...mapActions(indexStore, ["updateLocation"])


    },
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["location", "getLocation"])
    }
}
</script>

<template>
    <header class=" flex flex-col justify-center items-center">
        <h2 class=" text-4xl text-purple-500 font-bold">動態問卷系統</h2>
        <div class="router-box w-full flex justify-between">
            <RouterLink class=" text-purple-500 mx-3 text-2xl" :class="{ local: location === 1 }" to="/">問卷填寫</RouterLink>
            <RouterLink class=" text-purple-500 mx-3 text-2xl" :class="{ local: location === 2 }" to="/backEnd">問卷管理</RouterLink>
        </div>
        
    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 100px;
    border: 2px rgb(123, 31, 120) solid;
    border-radius: 10px;
    .local {
        transition: 0.7s;
        background-color: rgb(168 85 247);
        border-radius: 5px;
        color:white ;
        font-weight: bold;
    }
}
</style>