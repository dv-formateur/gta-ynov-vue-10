import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import AdminBoard from '@/components/AdminBoard'
import PageNotFound from '@/components/PageNotFound'
import Profile from '@/components/Profile'
import Agenda from '@/components/Agenda'
import Planning from '@/components/Planning'
import Contrat from '@/components/Contrat'
import ValidateEvent from '@/components/ValidateEvent'

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
          },
          children: [
              {
                  path:'profile',
                  name:'profile',
                  component: Profile
              },
              {
                  path:'agenda',
                  name:'agenda',
                  component: Agenda
              },
              {
                  path:'planning',
                  name:'planning',
                  component: Planning
              }
          ]

      },

      {
          path: '/admin',
          name: 'admin',
          component: AdminBoard,

              children: [
              {
                  path:'contrat',
                  name:'contrat',
                  component: Contrat,
                  meta: {
                      requiresAuth: true,
                      role: 'D',
                  }
              },
              {
                  path:'validateEvent',
                  name:'validateEvent',
                  component: ValidateEvent,
                  meta: {
                      requiresAuth: true,
                      role: 'D',
                  }
              },
            ],
          meta: {
              requiresAuth: true,
              role: 'D',

          }
      }

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
                    next({ name: 'profile'})
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
            next({ name: 'profile'})
        }
    }else {
        next()
    }
})

export default router
