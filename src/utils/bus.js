import Vue from 'vue'

export default new Vue({
	data() {
		return {
			objectId: ''
		}
	},
	methods: {
		saveActivityObject (id) {
			console.log(id)
			this.objectId = id
		}
	}
})