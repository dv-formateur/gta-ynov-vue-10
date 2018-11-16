import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import AdminBoard from '@/components/AdminBoard'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

let router = new Router({
    mode: 'history',
  routes: [
      {
          path: '/',
          name: 'login',
          component: Login,
          meta: {
              guest: true
          }
      },
      {
          path: '/register',
          name: 'register',
          component: Register,
          meta: {
              guest: true
          }
      },
      {
          path: '/user',
          name: 'user',
          component: UserBoard,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/admin',
          name: 'admin',
          component: AdminBoard,
          meta: {
              requiresAuth: true,
              role: 'D',


          }
      },
      { path: "*", component: PageNotFound,
      meta: {
          requireAuth:true
      }}

  ]
})
router.beforeEach((to, from, next) => {

    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                name: 'login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.meta.role != undefined) {
                if(user.role === to.meta.role || user.role === 'R') {
                    next()
                }
                else{
                    next({ name: 'user'})
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'user'})
        }
    }else {
        next()
    }
})




export default router
