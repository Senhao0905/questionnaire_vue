<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    props: ["qid","isBack"],
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["location", "getLocation","anserCount"])
    },
    data() {
        return {
            isBack: !!sessionStorage.getItem("isBack")
        }
    },
    methods:{
        ...mapActions(indexStore, ["setData"]),
        getAnswerCount(){
            let body = {
                seq : this.qid
            }

            console.log(body)

            fetch("http://localhost:8080/get_record_count", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setData(data.resMap);
            })
        }
    },
    mounted() {
        this.getAnswerCount();
        console.log(this.qid)
        if (this.isBack) {
            this.$router.push({
                name: 'record.list',
                params: {
                    id: this.qid
                }
            })
        }
        else {
            this.$router.push({
                name: 'record.chart',
            })
        }

    }
}
</script>

<template>
    <div>
        <div class=" py-2 router-box flex rounded-md bg-slate-400">
            <RouterLink v-if="isBack"  :class="{ local: location === 23 }" class=" text-black mx-1 text-xl font-bold" :to="'/record'+qid+'/recordList'+qid">
                問卷回饋</RouterLink>
            <RouterLink  :class="{ local: location === 24 || location === 14 }" class=" text-black mx-1 text-xl font-bold " :to="'/record'+qid+'/recordChart'">
                統計</RouterLink>
        </div>
        <RouterView  :isBack="isBack" :qid="qid"  />
    </div>
</template>

<style lang="scss" scoped>
.local {
    background-color: white;
    border-radius: 10px;
    padding: 0 5px;
}
</style>