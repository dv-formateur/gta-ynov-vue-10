<template>

    <div id="app" v-bind:style="{ backgroundColor: '#42b983'}">
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { SidebarMenu } from 'vue-sidebar-menu'
import { Datetime } from 'vue-datetime';
import { VueTuicalendar } from '@lkmadushan/vue-tuicalendar'

export default {
    components: {
        NavBar,
        SidebarMenu,
        Datetime,
        VueTuicalendar,
    },
  name: 'App'

}
</script>

<style>
  html, body {
    width: 100%;
    height:100%;
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: auto;
    min-height: 100%;


}


</style>
