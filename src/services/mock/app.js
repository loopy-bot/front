import fly from '@/api/mock';

export const reqGetAppList = () => {
    return fly.post('/application/list')
}

export const reqAddApp = (data) => fly.post('/application/create', data)

export const reqUpdateApp = (data) => fly.post('/application/update', data)

export const reqBindPlugin = (data) => fly.post('/application/plugins/bind', data)

export const reqDelApp = (id) => fly.post('/application/delete', { id })

export const reqDetailApp = (id) => fly.post('/application/detail', { id })