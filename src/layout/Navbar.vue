<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item key="home">
				<router-link to="/home">
					<i class="fa fa-home"></i>主页
				</router-link>
			</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<span class="no-redirect">{{ item.name }}</span>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
export default {
	created() {
		this.getBreadcrumb();
	},
	data() {
		return {
			levelList: null
		};
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		}
	},
	methods: {
		getBreadcrumb() {
			let matched = this.$route.matched.filter(item => item.name);
			const first = matched[0];
			if (first && first.name === '主页') {
				matched = []; //[{ path: '/home', name: '主页' }].concat(matched);
			}
			this.levelList = matched;
		}
	}
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
	height: 34px;
	line-height: 34px;
	padding-left: 10px;
	border-bottom: 1px solid #ccc;
	box-shadow: 0 0 4px #b6b6b6;
	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
}
</style>
