<template>
	<div class="app-container">
		<!--表单组件-->
		<eForm ref="form" :is-add="isAdd" />
		<!--工具栏-->
		<div class="head-container">
			<!-- 搜索条件 -->
			<el-input
				v-model="listQuery.name"
				prefix-icon="el-icon-search"
				clearable
				placeholder="输入用户名"
				style="width:191px"
				class="filter-item mg-r10"
				@keyup.enter.native="search"
			/>
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
			<!-- 新增 -->
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add">添加</el-button>
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="test">测试</el-button>
		</div>
		<!--表格渲染-->
		<el-table ref="table" :data="list" v-loading="listLoading" border fit element-loading-text="拼命加载中" :max-height="tableHeight">
			<el-table-column type="selection" width="50" :key="Math.random()"/>
			<el-table-column prop="id" label="主键" />
			<el-table-column prop="name" label="用户名" sortable width="120" />
			<el-table-column label="操作" width="200" fixed="right">
				<template slot-scope="scope"> 
					<el-button :disabled="scope.row.name==5" size="mini" type="primary" icon="el-icon-edit" @click="update(scope.$index, scope.row)">修改</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页组件-->
		<pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
	</div>
</template>

<script>
import eForm from './form';
import Pagination from 'components/Pagination';
export default {
	components: { eForm, Pagination },
	data() {
		return {
			isAdd: true,
			list: [],
			index: 0,
			total: 0,
			listLoading: false,
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
		});
	},
	methods: {
		getList() {
			this.listLoading = true;
			this.axios.get('api/test/page', { params: this.listQuery }).then(
				data => {
					if (data.data) {
						this.list = data.data
						this.total = data.total;
					}
					this.listLoading = false;
				},
				error => {}
			);
		},
		search() {
			this.listQuery.page = 1;
			this.getList();
		},
			test(){
			this.axios.get('api/test/all').then(
				data => {
				},
				error => {}
			);
		},
		add() {
			this.isAdd = true;
			this.$refs.form.dialogVisible = true;
		},
		update(index, row) {
			this.isAdd = false;
			const _this = this.$refs.form;
			this.index = index
			_this.form = JSON.parse(JSON.stringify(row));
			_this.dialogVisible = true;
		},
		del(index, row) {
			this.$confirm('是否要删除该记录?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.axios.delete('api/test/'+row.id).then(
					data => {
						if (data.code === 1) {
							if ((this.total-1) === (this.listQuery.page - 1) * this.listQuery.limit && this.total != 0) {this.listQuery.page -= 1}//删除最后一条没查询上一页bug
							this.getList()
						}
					},
					error => {
						
					}
				);
			}).catch(error => {});
		}
	},
	computed: {
		tableHeight() {
			return document.documentElement.clientHeight - 180
		}
	},
	filters: {
		deptFilter(val) {
			let fmt = '';
			val = val + '';
			switch (val) {
				case '1':
					return fmt = '研发部';
				case '2':
					return fmt = '生产部';
				case '3':
					return fmt = '人事部';
				case '4':
					return fmt = '财务部';
					break;
				default:
					return fmt;
			}
		}
	}
};
</script>