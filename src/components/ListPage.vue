<script>
export default {
    data() {
        return {
            pageItem: [],
            totalPage: null,
            thisPage: 0 ,
            keyWord: null,
            start: null,
            end: null
        }
    },
    props: ["day"],
    mounted() {
        this.getQuestioniarePage(this.thisPage);
    },
    methods: {
        getQuestioniarePage(page) {
            
            this.pageItem = [] ;
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
        changePage(page){
            if(this.thisPage + (+page) > this.totalPage-1){
                alert("已是最後一頁");
                return ;
            }

            if(this.thisPage + (+page) < 0){
                return ;
            }
            this.thisPage = this.thisPage + (+page) ;
            console.log(this.thisPage);
            this.getQuestioniarePage(this.thisPage);
        },
        getPage(page){
            console.log(page);
            this.pageItem = [] ;
            this.thisPage = page-1 ;
            console.log(this.thisPage)
            let body = {
                "pageNumber": page-1
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
        }
    }
}
</script>

<template>
    <div
        class="search-box w-8/12 mx-auto my-2 h-24 border-2 border-black rounded-xl flex flex-col justify-center items-start">
        <div class="title flex m-2">
            <h2 class="m-0">問卷標題 ：</h2>
            <input class=" border-2  border-black rounded-md" type="text" v-model="keyWord">
        </div>
        <div class="time-input flex m-2">
            <h2>開始 / 結束 ：</h2>
            <input type="date" class=" border-2 mx-2  border-black rounded-md" v-model="start">
            <input type="date" class=" border-2 mx-2 border-black rounded-md" v-model="end">
        </div>
    </div>

    <div class="value-table ">
        <table class=" w-full border-black">
            <tr class="text-center  border-black font-bold">
                <th>#</th>
                <th>問卷</th>
                <th>狀態</th>
                <th>開放時間</th>
                <th>結束時間</th>
                <th>觀看統計</th>

            </tr>
            <tr v-for="item in pageItem" :key="item.id" class=" text-center font-bold">
                <td>{{ item.id }}</td>
                <td v-if="item.status === '進行中'"><a class=" decoration-solid text-blue-600 text" href="">{{ item.name }}</a>
                </td>
                <td v-else>{{ item.name }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.start }}</td>
                <td>{{ item.end }}</td>
                <td v-if="item.status === '已結束'"><a class=" decoration-solid text-blue-600 text" href="">{{ item.record
                }}</a></td>
                <td v-else>尚未結束</td>
            </tr>
        </table>
        <ul class=" w-full ">
            <div class="flex libox" v-if="totalPage > 2">
                <li v-if="thisPage !== 0" @click="changePage(-1)">{{ "<" }}</li>
                <li v-if="thisPage !== 0" @click="getPage(thisPage)">{{ thisPage }}</li>
                <li @click="getPage(thisPage+1)">{{ thisPage + 1 }}</li>
                <li v-if="thisPage < totalPage-1" @click="getPage(thisPage + 2)">{{ thisPage +2 }}</li>
                <li v-if="thisPage < totalPage-1" @click="changePage(1)">{{ ">" }}</li>
            </div>
        </ul>
        <h2 class=" font-bold">目前頁數 {{ thisPage + 1 }}</h2>
    </div>
</template>

<style lang="scss" scoped>
    .libox{
        width: 100px;
        margin: 0 auto;
        li{
            color: blue;
            cursor: pointer;
            margin: 0 5px;
        }
    }
</style>