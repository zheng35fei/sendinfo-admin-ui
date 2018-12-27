import constant from 'sendinfo-admin-ui/src/core/util/constant'

export default {
    data: function(){
        return {
            listLoading: false,
            dataList: [],
            deleteRows: [],
            currentUrl:'',
            paginations: {
                currentPage: 1,
                total: 0,
                pageSize: 10,
                pageSizes: [10, 20, 30, 50],
                layout: 'total, sizes, prev, pager, next, jumper'
            },
            orders: {
                order: '',
                orderByField: ''
            },
            option: {
                page: true,
                border:true,
                index: true,
                stripe:true,
                indexLabel:'序号',
                align:'center',
                menuAlign:'center',
                selection: true
            }
        }
    },
    methods: {
        getListData(url,params,config){
            url = url + '/page';
            if(this.currentUrl == ''){
                this.currentUrl = url;
            }
            params = params || {}
            config = config || {}
            this.listLoading = true;
            const data = {
                current: this.paginations.currentPage,
                size: this.paginations.pageSize,
                ...this.paginations.searchData,
                ...this.orders,
                ...params
            };
            let tempData = {
                params:data,
                ...config,
            }
            this.$http.get(this.currentUrl,tempData).then(response => {
                this.dataList = response.data.records;
                this.paginations.total = response.data.total;
                this.listLoading = false;
            });
        },
        sortChange() {
            this.orders.order = constant.ORDER[column.order];
            this.orders.orderByField = column.prop;
            this.getListData();
        },
        handleSearchChange(params) {
            this.getListData('', params);
        },
        handleSelectionChange(val) {
            this.deleteRows = val;
        },
        handleSizeChange(val) {
            this.paginations.pageSize = val;
            this.getListData()
        },
        handleCurrentChange(val) {
            this.paginations.currentPage = val;
            this.getListData()
        },
        handleFilter() {
            this.paginations.currentPage = 1;
            this.getListData()
        },
        handleRefresh(){
            this.getListData()
        }
    }
};
