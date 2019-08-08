<template>
	<el-container class="home-container" direction="vertical">
		<Header />
		<el-container>
			<Sidebar />
			<el-main>
				<Navbar />
				<AppMain />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import { Header, Sidebar, Navbar, AppMain } from '@/layout';
export default {
	name: 'home',
	components: { Header, Sidebar, Navbar, AppMain }
};
</script>
