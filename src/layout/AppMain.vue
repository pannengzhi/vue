<template>
	<section class="app-main">
		<transition name="main" mode="out-in"><router-view /></transition>
	</section>
</template>

<script>
export default {
	name: 'appMain'
};
</script>

<style lang="scss" scoped>
.app-main {
	padding: 0 10px;
	height: calc(100vh - 85px);
	overflow: auto
}
</style>
