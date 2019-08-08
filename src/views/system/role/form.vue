<template>
	<el-dialog :visible.sync="dialogVisible" :title="isAdd ? '新增角色' : '编辑角色'" :before-close="close" v-dialogDrag append-to-body width="500px">
		<el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
			<el-form-item label="角色名称" prop="name"><el-input v-model="form.name" style="width: 370px;" /></el-form-item>
			<el-form-item label="所属部门">
				<el-select v-model="form.dept.id" placeholder="请选择所属部门" style="width: 370px;"><el-option v-for="item in deptDict" :key="item.id" :label="item.name" :value="item.id" /></el-select>
			</el-form-item>
			<el-form-item label="角色级别" prop="level"><el-input-number v-model.number="form.level" :min="1" :max="100" controls-position="right" style="width: 370px;" /></el-form-item>
			<el-form-item label="描述信息" prop="remark"><el-input v-model="form.remark" style="width: 370px;" rows="5" type="textarea" /></el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click="cancel">取消</el-button>
			<el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	props: {
		isAdd: {
			type: Boolean,
			required: true
		},
		deptDict: {
			type: Array
		}
	},
	data() {
		return {
			dialogVisible: false,
			loading: false,
			form: { name: '', dept: { id: '', name: '' }, level: 1, remark: '' },
			rules: {
				name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
			}
		};
	},
	methods: {
		doSubmit() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					this.loading = true;
					if (this.isAdd) {
						this.doAdd();
					} else {
						this.doEdit();
					}
				} else {
					return false;
				}
			});
		},
		doAdd() {
			this.axios.post('mock/role/save', this.form).then(
				data => {
					// 成功回调
					if (data.code === 1) {
						this.resetForm();
						this.$message({ showClose: true, message: '添加成功', type: 'success', duration: 2000 });
						this.loading = false;
						this.$parent.allData.unshift(data.data);
						this.$parent.total = this.$parent.total + 1;
						this.$parent.getList();
					}
				},
				error => {
					this.loading = false;
				}
			);
		},
		doEdit() {
			this.axios.put('mock/role', this.form).then(
				data => {
					if (data.code === 1) {
						this.resetForm();
						this.$message({ showClose: true, message: '修改成功', type: 'success', duration: 2000 });
						this.loading = false;
						this.$parent.list.splice(this.$parent.index, 1, data.data)
					}
				},
				error => {
					this.loading = false;
				}
			);
		},
		close() {
			this.resetForm();
		},
		cancel() {
			this.resetForm();
		},
		resetForm() {
			this.dialogVisible = false;
			//this.$refs['form'].resetFields(); //只能重置一层
			this.form = { name: '', dept: { id: '', name: '' }, level: 1, remark: '' };
		}
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-input-number .el-input__inner {
	text-align: left;
}
</style>
