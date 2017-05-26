/**
 * @author rubyisapm
 */
export default{
    fileImporter: {
        getList: '/api/ActiveConfig/Get',
        importFile: '/api/ActiveConfig/ImportConfig',
        exportFile: '/api/ActiveConfig/ImportConfig', // 该项目中无导出接口,该接口只是为了展示功能
        validate: '/api/ActiveConfig/UpdateConfig'
    }
};
