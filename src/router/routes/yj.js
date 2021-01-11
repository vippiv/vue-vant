import * as urls from '../routePath'
const yj = () => import('@/views/yj/yj.vue') // 意见
const fk = () => import('@/views/yj/fk.vue') // 我要反馈

const routes = [
	{
		name: 'wzlysq',
		path: `${urls.YJ_LIST}`,
		meta: {
			title: '意见'
        },
        component: yj
    },
    {
		name: 'wdwzlysq',
		path: `${urls.YJ_FK}`,
		meta: {
			title: '我要反馈'
        },
        component: fk
    }
]

export default routes