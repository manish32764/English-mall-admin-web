<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
<span>Select Search</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
query search
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
Reset
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
<el-form-item label="广告名称：">
<el-input v-model="listQuery.name" class="input-width" placeholder=" Ad Name "> </el-input>
          </el-form-item>
<el-form-item label="广告位置：">
<el-select v-model="listQuery.type" placeholder="all" clearable class ="input-width ">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<el-form-item label="到期时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd"
              type="date"
placeholder="Please select a time">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
<span>Data List</span>
<el-button size= "mini" class= "btn-add" @click = "handleAdd ()" >Add Ads </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
<el-table-column label="编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
<el-table-column label="广告名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
<el-table-column label="广告位置" width="120" align="center">
          <template slot-scope="scope">{{scope.row.type | formatType}}</template>
        </el-table-column>
<el-table-column label="广告图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pic"></template>
        </el-table-column>
<el-table-column label="时间" width="220" align="center">
          <template slot-scope="scope">
<p>Start Time: {{scope.row.startTime|formatTime}}</p>
<p>Expiration time: {{scope.row.endTime|formatTime}}</p>
          </template>
        </el-table-column>
<el-table-column label="上线/下线" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUpdateStatus(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
<el-table-column label="点击次数" width="120" align="center">
          <template slot-scope="scope">{{scope.row.clickCount}}</template>
        </el-table-column>
<el-table-column label="生成订单" width="120" align="center">
          <template slot-scope="scope">{{scope.row.orderCount}}</template>
        </el-table-column>
<el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
@click ="handleUpdate (scope. $index, scope.row) "> Edit
            </el-button>
            <el-button size="mini"
                       type="text"
@click ="handleDelete (scope. $index, scope.row) "> Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
v-model="operateType" placeholder="Bulk Operation">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
OK
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,updateStatus,deleteHomeAdvertise} from '@/api/homeAdvertise';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    name: null,
    type: null,
    endTime:null
  };
  const defaultTypeOptions = [
    {
label: 'PC Home Road',
      value: 0
    },
    {
label: 'APP Home Road',
      value: 1
    }
  ];
  export default {
    name: 'homeAdvertiseList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        typeOptions: Object.assign({}, defaultTypeOptions),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        operates: [
          {
label: "Delete",
            value: 0
          }
        ],
        operateType: null
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatType(type){
        if(type===1){
return 'APP home webcast ';
        }else{
return 'PC Home Rotary ';
        }
      },
      formatTime(time){
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleUpdateStatus(index,row){
this. $confirm ('Do you want to modify online/downline status? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id,{status:row.status}).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
message: 'Modified successfully! '
            });
          });
        }).catch(() => {
          this.$message({
            type: 'success',
message: 'Operation cancelled! '
          });
          this.getList();
        });
      },
      handleDelete(index,row){
        this.deleteHomeAdvertise(row.id);
      },
      handleBatchOperate(){
        if (this.multipleSelection < 1) {
          this.$message({
message: 'Please select a record',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        if(this.operateType===0){
//Exclude
          this.deleteHomeAdvertise(ids);
        }else {
          this.$message({
message: 'Please select bulk operation type',
            type: 'warning',
            duration: 1000
          });
        }
      },
      handleAdd(){
        this.$router.push({path: '/sms/addAdvertise'})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/sms/updateAdvertise', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      deleteHomeAdvertise(ids){
this. $confirm ('Do you want to delete this ad? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteHomeAdvertise(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
message: 'Delete successful! '
            });
          });
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


