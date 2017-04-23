/**
 * @author rubyisapm
 */
var constConfig = {
    data: {
        os: [
            {
                key: 1,
                val: 'android'
            }, {
                key: 2,
                val: 'ios'
            }
        ],
        status: [
            {
                key: false,
                val: '已禁用',
                color: 'text-danger'
            }, {
                key: true,
                val: '已启用',
                color: 'text-success'
            }
        ],
        activeType: [
            {
                key: 1,
                val: '欢天喜地红包雨'
            }, {
                key: 2,
                val: '送年兽'
            }, {
                key: 3,
                val: '迎财神'
            }
        ]
    },
    getter: {
        getValByKey(col, key){
            var data = constConfig.data[col];
            var matchedItem = data.filter((item)=> {
                return item.key === key;
            });

            return matchedItem[0].val;
        },
        getKeyByVal(col, val){
            var data = constConfig.data[col];
            var matchedItem = data.filter((item)=> {
                return item.val === val;
            });

            return matchedItem[0].key;
        },
        getListConfig(col){
            var data = constConfig.data[col];
            var config = {};

            data.map((item)=> {
                config[item.key] = {
                    text: item.val
                };
                if (typeof item.color !== 'undefined') {
                    config[item.key].className = item.color;
                }
            });
            return config;
        }
    }
};

export default constConfig;


