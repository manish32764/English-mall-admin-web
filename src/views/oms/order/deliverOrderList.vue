<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
<span>List of shipments</span>
    </el-card>
    <div class="table-container">
      <el-table ref="deliverOrderTable"
                style="width: 100%;"
                :data="list" border>
<el-table-column label="订单编号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
<el-table-column label="收货人" width="180" align="center">
          <template slot-scope="scope">{{scope.row.receiverName}}</template>
        </el-table-column>
<el-table-column label="手机号码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverPhone}}</template>
        </el-table-column>
<el-table-column label="邮政编码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverPostCode}}</template>
        </el-table-column>
<el-table-column label="收货地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
<el-table-column label="配送方式" width="160" align="center">
          <template slot-scope="scope">
<el-select placeholder="Please select a logistics company”
                       v-model="scope.row.deliveryCompany"
                       size="small">
              <el-option v-for="item in companyOptions"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
<el-table-column label="物流单号" width="180" align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.deliverySn"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
<el-button @click = "cancel" >Cancel</el-button>
<el-button @click ="confirm” type="primary” > OK</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {deliveryOrder} from '@/api/order'
const defaultLogisticsCompanies= ["S.F. Express”, “Yuantong Express”, “Zhongtong Express”, “Da Express”];
  export default {
    name: 'deliverOrderList',
    data() {
      return {
        list:[],
        companyOptions:defaultLogisticsCompanies
      }
    },
    created(){
      this.list= this.$route.query.list;
    },
    methods:{
      cancel(){
        this.$router.back();
      },
      confirm(){
this. $confirm ('Do you want to send the shipment? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          deliveryOrder(this.list).then(response=>{
            this.$router.back();
            this.$message({
              type: 'success',
message: 'Successfully Sent! '
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
message: 'Dispatches cancelled '
          });
        });
      }
    }
  }
</script>
<style></style>


