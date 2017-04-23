/**
 * @author rubyisapm
 */
import Vue from 'vue';
import utility from 'ct-utility';
Vue.filter('dateTimeBToF', function(value) {
    return (value + '').replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).*$/, '$1 $2');
});
Vue.filter('timeFormator', function(v) {
    return utility.dateFilter(v, 'yyyy-MM-dd HH:mm:ss');
});
Vue.filter('dateFormator', function(v) {
    return utility.dateFilter(v, 'yyyy-MM-dd');
});
