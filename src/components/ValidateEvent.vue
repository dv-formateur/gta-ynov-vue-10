<template>
    <div>
        <div class="col-6 offset-3">
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
                    <button v-on:click="check(event,event.id,false)" type="button" class="btn btn-danger">Refuser
                    </button>
                    <button v-on:click="check(event,event.id,true)" type="button" class="btn btn-success">Accepter
                    </button>
                </div>
            </div>

        </div>
    </div>


</template>

<script>
    export default {
        name: "ValidateEvent",
        data() {
            return {
                tabEvent: [],
                admin: ''
            }
        },
        methods: {
            check(event, idEvent, vote) {
                let index = this.tabEvent.indexOf(event)
                console.log(index)
                this.tabEvent.splice(index, 1)
                console.log(idEvent, vote)
                this.$http.post('https://gta-ynov-vue-server.herokuapp.com/adminVoteEvent', {
                //     this.$http.post('http://localhost:3000/adminVoteEvent', {
                    idEvent: idEvent,
                    vote: vote,
                })
            },
            recoverAdmin() {
                this.$http.post('https://gta-ynov-vue-server.herokuapp.com/adminEventSupervision', {
                //     this.$http.post('http://localhost:3000/adminEventSupervision', {
                    adminId: this.admin.id,
                })
                    .then(response => {
                        console.log(response.data.event)
                        response.data.event.forEach(event => {
                            this.tabEvent.push(event)
                        })
                    })
            }
        },

        mounted() {
            this.admin = JSON.parse(localStorage.getItem('user'))
            this.recoverAdmin()
        }
    }
</script>

<style scoped>


</style>
