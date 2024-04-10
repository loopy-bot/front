import fly from '@/api/mock'

// 获取好友列表
export const reqGetFriendList = (page, pageSize) => {
    return fly.post('/wx-resource/friends/list', { page, pageSize })
}

// 查询单个好友
export const reqSearchFriend = (id) => {
    return fly.post('/wx-resource/friends/detail', id)
}

/* export const reqEditFriend = (data) => {
    return fly.post('/wx-resource/friends/edit', data)
}

// 删除好友
export const reqDeleteFriend = (id) => {
    return fly.post('/wx-resource/friends/delete', id)
} */