<template>
    <div class="app-content">
        <div class="row">
            <div class="col-md-6">
                <div class="tile">
                    <h3 class="line-head"> Demande de jour</h3>
                    <label> Date begin</label>
                    <datetime type="datetime" v-model="dateBegin" format="yyyy-MM-dd HH:mm:ss"></datetime>
                    <label> Date end</label>
                    <datetime type="datetime" v-model="dateEnd" format="yyyy-MM-dd HH:mm:ss"
                              :min-datetime="dateBegin"></datetime>
                    <label> Categories </label>
                    <br>
                    <select v-model="category">
                        <option disabled value="">select category</option>
                        <option>Congée</option>
                        <option>Reccuperation</option>
                        <option>Amenagement</option>
                    </select>
                    <br>
                    <textarea v-model="reason" placeholder="Motif"></textarea>

                    <button type="submit" @click="handleSubmit">
                        Register
                    </button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="tile">
                    <h3 class="line-head"> Demande en cours de traitement</h3>
                    <div class="card" v-for="event in tabEvent">
                        <div class="card-header">

                            {{event.length}}
                            {{event.userId}}
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    {{event.category}}
                                </div>
                                <div class="col">
                                    {{event.reason}}
                                </div>
                                <div class="col">
                                    {{event.dateBegin}}
                                    {{event.dateEnd}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>


</template>

<script>
    export default {
        name: "Agenda",
        data() {
            return {
                user: '',
                userId: '',
                dateBegin: '',
                dateEnd: '',
                category: '',
                reason: '',
                tabEvent:[],
            }
        },
        methods: {

            recoverEvent(){
                console.log('reccuperer')
                this.tabEvent=[]
                let verify ='0'
                let userId = this.user.id
                this.$http.post('http://localhost:3000/agendaPlanning', {
                    // this.$http.post('https://ta-ynov-vue-server.herokuapp.com/agendaPlanning', {
                    userId: userId,
                    verify: verify,
                })
                    .then(response => {
                        console.log(response)
                        response.data.event.forEach(event => {
                            this.tabEvent.push(event)
                        })
                    })
            },
            resetForm(){
                this.dateBegin="",
                    this.dateEnd="",
                    this.category="",
                    this.reason=""
            },
            handleSubmit() {
                let url = 'http://localhost:3000/agenda_event'
                // let url = 'https://gta-ynov-vue-server.herokuapp.com/agenda_event'
                this.$http.post(url, {
                    userId: this.user.id,
                    dateBegin: this.dateBegin,
                    dateEnd: this.dateEnd,
                    category: this.category,
                    reason: this.reason,
                }).then(response=>{
                    this.resetForm()
                    this.recoverEvent()
                },response =>{
                    console.log(response)
                })
            }
        },
        mounted() {
            this.user = JSON.parse(localStorage.getItem('user'))

            this.recoverEvent()
        },

    }
</script>

<style scoped>

</style>
