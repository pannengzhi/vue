(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1e28e47f","chunk-a4ffdd7e"],{"333d":function(t,e,i){"use strict";i("c5f6");var n={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t})},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize})}}},a=i("2877"),s=Object(a.a)(n,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"margin-top":"7px"}},[i("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,"page-sizes":[10,20,30,50],total:t.total,layout:"total, sizes,prev, pager, next,jumper"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},[],!1,null,null,null);e.a=s.exports},"7ef5":function(t,e,i){"use strict";var n=i("aef2");i.n(n).a},aef2:function(t,e,i){},c73f:function(t,e,i){"use strict";i.r(e);var n=i("e2c1"),a=i("333d"),s={components:{eForm:n.default,Pagination:a.a},data:function(){return{isAdd:!0,list:[],index:0,total:0,listLoading:!1,listQuery:{name:"",page:1,limit:10}}},mounted:function(){var t=this;this.$nextTick(function(){t.getList()})},methods:{getList:function(){var t=this;this.listLoading=!0,this.axios.get("api/test/page",{params:this.listQuery}).then(function(e){e.data&&(t.list=e.data,t.total=e.total),t.listLoading=!1},function(t){})},search:function(){this.listQuery.page=1,this.getList()},test:function(){this.axios.get("api/test/all").then(function(t){},function(t){})},add:function(){this.isAdd=!0,this.$refs.form.dialogVisible=!0},update:function(t,e){this.isAdd=!1;var i=this.$refs.form;this.index=t,i.form=JSON.parse(JSON.stringify(e)),i.dialogVisible=!0},del:function(t,e){var i=this;this.$confirm("是否要删除该记录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.axios.delete("api/test/"+e.id).then(function(t){1===t.code&&(i.total-1==(i.listQuery.page-1)*i.listQuery.limit&&0!=i.total&&(i.listQuery.page-=1),i.getList())},function(t){})}).catch(function(t){})}},computed:{tableHeight:function(){return document.documentElement.clientHeight-180}},filters:{deptFilter:function(t){var e="";switch(t+=""){case"1":return"研发部";case"2":return"生产部";case"3":return"人事部";case"4":return"财务部";default:return e}}}},r=i("2877"),o=Object(r.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("eForm",{ref:"form",attrs:{"is-add":t.isAdd}}),i("div",{staticClass:"head-container"},[i("el-input",{staticClass:"filter-item mg-r10",staticStyle:{width:"191px"},attrs:{"prefix-icon":"el-icon-search",clearable:"",placeholder:"输入用户名"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:t.add}},[t._v("添加")]),i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:t.test}},[t._v("测试")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],ref:"table",attrs:{data:t.list,border:"",fit:"","element-loading-text":"拼命加载中","max-height":t.tableHeight}},[i("el-table-column",{key:Math.random(),attrs:{type:"selection",width:"50"}}),i("el-table-column",{attrs:{prop:"id",label:"主键"}}),i("el-table-column",{attrs:{prop:"name",label:"用户名",sortable:"",width:"120"}}),i("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{disabled:5==e.row.name,size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(i){return t.update(e.$index,e.row)}}},[t._v("修改")]),i("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(i){return t.del(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),i("pagination",{directives:[{name:"show",rawName:"v-show",value:0<t.total,expression:"total > 0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1)},[],!1,null,null,null);e.default=o.exports},e2c1:function(t,e,i){"use strict";i.r(e);var n=i("90c5"),a={props:{isAdd:{type:Boolean,required:!0},deptDict:{type:Array}},data:function(){return{dialogVisible:!1,loading:!1,form:{name:""},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]}}},methods:{doSubmit:function(){var t=this;this.$refs.form.validate(function(e){if(!e)return!1;t.loading=!0,t.isAdd?t.doAdd():t.doEdit()})},doAdd:function(){var t=this;this.axios.post("api/test",{form:n.a.encrypt(JSON.stringify(this.form))}).then(function(e){1===e.code&&(t.resetForm(),t.$message({showClose:!0,message:"添加成功",type:"success",duration:2e3}),t.loading=!1,t.$parent.getList())},function(e){t.loading=!1})},doEdit:function(){var t=this;this.axios.put("api/test",this.form).then(function(e){1===e.code&&(t.resetForm(),t.$message({showClose:!0,message:"修改成功",type:"success",duration:2e3}),t.loading=!1,t.$parent.list.splice(t.$parent.index,1,e.data))},function(e){t.loading=!1})},close:function(){this.resetForm()},cancel:function(){this.resetForm()},resetForm:function(){this.dialogVisible=!1,this.form={name:"",dept:{id:"",name:""},level:1,remark:""}}}},s=(i("7ef5"),i("2877")),r=Object(s.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{visible:t.dialogVisible,title:t.isAdd?"新增":"编辑","before-close":t.close,"append-to-body":"",width:"500px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,size:"small","label-width":"80px"}},[i("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[i("el-input",{staticStyle:{width:"370px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:t.cancel}},[t._v("取消")]),i("el-button",{attrs:{loading:t.loading,size:"small",type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)},[],!1,null,"4a853291",null);e.default=r.exports}}]);