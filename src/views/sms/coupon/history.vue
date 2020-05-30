<template> 
  <div class="app-container">
    <div class="table-layout">
      <el-row>
<el-col: span= "4" class=" table-cell-title ">Name</el-col>
<el-col: span= "4" class=" table-cell-title ">Coupon Type</el-col>
<el-col: span= "4" class=" table-cell-title ">Available Items</el-col>
<el-col: span= "4" class=" table-cell-title ">Use the door</el-col>
<el-col: span= "4" class=" table-cell-title ">face value</el-col>
<el-col: span= "4" class=" table-cell-title ">Status</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{coupon.name}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.type | formatType}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.useType | formatUseType}}</el-col>
<el-col: span= "4" class=" table-cell ">Full {{coupon.minPoint}} element is available </el-col>
<el-col: span= "4" class=" table-cell ">{ {coupon.amount}} element</el-col>
        <el-col :span="4" class="table-cell">{{coupon.endTime | formatStatus}}</el-col>
      </el-row>
      <el-row>
<el-col: span= "4" class=" table-cell-title ">Expiration period</el-col>
<el-col: span= "4" class=" table-cell-title ">Total issued volume</el-col>
<el-col: span= "4" class=" table-cell-title ">Pickled</el-col>
<el-col: span= "4" class=" table-cell-title ">Pending pickup</el-col>
<el-col: span= "4" class=" table-cell-title ">Used</el-col>
<el-col: span= "4" class=" table-cell-title ">Not used</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell" style="font-size: 13px">
{{coupon.startTime|formatDate}} to {{coupon.endTime|formatDate}}
        </el-col>
        <el-col :span="4" class="table-cell">{{coupon.publishCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.receiveCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.publishCount-coupon.receiveCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.useCount}}</el-col>
        <el-col :span="4" class="table-cell">{{coupon.publishCount-coupon.useCount}}</el-col>
      </el-row>
    </div>
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
<el-form-item label="使用状态：">
<el-select v-model="listQuery.useStatus” placeholder="All” clearable class="input-width ">
              <el-option v-for="item in useTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<el-form-item label="订单编号：">
<el-input v-model="listQuery.orderSn” class="input-width” placeholde r= “order id” > </el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="couponHistoryTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
<el-table-column label="优惠码" width="160" align="center">
          <template slot-scope="scope">{{scope.row.couponCode}}</template>
        </el-table-column>
<el-table-column label="领取会员" width="140" align="center">
          <template slot-scope="scope">{{scope.row.memberNickname}}</template>
        </el-table-column>
<el-table-column label="领取方式" width="100" align="center">
          <template slot-scope="scope">{{scope.row.getType | formatGetType}}</template>
        </el-table-column>
<el-table-column label="领取时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
<el-table-column label="当前状态" width="140" align="center">
          <template slot-scope="scope">{{scope.row.useStatus | formatCouponHistoryUseType}}</template>
        </el-table-column>
<el-table-column label="使用时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.useTime | formatTime}}</template>
        </el-table-column>
<el-table-column label="订单编号" align="center">
          <template slot-scope="scope">{{scope.row.orderSn===null?'N/A':scope.row.orderSn}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {getCoupon} from '@/api/coupon';
  import {fetchList as fetchCouponHistoryList} from '@/api/couponHistory';

  const defaultTypeOptions = [
    {
label: 'Full room voucher',
      value: 0
    },
    {
label: 'Member voucher',
      value: 1
    },
    {
label: 'Shopping voucher',
      value: 2
    },
    {
label: 'Registration voucher',
      value: 3
    }
  ];
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    useStatus: null,
    orderSn: null,
    couponId: null
  };
  const defaultUseTypeOptions= [
    {
label: “Not used”,
      value: 0
    },
    {
label: “Used”,
      value: 1
    },
    {
label: “Expired”,
      value: 2
    }
  ];
  export default {
    name: 'couponHistoryList',
    data() {
      return {
        coupon: {},
        listQuery: Object.assign({}, defaultListQuery),
        useTypeOptions:Object.assign({},defaultUseTypeOptions),
        list:null,
        total:null,
        listLoading:false
      }
    },
    created() {
      getCoupon(this.$route.query.id).then(response => {
        this.coupon = response.data;
      });
      this.listQuery.couponId=this.$route.query.id;
      this.getList();
    },
    filters: {
      formatType(type) {
        for (let i = 0; i < defaultTypeOptions.length; i++) {
          if (type === defaultTypeOptions[i].value) {
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatUseType(useType) {
        if (useType === 0) {
return 'Universal all';
        } else if (useType === 1) {
return 'Specified category';
        } else {
return 'Designated product';
        }
      },
      formatPlatform(platform) {
        if (platform === 1) {
return 'Mobile Platform';
        } else if (platform === 2) {
return 'PC Platform';
        } else {
return 'Full Platform';
        }
      },
      formatDate(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      },
      formatStatus(endTime) {
        let now = new Date().getTime();
        if (endTime > now) {
return 'Not expied'
        } else {
return 'expired ';
        }
      },
      formatGetType(type) {
        if(type===1){
return 'active acquire';
        }else{
return 'background give';
        }
      },
      formatCouponHistoryUseType(useType) {
        if (useType === 0) {
return 'Not used';
        } else if (useType === 1) {
return 'Used ';
        } else {
return 'expired ';
        }
      },
      formatTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      getList(){
        this.listLoading=true;
        fetchCouponHistoryList(this.listQuery).then(response=>{
          this.listLoading=false;
          this.list=response.data.list;
          this.total=response.data.total;
        });
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
        this.listQuery.couponId=this.$route.query.id;
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      }
    }
  }
</script>
<style scoped>
  .app-container {
    width: 80%;
    margin: 20px auto;
  }

  .filter-container {
    margin-top: 20px;
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


