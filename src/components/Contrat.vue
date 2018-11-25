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
                                <datetime type="datetime" v-model="dateBegin" format="yyyy-MM-dd HH:mm:ss"></datetime>
                            </div>

                            <div>
                                <label> Nombre de semaine </label>
                                <input v-model.number="week" type="number">
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
                                <button type="submit" @click="handleSubmit">
                                    Register
                                </button>

                            </div>

                    <button  @click="ok">ok</button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="tile">
                    <div>
                        <h3 class="line-head"> Prévisualisation</h3>
                        <p> Nombre de jour de travail:  {{nbDay}} </p>

                        <p> Nombre d'heures de la misssion:{{hourMission}} </p>
                        <p> Nombre de congée total fin de mission:{{holiday}} </p>

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
                week: '',
                category: '',
                reason: '',
                hours: '',
                nbDay:'0',
                priceHours:'',
                hourMission:'',
                holiday:'',

            }
        },
        methods: {
            ok(){
                this.nbDay=5*this.week
                this.hourMission=this.week*this.hours
                this.holiday=this.nbDay/9.6
            },
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
