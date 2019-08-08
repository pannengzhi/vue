<template>
	<div class="app-container">
		<!--表单组件-->

		<!--工具栏-->
		<div class="head-container">
			<!-- 搜索条件 -->
			<el-input
				v-model="listQuery.name"
				prefix-icon="el-icon-search"
				clearable
				placeholder="输入员工名称"
				style="width:200px;margin-right: 10px"
				class="filter-item"
				@keyup.enter.native="search"
			/>
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
			<!-- 新增 -->
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
		</div>
		<!--表格渲染-->
		<el-table :data="list" v-loading="listLoading" border fit highlight-current-row element-loading-text="拼命加载中" :height="tableHeight">
			<el-table-column type="selection" width="50" :key="Math.random()"/>
			<el-table-column prop="id" label="编号" />
			<el-table-column prop="createTime" label="创建时间" sortable width="170" :show-overflow-tooltip="true" />
			<el-table-column prop="name" label="姓名" :show-overflow-tooltip="true" />
			<el-table-column prop="phone" label="电话" :show-overflow-tooltip="true" />
			<el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true" />
			<el-table-column prop="address" :show-overflow-tooltip="true" label="地址" />
			<el-table-column label="操作" width="200" fixed="right">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click="update(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="delete (scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页组件-->
		<pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
	</div>
</template>

<script>
import Pagination from 'components/Pagination';
export default {
	components: { Pagination },
	data() {
		return {
			list: [],
			listLoading: false,
			total: 0,
			listQuery: {
				name: '',
				page: 1,
				limit: 10
			}
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.getList();
		})
	},
	methods: {
		getList() {
			this.listLoading = true;
			this.axios.get('mock/emp', { params: this.listQuery }).then(
				data => {
					if (data.content) {
						this.list = data.content;
						this.total = data.totalElements;
					}
					this.listLoading = false;
					/* setTimeout(() => {
						this.listLoading = false;
					}, 50); */
				},
				error => {}
			);
		},
		search() {
			this.listQuery.page = 1;
			this.getList();
		},
		add() {
			this.isAdd = true;
			this.$refs.form.dialogVisible = true;
		},
		update(index, row) {
			this.isAdd = false;
			const _this = this.$refs.form;
			_this.form = JSON.parse(JSON.stringify(row));
			_this.dialogVisible = true;
		},
		delete(index, row) {
			this.$confirm('是否要删除该记录?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {})
				.catch(error => {});
		}
	},
	computed: {
		tableHeight() {
			return 'calc(100vh - 190px)';
		}
	}
};
</script>