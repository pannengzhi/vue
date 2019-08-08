<template>
	<el-header class="home-header">
		<span class="header-title">
			后台项目管理系统
		</span>
		<div style="display: flex">
			<!-- <el-badge style="margin-right: 20px" :is-dot="this.$store.state.nfDot"><i class="fa fa-bell-o" @click="goChat" style="cursor: pointer"></i></el-badge> -->
			<span class="bell">
				<el-tooltip class="item" effect="dark" content="消息" placement="bottom">
					<el-badge v-if="bell > 0" :value="bell" class="item"><i class="fa fa-bell-o fa-lg" @click="goChat" style="cursor: pointer"></i></el-badge>
					<i v-else class="fa fa-bell-o fa-lg"></i>
				</el-tooltip>
			</span>

			<el-dropdown @command="handleCommand">
				<span class="userinfo">
					{{ this.$store.getters.getUserName }}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="info">个人信息</el-dropdown-item>
					<el-dropdown-item command="edtpwd">修改密码</el-dropdown-item>
					<el-dropdown-item command="logout">
						<i class="fa fa-sign-out fa-lg" aria-hidden="true"></i>
						注销
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="small">
					<el-form-item label="原密码" prop="pass"><el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input></el-form-item>
					<el-form-item label="新密码" prop="pass"><el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input></el-form-item>
					<el-form-item label="确认密码" prop="checkPass"><el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input></el-form-item>
					<el-form-item style="text-align: right">
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</el-header>
</template>

<script>
import { removeToken } from 'utils/auth'; // 验权
export default {
	name: 'vheader',
	data() {
		const validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		const validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			bell: 5,
			dialogVisible: false,
			ruleForm: {
				oldpass: '',
				pass: '',
				checkPass: ''
			},
			rules: {
				pass: [{ validator: validatePass, trigger: 'blur' }],
				checkPass: [{ validator: validatePass2, trigger: 'blur' }]
			}
		};
	},
	methods: {
		handleCommand(command) {
			switch (command) {
				case 'edtpwd':
					this.dialogVisible = true;
					break;
				case 'logout':
					this.logout();
					break;
				default:
					break;
			}
		},
		goChat() {},
		logout() {
			this.$confirm('注销登录, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					removeToken();
					this.$router.push({ path: '/login' });
				})
				.catch(() => {});
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
				} else {
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style lang="scss" scoped>
.home-header {
	display: flex;
	max-height: 50px;
	background-color: #20a0ff;
	color: #fff;
	align-items: center;
	justify-content: space-between;

	.header-title {
		font-size: 22px;
	}
	.bell {
		margin-left: 15px;
		margin-right: 30px;
	}
	.userinfo {
		color: #fff;
		font-size: 16px;
		cursor: pointer;
	}
}
</style>
