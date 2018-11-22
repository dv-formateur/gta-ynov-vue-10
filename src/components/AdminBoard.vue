
<template>

    <div>

        <nav-bar></nav-bar>
        <side-bar></side-bar>
        <router-view></router-view>


    </div>
</template>

<script>
    import NavBar from '@/components/NavBar'
    import SideBar from '@/components/SideBar'

    export default {
        data () {
            return {
                msg: 'page directeur'
            }
        },
        components: {
            NavBar,SideBar
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
