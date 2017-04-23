/**
 * @author rubyisapm
 */
import App from './component/app.vue';
import VueRouter from 'vue-router';
export default new VueRouter({
    routes: [
        // 动态路径参数 以冒号开头
        {
            path: '/', redirect: '/android'
        },
        {path: '/:os', component: App}
    ]
});
