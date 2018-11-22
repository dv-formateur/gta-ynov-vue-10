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
                        },
                        {
                            href:'/user/profile',
                            title:'Profile',
                        },
                        {
                            href:'/user/agenda',
                            title:'Ajouter un evenement',
                        },
                        {
                            href:'/user/planning',
                            title:'Planning',
                        },

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
