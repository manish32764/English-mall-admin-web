<template> 
  <div class="app-container">
    <el-card shadow="never" class="operate-container">
      <i class="el-icon-tickets"></i>
<span>Data List</span>
<el-button size= "mini" class= "btn-add" @click = "handleAdd ()" >Add </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="flashSessionTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
<el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
<el-table-column label="秒杀时间段名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
<el-table-column label="每日开始时间" align="center">
          <template slot-scope="scope">{{scope.row.startTime | formatTime}}</template>
        </el-table-column>
<el-table-column label="每日结束时间" align="center">
          <template slot-scope="scope">{{scope.row.endTime | formatTime}}</template>
        </el-table-column>
<el-table-column label="启用" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
<el-table-column label="操作" width="180" align="center">
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
    <el-dialog
title= "Add time period"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="flashSession"
               ref="flashSessionForm"
               label-width="150px" size="small">
<el-form-item label="秒杀时间段名称：">
          <el-input v-model="flashSession.name" style="width: 250px"></el-input>
        </el-form-item>
<el-form-item label="每日开始时间：">
          <el-time-picker
            v-model="flashSession.startTime"
placeholder="Please select a time">
          </el-time-picker>
        </el-form-item>
<el-form-item label="每日结束时间：">
          <el-time-picker
            v-model="flashSession.endTime"
placeholder="Please select a time">
          </el-time-picker>
        </el-form-item>
<el-form-item label="是否启用">
          <el-radio-group v-model="flashSession.status">
<el-radio: label= "1">Enable</el-radio>
<el-radio: label= "0">Do not enable</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<el-button @click ="dialogVisible = false" size="small "> Cancel </el-button>
<el-button type="primary" @click ="handleDialogConfirm ()" size="small "> OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,updateStatus,deleteSession,createSession,updateSession} from '@/api/flashSession';
  import {formatDate} from '@/utils/date';
  const defaultFlashSession={
    name:null,
    startTime:null,
    endTime:null,
    status:0
  };
  export default {
    name: 'flashPromotionSessionList',
    data() {
      return {
        list: null,
        listLoading: false,
        dialogVisible:false,
        isEdit:false,
        flashSession:Object.assign({},defaultFlashSession)
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'hh:mm:ss')
      }
    },
    methods: {
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.flashSession = Object.assign({},defaultFlashSession);
      },
      handleStatusChange(index,row){
this. $confirm ('Do you want to modify this status? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          updateStatus(row.id, {status: row.status}).then(response => {
            this.$message({
              type: 'success',
message: 'Modified successfully! '
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
message: 'Cancel modification '
          });
          this.getList();
        });
      },
      handleUpdate(index,row){
        this.dialogVisible = true;
        this.isEdit = true;
        this.flashSession = Object.assign({},row);
        this.flashSession.startTime=new Date(row.startTime);
        this.flashSession.endTime=new Date(row.endTime);
      },
      handleDelete(index,row){
this. $confirm ('Do you want to delete this time period? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          deleteSession(row.id).then(response => {
            this.$message({
              type: 'success',
message: 'Delete successful! '
            });
            this.getList();
          });
        });
      },
      handleDialogConfirm() {
this. $confirm ('Do you want to confirm? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateSession(this.flashSession.id,this.flashSession).then(response => {
              this.$message({
message: 'Modified successfully! ' ,
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          } else {
            createSession(this.flashSession).then(response => {
              this.$message({
message: 'Add successful! ' ,
                type: 'success'
              });
              this.dialogVisible =false;
              this.getList();
            })
          }
        })
      },
      getList() {
        this.listLoading = true;
        fetchList({}).then(response => {
          this.listLoading = false;
          this.list = response.data;
        });
      }
    }
  }
</script>
<style scoped>
  .operate-container {
    margin-top: 0;
  }
</style>


