<template>
    <file-importer :initial-os="os"></file-importer>
</template>
<script type="es6">
    import Const from 'common/const';
    import FileImporter from './file-importer';
    export default{
        components: {
            'file-importer': FileImporter
        },
        data(){
            return {
                os: ''
            }
        },
        created(){
            this.os = Const.getter.getKeyByVal('os', this.$route.params.os);
        },
        watch: {
            '$route.params.os': function(os) {
                this.os = Const.getter.getKeyByVal('os', os);
            }
        }
    }
</script>
