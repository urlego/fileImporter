## 页面说明

导表页面用于用户直接将数据导入数据库，比起常规的增删改查操作的页面，开发成本较小。

页面数据交互流程为：

导入文件 --> 后端解析后返回数据 --> 用户点击“生效” --> 将数据传到后端

## 接口列表

### 获取列表

```

{
   url: '/Api/PageA/GetList',
   method: 'get',
   req: {},
   res: {
       Status: Boolean,
       Message: String,
       Data: {
           Info: {
               AdminName: String,
               UpdateTime: Number,
               Status: Boolean // 数据状态（是否生效）
           },
           List: [
               // 业务数据
           ]
       }
   }
}

```

**说明:** 请将Status与List分开，Status针对整个List列表

### 导入列表

```

{
   url: '/Api/PageA/import',
   method: 'post',
   req: FormData,
   res: {
       Status: Boolean,
       Message: String,
       Data: [
           //解析文件后得到的数据
       ]
   }
}

```

**说明:** 该接口请保持与业务独立，可以看成是一个工具接口，用于解析文件中的数据

### 导出列表

当页面有“导出”功能时使用

```

{
   url: '/Api/PageA/export',
   method: 'get',
   req: {},
   res: File
}

```



### 生效列表

生效导入的数据

```

{
   url: '/Api/PageA/ChangeStatus',
   method: 'post',
   req: {
       Data: [
           //导入文件后得到的数据
       ],
       Status: Boolean
   },
   res: {
       Status: Boolean,
       Message: String
   }
}

```