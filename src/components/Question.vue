<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
export default {
    data() {
        return {
            questions: [],
            isNew: true,
            name :  null,
            type : "多選"
        }
    },
    methods: {
        ...mapActions(indexStore, ["updateLocation", "setQuestionniare"]),
        getQuestion() {
            let body = {
                id: sessionStorage.getItem("id")
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
                })
        },
        edit(name , type , answer){
            this.name = name ;
            this.type = type;
            console.log(name , type);
            this.isNew = false;
        }
    },
    mounted() {
        this.updateLocation(22),
            this.getQuestion();
    },
}
</script>

<template>
    <div class=" border-2 border-black rounded-md my-2">
        <div class=" flex">
            <h2>問題 :</h2>
            <input class=" border border-black rounded-md" type="text" v-model="name">
            <select class=" border border-black rounded-md px-5" name="" id="" v-model="type">
                <option value="單選">單選</option>
                <option value="多選">多選</option>
            </select>
        </div>

        <div class=" flex items-center justify-between">
            <div class=" flex ">
                <h2>選項 :</h2>
                <input class=" border border-black rounded-md " type="text">
                <p class=" font-bold font-mono text-sm m-0">(以;隔開選項)</p>
            </div>

            <div>
                <button v-if="isNew"
                    class=" border border-black rounded-md px-2 mx-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                    type="button">加入</button>
                <button v-else
                    class=" border border-black rounded-md px-2 mx-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                    type="button">編輯</button>
            </div>
        </div>

        <div class="value-table ">


            <table class=" w-full border-black">
                <tr class="text-center  border-black font-bold">
                    <th>選取</th>
                    <th>#</th>
                    <th>問題</th>
                    <th>種類</th>
                    <th>編輯</th>
                </tr>
                <tr class=" text-center" v-for="item in questions">
                    <td>
                        <input type="checkbox" name="" id="">
                    </td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.type }}</td>
                    <td>
                        <button
                            class=" border border-black rounded-md px-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                            type="button" @click="edit(item.name , item.type , item.answer)">編輯</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style></style>