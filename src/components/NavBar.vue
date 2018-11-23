<template>

    <b-navbar toggleable="md">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <a href="/">Home</a>
        <a href="/user/profile">Profile</a>
        <a href="/user/agenda">Ajouter un evenement</a>
        <a href="/user/planning">Planning</a>
        <a href="/admin/contrat">Contrat</a>
        <a href="/admin/validateEvent"> Valider évènement </a>


        <b-collapse is-nav id="nav_collapse">

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">


                <b-nav-item-dropdown right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item  v-on:click="disconect">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "navBar",


        methods: {
            disconect() {
                localStorage.removeItem('jwt');
                localStorage.removeItem('planning');
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    nav{
        background-color:  #42b983;;
    }

</style>
