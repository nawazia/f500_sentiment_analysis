<template>
    <div class="container-fluid m-0 p-0">
        <div id="home-page" class="full-height">
            <div class="container pt-3">
                <div class="row pb-5">
                    <div class="col-lg-6 pt-5 my-auto">
                        <div class="text-center mb-3 d-block d-lg-none">
                            <h1 class="display-3">{{ title }}</h1>
                            <h3>Analysis market sentiment worldwide</h3>
                        </div>
                        <img id="iphone-img" src="../assets/app-preview.png">
                    </div>

                    <div class="col-lg-6 pt-4 my-auto">
                        <div class="text-center mb-3 d-lg-block d-none">
                            <h1 class="display-3">{{ title }}</h1>
                            <h3>Analysis market sentiment worldwide</h3>
                        </div>

                        <div class="border p-3 p-md-5 bg-light rounded shadow">
                            <h2>Coming Soon</h2>
                            <form @submit.prevent="addEmail(email)">
                                <div class="form-group">
                                    <label for="emailSignup">Join the waiting list, we'll let you know when it's live</label>
                                    <input v-model="email"
                                           id="emailSignup"
                                           placeholder="Enter Email"
                                           class="form-control"
                                           type="email">
                                    <small id="emailSignup" class="text-form text-muted">We will never share or spam your email</small>
                                    <br>
                                    <button type="submit" class="btn btn-success mt-1">Join Waiting List</button>
                                    <div class="mt-4">
                                        <p class="m-0">{{ msg }}</p>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div id="available" class="p-2">
                            <h4 class="text-center mb-2 mt-3 text-secondary">Available On</h4>
                            <div class="row">
                                <div class="col my-auto">
                                    <img id="apple-store-img" src="../assets/Download_on_the_App_Store_Badge.png" class="float-left img-fluid app-store-img">
                                </div>
                                <div class="col my-auto">
                                    <img src="../assets/google-play-badge.png" class="float-right img-fluid app-store-img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <div id="about" class="p-3 p-md-5">
            <div class="row">
                <div class="col-lg">
                    <!-- Vectors and icons by https://iconhub.io?ref=svgrepo.com in CC Attribution License via https://www.svgrepo.com/ -->
                    <img src="../assets/icons/chat-left-3-svgrepo-com.svg" height="120" class="m-4">
                    <h5 class="ml-md-4 mr-md-4">
                        Use the app to see investment outlook of Fortune-500 stocks,
                        monitor specific company events, and track a portfolio of companies.
                    </h5>
                </div>
                <div class="col-lg">
                    <!-- Vectors and icons by https://iconhub.io?ref=svgrepo.com in CC Attribution License via https://www.svgrepo.com/ -->                    
                    <img src="../assets/icons/analysis-svgrepo-com.svg" height="120" class="m-4">
                    <h5 class="ml-md-4 mr-md-4">
                        Using our proprietary AI models, we provide sentiment analysis with ~90% accuracy.
                        With active R&D, we're looking to develop out equally reliable forecasting products.
                    </h5>
                </div>
                <div class="col-lg">
                    <!-- Vectors and icons by https://iconhub.io?ref=svgrepo.com in CC Attribution License via https://www.svgrepo.com/ -->
                    <img src="../assets/icons/chart-column-grow-svgrepo-com.svg" height="120" class="m-4">
                    <h5 class="ml-md-4 mr-md-4">
                        Get ahead of the curve for earnings reports, dividend forecasts, and more.
                    </h5>
                </div>
            </div>
        </div>

        <div id="contact" class="p-4">
            <div class="row justify-content-center mt-3 mb-3">
                <div v-if="show_contact == true" class="col-lg-4">
                    <h2 class="text-light">Have Any Questions?</h2>
                    <p class="text-light">Contact us by filling out the information below</p>

                    <div v-if="contact_msg != ''" class="alert alert-warning">
                        {{ contact_msg }}
                    </div>
                    <form @submit.prevent="sendContactMessage()">
                        <div class="form-group text-left">
                            <input v-model="contact_email"
                                   type="email"
                                   class="form-control"
                                   placeholder="Enter your email"
                                   >
                            <textarea v-model="contact_text"
                                   class="form-control mt-3"
                                   placeholder="Enter your message"
                                   rows="5"
                                   >
                            </textarea>
                        </div>
                        <button type="submit" class="btn btn-light mt-3">Send Message</button>
                    </form>
                </div>
                <div v-else>
                    <h3>Message sent successfully</h3>
                    <p>Thank you for contacting us, we'll get back to you soon.</p>
                </div>

            </div>
        </div>

        <div id="footer" class="bg-dark">
            <footer class="text-light p-3">
                Built by
                <a href="https://github.com/nawazia/f500_sentiment_analysis" target="_blank">Ibrahim</a> | 
                <a href="#">Privacy Policy</a>
                <br>
                <small>&copy; FinTalk 2023</small>
            </footer>
        </div>
    </div>
</template>

<script>
import { Auth } from '../firebase/auth';
export default {
    data () {
        return {
            title: 'FinTalk',
            email: '',
            msg: '',
            show_contact: true,
            contact_email: '',
            contact_text: '',
            contact_msg: '',
        }
    },
    methods: {
        async addEmail(email) {
            var noticemessage = "Your email has joined the list"
            await Auth.createUserWithEmailAndPassword(email, this.randompassword(20)).catch(function(error) {
                if (email == '') {
                    noticemessage =  null;
                } else if (error.code != 'auth/email-already-in-use') {
                    noticemessage = error.message;
                }
            });
            this.msg = noticemessage;
            this.email = '';
        },

        randompassword (len) {
            var chars = "!#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
            var password = '';
            for (var i=0; i < len; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length))
            }
            return password;
        },

        sendContactMessage () {
            if (this.contact_email == '') {
            } else if (!this.validEmail(this.contact_email)) {
                this.contact_msg = 'Please enter a valid email address'
            } else if (this.contact_text.length < 10) {
                this.contact_msg = 'Your message is too short'
            } else {
                const url = `https://us-central1-f500-sentiment.cloudfunctions.net/sendEmail?email_from=${this.contact_email}&message=${this.contact_text}`
                const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json"}
                };
                fetch(url, requestOptions);
                this.show_contact = false;
            }
        },

        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #home-page {
        background-color: rgb(255, 255, 255);
        background: url(../assets/white-background.jpg);
    }

    #about {
        background-color: rgb(206, 227, 255);
        min-height: 40vh;
    }

    #iphone-img {
        max-height: 62vh;
    }

    #apple-store-img {
        max-width: 88%;
    }

    #contact {
        background-color: dodgerblue;
    }
</style>
