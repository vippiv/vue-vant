<template>
    <div class="wzlysq-container">
		<ckVanNavBar 
			title="物资领用申请"
			leftText="返回"
			@click-left="onClickLeft"
			class="top-sticky"
		/>
		<div class="content">
			<van-form @submit="onSubmit" class="input-text-right">
				<van-field
					readonly
					clickable
					name="department"
					:value="department"
					label="领用申请科室"
					placeholder="点击选择科室"
					@click="dptShowPicker = true"
				/>
				<van-popup v-model="dptShowPicker" position="bottom">
					<van-picker
						show-toolbar
						:columns="dptColumns"
						@confirm="onDptConfirm"
						@cancel="dptShowPicker = false"
					/>
				</van-popup>
				<van-field
					v-model="applyUser"
					name="applyUser"
					label="领用申请人"
					placeholder="领用申请人"
					:rules="[{ required: true, message: '请填写领用申请人' }]"
				/>
				<van-field
					v-model="applyPhone"
					type="text"
					name="applyPhone"
					label="领用电话"
					placeholder="领用电话"
					:rules="[{ required: true, message: '请填写电话' }]"
				/>
				<van-field
					readonly
					clickable
					name="applyDate"
					:value="applyDate"
					label="领用申请时间"
					placeholder="点击选择时间"
					@click="dateShowPicker = true"
				/>
				<van-popup v-model="dateShowPicker" position="bottom">
					<van-datetime-picker
						type="datehour"
						@confirm="onDateConfirm"
						@cancel="dateShowPicker = false"
					/>
				</van-popup>
				<van-field
					readonly
					clickable
					name="applyStore"
					:value="applyStore"
					label="仓库"
					required
					placeholder="点击选择仓库"
					@click="storeShowPicker = true"
					:rules="[{ required: true, message: '请选择' }]"
				/>
				<van-popup v-model="storeShowPicker" position="bottom">
					<van-picker
						show-toolbar
						:columns="storeColumns"
						@confirm="onStoreConfirm"
						@cancel="storeShowPicker = false"
					/>
				</van-popup>
				<van-field
					v-model="applyNote"
					name="applyNote"
					rows="2"
					autosize
					label="领用备注"
					type="textarea"
					maxlength="300"
					placeholder="填写备注"
					show-word-limit
				/>
				<div class="wz-list">
					<div class="title-box">
						<div class="title"> <span class="red">*</span> 物资清单</div>
						<!-- 必须设置native-type="button"，否则会触发提交验证 -->
						<div class="handle-btn"><van-button type="info" size="mini" native-type="button" @click="handleSelectGoods">选择物资</van-button></div>
					</div>
					<div class="wz-item" v-for="item in selectWZ" :key="item.id">
						<div class="goods-desc">
							<div class="img"></div>
							<div class="desc">
								<p style="font-size: 1.2rem; color: #222;">{{item.name}}</p>
								<p>122522</p>
								<p>剩余{{item.stock}}把</p>
								<p class="red">¥<span class="rmb">{{item.price}}</span></p>
							</div>
						</div>
						<div class="goods-steeper">
							<van-stepper v-model="item.stepperVal" min="1" theme="round"/>
						</div>
					</div>
				</div>
				<div class="fix-bottom">
					<van-button round block type="info" native-type="submit">提交物资领用申请</van-button>
				</div>
			</van-form>
		</div>
    </div>
</template>

<script>
import moment from 'moment'
import { WZ, WZ_XZWZ } from '@/router/routePath'

export default {
	name: 'Wzlysq',
	data () {
		return {
			applyUser: '',
			applyPhone: '',
			applyDate: '',
			applyStore: '',
			applyNote: '',
			department: '',
			dptColumns: [
				{ uid: '11', text: '泌尿科' },
				{ uid: '22', text: '内科' },
				{ uid: '33', text: '外科' }
			],
			storeColumns: [
				{ uid: '11', text: '后勤仓库' },
				{ uid: '22', text: '内部仓库' },
				{ uid: '33', text: '外补仓库' }
			],
			selectWZ: [],
			columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
			password: '',
			showPicker: false,
			message: '',
			value: '',
			stepperVal: 1,
			dateShowPicker: false,
			dptShowPicker: false,
			storeShowPicker: false
		}
	},
	created () {
		this.handleInitSelectWZ()
	},
	activated () {
		this.handleInitSelectWZ()
	},
    methods: {
		onSubmit(formValues) {
			console.log('submit', formValues)
			if (this.selectWZ.length === 0) {
				this.$notify({
					message: '请选择物资',
					type: 'danger',
					duration: 1000
				})
				return
			}
			// 提交数据
			localStorage.removeItem('selectWZLY')
		},
		onConfirm(value) {
			this.value = value;
			this.showPicker = false;
		},
		onDptConfirm (dpt) {
			this.department = dpt.text
			this.dptShowPicker = false
		},
		onDateConfirm(time) {
			this.applyDate = moment(time).format('YYYY-MM-DD HH:mm')
			this.dateShowPicker = false
		},
		onStoreConfirm (store) {
			this.applyStore = store.text
			this.storeShowPicker = false
		},
		handleSelectGoods () {
			this.$router.push({
				path: `${WZ_XZWZ}/wzly`
			})
		},
		onClickLeft () {
			this.$router.push({
				path: WZ
			})
		},
		handleInitSelectWZ () {
			let selectWZ = localStorage.getItem('selectWZLY')
			selectWZ = selectWZ ? JSON.parse(selectWZ) : []
			this.selectWZ = selectWZ
		}
	}
}
</script>

<style lang="scss" scoped>
.wzlysq-container {
	.content {
		background-color: white;
		border-bottom: 1px solid transparent;
	}
	.fix-bottom {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 20px;
	}
	.wz-list {
		.title-box {
			margin: 10px 16px;
			display: flex;
			.title {
				width: 50%;
			}
			.handle-btn {
				width: 50%;
				text-align: right;
			}
		}
		.wz-item {
			display: flex;
			margin: 15px;
			padding-bottom: 15px;
			border-bottom: 1px solid #eee;
			.goods-desc {
				width: 60%;
				display: flex;
				.img {
					width: 50%;
					height: 100px;
					background-color: #333;
				}
				.desc {
					width: 50%;
					color: #666;
					p {
						line-height: 1.5;
						padding-left: 10px;
					}
					.rmb {
						font-size: 1.2rem;
					}
				}
			}
			.goods-steeper {
				width: 40%;
				text-align: right;
			}
		}
	}
}
</style>