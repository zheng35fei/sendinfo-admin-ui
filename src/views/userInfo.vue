<template>
    <div>
        <div class="filter-container" style="margin-bottom: 10px;">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input @keyup.enter.native="handleFilter" style="width: 100%;" class="filter-item" placeholder="用户名"
                              v-model="paginations.searchData.accName">
                    </el-input>
                </el-col>
                <el-col :span="18">
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
                    <el-button class="filter-item" :disable="formData.corpId!=''" @click="handleCreate" type="primary"
                               icon="el-icon-edit">添加
                    </el-button>
                    <el-button class="filter-item" :disabled="deleteRows.length<=0"
                               @click="handleDelete(deleteRows)" type="primary"
                               icon="el-icon-delete">批量删除
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <el-table :data="dataList" v-loading="listLoading" @sort-change="sortChange" element-loading-text="给我一点时间"
                  border fit
                  highlight-current-row
                  @selection-change="handleSelectionChange"
                  style="width: 100%">
            <el-table-column
                    type="selection"
                    align="center"
                    width="45">
            </el-table-column>
            <el-table-column align="center" :label="labels.accName" prop="accName">
            </el-table-column>
            <el-table-column align="center" :label="labels.realName" prop="realName">
            </el-table-column>
            <el-table-column align="center" :label="labels.accStatus" prop="accStatus">
                <template slot-scope="scope">
                    {{accStatusMap[scope.row.accStatus]}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="labels.corpName" prop="corpName">
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="250px" class-name="small-padding">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" icon="el-icon-refresh"
                               @click="handleResetPass(scope.row)">密码重置
                    </el-button>
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger"  icon="el-icon-delete" @click="handleDelete([scope.row])">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div v-show="!listLoading" class="pagination-container" style="margin-top: 10px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="paginations.currentPage"
                           :page-sizes="paginations.pageSizes" :page-size="paginations.pageSize"
                           :layout="paginations.layout" :total="paginations.total">
            </el-pagination>
        </div>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="80px"
                     style='width: 400px; margin-left:50px;'>
                <el-form-item v-if="dialogStatus=='create'" :label="labels.accName" prop="accName">
                    <el-input v-model.trim="formData.accName"></el-input>
                </el-form-item>
                <el-form-item :label="labels.realName" prop="realName">
                    <el-input v-model.trim="formData.realName"></el-input>
                </el-form-item>

                <el-form-item :label="labels.roleIds" prop="roleIds">
                    <el-select multiple v-model="formData.roleIds" placeholder="请选择">
                        <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确 定</el-button>
                <el-button v-else type="primary" @click="updateData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import constant from 'sendinfo-admin-ui/src/core/util/constant'
    import util from 'sendinfo-admin-ui/src/core/util'

    const tempformData = {
        id: '',
        accName: '',
        realName: '',
        corpId: '',
        roleIds:[]
    }
    const tempLabels = {
        accName: '用户名',
        accNo: '用户编号 ',
        realName: '真实姓名',
        accStatus: '用户状态',
        corpId: '企业',
        corpName: '企业名称',
        roleIds:'角色'
    }
    export default {
        name:'userInfo',
        data() {
            return {
                corpId:'',
                dataList: [],
                deleteRows: [],
                roleList:[],
                formData: Object.assign({}, tempformData), // copy obj
                labels: tempLabels,
                rules: {
                    id: [],
                    accName: [
                        {required: true, message: tempLabels.accName + '不能为空', trigger: 'blur'},
                        {pattern: /^[_'.@A-Za-z0-9-]*$/, message: '请输入字母、数字、部分特殊符号组合', trigger: 'blur'},
                    ],
                    realName: [
                        {required: true, message: tempLabels.realName + '不能为空', trigger: 'blur'},
                        {max: 64, message: '最大长度为 64', trigger: 'blur'},
                    ],
                    accType: [
                        {required: true, message: tempLabels.accType + '不能为空', trigger: 'blur'},
                    ],
                    accStatus: [
                        {required: true, message: tempLabels.accStatus + '不能为空', trigger: 'blur'},
                    ],
                    corpId: [
                        { required: true, message: '请选择企业', trigger: 'change' },
                    ],
                    roleIds:[
                        { required: true, message: '请选择角色', trigger: 'change' },
                    ]
                },
                //需要给分页组件传的信息
                paginations: {
                    currentPage: 1,
                    total: 0,
                    pageSize: 10,
                    pageSizes: [10, 20, 30, 50],
                    layout: 'total, sizes, prev, pager, next, jumper',
                    searchData: {
                        accName: null,
                        code: '',
                        corpId:''
                    },
                },
                orders: {
                    order: '',
                    orderByField: ''
                },
                listLoading: true,
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                accStatusMap: {
                    T: '激活',
                    F: '未激活'
                }
            }
        },
        created() {
            let corpId = this.$store.getters.getUserInfo.corp.id;
            this.paginations.searchData.corpId = corpId
            this.corpId = corpId;
            this.getList();
        },
        methods: {
            getList() {
                this.listLoading = true;
                const data = {
                    current: this.paginations.currentPage,
                    size: this.paginations.pageSize,
                    ...this.paginations.searchData,
                    ...this.orders
                };
                this.$http.get('/api/userInfo/page', {params: data}).then(response => {
                    this.dataList = response.data.records;
                    this.paginations.total = response.data.total;
                    this.listLoading = false;
                });
            },
            handleFilter() {
                this.paginations.currentPage = 1
                this.getList()
            },
            handleSizeChange(val) {
                this.paginations.pageSize = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.paginations.currentPage = val
                this.getList()
            },
            handleModifyStatus(row, status) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                row.status = status
            },
            resetFormData() {
                this.formData = Object.assign({}, tempformData);
            },
            handleCreate() {
                this.getRoleList();
                this.resetFormData()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.formData.corpId = this.corpId
                        this.$http.post('/api/userInfo/add', this.formData, {isNotify: true}).then((rep) => {
                            if(rep.respCode == '200'){
                                this.dialogFormVisible = false;
                                this.getList();
                            }
                        });
                    }
                })
            },
            handleUpdate(row) {
                this.getRoleList();
                this.$http.get('/api/userInfo/'+row.id).then(respose=>{
                    util.cover(respose.data, this.formData);
                    this.dialogStatus = 'update'
                    this.dialogFormVisible = true
                    this.$nextTick(() => {
                        this.$refs['dataForm'].clearValidate()
                    })
                });
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http.post('/api/userInfo/update', this.formData).then(() => {
                            this.dialogFormVisible = false
                            this.getList();
                        });
                    }
                })
            },
            handleDelete(rows) {
                this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const ids = rows.map((item) => {
                        return item.id;
                    });
                    this.$http.post('/api/userInfo/deletes', ids).then(() => {
                        this.getList();
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            sortChange(column) {
                this.orders.order = constant.ORDER[column.order];
                this.orders.orderByField = column.prop;
                this.getList();
            },
            handleSelectionChange(val) {
                this.deleteRows = val;
            },
            getRoleList(){
                this.$http('/api/sysRole/getRoleListByCurrentCorp').then((respose=>{
                    this.roleList = respose.data;
                }))
            },
            handleResetPass(row){
                this.$confirm('是否确认重置密码？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/api/userInfo/resetPassword', 'id='+row.id).then(() => {
                        this.$message({
                            message: '密码重置成功',
                            type: 'success'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消密码重置'
                    });
                });
            }
        }
    }
</script>
