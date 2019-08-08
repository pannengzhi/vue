<template>
	<div class="menu-wrapper">
		<template v-for="item in routes">
			<el-submenu v-if="item.children && item.children.length > 0" :index="item.path" :key="item.name">
				<template slot="title">
					<i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
					<span slot="title">{{ item.meta.title }}</span>
				</template>
				<template v-for="child in item.children">
					<sidebar-item :routes="[child]"></sidebar-item>
				</template>
			</el-submenu>
			<router-link v-else :to="item.path" :key="item.name">
				<el-menu-item :index="item.path">
					<i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
					<span slot="title">{{ item.meta.title }}</span>
				</el-menu-item>
			</router-link>
		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		}
	}
};
</script>
<style lang="scss" scoped></style>
