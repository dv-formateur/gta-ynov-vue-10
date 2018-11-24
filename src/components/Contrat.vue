<template>
    <div class="app-content">
        <div class="row">
            <div class="col-md-6">
                <div class="tile">
                    <form>
                        <fieldset>
                            <legend>Contrat</legend>
                            <div>
                                <label> User</label>
                                <select v-model="user">
                                    <option v-for="aUser in tabUser" :value="aUser.id"> {{aUser.name}}</option>
                                </select>
                            </div>

                            <div>
                                <label> Date begin</label>
                                <datetime type="datetime" v-model="dateBegin" format="yyyy-MM-dd HH:mm:ss"></datetime>
                            </div>

                            <div>
                                <label> Date end</label>
                                <datetime type="datetime" v-model="dateEnd" format="yyyy-MM-dd HH:mm:ss"
                                          :min-datetime="dateBegin"></datetime>
                            </div>

                            <div>
                                <label> Nombre d'heure hebdomadaire </label>
                                <input v-model.number="hours" type="number">
                            </div>

                            <div>
                                <label> Categories </label>
                                <select v-model="category">
                                    <option>Mission</option>
                                </select>
                            </div>

                            <div>
                                <label> Motif de Mission </label>
                                <textarea v-model="reason" placeholder="Motif"></textarea>
                            </div>

                            <div>
                                <label> Taux horraire Brut</label>
                                <input v-model.number="price_hours" type="number">
                            </div>

                            <div>
                                <button type="submit" @click="handleSubmit">
                                    Register
                                </button>
                            </div>

                        </fieldset>
                    </form>
                </div>
            </div>
            <div class="col-md-6">
                <div class="tile">
                    <div>
                        <h1> Prévisualisation</h1>
                        <p> Nombre de jour de travail </p>
                        <p> Nombre d'heures de la misssion: </p>
                        <p> Nombre de congée total fin de mission: </p>
                        <p> Salaire Brut</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Contrat",
        data() {
            return {
                admin: '',
                user: '',
                tabUser: [],
                userId: '',
                dateBegin: '',
                dateEnd: '',
                category: '',
                reason: '',
                hours: '',

            }
        },
        methods: {
            handleSubmit() {

                // let url = 'https://gta-ynov-vue-server.herokuapp.com/agenda_event'
                let url = 'http://localhost:3000/agenda_event'

                this.$http.post(url, {
                    userId: this.user,
                    dateBegin: this.dateBegin,
                    dateEnd: this.dateEnd,
                    category: this.category,
                    reason: this.reason,
                })
            }
        },
        mounted() {

            this.admin = JSON.parse(localStorage.getItem('user'))
            let adminId = this.admin.id
            this.$http.post('https://gta-ynov-vue-server.herokuapp.com/supervision_user', {
                // this.$http.post('http://localhost:3000/supervision_user', {
                adminId: adminId,
            })
                .then(response => {
                    console.log(response.data.user)
                    response.data.user.forEach(userSuperviser => {
                        this.tabUser.push(userSuperviser)
                    })
                })
        }
    }
</script>

<style scoped>

</style>
