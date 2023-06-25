<script>
import { mapStores, mapActions, mapState } from "pinia";
import indexStore from "../stores/indexStore.js";
import { onScopeDispose } from "vue";
export default {
    data() {
        return {
            name: null,
            type: "多選",
            id: null,
            select: null,
            delArr: [],
            isNew: true
        }
    },
    computed: {
        // mapState => pinia:state , getters
        ...mapState(indexStore, ["location", "getLocation", "questEdit", "questions", "questionnaire"])
    },
    methods: {
        ...mapActions(indexStore, ["insertQuestions", "updateLocation", "setQuestionniare", "setQuestion", "updateQuestions", "delQuestions","setQuestions"]),
        edit(id, name, type, answer) {
            this.id = id;
            this.name = name;
            this.type = type;
            let answerArr = [];
            answer.forEach(i => {
                answerArr.push(i.answerValue)
            })
            let answerStr = answerArr.join(";")
            this.select = answerStr;
            this.isNew = false;
        },
        saveEdit() {
            let resArr = this.select.split(";");
            let resAnswers = [];
            resArr.forEach((i, index) => {
                index += 1;
                let indexStr = index + "";
                resAnswers.push({
                    id: indexStr,
                    answerValue: i
                })
            })

            console.log(resAnswers);

            let body = {
                "id": this.id,
                "name": this.name,
                "type": this.type,
                "answer": resAnswers
            }

            console.log(body);

            this.updateQuestions(body);

            this.name = null;
            this.select = null;
        },
        del() {
            if (this.delArr.length == 0) {
                alert("未點選任何選項");
                return;
            }
            let yes = confirm('你確定要刪除嗎？');
            if (yes) {
                this.delArr.forEach(i => {
                    this.delQuestions(i);
                })
            }
        },
        insert() {
            this.isNew = true;
            this.name = null,
                this.type = "單選";
            this.select = null;
        },
        saveInsert() {
            if (this.name == null || this.type == null || this.select == null) {
                alert("請輸入正確的內容再送出");
                return;
            }
            let resArr = this.select.split(";");
            let resAnswers = [];
            resArr.forEach((i, index) => {
                index += 1;
                let indexStr = index + "";
                resAnswers.push({
                    id: indexStr,
                    answerValue: i
                });
            })

            console.log(resAnswers);

            let body = {
                "id": null,
                "name": this.name,
                "type": this.type,
                "answer": resAnswers
            }

            console.log(body)
            this.insertQuestions(body);

        },
        backQuestionniare() {
            this.$router.push({
                name: 'edit.questionniare'
            })
        },
        saveChangeQuestion() {
            let newQuestion = [];
            newQuestion = this.questions.filter(i => {
                return i.id === null
            })
            let updateQuestion = this.questions.filter(i => {
                return i.id !== null
            })
            console.log(updateQuestion);
            updateQuestion.forEach(i => {
                let resAnswer = {};
                i.answer.forEach(item => {
                    resAnswer[item.id] = item.answerValue
                })
                console.log(resAnswer)
                let boddy = {
                    seq: i.id,
                    questionnaireId: sessionStorage.getItem("id"),
                    name: i.name,
                    type: i.type,
                    answers: resAnswer
                }

                console.log(boddy)

                fetch("http://localhost:8080/update_question", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(boddy)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            })
            console.log(newQuestion)
            newQuestion.forEach(i => {
                console.log(i);
                let resAnswer = {};
                i.answer.forEach(item => {
                    resAnswer[item.id] = item.answerValue
                })
                console.log(resAnswer)
                let boddy = {
                    questionnaireId: sessionStorage.getItem("id"),
                    name: i.name,
                    type: i.type,
                    answers: resAnswer
                }

                console.log(boddy)

                fetch("http://localhost:8080/add_question", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(boddy)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        let questions = [];
                        this.setQuestions(questions);

                        alert("儲存成功");
                        location.href = '/backEnd'
                    })
            })
        },
        saveChange() {
            console.log(this.questionnaire);
            if (this.questions.length <= 0) {
                    alert("請新增問題 !");
                    return;
                }
            if (this.isEdit) {
                let body = {
                    questionnaire: this.questionnaire
                }
                fetch("http://localhost:8080/update_questionnaire", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.message !== "Successful !") {
                            alert("問卷內容有錯誤 !");
                            return;
                        }
                        let questionnaire = {
                            id: null,
                            name: null,
                            describeText: null,
                            start: null,
                            end: null
                        }
                        this.setQuestionniare(questionnaire);
                        this.saveChangeQuestion();
                    })
                console.log(this.questions);
            }
            else {
                let body = {
                    questionnaire: {
                        name: this.questionnaire.name,
                        describeText: this.questionnaire.describeText,
                        start: this.questionnaire.start,
                        end: this.questionnaire.end
                    }

                }
                console.log(body);
                fetch("http://localhost:8080/add_questionnaire", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.message !== "Successful !") {
                            alert("問卷內容有錯誤 !");
                            return;
                        }
                        let questionnaire = {
                            id: null,
                            name: null,
                            describeText: null,
                            start: null,
                            end: null
                        }
                        this.setQuestionniare(questionnaire);
                        sessionStorage.setItem("id",data.questionnaire.id);
                        this.saveChangeQuestion();
                    })
                
                
            }





        }
    },
    mounted() {
        this.updateLocation(22);
        if (!this.isEdit) {
            // this.getQuestion();
            this.setQuestion([]);
        }
    },
    props: ["isEdit"]
}
</script>

<template>
    <div class=" border-2 border-black rounded-md my-2">
        <div class=" flex">
            <h2>問題 :</h2>
            <input class=" border border-black rounded-md px-2" type="text" v-model="name">
            <select class=" border border-black rounded-md px-5" name="" id="" v-model="type">
                <option value="單選">單選</option>
                <option value="多選">多選</option>
            </select>
        </div>

        <div class=" flex items-center justify-between">
            <div class=" flex ">
                <h2>選項 :</h2>
                <input class=" border border-black rounded-md px-2" type="text" v-model="select">
                <p class=" font-bold font-mono text-sm m-0">(以;隔開選項)</p>
            </div>

            <div>
                <button v-if="isNew"
                    class=" border border-black rounded-md px-2 mx-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                    type="button" @click="saveInsert">加入</button>
                <button v-else
                    class=" border border-black rounded-md px-2 mx-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                    type="button" @click="saveEdit">存檔</button>
            </div>
        </div>

        <div class="fuction-box">
            <i @click="del" class=" mx-3 my-2 fa-solid fa-trash-can text-2xl hover:scale-105 cursor-pointer"></i>
            <i @click="insert" class="fa-solid fa-plus text-2xl hover:scale-105 cursor-pointer"></i>
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
                <tr class=" text-center" v-for="( item, index ) in questions">
                    <td>
                        <input type="checkbox" :value="item.name" id="" v-model="delArr">
                    </td>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.type }}</td>
                    <td>
                        <button
                            class=" border border-black rounded-md px-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                            type="button" @click="edit(item.id, item.name, item.type, item.answer)">編輯</button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="flex justify-between">
            <i @click="backQuestionniare"
                class="mx-2 fa-solid fa-arrow-left-long text-4xl hover:scale-105  cursor-pointer"></i>
            <i @click="saveChange" class="mx-2 fa-solid fa-file-import text-4xl hover:scale-105  cursor-pointer"></i>
        </div>
    </div>
</template>

<style></style>