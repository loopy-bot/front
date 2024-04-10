<template>

    <a-card>
        <a-row type="flex" justify="space-between" style="margin-bottom: 20px;">
            <div style="font-size: 22px;text-indent: 1em;">好友列表</div>
            <div style="display: flex;">
                <a-input :style="{ width: '200px' }" placeholder="请输入查询的Id号" allow-clear v-model="searchId">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
                <a-button type="primary" @click="searchFriend(searchId)"> 查询</a-button>
            </div>
        </a-row>
        <a-table :columns="columns" :data="friendList" :pagination="false">
            <!-- <template #optional="{ record }">
                <a-space :size="medium">
                    <a-button status="success" shape="round" @click="tryEdit(record)">修改</a-button>
                    <a-button status="danger" shape="round" @click="deleteFriend(record)">删除</a-button>
                </a-space>
            </template> -->
            
        </a-table>
        <a-pagination :total="friendList.length"  show-page-size  />
    </a-card>

    <!-- 对话框 -->
    <!-- <a-modal v-model:visible="visible" @ok="editFriend">
        <template #title>
            修改好友信息
        </template>
        <a-form style="width: 400px;margin:0 auto;">
            <a-form-item label="微信ID">
                <a-input v-model="currentRecord.wxId"></a-input>
            </a-form-item>
            <a-form-item label="微信名">
                <a-input v-model="currentRecord.name"></a-input>
            </a-form-item>
            <a-form-item label="Alias">
                <a-input v-model="currentRecord.alias"></a-input>
            </a-form-item>
        </a-form>
    </a-modal> -->

</template>

<script setup>
import { reqGetFriendList, reqSearchFriend } from '@/services/mock/friend'
import { Message } from '@arco-design/web-vue';

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
        title: '微信ID',
        dataIndex: 'wxId',
    },
    {
        title: '微信名',
        dataIndex: 'name',
    },
    {
        title: 'Alias',
        dataIndex: 'alias'
    },
    {
        title: '操作',
        slotName: 'optional'
    }
];

const searchId = ref('')
// 搜索栏内容为空时重新获取全部好友列表
watch(() => searchId.value, () => {
    if (searchId.value === '') {
        getFriendList()
    }
})

const currentRecord = reactive({
    id: '',
    wxId: '',
    name: '',
    alias: ''
});


/* 下列定义的数据和方法都是可以直接丢到仓库中的 */
const friendList = ref([])
// 获取好友列表
const getFriendList = () => {
    reqGetFriendList().then(res => {
        friendList.value = res.data.data
    })
}

// 查询好友列表
const searchFriend = (id) => {
    reqSearchFriend(id).then(res => {
        friendList.value = []
        friendList.value[0] = res.data.data
        Message.success('查询成功')
    })
}



/* // 修改好友
const visible = ref(false);
const tryEdit = (record) => {
    visible.value = true
    currentRecord.id = record.id;
    currentRecord.wxId = record.wxId;
    currentRecord.name = record.name;
    currentRecord.alias = record.alias;
}
const editFriend = () => {
    reqEditFriend(currentRecord).then(() => {
        Message.success('修改成功')
        getFriendList()
        visible.value = false
    })
}

// 删除好友
const deleteFriend = (record) => {
    reqDeleteFriend(record.id).then(() => {
        getFriendList()
        Message.success('删除成功')
    })
}
 */

onMounted(() => {
    getFriendList()
})
</script>

<style lang="scss" scoped></style>