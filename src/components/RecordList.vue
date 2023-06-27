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
        checkInfo(s){
            console.log(s);
            this.$router.push({
                name : 'record.info',
                params : {
                    seq : s,
                }
            })
        },
        backPage(){
            this.$router.push({
                name : 'BackEnd'
            });
        }
    },
    mounted() {
        this.updateLocation(23)
        this.getRecord();
    }
}
</script>


<template>
    <div class=" border-b border-black rounded-md my-2">
        <i class="fa-solid fa-arrow-left-long text-4xl hover:scale-105 cursor-pointer" @click="backPage"></i>
        <table class=" w-full border-black">
            <tr class="text-center border rounded-md  border-black font-bold">
                <th class=" border-r border-black rounded-md">#</th>
                <th>姓名</th>
                <th>填寫時間</th>
                <th>觀看細節</th>  
            </tr>

            <tr v-if="recordList !== null" v-for="( item , index ) in  recordList" class=" text-center font-bold">
                <th class=" border-r border-l  border-black rounded-md">{{ recordList === null ? "" : index+1  }}</th>
                <th class=" border-r border-black rounded-md">{{ recordList === null ? "" : item.name  }}</th>
                <th class=" border-r border-black rounded-md"> {{ recordList === null ? "" : item.localDateTime }}</th>
                <th class=" border-r border-black rounded-md"><p class=" text-blue-600 font-mono font-bold cursor-pointer " @click="checkInfo(item.seq)">查看</p></th>
            </tr>
        </table>
    </div>
</template>

<style></style>