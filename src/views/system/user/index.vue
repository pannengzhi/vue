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
			<el-table-column prop="username" label="用户名" sortable width="120" />
			<el-table-column prop="truename" label="姓名" />
			<el-table-column prop="phone" label="电话" />
			<el-table-column prop="email" label="邮箱" />
			<el-table-column label="状态" width="100" >
				<template slot-scope="scope">
					<el-tag size="medium" :type="scope.row.status===0?'':'danger'">{{ scope.row.status===0?'激活':'锁定' }}</el-tag>
				</template>
			</el-table-column>
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
	components: { eForm, Pagination },
	data() {
		return {
			mock: 1, // 测试用
			allData: [], // 测试用
			deptDicts: [],
			isAdd: true,
			list: [],
			total: 0,
			listLoading: false,
			listQuery: {
				username: '',
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
			if (this.mock === 1) {//测试用
				this.axios.get('mock/user/page', { params: this.listQuery }).then(
					data => {
						if (data.data) {
							//this.list = data.content; // 生产使用
							this.allData = data.data;
							this.mock = 0;
							this.list = this.allData.slice((this.listQuery.page - 1) * this.listQuery.limit, (this.listQuery.page - 1) * this.listQuery.limit + this.listQuery.limit);
							this.total = data.total;
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
			_this.indexs = index
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