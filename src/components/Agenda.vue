<template>
    <div>
        <label> Date begin</label>
        <datetime type="datetime" v-model="dateBegin" format="yyyy-MM-dd HH:mm:ss"></datetime>
        <label> Date end</label>
        <datetime  type="datetime" v-model="dateEnd" format="yyyy-MM-dd HH:mm:ss" :min-datetime="dateBegin" ></datetime>
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
        <div>
            <button type="submit" @click="handleSubmit">
                Register
            </button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Agenda",
        data() {
            return {
                user:'',
                userId:'',
                dateBegin: '',
                dateEnd: '',
                category: '',
                reason:'',

            }
        },
        methods: {
            handleSubmit() {
                this.user = JSON.parse(localStorage.getItem('user'))

                let url = 'http://localhost:3000/agenda_event'
                this.$http.post(url, {
                    userId: this.user.id,
                    dateBegin: this.dateBegin,
                    dateEnd: this.dateEnd,
                    category: this.category,
                    reason: this.reason,
                })
            }
        }
    }
</script>

<style scoped>

</style>
