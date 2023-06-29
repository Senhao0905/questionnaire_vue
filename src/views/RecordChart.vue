<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
import BarChart from "../components/BarChart.vue"
export default {
    data() {
        return {
            questions: [],
            answer: null,
            data: [],
            labels:null
        }
    },
    props: ["qid", "isBack"],
    components: {
        BarChart
    },
    computed: {
        ...mapState(indexStore, ["location", "anserCount"])
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation", "setData"]),
        getQuestion(questioniareId) {
            console.log(questioniareId);

            let body = {
                id: questioniareId
            }
            fetch("http://localhost:8080/questionniare_res", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    Object.keys(data.resMap).forEach(key => {
                        let id = key;
                        let name = null;
                        let type = null;
                        let answer = [];
                        let value = data.resMap[key];
                        Object.keys(value).forEach(key => {
                            name = key;
                            let value1 = value[key];
                            Object.keys(value1).forEach(key => {
                                type = key;
                                let value2 = value1[key];
                                Object.keys(value2).forEach(key => {
                                    answer.push({
                                        id: key,
                                        answerValue: value2[key]
                                    })
                                })
                            })
                        })

                        
                        this.questions.push({
                            id: id,
                            name: name,
                            type: type,
                            answer: answer
                        })
                    })
                    console.log(this.questions);
                    this.labels = this.questions;
                }) 
        },
        backPage(){
            if(this.isBack){
                this.$router.back();
               
            
            }
            this.$router.push({
                name : 'FrontEnd'
            })
        }
    },
    mounted() {
        if (this.isBack) {
            this.updateLocation(24)
        }
        else {
            this.updateLocation(14)
        }
        this.getQuestion(this.qid);
        

    }
}
</script>

<template>
    <i class="fa-solid fa-arrow-left-long text-4xl hover:scale-105 cursor-pointer" @click="backPage"></i>
    <div class=" my-2 border border-black rounded-md">
        <div class="border-b border-black"  v-for="(item, index) in questions" :key="item.id">
        <h2>第{{ index + 1 }}題:</h2>
        <h2>{{ item.name }}</h2>

        <div class="flex ">
            <p class=" mx-2" v-for="i in item.answer">{{ i.id }}:{{ i.answerValue }}</p>
        </div>
        <div class=" w-full ">
            <BarChart class=" mx-auto my-0" :sid="item.id" :index="index" :labels="labels" />
        </div>
        
    </div>
    </div>
    
</template>

<style></style>