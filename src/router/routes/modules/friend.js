import Layout from '@/layouts';

export const route = [
    {
        path: '/friend',
        component: Layout,
        redirect: '/',
        meta: {
            title: 'friend',
            remixIcon: 'ri-code-s-slash-line',
        },
        children: [
            {
                path: '',
                name: 'friend',
                component: () => import('@/pages/friend/index.vue'),
                meta: { title: '好友管理', cachePage: true, icon: 'user' },
            },
        ],
    },
];

export default route;
