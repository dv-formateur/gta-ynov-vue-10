<template>

  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { SidebarMenu } from 'vue-sidebar-menu'
import { Datetime } from 'vue-datetime';

export default {
    components: {
        NavBar,
        SidebarMenu,
        Datetime,
    },
  name: 'App'

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
