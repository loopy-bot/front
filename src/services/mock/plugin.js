import fly from '@/api/mock'

export const reqGetPluginList = () => fly.post('/plugin/list')

export const reqAddPlugin = (data) => fly.post('/plugin/create', data)

export const reqEditPlugin = (data) => fly.post('/plugin/update', data)

export const reqDeletePlugin = (id) => fly.post('/plugin/delete', { id })

export const reqGetPlugin = (id) => fly.post('/plugin/detail', { id })