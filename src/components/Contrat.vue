<template>

    <div class="app-content">
        <div class="row">
            <div class="col-md-6">
                <div class="tile">


                    <h3 class="line-head">Contrat</h3>
                    <div>
                        <label> User</label>
                        <select v-model="user">
                            <option v-for="aUser in tabUser" :value="aUser.id"> {{aUser.name}}</option>
                        </select>
                    </div>

                    <div>
                        <label> Date begin</label>
                        <datetime type="datetime" v-model="dateBegin" format="yyyy-MM-dd HH:mm:ss"
                                  @change="visu()"></datetime>
                    </div>

                    <div>
                        <label> Nombre de semaine </label>
                        <input v-model.number="week" type="number" @change="visu()">
                    </div>

                    <div>
                        <label> Nombre d'heure hebdomadaire </label>
                        <input v-model.number="hours" type="number" @change="visu()">
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
                        <button type="submit" @click="handleSubmit">
                            Register
                        </button>

                    </div>


                </div>
            </div>
            <div class="col-md-6">
                <div class="tile">
                    <div>
                        <h3 class="line-head"> Prévisualisation</h3>
                        <p> Nombre de jour de travail: {{nbDay}} </p>

                        <p> Nombre d'heures de la misssion:{{hourMission}} </p>
                        <p> Nombre de congée total fin de mission:{{holiday}} </p>
                        <p> Fin de la mission {{dateEnd}}</p>

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="tile">
                    <h3 class="line-head"> Contrat en attente</h3>
                    <div class="card" v-for="contrat in tabContrat">
                        {{contrat}}
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="tile">
                    <h3 class="line-head"> Contrat en cours</h3>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import moment from 'moment'

    export default {
        name: "Contrat",

        data() {
            return {
                admin: '',
                user: '',
                tabUser: [],
                tabContrat: [],
                userId: '',
                dateBegin: '',
                dateEnd: '',
                week: '',
                category: '',
                reason: '',
                hours: '',
                nbDay: '',
                nbDayAllWeek: '',
                priceHours: '',
                hourMission: '',
                holiday: '',

            }
        },
        methods: {
            visu() {
                this.nbDay = 5 * this.week
                this.nbDayAllWeek = 7 * this.week,
                    this.hourMission = this.week * this.hours
                this.holiday = this.nbDay / 9.6
                this.dateEnd = moment(this.dateBegin).add(this.nbDayAllWeek, 'day').format('LLL')
            },
            handleSubmit() {

                let url = 'https://gta-ynov-vue-server.herokuapp.com/insert_contrat'
                // let url = 'http://localhost:3000/insert_contrat'

                this.$http.post(url, {
                    userId: this.user,
                    dateBegin: this.dateBegin,
                    dateEnd: this.dateEnd,
                    numberWeek: this.numberWeek,
                    hoursWeekly: this.hours,
                    category: this.category,
                    reason: this.reason
                }).then(response => {
                    this.refreshForm()
                    this.recoverContrat()
                })
            },
            checkProfile() {
                console.log('test')
                this.$http.post('https://gta-ynov-vue-server.herokuapp.com/supervision_user', {
                //     this.$http.post('http://localhost:3000/supervision_user', {
                    adminId: this.admin.id,
                })
                    .then(response => {
                        console.log(response.data.user)
                        response.data.user.forEach(userSuperviser => {
                            this.tabUser.push(userSuperviser)
                        })
                    })
            },
            refreshForm() {
                this.dateBegin = '',
                    this.dateEnd = '',
                    this.numberWeek = '',
                    this.hours = '',
                    this.category = '',
                    this.reason = ''

            },

            recoverContrat() {
                console.log('reccuperer')
                this.tabContrat = []
                // this.$http.post('http://localhost:3000/admin_contrat', {
                this.$http.post('https://gta-ynov-vue-server.herokuapp.com/admin_contrat', {
                    adminId: this.admin.id,
                })
                    .then(response => {
                        console.log(response)
                        response.data.contrat.forEach(contrat => {
                            this.tabContrat.push(contrat)
                        })
                    })
            },
        },
        mounted() {

            this.admin = JSON.parse(localStorage.getItem('user'))
            this.checkProfile()
            this.recoverContrat()

        }
    }
</script>

<style scoped>

</style>
