import Vue from 'vue'
import VueRouter from 'vue-router'
import BookListPage from '../views/BookListPage.vue'
import BookDetailPage from '../views/BookDetailPage.vue'

Vue.use(VueRouter)

const routes = [{
  path: '*',
  redirect: '/books'
}, {
  path: '/books',
  component: BookListPage,
  children: [{
    path: '/books/:id',
    component: BookDetailPage
  }, ]
}, ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router