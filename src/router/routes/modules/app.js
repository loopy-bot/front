import Layout from '@/layouts';

export const route = [
    {
        path: '/app',
        component: Layout,
        redirect: '/',
        meta: {
            title: 'app',
            remixIcon: 'ri-code-s-slash-line',
        },
        children: [
            {
                path: '',
                name: 'app',
                component: () => import('@/pages/app/index.vue'),
                meta: { title: '应用管理', cachePage: true, icon: 'edit' },
            },
        ],
    },
];

export default route;
