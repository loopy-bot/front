import Layout from '@/layouts';

export const route = [
    {
        path: '/plugin',
        component: Layout,
        redirect: '/',
        meta: {
            title: 'plugin',
            remixIcon: 'ri-code-s-slash-line',
        },
        children: [
            {
                path: '',
                name: 'plugin',
                component: () => import('@/pages/plugin/index.vue'),
                meta: { title: '插件管理', cachePage: true, icon: 'edit' },
            },
        ],
    },
];

export default route;
