<template>
    <div id="login" class="col-md-3 mx-auto">
        <div class="card card-signin my-5">
            <div class="card-body">

                <h5 class="card-title text-center">Login</h5>
                <form class="form-signin" @submit.prevent="FormLogin">
                    <div class="form-label-group">
                        <input required id="inputEmail" v-model="username" type="text" placeholder="email"
                               class="form-control"/>
                    </div>
                    <div class="form-label-group">
                        <input required id="inputPassword" v-model="password" type="password" placeholder="Password"
                               class="form-control"/>
                    </div>


                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: "",
                password: "",
                showDismissibleAlert: false,
            }
        },
        methods: {
            FormLogin(e) {
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('https://gta-ynov-vue-server.herokuapp.com/login', {
                    // this.$http.post('http://localhost:3000/login', {
                        email: this.username,
                        password: this.password
                    })
                        .then(response => {
                            let role = response.data.user.role
                            localStorage.setItem('user', JSON.stringify(response.data.user))
                            localStorage.setItem('jwt', response.data.token)
                            // console.log(role)

                            if (localStorage.getItem('jwt') != null) {
                                this.$emit('loggedIn')
                                if (this.$route.params.nextUrl != null) {
                                    this.$router.push(this.$route.params.nextUrl)
                                }

                                else {
                                    switch (role) {
                                        case "D":
                                            console.log('admin')
                                            this.$router.push('admin')
                                            break
                                        case "R":
                                            console.log('admin')
                                            this.$router.push('admin')
                                            break
                                        case "S":
                                            console.log("user")
                                            this.$router.push('user')
                                            break
                                        default:
                                            break
                                    }
                                }
                            }

                        })
                        .catch(function (error) {
                            console.error(error.response);
                        });
                }
            }
        }

    }
</script>


<style scoped>

    #login {
        padding-top: 6rem;
    }

    .card-signin {

        border: 0;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
    }

    .card-signin .card-title {
        margin-bottom: 2rem;
        font-weight: 300;
        font-size: 1.5rem;
    }

    .card-signin .card-body {
        padding: 2rem;
    }

    .form-signin {
        width: 100%;
    }

    .form-signin .btn {
        font-size: 80%;
        border-radius: 5rem;
        letter-spacing: .1rem;
        font-weight: bold;
        padding: 1rem;
        transition: all 0.2s;
    }

    .form-label-group {
        position: relative;
        margin-bottom: 1rem;
    }

    .form-label-group input {
        border-radius: 2rem;
    }

    input {
        text-align: center;

    }
</style>
