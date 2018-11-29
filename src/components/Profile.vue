<template>
    <div class="app-content">
        <div class="row">
            <div class="col-md-6">
                <div class="tile">
                    <form>
                        <h3 class="line-head">Information personnel</h3>
                        <div>
                            <label class="label">Name</label>
                            <input type="text" name="name" id="name" required="" v-model="name">

                        </div>
                        <div>
                            <label class="label">Surname</label>
                            <input type="text" name="surname" id="surname" required="" v-model="surname">

                        </div>

                        <div>
                            <label class="label">Birth</label>
                            <input type="text" name="birth" id="birth" required="" v-model="birth">

                        </div>

                        <div>
                            <label class="label">Phone</label>
                            <input type="integer" name="phone" id="phone" required="" v-model="phone">
                        </div>

                        <div>
                            <label class="label">Address</label>
                            <input type="text" name="address" id="address" required="" v-model="address">
                        </div>

                        <button type="button" v-on:click="handleSubmit" class="btn btn-outline-danger">Save</button>

                    </form>
                </div>
            </div>

            <div class="col-md-6">
                <div class="tile">
                    <h3 class="line-head">Contrat</h3>
                    <div class="card">
                        {{Usercontrat}}
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg">
                <div class="tile">
                    <h1> Nombre de jour travailler:{{daysWorked}} </h1>
                </div>
            </div>
            <div class="col-lg">
                <div class="tile">
                    <h1> Nombre de jour restant:{{daysRemaining}}</h1>
                </div>
            </div>
            <div class="col-lg">
                <div class="tile">
                    <h1> Nombre de jour congée:{{daysHoliday}} </h1>
                </div>
            </div>
        </div>
    </div>


</template>


<script>

    export default {
        name: "Profile",

        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'))
            this.recoverProfil()
            this.recoverContrat()
            console.log(this.Usercontrat)
        },
        data() {
            return {
                userProfile: '',
                name: '',
                surname: '',
                birth: '',
                phone: '',
                address: '',
                Usercontrat:'',
                daysWorked: '',
                daysRemaining: '',
                daysHoliday: '',
            }
        },
        methods: {
            recoverProfil() {
                // this.$http.post('http://localhost:3000/profile', {
                this.$http.post('https://gta-ynov-vue-server.herokuapp.com/profile', {
                    userId: this.user.id,
                })
                    .then(response => {
                        localStorage.setItem('profile', JSON.stringify(response.data.userProfile))
                        console.log(response.data.userProfile)
                        this.name = response.data.userProfile.name
                        this.surname = response.data.userProfile.surname
                        this.birth = response.data.userProfile.birth
                        this.phone = response.data.userProfile.tel
                        this.address = response.data.userProfile.address
                    })
            },

            recoverContrat() {
                this.$http.post('https://gta-ynov-vue-server.herokuapp.com/profile_contrat', {
                //     this.$http.post('http://localhost:3000/profile_contrat', {
                    userId: this.user.id,
                })
                    .then(response => {
                        this.Usercontrat = JSON.stringify(response.data.contrat)
                    })
            },

            handleSubmit() {
                console.log('update')
                this.$http.post('https://gta-ynov-vue-server.herokuapp.com/profile_update',{
                // this.$http.post('http://localhost:3000/profile_update',{
                    userId: this.user.id,
                    surname:  this.surname,
                    name: this.name,
                    birth :this.birth,
                    tel: this.phone,
                    address: this.address
                }).then(
                    this.recoverProfil
                )
            }
        }

    }
</script>

<style scoped>


</style>
