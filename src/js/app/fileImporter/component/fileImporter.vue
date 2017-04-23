<template>
    <div>
        <div class="clearfix mb10">
            <importer class="mr10"
                      method="post"
                      :server="importerConfig.server"
                      :button-text="importerConfig.buttonText"
                      @success="importSuccess"
                      @error="importError"></importer>
            <button type="button" class="btn btn-sm btn-success" @click="toggleStatus" v-cloak>
                <span class="glyphicon glyphicon-ok"></span> 启用
            </button>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">操作信息</h3>

            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-sm-3">操作人: {{info.operator}}</div>
                    <div class="col-sm-3">操作时间: {{info.updateTime | dateTimeBToF}}</div>
                </div>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">数据列表
                    <span class="pull-right">
                        {{listStatus}}
                    </span>
                </h3>
            </div>
            <list :config="list.config"
                  :data="list.data"
                  :theads="list.theads"
                  :response-status="list.responseStatus"
                  :response-msg="list.responseMsg"></list>
        </div>
    </div>

</template>
<script type="es6">
    import List from 'ct-adc-list';
    import uploaders from 'ct-adc-uploaders';
    import Interface from 'common/interface';
    import utility from 'ct-utility';
    import Const from 'common/const';
    export default{
        components: {
            list: List,
            importer: uploaders.Importer
        },
        props: {
            initialOs: {
                type: [String, Number],
                default: ''
            }
        },
        data(){
            return {
                os: this.initialOs,
                info: {
                    operator: '',
                    updateTime: ''
                },
                list: {
                    config: {
                        activeType: Const.getter.getListConfig('activeType')
                    },
                    theads: [
                        {
                            key: 'activeConfigId',
                            name: '活动ID'
                        },
                        {
                            key: 'activeType',
                            name: '活动类型'
                        },
                        {
                            key: 'beginTime',
                            name: '开始时间',
                            filter: 'dateTimeBToF'
                        },
                        {
                            key: 'endTime',
                            name: '结束时间',
                            filter: 'dateTimeBToF'
                        },
                        {
                            key: 'showTime',
                            name: '显示时间'
                        },
                        {
                            key: 'awardCount',
                            name: '奖励数量1'
                        },
                        {
                            key: 'lotteryActiveID',
                            name: '对应活动ID1'
                        },
                        {
                            key: 'lotteryAwardGuid',
                            name: '奖励对应GUID1'
                        },
                        {
                            key: 'freeActiveID',
                            name: '对应活动ID2'
                        },
                        {
                            key: 'freeAwardGuid',
                            name: '奖励对应GUID2'
                        }
                    ],
                    data: [],
                    loading: false,
                    responseStatus: true,
                    responseMsg: ''
                },
                importerConfig: {
                    buttonText: '导入csv文件',
                    accept: {
                        title: '请上传.csv后缀的文件!',
                        extensions: 'csv'
                    },
                    server: Interface.fileImporter.importFile
                }
            }
        },
        computed: {
            //获取整个列表的启用状态,请根据具体业务需要检测
            listStatus(){
                if (this.list.data.length > 0 && typeof this.list.data[0].status !== 'undefined') {
                    return Const.getter.getValByKey('status', this.list.data[0].status);
                } else {
                    return '';
                }
            }
        },
        created(){
            this.getListData();
        },
        methods: {
            //获取列表数据
            getListData(){
                var that = this;
                Promise.resolve($.ajax({
                    url: Interface.fileImporter.getList,
                    type: 'get',
                    cache: false,
                    data: {
                        os: that.os
                    }
                })).then(utility.objTransfer.lowerKey).then((res)=> {
                    if (res.successed) {
                        //warning!请联系后端尽量统一使用Status作为响应状态
                        that.setInfo(res);
                        that.setListData(res);
                    } else {
                        return Promise.reject(res.message);
                    }
                }).catch((msg)=> {
                    //warning!请联系后端在检测到用户未登录或者未得到授权时返回401状态码
                    if (typeof msg.status == '401') {
                        msg = '您未登录!';
                    } else if (typeof msg !== 'string') {
                        msg = '请求出错!'
                    }
                    that.list.data = [];
                    that.list.responseStatus = false;
                    that.list.responseMsg = msg;
                })
            },
            //设置操作信息
            setInfo(res){
                this.info.operator = res.data.adminName || '';
                this.info.updateTime = res.data.updateTime || '';
            },
            //设置table的数据
            setListData(res){
                this.list.data = res.data.config || [];
            },
            //导入文件成功
            importSuccess(res){
                res = utility.objTransfer.lowerKey(res);
                if (res.successed) {
                    this.list.data = res.data;
                    new MiniMsg({
                        type: 'success',
                        content: '导入成功!'
                    }).animation();
                } else {
                    new MiniMsg({
                        type: 'error',
                        content: res.message
                    }).animation();
                }
            },
            //导入文件失败
            importError(error){
                var msg = '';
                if (typeof error === 'string') {
                    msg = error;
                } else {
                    error = utility.objTransfer.lowerKey(error);
                    msg = error.message;
                }
                new MiniMsg({
                    type: 'error',
                    content: msg
                }).animation();
            },
            toggleStatus(event){
                var that = this;
                var $trigger = $(event.currentTarget);
                event.stopPropagation();
                var postData = {
                    oS: that.os,
                    config: that.list.data
                };
                postData = utility.objTransfer.upperKey(postData);
                popoverConfirm.init({
                    UID: $trigger,
                    placement: 'right',
                    title: '确定启用吗？',
                    loadingContent: '启用中...',
                    $trigger: $trigger,
                    ajax: {
                        config: {
                            type: 'post',
                            url: Interface.fileImporter.validate,
                            data: JSON.stringify(postData),
                            contentType: 'application/json'
                        },
                        callback: function(res) {
                            res = utility.objTransfer.lowerKey(res);
                            popoverConfirm.destroy();
                            if (res.successed) {
                                new MiniMsg({
                                    type: 'success',
                                    content: '操作成功!'
                                }).animation(function() {
                                            location.reload();
                                        });
                            } else {
                                new MiniMsg({
                                    type: 'error',
                                    content: res.message
                                }).animation();
                            }
                        }
                    }
                });
            }
        },
        watch: {
            initialOs: function(os) {
                this.os = os;
                this.getListData();
            }
        }
    }
</script>
