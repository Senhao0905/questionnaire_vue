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
    }
}
</script>

<template>
    <header class=" bg-slate-300 flex flex-col justify-center items-center">
        <h2 class=" w-full text-center  text-4xl  font-bold  rounded-xl">
            <p class=" stroke-2 stroke-red-500">動態問卷</p>
        </h2>
        <div class="router-box w-full flex justify-between">
            <RouterLink class=" text-blue-500 mx-3 text-2xl font-bold" :class="{ local: 9 < location && 20 > location }"
                to="/">問卷填寫</RouterLink>
            <RouterLink class=" text-blue-500 mx-3 text-2xl font-bold" :class="{ local: 19 < location && location < 30 }"
                to="/backEnd">問卷管理
            </RouterLink>
        </div>

    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 100px;
    border-radius: 10px;

    .local {
        font-size: 30px;
        border-radius: 5px;
        transition: 0.9s;
        background: white;
        padding: 0 10px;
        color: rgb(34, 56, 81);
    }
}</style>