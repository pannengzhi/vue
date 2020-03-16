(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-8ebe5eb0","chunk-0a44057d"],{"1d22":function(t,e,i){"use strict";var a=i("5cd6");i.n(a).a},3260:function(t,e,i){"use strict";i.r(e);var a={props:{isAdd:{type:Boolean,required:!0},deptDict:{type:Array}},data:function(){return{dialogVisible:!1,loading:!1,form:{name:"",dept:{id:"",name:""},level:1,remark:""},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}]}}},methods:{doSubmit:function(){var t=this;this.$refs.form.validate(function(e){if(!e)return!1;t.loading=!0,t.isAdd?t.doAdd():t.doEdit()})},doAdd:function(){var t=this;this.axios.post("mock/role/save",this.form).then(function(e){1===e.code&&(t.resetForm(),t.$message({showClose:!0,message:"添加成功",type:"success",duration:2e3}),t.loading=!1,t.$parent.allData.unshift(e.data),t.$parent.total=t.$parent.total+1,t.$parent.getList())},function(e){t.loading=!1})},doEdit:function(){var t=this;this.axios.put("mock/role",this.form).then(function(e){1===e.code&&(t.resetForm(),t.$message({showClose:!0,message:"修改成功",type:"success",duration:2e3}),t.loading=!1,t.$parent.list.splice(t.$parent.index,1,e.data))},function(e){t.loading=!1})},close:function(){this.resetForm()},cancel:function(){this.resetForm()},resetForm:function(){this.dialogVisible=!1,this.form={name:"",dept:{id:"",name:""},level:1,remark:""}}}},n=(i("1d22"),i("2877")),l=Object(n.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{visible:t.dialogVisible,title:t.isAdd?"新增角色":"编辑角色","before-close":t.close,"append-to-body":"",width:"500px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,size:"small","label-width":"80px"}},[i("el-form-item",{attrs:{label:"角色名称",prop:"name"}},[i("el-input",{staticStyle:{width:"370px"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),i("el-form-item",{attrs:{label:"所属部门"}},[i("el-select",{staticStyle:{width:"370px"},attrs:{placeholder:"请选择所属部门"},model:{value:t.form.dept.id,callback:function(e){t.$set(t.form.dept,"id",e)},expression:"form.dept.id"}},t._l(t.deptDict,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1),i("el-form-item",{attrs:{label:"角色级别",prop:"level"}},[i("el-input-number",{staticStyle:{width:"370px"},attrs:{min:1,max:100,"controls-position":"right"},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",t._n(e))},expression:"form.level"}})],1),i("el-form-item",{attrs:{label:"描述信息",prop:"remark"}},[i("el-input",{staticStyle:{width:"370px"},attrs:{rows:"5",type:"textarea"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:t.cancel}},[t._v("取消")]),i("el-button",{attrs:{loading:t.loading,size:"small",type:"primary"},on:{click:t.doSubmit}},[t._v("确认")])],1)],1)},[],!1,null,"3533b69c",null);e.default=l.exports},"333d":function(t,e,i){"use strict";i("c5f6");var a={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t})},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize})}}},n=i("2877"),l=Object(n.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"margin-top":"7px"}},[i("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,"page-sizes":[10,20,30,50],total:t.total,layout:"total, sizes,prev, pager, next,jumper"},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},[],!1,null,null,null);e.a=l.exports},"5cd6":function(t,e,i){},"70eb":function(t,e,i){"use strict";i.r(e);var a=i("3260"),n=i("333d"),l={name:"role",components:{eForm:a.default,Pagination:n.a},data:function(){return{mock:1,allData:[],deptDicts:[],isAdd:!0,list:[],index:0,total:0,listLoading:!1,listQuery:{name:"",deptId:"",page:1,limit:10}}},mounted:function(){var t=this;this.getDeptDict(),this.$nextTick(function(){t.getList()})},methods:{getList:function(){var t=this;this.listLoading=!0,1===this.mock?this.axios.get("mock/role/page",{params:this.listQuery}).then(function(e){e.content&&(t.allData=e.content,t.mock=0,t.list=t.allData.slice((t.listQuery.page-1)*t.listQuery.limit,(t.listQuery.page-1)*t.listQuery.limit+t.listQuery.limit),t.total=e.totalElements),t.listLoading=!1},function(t){}):(this.list=this.allData.slice((this.listQuery.page-1)*this.listQuery.limit,(this.listQuery.page-1)*this.listQuery.limit+this.listQuery.limit),this.listLoading=!1)},getDeptDict:function(){var t=this;this.axios.get("mock/dept/all").then(function(e){e.data&&(t.deptDicts=e.data)},function(t){})},search:function(){this.listQuery.page=1,this.getList()},test:function(){this.axios.get("api/user/all").then(function(t){},function(t){})},add:function(){this.isAdd=!0,this.$refs.form.dialogVisible=!0},update:function(t,e){this.isAdd=!1;var i=this.$refs.form;this.index=t,i.form=JSON.parse(JSON.stringify(e)),i.dialogVisible=!0},del:function(t,e){var i=this;this.$confirm("是否要删除该记录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.axios.delete("mock/role/"+e.id).then(function(e){1===e.code&&(i.allData.splice(t,1),i.total=i.total-1,i.total==(i.page-1)*i.limit&&0!=i.total&&(i.page-=1),i.getList())},function(t){})}).catch(function(t){})}},computed:{tableHeight:function(){return document.documentElement.clientHeight-180}},filters:{deptFilter:function(t){var e="";switch(t+=""){case"1":return"研发部";case"2":return"生产部";case"3":return"人事部";case"4":return"财务部";default:return e}}}},r=i("2877"),s=Object(r.a)(l,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("eForm",{ref:"form",attrs:{"is-add":t.isAdd,deptDict:t.deptDicts}}),i("div",{staticClass:"head-container"},[i("el-input",{staticClass:"filter-item mg-r10",staticStyle:{width:"191px"},attrs:{"prefix-icon":"el-icon-search",clearable:"",placeholder:"输入角色名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),i("el-select",{staticClass:"filter-item mg-r10",attrs:{clearable:"",placeholder:"所属部门"},model:{value:t.listQuery.deptId,callback:function(e){t.$set(t.listQuery,"deptId",e)},expression:"listQuery.deptId"}},t._l(t.deptDicts,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1),i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("搜索")]),i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:t.add}},[t._v("添加")]),i("el-button",{staticClass:"filter-item",attrs:{size:"mini",type:"primary",icon:"el-icon-plus"},on:{click:t.test}},[t._v("测试")])],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,border:"",fit:"","element-loading-text":"拼命加载中","max-height":t.tableHeight}},[i("el-table-column",{key:Math.random(),attrs:{type:"selection",width:"50"}}),i("el-table-column",{attrs:{prop:"id",label:"主键"}}),i("el-table-column",{attrs:{label:"编号",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(e.$index+1)+"\n\t\t\t")]}}])}),i("el-table-column",{attrs:{prop:"createTime",label:"创建时间",sortable:"",width:"170"}}),i("el-table-column",{attrs:{prop:"name",label:"角色名称"}}),i("el-table-column",{attrs:{prop:"dept",label:"所属部门",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t"+t._s(t._f("deptFilter")(e.row.dept.id))+"\n\t\t\t")]}}])}),i("el-table-column",{attrs:{prop:"level",label:"等级"}}),i("el-table-column",{attrs:{prop:"remark",label:"描述","show-overflow-tooltip":!0}}),i("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(i){return t.update(e.$index,e.row)}}},[t._v("修改")]),i("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(i){return t.del(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),i("pagination",{directives:[{name:"show",rawName:"v-show",value:0<t.total,expression:"total > 0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1)},[],!1,null,null,null);e.default=s.exports}}]);