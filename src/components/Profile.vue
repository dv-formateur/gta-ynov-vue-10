<template>
    <div class="app-content">
        <div class="row">
            <div class="col-md-6">
                <div class="tile">
                    <form>
                        <h2>Information personnel</h2>
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

                        <button type="button" v-on:click="" class="btn btn-outline-danger">Save</button>

                    </form>
                </div>
            </div>

            <div class="col-md-6">
                <div class="tile">
                    <h2>Contrat</h2>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg">
                <h1> Nombre de jour travailler </h1>
            </div>
            <div class="col-lg">
                <h1> Nombre de jour restant</h1>
            </div>
            <div class="col-lg">
                <h1> Nombre de jour congée </h1>
            </div>
        </div>
    </div>


</template>


<script>
    export default {
        name: "Profile",

        mounted() {
            let user = JSON.parse(localStorage.getItem('user'))
            let userId = user.id
            this.$http.post('http://localhost:3000/profile', {
                // this.$http.post('https://gta-ynov-vue-server.herokuapp.com/profile',{
                userId: userId,
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
        data() {
            return {
                userProfile: '',
                name: '',
                surname: '',
                birth: '',
                phone: '',
                address: '',
            }

        }
    }
</script>

<style scoped>


</style>
