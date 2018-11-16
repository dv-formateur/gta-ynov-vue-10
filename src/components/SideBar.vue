<template>
    <sidebar-menu :menu="menu" />
</template>

<script>
    export default {
        name: "SideBar",


            data() {
                return {
                    user:[],
                    name:'',
                    menu: [
                        {
                            href: '/',
                            title: 'home',
                        }
                    ]
                }
            },

        mounted() {
            if (localStorage.jwt) {

                let user = JSON.parse(localStorage.getItem('user'))
                let name=''
                console.log(user.name)
                name=(user.name)


            }
        },

    }

</script>

<style scoped>



</style>
