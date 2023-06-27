import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'FrontEnd',
      component: () => import("../views/FrontEnd.vue")
    },
    {
      path: '/backEnd',
      name: 'BackEnd',
      component: () => import("../views/BackEnd.vue")
    },
    {
      path: '/write:id',
      name: 'write',
      component: () => import("../views/WriteQuestioniare.vue"),
      props : true
    },
    {
      path: '/check:propText',
      name: 'check',
      component: () => import("../views/QuestioniareCheck.vue"),
      props : true
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import("../views/EditQuestionniare.vue"),
      children :[
        {
          path : 'questionniare',
          name : 'edit.questionniare',
          component: () => import("../components/QuestionniareEdit.vue"),
        },
        {
          path : 'question',
          name : 'edit.question',
          component: () => import("../components/Question.vue"),
        }
      ]
    },
    {
      path: '/record:qid',
      name: 'record',
      component: () => import("../views/RecordPage.vue"),
      props : true,
      children :[
        {
          path : 'recordList:id',
          name : 'record.list',
          component : () => import("../components/RecordList.vue"),
          props : true
        },
        {
          path : 'recordInfo:seq',
          name : 'record.info',
          component : () => import("../views/RecordInfo.vue"),
          props : true
        },
        {
          path :'recordChart',
          name :'record.chart',
          component : ()=> import("../views/RecordChart.vue"),
        }
      ]
    }
  ]
})

export default router
