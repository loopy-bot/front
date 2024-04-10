<template>
    <div class="container" >
        <a-row type="flex" justify="space-between" style="margin-bottom: 20px;">
            <div style="font-size: 22px;text-indent: 1em;color: black;">插件列表</div>

            <div style="display: flex;">
                <a-button shape="round" status="success" style="margin-right: 25px;" @click="addVisible=true">
                    <template #icon>
                        <icon-plus />
                    </template>
                    <template #default>
                        新增插件
                    </template>
                </a-button>
                <a-input :style="{ width: '200px' }" placeholder="请输入查询的Id号" allow-clear v-model="searchId">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
                <a-button type="primary" @click="searchPlugin(searchId)"> 查询</a-button>

            </div>
        </a-row>
        <div class="card_container" >
            <div v-for="item in pluginLists" :key="item.id" class="card" @click="showDetail(item)">
                <div class="plugin_top">
                    <div class="plugin_name">{{ item.name }}</div>
                    <a-popconfirm content="你确定要删除插件吗" @ok="deletePlugin(item.id)">
                        <a-button @click.stop class="delBtn">x</a-button>
                    </a-popconfirm>
                </div>
                <div class="plugin_content" >
                    <div>插件类型：{{ item.type }}</div>
                   <div>创建时间：{{ item.createdAt }}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- 对话框 -->
    <a-modal v-model:visible="addVisible" @ok="addPlugin">
        <template #title>
            新增插件
        </template>
        <a-form style="width: 400px;margin:0 auto;">
            <a-form-item label="插件名称">
                <a-input v-model="addRecord.name"></a-input>
            </a-form-item>
            <a-form-item label="插件类型">
               <a-radio-group v-model="addRecord.type">
                <a-radio  value="draw" >draw</a-radio>
                <a-radio  value="audio" >audio</a-radio>
                <a-radio  value="text" >text</a-radio>
                
            </a-radio-group>
            </a-form-item>
            
            <a-form-item label="请求方式">
               <a-radio-group v-model="addRecord.method">
                <a-radio  value="POST" >POST</a-radio>
                <a-radio  value="GET" >GET</a-radio>
            </a-radio-group>
            </a-form-item>
            <a-form-item label="请求地址">
                <a-input v-model="addRecord.url"></a-input>
            </a-form-item>
            <a-form-item label="插件描述">
                <a-textarea v-model="addRecord.description" placeholder="请填点什么" allow-clear :auto-size="{
                minRows:2,
                maxRows:5
            }"></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
    <!-- 对话框 -->
    <a-modal v-model:visible="checkVisible" @ok="editPlugin">
        <template #title>
            编辑插件
        </template>
        <div>
            <a-form-item label="插件名称">
                <a-input v-model="editRecord.name"></a-input>
            </a-form-item>
            <a-form-item label="插件类型">
               <a-radio-group v-model="editRecord.type">
                <a-radio  value="draw" >draw</a-radio>
                <a-radio  value="audio" >audio</a-radio>
                <a-radio  value="text" >text</a-radio>
                
            </a-radio-group>
            </a-form-item>
            <a-form-item label="请求方式">
               <a-radio-group v-model="editRecord.method">
                <a-radio  value="POST" >POST</a-radio>
                <a-radio  value="GET" >GET</a-radio>
                </a-radio-group>
            </a-form-item>
             <a-form-item label="请求地址">
                <a-input v-model="editRecord.url"></a-input>
            </a-form-item>
            <a-form-item label="插件描述">
                <a-textarea v-model="editRecord.description" placeholder="请填点什么" allow-clear :auto-size="{
                minRows:2,
                maxRows:5
            }"/>
            </a-form-item>
        </div>
    </a-modal>
    
</template>

<script setup>
import { reqGetPluginList, reqAddPlugin, reqEditPlugin, reqDeletePlugin,reqGetPlugin } from '@/services/mock/plugin';
import { Message } from '@arco-design/web-vue';
const checkVisible = ref(false)
const addVisible = ref(false)
let isEdit = ref(false)
// 获取全部插件
const getPluginList = () => {
    reqGetPluginList().then(res => {
        pluginLists.value = res.data.data
        pluginLists.value.forEach(item=>{
            item.createdAt=item.createdAt.slice(0,10)
            item.updatedAt=item.updatedAt.slice(0,10)
        })
    })
}
const searchId = ref('')

// 新增插件
const addPlugin = () => {
    reqAddPlugin(addRecord).then(res => {
        Message.success('新增成功')
        addVisible.value = false
        getPluginList()
    }).catch(err => {
        Message.error('新增失败')
    })
}
// 监听新增插件对话框的显示状态，当对话框显示时清空输入框内容
watch(addVisible,()=>{
    if(addVisible.value){
        addRecord.name = ''
        addRecord.type = ''
        addRecord.description = ''
        addRecord.url = ''
        addRecord.method = ''
    }
})
watch(() => searchId.value, () => {
    if (searchId.value === '') {
        getPluginList()
    }
})


const columns = [
    {
        title: '创建时间',
        dataIndex: 'createdAt',
    },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
    },
    {
        title: '请求类型',
        dataIndex: 'method',
    },
    {
        title: '接口类型',
        dataIndex: 'type',
    },
    {
        title: '地址',
        dataIndex: 'url'
    },
    {
        title: '详细描述',
        slotName: 'description'
    },
    {
        title: '操作',
        slotName: 'optional'
    }
];
const pluginLists = ref([
    ])
const addRecord = reactive({
    name: '',
    type: '',
    description: '',
    url: '',
    method: ''
});
const editRecord = reactive({
    name: '',
    type: '',
    description: '',
    url: '',
    method: '',
    id:''
});

const editPlugin = () => {
    
    reqEditPlugin(editRecord).then(res => {
        Message.success('编辑成功')
        checkVisible.value = false
        getPluginList()
    }).catch(err => {
        Message.error('编辑失败')
    })

}



onMounted(() => {
    getPluginList()
})

// 删除插件
const deletePlugin = ( id ) => {
    reqDeletePlugin(id).then(res => {
        Message.success('删除成功')
        getPluginList()
    }).catch(err => {
        Message.error('删除失败')
    })
}

// 展示插件细节
const showDetail = (item) => {
    console.log(editRecord);
    checkVisible.value = true
    editRecord.name=item.name
    editRecord.type=item.type
    editRecord.description=item.description
    editRecord.url=item.url
    editRecord.method=item.method
    editRecord.id=item.id
}

// 搜索插件
const searchPlugin = (id) => {
    reqGetPlugin(id).then(res => {
        if(res.data.data==null){
            Message.error('未查询到相关插件')
        } else {
            pluginLists.value = []
            pluginLists.value[0] = res.data.data
            Message.success('查询成功')
        }        
    }).catch(err => {
        Message.error('查询失败')
    })
}
</script>

<style scoped>
.container {
    margin: 10px;
}

.card_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.card {
    width: 32%;
    height: 100px;
    border-radius: 15px;
    margin-top: 10px;
    margin: 0.6%;
    background-color: #ffffff;
}
.plugin_top {
    display: flex;
    justify-content: space-between;
}

.plugin_name {
    font-size: 18px;
    text-align: left;
    margin-left: 10px;
    margin-top: 10px;
}
.plugin_content>div:nth-of-type(1) {
    margin-top: 12px;
    margin-left: 12px
}
.plugin_content>div:nth-of-type(2) {
    margin-top: 5px;
    margin-left: 12px;
}
.card:hover {
    cursor: pointer;
    border: 1px solid #1890ff;
}

.delBtn {
    background-color: transparent;
}
.delBtn:hover {
    color: #1890ff;
    background-color: transparent;
    scale: 1.1;
}
</style>