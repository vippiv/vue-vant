import moment from 'moment'
import { deepCopy } from './utils'
import { parse } from 'qs'

const handleTemperatureSheetData = {
	dealTw (data) {
		const timeDistance = [2, 6, 10, 14, 18, 22]
		const perfectData = []
		let tw = data.tw && data.tw.length > 1 ? String(data.tw).split(',') : ''
		let mb = data.mb && data.mb.length > 1 ? String(data.mb).split(',') : ''
		const dataTpl = {
			MeasuringDate: '', // 日期
			ORDERTIME: null, // 录入时间
			MOUTH: null, // 口温
			ARMPIT: null, // 腋温
			ANUS: null, // 肛温
			PULSE: null, // 脉搏
			HEARTBEAT: null, // 起博心跳
			BREATHING: '0', // 呼吸
			FEVER: null, // 高热降温
			ISRISE: '0', // 体温不升
			REMARKS: null, // 备注
			TEMPERATURE: '拒测' // 体温未测
		}
		// 七天循环
		for(let i = 0; i < 7; i++) {		
			timeDistance.forEach(dis => {
				let baseData = deepCopy(dataTpl)
				baseData.MeasuringDate = moment(new Date(new Date(data.FirstDay).getTime() + (i * 24 * 60 * 60 * 1000))).format('YYYY/MM/DD')
				baseData.ORDERTIME = dis
				// 体温数据处理
				tw && tw.forEach(dayItem => {
					// dayItem -> '4:10:0|36.3'
					let temperatureDayTimeData = dayItem.split(':')
					let temperature = temperatureDayTimeData[2].split('|') // 温度数据，temperature[0], 0 -> 口温 1 -> 腋温， 2-> 肛温
					if (parseInt(temperatureDayTimeData[0], 10) === parseInt(i, 10) + 1 && parseInt(this.fixTimePoint(temperatureDayTimeData[1]), 10) === parseInt(dis, 10)) {
						if (parseInt(temperature[0], 10) === 0) {
							baseData.MOUTH = temperature[1] // 口温
						}
						if (parseInt(temperature[0], 10) === 1) {
							baseData.ARMPIT = temperature[1] // 腋温
						}
						if (parseInt(temperature[0], 10) === 1) {
							baseData.ANUS = temperature[1] // 肛温
						}
					}
				})
				// 脉搏数据处理
				mb && mb.forEach(mbItem => {
					// mbItem -> '4:10:100'
					let mbDayTimeData = mbItem.split(':')
					// 只有天数和i值相等时才更新对应数据，mbDayTimeData[0]代表第几天，mbDayTimeData[1]代表几点
					if (parseInt(mbDayTimeData[0], 10) === parseInt(i, 10) + 1 && parseInt(dis, 10) === parseInt(mbDayTimeData[1], 10)) {
						baseData.PULSE = mbDayTimeData[2]
					}
				})
				perfectData.push(baseData)
			})
		}
		return perfectData
	},
	dealAxiosData (data) {
		const perfectData = []
		// 坐标轴数据模板
		const axiosData = {
			date: '',
			inHosptailDays: 10,
			operationDays: 1,
			dayInerval: [2, 6, 10, 14, 18, 22],
			excretion: '', // 大便
			weight: '', // 体重
			skinTest1: '', // 皮试1
			skinTest2: '', // 皮试2
			bloodOxygen: '', // 血氧饱和度
			bloodPress: '', // 血压
			vsd: '', // 负压引流
			sacas: '', // SACAS,
			hx: [] // 呼吸
		}
		const hxWeekDay = []
		const hxWeekData = {}
		data.hx.forEach(hxItem => {
			let hxItemContent = hxItem.split(':')
			if(hxWeekDay.indexOf(hxItemContent[0]) === -1) {
				hxWeekDay.push(hxItemContent[0])
				hxWeekData[hxItemContent[0]] = {
					inter: [],
					hx: []
				}
			}
			hxWeekData[hxItemContent[0]].inter.push(hxItemContent[2])
			hxWeekData[hxItemContent[0]].hx.push(hxItemContent[1])
		})
		// 七天循环
		for(let i = 0; i < 7; i++) {
			let baseData = deepCopy(axiosData)
			baseData.date = moment(new Date(new Date(data.FirstDay).getTime() + (i * 24 * 60 * 60 * 1000))).format('YYYY/MM/DD')
			data.ZIDUAN.forEach(item => {
				item.forEach(subItem => {
					let subItemContent = subItem.split(':')
					if (parseInt(subItemContent[0], 10) === parseInt(i, 10)) {
						if (subItemContent[1].indexOf('大便') > -1) {
							baseData.excretion = subItemContent[2]
						} else if (subItemContent[1].indexOf('负压引流') > -1) {
							baseData.vsd = subItemContent[2]
						} else if (subItemContent[1].indexOf('皮试1') > -1) {
							baseData.skinTest1 = subItemContent[2]
						} else if (subItemContent[1].indexOf('皮试2') > -1) {
							baseData.skinTest2 = subItemContent[2]
						} else if (subItemContent[1].indexOf('体重') > -1) {
							baseData.weight = subItemContent[2]
						} else if (subItemContent[1].indexOf('稍等') > -1) {
							baseData.moment = subItemContent[2]
						} else if (subItemContent[1].indexOf('末梢血糖') > -1) {
							baseData.bloodSugar = subItemContent[2]
						} else if (subItemContent[1].indexOf('入量') > -1) {
							baseData.inAmount = subItemContent[2]
						}
					}
				})
			})
			data.ZIDUAN_morning.forEach(item => {
				item.forEach(subItem => {
					let subItemContent = subItem.split(':')
					if (parseInt(subItemContent[0], 10) === (parseInt(i, 10) + 1)) {
						if (subItemContent[1].indexOf('血氧饱和度') > -1) {
							if (!baseData.bloodOxygen) {
								baseData.bloodOxygen = {}
							}
							baseData.bloodOxygen.f = subItemContent[2]
						} else if (subItemContent[1].indexOf('血压') > -1) {
							if (!baseData.bloodPress) {
								baseData.bloodPress = {}
							}
							baseData.bloodPress.up = subItemContent[2]
						}
					}
				})
			})
			data.ZIDUAN_afternoon.forEach(item => {
				item.forEach(subItem => {
					let subItemContent = subItem.split(':')
					if (parseInt(subItemContent[0], 10) === (parseInt(i, 10) + 1)) {
						if (subItemContent[1].indexOf('血氧饱和度') > -1) {
							if (!baseData.bloodOxygen) {
								baseData.bloodOxygen = {}
							}
							baseData.bloodOxygen.s = subItemContent[2]
						} else if (subItemContent[1].indexOf('血压') > -1) {
							if (!baseData.bloodPress) {
								baseData.bloodPress = {}
							}
							baseData.bloodPress.down = subItemContent[2]
						}
					}
				})
			})
			axiosData.dayInerval.forEach((inter) => {
				let day = i+1
				if (hxWeekDay.indexOf(String(day)) > -1) {
					let timePoint = hxWeekData[String(day)].inter.indexOf(String(inter))
					if (timePoint > -1) {
						baseData.hx.push(hxWeekData[day].hx[timePoint])
					} else{
						baseData.hx.push('noData')
					}
				}
			})
			baseData.operationDays = data.ssdays[0][i]
			baseData.inHosptailDays = data.iMDays
			perfectData.push(baseData)
		}
		return perfectData
	},
	fixTimePoint (timePoint) {
		const timeDistance = [2, 6, 10, 14, 18, 22]
		let pointIndex = -1
		if (timeDistance.find((n) => n === timePoint)) {
			return timePoint
		}
		for (let i = 0; i < timeDistance.length; i++) {
			let ret = timeDistance[i] - timePoint
			if (ret > 0) {
				pointIndex = i
				break
			}
		}
		if ((timeDistance[pointIndex] - timePoint) > Math.abs((timeDistance[pointIndex - 1] - timePoint))) {
			return timeDistance[pointIndex - 1]
		} else {
			return timeDistance[pointIndex]
		}
	}
}

export default handleTemperatureSheetData
