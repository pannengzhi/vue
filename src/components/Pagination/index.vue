<template>
	<div style="margin-top: 7px">
		<el-pagination
			:current-page.sync="currentPage"
			:page-size.sync="pageSize"
			:page-sizes="[10, 20, 30, 50]"
			:total="total"
			layout="total, sizes,prev, pager, next,jumper"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script>
export default {
	name: 'Pagination',
	props: {
		total: {
			required: true,
			type: Number
		},
		page: {
			type: Number,
			default: 1
		},
		limit: {
			type: Number,
			default: 20
		}
	},
	computed: {
		currentPage: {
			get() {
				return this.page;
			},
			set(val) {
				this.$emit('update:page', val);
			}
		},
		pageSize: {
			get() {
				return this.limit;
			},
			set(val) {
				this.$emit('update:limit', val);
			}
		}
	},
	methods: {
		handleSizeChange(val) {
			this.$emit('pagination', { page: this.currentPage, limit: val });
		},
		handleCurrentChange(val) {
			this.$emit('pagination', { page: val, limit: this.pageSize });
		}
	}
};
</script>
