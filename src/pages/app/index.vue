<template>
    <div class="config_container" v-show="!isConfig">
        
        <div class="title"><icon-settings />应用配置</div>
        <a-row  class="row">
            <a-button status="success" class="back" @click="isConfig=true">返回应用列表</a-button>
            <a-button class="del" status="danger" @click="delApp(appForm.id)">
                删除应用
            </a-button>
        </a-row>
        <div class="detail_setting">
            <div class="title_b">详细信息</div>
            </div>
        <div class="com_setting">
            <div class="title_b">基础信息修改</div>
             <a-form :model="appForm" class="set_content" layout="horizontal" :style="{width: '550px'}">
                <a-form-item label="应用名称">
                <a-input v-model="appForm.name"></a-input>
            </a-form-item>
            <a-form-item label="模型">
                <a-radio-group v-model="appForm.model">
                <a-radio  value="qwen" >qwen</a-radio>
                <a-radio  value="kimi" >kimi</a-radio>
            </a-radio-group>
            </a-form-item>
            <a-form-item label="个性">
                <a-input v-model="appForm.personality"></a-input>
            </a-form-item>
            <a-form-item label="应用描述">
                <a-textarea v-model="appForm.description" placeholder="请填点什么" allow-clear :auto-size="{
                minRows:2,
                maxRows:5
            }"></a-textarea>
            </a-form-item>
            <a-button style="width: 100px;margin:10px auto;" @click="updateApp(appForm)" type="primary">确定修改</a-button>
             </a-form>
        </div>
        <div class="plugin">
            <div class="title_b">插件绑定</div>
            <a-form :form="pluginForm">
                <a-checkbox-group  v-model="pluginForm.plugins" style="max-height: 250px; overflow-y: auto;">
                    <a-checkbox v-for="item in pluginLists" class="check_card" :value="item.name">
                        <template #checkbox="{ checked }">
                            <a-space
                                align="start"
                                class="custom-checkbox-card"
                                :class="{ 'custom-checkbox-card-checked': checked }">
                                <div className="custom-checkbox-card-mask">
                                    <div className="custom-checkbox-card-mask-dot"/>
                                </div>
                                <div>
                                    <div className="custom-checkbox-card-title">
                                        {{ item.name }}
                                    </div>
                                    <a-typography-text type="secondary">
                                        类型:{{ item.type }}
                                    </a-typography-text>
                                </div>
                            </a-space>
                        </template>
                    </a-checkbox>
                </a-checkbox-group>
                 <a-button style="width: 100px;margin:10px auto;" @click="updatePlugin(pluginForm)" type="primary">确定修改</a-button>
            </a-form>
        </div>
        
    </div>
   <div class="container" v-show="isConfig" >
        <a-row type="flex" justify="space-between" style="margin-bottom: 20px;">
            <div style="font-size: 22px;text-indent: 1em;color: black;">我的应用</div>
        </a-row>
        <div class="card_container" >
            <div class="card" v-for="item in appList" :key="item.id" @click="openConfig(item)">
                <div class="card_name">
                    <div>{{ item.name }}</div>
                    <icon-settings style="position: absolute;right: 30px;"/>
                </div>
                <div class="card_des">
                    {{ item.description }}
                </div>
                <div class="model">
                    模型：{{ item.model }}
                </div>
                <div class="pers">
                    个性：{{ item.personality }}
                </div>
            </div>
            <div class="card" @click="goAddApp">
                <div class="addCard">
                    <div class="add">
                        <icon-plus />
                    </div>
                创建应用</div>
            </div>
        </div>
    </div>
    <a-modal v-model:visible="isAddApp" @ok="addAppApp">
        <template #title>
            新增插件
        </template>
        <a-form style="width: 450px;">
        <a-form-item required label="应用名称">
                <a-input v-model="addRecord.name"></a-input>
            </a-form-item>
            
            <a-form-item required label="模型">
                <a-radio-group v-model="addRecord.model">
                <a-radio  value="qwen" >qwen</a-radio>
                <a-radio  value="kimi" >kimi</a-radio>
            </a-radio-group>
            </a-form-item>
            <a-form-item required label="个性">
                <a-input v-model="addRecord.personality"></a-input>
            </a-form-item>
            <a-form-item required label="应用描述">
                <a-textarea v-model="addRecord.description" placeholder="请填点什么" allow-clear :auto-size="{
                minRows:3,
                maxRows:5
            }"></a-textarea>
            </a-form-item>
            </a-form>
    </a-modal>
</template>

<script setup>
import { reqGetAppList,reqAddApp, reqUpdateApp, reqBindPlugin,reqDelApp } from '@/services/mock/app';
import { reqGetPluginList } from '@/services/mock/plugin';
import { Message } from '@arco-design/web-vue';
let isAddApp = ref(false)
let isConfig = ref(true)
const goAddApp = () => {
    isAddApp.value = true
}

const pluginLists = ref([])

const appForm = reactive({
    name: '',
    description: '',
    model: '',
    personality: '',
    id: ''
})

const pluginForm = reactive({
    id: '',
    plugins: []
})

const addRecord = reactive({
    name: '',
    description: '',
    model: '',
    personality: ''
})

watch(isAddApp,()=>{
    if(isAddApp.value){
        addRecord.name = ''
        addRecord. model = ''
        addRecord.description = ''
        addRecord.personality = ''
    }
})


const addAppApp = ()=>{
    reqAddApp(addRecord).then(res => {
        isAddApp.value = false
        Message.success('创建成功')
        getAppList()
    })

}

const appList = ref([])


const getAppList = () => {
    reqGetAppList().then(res => {
        appList.value = res.data.data
    })
}

const openConfig = (item) => {
    isConfig.value = false
    appForm.name = item.name
    appForm.description = item.description
    appForm.model = item.model
    appForm.personality = item.personality
    appForm.id = item.id
    pluginForm.id = item.id
}

const updateApp = (appForm) => {
    reqUpdateApp(appForm).then(res => {
        Message.success('修改成功')
        getAppList()
    })
}

const getPluginList = () => {
    reqGetPluginList().then(res => {
        pluginLists.value = res.data.data.map(item => ({
            name: item.name,
            type: item.type,})
        )
    })
}

const updatePlugin = (pluginForm) => {
    reqBindPlugin(pluginForm).then(res => {
        Message.success('修改插件绑定成功')
    })
}

const delApp = (id) => {
    reqDelApp(id).then(res => {
        Message.success('删除成功')
        getAppList()
        isConfig.value = true
    })
}

onMounted(() => {
    getAppList()
    getPluginList()
})
</script>

<style scoped>
.card_container {
    display: flex;
    margin: 10px;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.card {
    position: relative;
    width: 32%;
    height: 200px;
    border-radius: 15px;
    margin-top: 10px;
    margin: 0.6%;
    background-color: #ffffff;
    overflow: hidden;
    transition: all 0.1s;
}
.card:hover {
    cursor: pointer;
    scale: 1.05;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
}
.card_name {
    display: flex;
    font-size: 22px;
    text-align: left;
    margin-left: 20px;
    margin-top: 20px;
    font-weight: 700;
}

.card_des {
    position: absolute;
    width: 75%;
    color: #9a9797;
    line-height: 18px;
    overflow: hidden;            
    text-overflow: ellipsis;    
    display:-webkit-box;         
    -webkit-box-orient:vertical; 
    -webkit-line-clamp:2;
    letter-spacing: 1.5px; 
    bottom:25px;
    left: 30px;
     
}

.model,
.pers {
    position: absolute;
    width: 75%;
    font-size: 15px;
    top: 60px;
    left: 30px;
}

.pers {
    top: 110px;
}

.addCard {
    display: flex;
    align-items: center;
font-size: 18px;
color: #1f1f1f;
}
.add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: #ccfbf1;
    margin: 15px;
}

.config_container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    font-size: 18px;
    color: #3f74f6;
    width: 100%;
    padding-bottom: 7px;
}
.row {
    width: 95%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
}

.back {
    margin: 10px;
}
.del {
    float: right;
    margin: 10px;

}
.com_setting,
.plugin,
.detail_setting {
    width: 45%;
    background-color: white;
    min-height: 350px;
    margin: 20px;
    border-radius: 15px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
}

.detail_setting {
    width: 70%;
}

.title_b {
    font-size: 22px;
    font-weight: 700;
    margin: 30px;
}

.check_card {
    margin: 10px;
}

.custom-checkbox-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>