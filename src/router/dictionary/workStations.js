import * as urls from '../routePath'

const workStations = {
	1001: {
		text: '维修报工',
		path: '',
		imgCls: 'wxbg'
	},
	1101: {
		text: '巡检保养',
		path: '',
		imgCls: 'xjby',
	},
	2001: {
		text: '陪检运送',
		path: '',
		imgCls: 'pjys'
	},
	3001: {
		text: '物资',
		path: urls.WZ,
		imgCls: 'wz'
	},
	3002: {
		text: '资产',
		path: '',
		imgCls: 'zc'
	},
	3003: {
		text: '盘点',
		path: '',
		imgCls: 'pd'
	},
	3004: {
		text: '意见',
		path: urls.YJ,
		imgCls: 'yj'
	}
}

export default workStations
