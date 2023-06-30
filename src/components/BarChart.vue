<script >
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
import Chart from 'chart.js/auto';
export default {
    methods: {
        ...mapActions(indexStore, ["setData"])
    },
    computed: {
        ...mapState(indexStore, ["location", "anserCount"])
    },
    data() {
        return {
            showData: [],
            title: [],
            noneCount: []
        }
    },
    props: ["sid", "index", "labels"],
    mounted() {
        console.log(this.sid)
        console.log(this.anserCount);
        this.labels[this.index].answer.forEach(i => {
            this.title.push(i.answerValue)
        })

        let indexCount = this.index + 1;
        if (this.anserCount == null) {
            this.noneCount = {};
            this.labels[this.index].answer.forEach(i => {
                this.noneCount[i.id] = 0;
            })
            console.log(this.noneCount);
            Object.keys(this.noneCount).forEach(key => {
                // this.labels.push(key);
                this.showData.push(this.noneCount[key])
            })
            let str = 's' + this.sid;
            let ctx = document.getElementById(str);
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: this.title,
                    datasets: [{
                        label: '# of Votes',
                        data: this.showData,
                        borderWidth: 1
                    }]
                },
                options: {


                }
            });
        }
        else {
            console.log(this.anserCount[indexCount]);
            Object.keys(this.anserCount[indexCount]).forEach(key => {
                // this.labels.push(key);
                this.showData.push(this.anserCount[indexCount][key])
            })
            let str = 's' + this.sid;
            let ctx = document.getElementById(str);
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: this.title,
                    datasets: [{
                        label: '# of Votes',
                        data: this.showData,
                        borderWidth: 1
                    }]
                },
                options: {
                }
            });
        }
    }
}


</script>

<template>
    <div class=" w-80 ">
        <canvas class="my-2" v-bind:id="'s' + this.sid"></canvas>
    </div>
</template>




