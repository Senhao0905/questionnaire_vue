<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    props: ["id"],
    data() {
        return {
            recordList : null
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation"]),
        getRecord() {
            let body = {
                id: this.id
            }

            fetch("http://localhost:8080/get_record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.recordList = data.records;
                })

        },
        checkInfo(seq){
            console.log(seq);
        }
    },
    mounted() {
        this.updateLocation(23)
        this.getRecord();
    }
}
</script>


<template>
    <div>
        <table class=" w-full border-black">
            <tr class="text-center  border-black font-bold">
                <th>#</th>
                <th>姓名</th>
                <th>填寫時間</th>
                <th>觀看細節</th>  
            </tr>

            <tr v-if="recordList !== null" v-for="( item , index ) in  recordList" class=" text-center font-bold">
                <th>{{ recordList === null ? "" : index+1  }}</th>
                <th>{{ recordList === null ? "" : item.name  }}</th>
                <th>{{ recordList === null ? "" : item.localDateTime }}</th>
                <th><p class=" text-blue-600 font-mono font-bold cursor-pointer " @click="checkInfo(item.seq)">查看</p></th>
            </tr>
        </table>
    </div>
</template>

<style></style>