<template>
    <div>
        <form>
            <fieldset>
                <legend>Profile</legend>
                <div>
                    <label class="label" >Name</label>
                    <input type="text" name="name" id="name" required="" v-model="name">

                </div>
                <div>
                    <label class="label" >Surname</label>
                    <input type="text" name="surname" id="surname" required="" v-model="surname">

                </div>

                <div>
                    <label class="label">Birth</label>
                    <input type="text" name="birth" id="birth" required="" v-model="birth">

                </div>

                <div>
                    <label class="label">Phone</label>
                    <input type="integer" name="phone" id="phone" required=""  v-model="phone">
                </div>

                <div>
                    <label class="label">Address</label>
                    <input type="text" name="address" id="address" required=""  v-model="address">
                </div>

            </fieldset>
        </form>
    </div>



</template>


<script>
    export default {
        name: "Profile",

        mounted() {
            let user = JSON.parse(localStorage.getItem('user'))
            let  userId = user.id
            this.$http.post('http://localhost:3000/profile',{
                userId: userId,
            })
                .then(response => {
                    localStorage.setItem('profile',JSON.stringify(response.data.userProfile))
                    console.log(response.data.userProfile)
                    this.name = response.data.userProfile.name
                    this.surname = response.data.userProfile.surname
                    this.birth = response.data.userProfile.birth
                    this.phone = response.data.userProfile.tel
                    this.address = response.data.userProfile.address
            })


        },
        data(){
            return{
                userProfile:'',
                name:'',
                surname: '',
                birth: '',
                phone:'',
                address:'',
            }

        }
    }
</script>

<style scoped>
    form {
        font-size: 16px;
        width: 500px;
        padding: 15px 30px;
        border-radius: 4px;
        margin: 50px auto;
        width: 500px;
        background-color: #fff;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    }
    form fieldset {
        margin: 24px 0 0 0;
    }
    form legend {
        padding-bottom: 10px;
        border-bottom: 1px solid #ecf0f1;
    }
    form div {
        position: relative;
        margin: 20px 0;
    }
    form h4,
    form label {
        color: #94aab0;
        margin-bottom: 10px;
    }
    form label {
        display: block;
    }
    form input,
    form textarea,
    form select,
    form label {
        color: #2b3e51;
    }

</style>
