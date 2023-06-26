<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    props: ["qid"],
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["location", "getLocation"])
    },
    data() {
        return {
            isBack: !!sessionStorage.getItem("isBack")
        }
    },
    mounted() {
        if (this.isBack) {
            this.$router.push({
                name: 'record.list',
                params: {
                    id: this.qid
                }
            })
        }
        else {
            // this.$router.push({
            //     name: 'record.list',
            //     params: {
            //         id: this.id
            //     }
            // })
        }

    }
}
</script>

<template>
    <div>
        <div class=" py-2 router-box flex rounded-md bg-slate-400">
            <RouterLink v-if="isBack" :class="{ local: location === 23 }" class=" text-black mx-1 text-xl font-bold" to="">
                問卷回饋</RouterLink>
            <RouterLink :class="{ local: location === 24 }" class=" text-black mx-1 text-xl font-bold " to="">
                統計</RouterLink>
        </div>
        <RouterView :isBack="isBack" />
    </div>
</template>

<style lang="scss" scoped>
.local {
    background-color: white;
    border-radius: 10px;
    padding: 0 5px;
}
</style>