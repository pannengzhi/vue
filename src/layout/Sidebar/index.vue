<template>
	<el-aside width="200px" class="home-aside">
		<el-scrollbar style="height: 100%">
			<el-menu
				:show-timeout="200"
				:default-active="$route.path"
				:unique-opened="false"
				background-color="#304156"
				text-color="#bfcbd9"
				active-text-color="#409EFF"
			>
				<sidebar-item :routes="routes" />
			</el-menu>
		</el-scrollbar>
	</el-aside>
</template>

<script>
import SidebarItem from './SidebarItem';
export default {
	components: {
		SidebarItem
	},
	computed: {
		routes() {
			return this.$store.state.addRouters;
		}
	}
};
</script>

<style lang="scss">
.home-aside {
	background-color: #304156;
	.el-scrollbar__wrap {
		overflow-x: hidden;
	}
	.fa {
		vertical-align: middle;
		margin-right: 5px;
		width: 24px;
		text-align: center;
		font-size: 18px;
	}
}
</style>
