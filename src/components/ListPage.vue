<script>
export default {
    data() {
        return {
            pageItem: [],
            totalPage: null,
            thisPage: 0,
            inputWord: null,
            keyWord: null,
            start: null,
            end: null,
            isSearch: false,
            isDate: false,
            delArr: []
        }
    },
    props: ["day", "isWrite"],
    mounted() {
        this.getQuestioniarePage(this.thisPage);
    },
    methods: {
        editQuestionniare(id) {
            console.log("edit");
            sessionStorage.setItem("id",id);
            sessionStorage.setItem("isEdit",true);
            this.$router.push({
                name :"edit",
            });
        },
        insertQuestionniare(){
            sessionStorage.setItem("isEdit","");
            console.log(sessionStorage.getItem("isEdit"));
            this.$router.push({
                name :"edit.questionniare",
            });
        },
        getQuestioniarePage(page) {

            this.pageItem = [];
            let body = {
                "pageNumber": page
            }
            fetch("http://localhost:8080/get_all_questioniare", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    data.page.content.forEach(i => {
                        let newStart = new Date(i.start);
                        let newEnd = new Date(i.end);
                        let newDay = new Date(this.day)
                        this.pageItem.push({
                            id: i.id,
                            name: i.name,
                            status: newEnd < newDay ? "已結束" : newStart > newDay ? "未開始" : "進行中",
                            start: i.start,
                            end: i.end,
                            record: "觀看紀錄"
                        })
                    })
                    this.totalPage = data.page.totalPages;
                })
        },
        changePage(page) {
            if (this.thisPage + (+page) > this.totalPage - 1) {
                alert("已是最後一頁");
                return;
            }

            if (this.thisPage + (+page) < 0) {
                return;
            }
            this.thisPage = this.thisPage + (+page);
            console.log(this.thisPage);
            if (this.isSearch) {
                console.log("search");
                this.searchByName();
                return;
            }
            else if (this.isDate) {
                console.log("date");
                this.searchDate();
                return;
            }
            else {
                console.log("no");
                this.getQuestioniarePage(this.thisPage);
            }
        },
        getPage(page) {
            console.log(page);
            this.pageItem = [];
            this.thisPage = page - 1;
            console.log(this.thisPage)
            if (this.isSearch) {
                let body = {
                    "name": this.keyWord,
                    "pageNumber": this.thisPage
                }
                fetch("http://localhost:8080/search_by_name_containing", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        data.page.content.forEach(i => {
                            let newStart = new Date(i.start);
                            let newEnd = new Date(i.end);
                            let newDay = new Date(this.day)
                            this.pageItem.push({
                                id: i.id,
                                name: i.name,
                                status: newEnd < newDay ? "已結束" : newStart > newDay ? "未開始" : "進行中",
                                start: i.start,
                                end: i.end,
                                record: "觀看紀錄"
                            })
                        })
                        this.totalPage = data.page.totalPages;
                    })

                return;
            }

            let body = {
                "pageNumber": page - 1
            }
            fetch("http://localhost:8080/get_all_questioniare", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    data.page.content.forEach(i => {
                        let newStart = new Date(i.start);
                        let newEnd = new Date(i.end);
                        let newDay = new Date(this.day)
                        this.pageItem.push({
                            id: i.id,
                            name: i.name,
                            status: newEnd < newDay ? "已結束" : newStart > newDay ? "未開始" : "進行中",
                            start: i.start,
                            end: i.end,
                            record: "觀看紀錄"
                        })
                    })
                    this.totalPage = data.page.totalPages;
                })
        },
        searchByName() {
            if (this.keyWord === "" || this.keyWord === null) {
                alert("搜尋不可為空 !");
                return;
            }
            let body = {
                "name": this.keyWord,
                "pageNumber": this.thisPage
            }
            fetch("http://localhost:8080/search_by_name_containing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.message === "Not found") {
                        console.log("no value");
                        this.pageItem = [];
                        this.totalPage = 0;
                        return;
                    }
                    this.pageItem = [];
                    data.page.content.forEach(i => {
                        let newStart = new Date(i.start);
                        let newEnd = new Date(i.end);
                        let newDay = new Date(this.day)
                        this.pageItem.push({
                            id: i.id,
                            name: i.name,
                            status: newEnd < newDay ? "已結束" : newStart > newDay ? "未開始" : "進行中",
                            start: i.start,
                            end: i.end,
                            record: "觀看紀錄"
                        })
                    })
                    this.totalPage = data.page.totalPages;
                })
        },
        changeKeyWord() {
            this.isSearch = true;
            this.isDate = false;
            this.keyWord = this.inputWord;
            this.thisPage = 0;
            this.searchByName();
        },
        changeDate() {
            this.isSearch = false;
            this.isDate = true;
            this.thisPage = 0;
            this.searchDate();

        },
        searchDate() {
            if (this.start === null || this.end === null) {
                alert("日期不可為空 !");
                return;
            }
            let body = {

                "startDate": this.start,
                "endDate": this.end,
                "pageNumber": this.thisPage
            }
            fetch("http://localhost:8080/search_by_data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.pageItem = [];
                    data.page.content.forEach(i => {
                        let newStart = new Date(i.start);
                        let newEnd = new Date(i.end);
                        let newDay = new Date(this.day)
                        this.pageItem.push({
                            id: i.id,
                            name: i.name,
                            status: newEnd < newDay ? "已結束" : newStart > newDay ? "未開始" : "進行中",
                            start: i.start,
                            end: i.end,
                            record: "觀看紀錄"
                        })
                    })
                    this.totalPage = data.page.totalPages;
                })
        },
        writePage(id) {
            console.log(id);
            this.$router.push({
                name: 'write',
                params: {
                    id: id
                }
            })
        },
        delQuestionniare() {
            if (this.delArr.length === 0) {
                alert("未點選任何問卷 ! ");
                return;
            }
            let yes = confirm('你確定要刪除嗎？');
            if (yes) {
                this.delArr.forEach(i => {
                    let body = {
                        id: i
                    }
                    fetch("http://localhost:8080/del_questionnaire", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                        })
                })

                alert("刪除成功 !");
                location.reload();
            }

        },
        recordPage(isBack,qid){
            console.log(qid)
            sessionStorage.setItem("isBack",isBack);
            this.$router.push({
                name :'record',
                params :{
                    qid :qid
                }
            })
        }
    }
}
</script>

<template>
    <div
        class="search-box w-8/12 mx-auto my-2 h-24 border-2 border-black rounded-xl flex flex-col justify-center items-start">
        <div class="title flex m-2 relative">
            <h2 class="m-0">問卷標題 ：</h2>
            <i @click="changeKeyWord"
                class="cursor-pointer hover:scale-105 fa-solid fa-magnifying-glass absolute top-1 left-[240px]"></i>
            <input class=" border-2  border-black rounded-md" type="text" v-model="inputWord">
        </div>
        <div class="time-input flex m-2">
            <h2>開始 / 結束 ：</h2>
            <input type="date" class=" border-2 mx-2  border-black rounded-md" v-model="start">
            <input type="date" class=" border-2 mx-2 border-black rounded-md" v-model="end">
            <button @click="changeDate" type="button"
                class=" bg-blue-500 text-white font-bold rounded-md px-3 hover:bg-blue-400">查詢</button>
        </div>
    </div>

    <div class="value-table ">

        <div v-if="!isWrite" class="fuction-box">
            <i @click="delQuestionniare" class=" mx-6 fa-solid fa-trash-can text-2xl hover:scale-105 cursor-pointer"></i>
            <i @click="insertQuestionniare" class="fa-solid fa-plus text-2xl hover:scale-105 cursor-pointer"></i>
        </div>
        <table class=" w-full border-black">
            <tr class="text-center  border-black font-bold">
                <th v-if="!isWrite">選取</th>
                <th>#</th>
                <th>問卷</th>
                <th>狀態</th>
                <th>開放時間</th>
                <th>結束時間</th>
                <th>觀看統計</th>

            </tr>
            <tr v-for="item in pageItem" :key="item.id" class=" text-center font-bold">
                <td v-if="!isWrite">
                    <input v-if="item.status === '未開始'" type="checkbox" :id="item.id" :value="item.id" v-model="delArr">
                    <input v-else type="checkbox" :id="item.id" :disabled="true">
                </td>

                <td>{{ item.id }}</td>

                <td v-if="item.status === '進行中'">
                    <a v-if="isWrite" class=" cursor-pointer decoration-solid text-blue-600 text"
                        @click="writePage(item.id)">{{ item.name }}</a>
                    <a v-else>{{ item.name }}</a>
                </td>
                <td v-else>
                    <a v-if="!isWrite && item.status === '未開始'" class=" cursor-pointer decoration-solid text-blue-600 text"
                        @click="editQuestionniare(item.id)">{{ item.name }}</a>
                    <a v-else>{{ item.name }}</a>
                </td>
                <td>{{ item.status }}</td>
                <td>{{ item.start }}</td>
                <td>{{ item.end }}</td>

                <td v-if="item.status === '已結束'">
                    <a v-if="!isWrite" class=" decoration-solid text-blue-600 text cursor-pointer" @click="recordPage('true',item.id)">{{ item.record }}</a>
                    <a v-else class=" decoration-solid text-blue-600 text cursor-pointer"  @click="recordPage('',item.id)">{{ item.record }}</a>
                </td>
                <td v-else>尚未結束</td>
            </tr>
        </table>
        <ul v-if="totalPage !== 0" class=" w-full ">
            <div class="flex libox text-center">
                <li v-if="thisPage !== 0" @click="changePage(-1)">{{ "<" }}</li>
                <li v-if="thisPage !== 0" @click="getPage(thisPage)">{{ thisPage }}</li>
                <li @click="getPage(thisPage + 1)">{{ thisPage + 1 }}</li>
                <li v-if="thisPage < totalPage - 1" @click="getPage(thisPage + 2)">{{ thisPage + 2 }}</li>
                <li v-if="thisPage < totalPage - 1" @click="changePage(1)">{{ ">" }}</li>
            </div>
        </ul>
    </div>
    <div class=" w-full ">
        <h2 v-if="totalPage !== 0" class=" text-center font-bold  w-28  my-0 mx-auto">目前頁數 {{ thisPage + 1 }}</h2>
    </div>
</template>

<style lang="scss" scoped>
.libox {
    width: 100px;
    margin: 0 auto;

    li {
        color: blue;
        cursor: pointer;
        margin: 0 auto;
    }
}
</style>