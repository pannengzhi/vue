<template>
	<div class="app-container">
		<!--表单组件-->
		<eForm ref="form" :is-add="isAdd" :deptDict="deptDicts" />
		<!--工具栏-->
		<div class="head-container">
			<!-- 搜索条件 -->
			<el-input
				v-model="listQuery.name"
				prefix-icon="el-icon-search"
				clearable
				placeholder="输入角色名称"
				style="width:191px"
				class="filter-item mg-r10"
				@keyup.enter.native="search"
			/>
			<el-select v-model="listQuery.deptId" class="filter-item mg-r10" clearable placeholder="所属部门">
				<el-option v-for="item in deptDicts" :key="item.id" :label="item.name" :value="item.id" />
			</el-select>
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
			<!-- 新增 -->
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add">添加</el-button>
			<el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="test">测试</el-button>
		</div>
		<!--表格渲染-->
		<el-table :data="list" v-loading="listLoading" border fit element-loading-text="拼命加载中" :max-height="tableHeight">
			<el-table-column type="selection" width="50" :key="Math.random()" />
			<el-table-column prop="id" label="主键" />
			<el-table-column label="编号" width="100">
				<template slot-scope="scope">
					{{ scope.$index + 1 }}
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" sortable width="170" />
			<el-table-column prop="name" label="角色名称" />
			<el-table-column prop="dept" label="所属部门" width="100">
				<template slot-scope="scope">
					{{ scope.row.dept.id | deptFilter }}
				</template>
			</el-table-column>
			<el-table-column prop="level" label="等级" />
			<el-table-column prop="remark" label="描述" :show-overflow-tooltip="true" />
			<el-table-column label="操作" width="200" fixed="right">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click="update(scope.$index, scope.row)">修改</el-button>
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
	name: 'role',
	components: { eForm, Pagination },
	data() {
		return {
			mock: 1, // 测试用
			allData: [], // 测试用
			deptDicts: [],
			isAdd: true,
			list: [],
			index:0,
			total: 0,
			listLoading: false,
			listQuery: {
				name: '',
				deptId: '',
				page: 1,
				limit: 10
			}
		};
	},
	mounted() {
		this.getDeptDict();
		this.$nextTick(() => {
			this.getList();
		});
	},
	methods: {
		getList() {
			this.listLoading = true;
			if (this.mock === 1) {//测试用
				this.axios.get('mock/role/page', { params: this.listQuery }).then(
					data => {
						if (data.content) {
							//this.list = data.content; // 生产使用
							this.allData = data.content;
							this.mock = 0;
							this.list = this.allData.slice((this.listQuery.page - 1) * this.listQuery.limit, (this.listQuery.page - 1) * this.listQuery.limit + this.listQuery.limit);
							this.total = data.totalElements;
						}
						this.listLoading = false;
					},
					error => {}
				);
			} else {
				this.list = this.allData.slice((this.listQuery.page - 1) * this.listQuery.limit, (this.listQuery.page - 1) * this.listQuery.limit + this.listQuery.limit);
				this.listLoading = false;
			}
		},
		getDeptDict() {
			this.axios.get('mock/dept/all').then(
				data => {
					if (data.data) {
						this.deptDicts = data.data;
					}
				},
				error => {}
			);
		},
		search() {
			this.listQuery.page = 1;
			this.getList();
		},
		test(){
			this.axios.get('api/user/all').then(
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
				this.axios.delete('mock/role/'+row.id).then(
					data => {
						if (data.code === 1) {
							this.allData.splice(index,1)
							this.total = this.total - 1;
							if (this.total == (this.page - 1) * this.limit && this.total != 0) {this.page -= 1;}
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
					return (fmt = '研发部');
				case '2':
					return (fmt = '生产部');
				case '3':
					return (fmt = '人事部');
				case '4':
					return (fmt = '财务部');
					break;
				default:
					return fmt;
			}
		}
	}
};
</script>
