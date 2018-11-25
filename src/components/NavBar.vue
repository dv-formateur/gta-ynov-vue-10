<template>
    <div>

        <b-navbar toggleable="md" type="light" variant="light">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#">{{name}}</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/user/profile">Profile</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/user/agenda">Demande de jour</router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/user/planning">Planning</router-link>
                    </b-nav-item>
                    <b-nav-item v-if="role=='R'">
                        <router-link to="/admin/contrat">Contrat</router-link>
                    </b-nav-item>
                    <b-nav-item  v-if="role=='R'">
                        <router-link to="/admin/validateEvent">Valider évènement</router-link>
                    </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <button type="button" v-on:click="disconnect" class="btn btn-outline-danger">Déconnecter</button>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>

    </div>
</template>


<script>
    export default {
        name: "navBar",
        data() {
            return {
                user: '',
                name: '',
                role:'',
            }
        },
        methods: {
            disconnect: function () {
                localStorage.removeItem('jwt');
                this.$router.push('/');
            }
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.name = this.user.name
            this.role = this.user.role

        }
    }
</script>

<style>
    a {
        color: #000
    }

</style>
