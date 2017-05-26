/**
 * @author rubyisapm
 */
import Vue from 'vue';
import router from './router';
import VueRouter from 'vue-router';
import 'common/vueFilter';
Vue.use(VueRouter);
new Vue({
    el: '#app',
    router,
    data: {
        os: ''
    },
    computed: {
        href(){
            return this.os === 'android' ? '#/ios' : '#/android';
        }
    },
    created(){
        this.os = this.$route.params.os;
    },
    watch: {
        '$route.params.os': function(os) {
            this.os = os;
        }
    }
});

