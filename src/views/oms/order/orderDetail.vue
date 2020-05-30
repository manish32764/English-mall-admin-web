<template> 
  <div class="detail-container">
    <div>
      <el-steps :active="formatStepStatus(order.status)" finish-status="success" align-center>
<el-step title="Submit order": description="formatTime (order.createTime) "> </el-step>
<el-step title="Pay order": description="formatTime (order.paymentTime) "> </el-step>
<el-step title="Platform shipping": description="formatTime (order.deliveryTime) "> </el-step>
<el-step title="Confirm Receipt": description="formatTime (order.receiveTime) "> </el-step>
<el-step title="Complete evaluation": description="formatTime (order.commentTime) "> </el-step>
      </el-steps>
    </div>
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
<span class="color-danger">Current order status: {{order.status | formatStatus}} </span>
        <div class="operate-button-container" v-show="order.status===0">
<el-button size="mini" @click ="showUpdateReceiverDialog "> Modify Consignee Information </el-button>
<el-button size="mini">Modifying Product Information</el-button>
<el-button size="mini" @click ="showUpdateMoneyDialog "> Modify Fee Information </el-button>
<el-button size="mini" @click ="showMessageDialog" > Send a message</el-button>
<el-button size="mini" @click ="showCloseOrderDialog "> Close order </el-button>
<el-button size="mini" @click ="showMarkOrderDialog" > Remarks order</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===1">
<el-button size="mini" @click ="showUpdateReceiverDialog "> Modify Consignee Information </el-button>
<el-button size="mini" @click ="showMessageDialog" > Send a message</el-button>
<el-button size="mini">Cancel an order</el-button>
<el-button size="mini" @click ="showMarkOrderDialog" > Remarks order</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===2||order.status===3">
<el-button size="mini" @click ="showLogisticsDialog "> order tracking</el-button>
<el-button size="mini" @click ="showMessageDialog" > Send a message</el-button>
<el-button size="mini" @click ="showMarkOrderDialog" > Remarks order</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status===4">
<el-button size="mini" @click ="handleDeleteOrder "> Delete Order</el-button>
<el-button size="mini" @click ="showMarkOrderDialog" > Remarks order</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
<span class="font-small">Basic Information</span>
      </div>
      <div class="table-layout">
        <el-row>
<el-col: span= "4" class=" table-cell-title ">order number</el-col>
<el-col: span= "4" class=" table-cell-title ">Dissignment Number</el-col>
<el-col: span= "4" class=" table-cell-title ">User Account Number</el-col>
<el-col: span= "4" class=" table-cell-title ">Payment Method</el-col>
<el-col: span= "4" class=" table-cell-title ">Source of the order</el-col>
<el-col: span= "4" class=" table-cell-title ">order type</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.orderSn}}</el-col>
<el-col: span= "4" class=" table-cell ">No.</el-col>
          <el-col :span="4" class="table-cell">{{order.memberUsername}}</el-col>
          <el-col :span="4" class="table-cell">{{order.payType | formatPayType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.sourceType | formatSourceType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.orderType | formatOrderType}}</el-col>
        </el-row>
        <el-row>
<el-col: span= "4" class=" table-cell-title ">Shipping Method</el-col>
<el-col: span= "4" class=" table-cell-title ">Logistic single number</el-col>
<el-col: span= "4" class=" table-cell-title ">Automatic confirmation of receipt time</el-col>
<el-col: span= "4" class=" table-cell-title ">You can get a good coin on your order</el-col>
<el-col: span= "4" class=" table-cell-title ">Available Growth Value for Orders</el-col>
<el-col: span= "4" class=" table-cell-title ">Event Information</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.deliveryCompany | formatNull}}</el-col>
          <el-col :span="4" class="table-cell">{{order.deliverySn | formatNull}}</el-col>
<el-col: span= "4" class=" table-cell ">{ {order.autoConfirmDay}} days </el-col>
          <el-col :span="4" class="table-cell">{{order.integration}}</el-col>
          <el-col :span="4" class="table-cell">{{order.growth}}</el-col>
          <el-col :span="4" class="table-cell">
            <el-popover
              placement="top-start"
title= "activity information"
              width="200"
              trigger="hover"
              :content="order.promotionInfo">
              <span slot="reference">{{order.promotionInfo | formatLongText}}</span>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
<span class="font-small">Consignee Information</span>
      </div>
      <div class="table-layout">
        <el-row>
<el-col: span= "6" class=" table-cell-title ">consignee</el-col>
<el-col: span= "6" class=" table-cell-title ">Mobile phone number</el-col>
<el-col: span= "6" class=" table-cell-title ">Postal Code</el-col>
<el-col: span= "6" class=" table-cell-title ">Ship to Address</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.receiverName}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiverPhone}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiverPostCode}}</el-col>
          <el-col :span="6" class="table-cell">{{order | formatAddress}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
<span class="font-small">Product Information</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderItemList"
        style="width: 100%;margin-top: 20px" border>
<el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.productPic" style="height: 80px">
          </template>
        </el-table-column>
<el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.productName}}</p>
<p>Brand: {scope.row.productBrand}}</p>
          </template>
        </el-table-column>
<el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
<p>Price: $ {scope.row.productPrice}}</p>
<p>No.: {scope.row.productSn}}</p>
          </template>
        </el-table-column>
<el-table-column label="属性" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.productAttr | formatProductAttr}}
          </template>
        </el-table-column>
<el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.productQuantity}}
          </template>
        </el-table-column>
<el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{scope.row.productPrice*scope.row.productQuantity}}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
total:<span class="color-danger">$ {order.totalAmount}}</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
<span class="font-small">Fee Information</span>
      </div>
      <div class="table-layout">
        <el-row>
<el-col: span= "6" class=" table-cell-title ">Item total</el-col>
<el-col: span= "6" class=" table-cell-title ">Shipping</el-col>
<el-col: span= "6" class=" table-cell-title ">Coupons</el-col>
<el-col: span= "6" class=" table-cell-title ">Credits</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.totalAmount}}</el-col>
          <el-col :span="6" class="table-cell">￥{{order.freightAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>
        </el-row>
        <el-row>
<el-col: span= "6" class=" table-cell-title ">Event Offers</el-col>
<el-col: span= "6" class=" table-cell-title ">Discount amount</el-col>
<el-col: span= "6" class=" table-cell-title ">Total order amount</el-col>
<el-col: span= "6" class=" table-cell-title ">Payables amount</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.discountAmount}}</el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.totalAmount+order.freightAmount}}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.payAmount+order.freightAmount-order.discountAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
<span class="font-small">Operation Information</span>
      </div>
      <el-table style="margin-top: 20px;width: 100%"
                ref="orderHistoryTable"
                :data="order.historyList" border>
<el-table-column label="操作者" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.operateMan}}
          </template>
        </el-table-column>
<el-table-column label="操作时间" width="160" align="center">
          <template slot-scope="scope">
            {{formatTime(scope.row.createTime)}}
          </template>
        </el-table-column>
<el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | formatStatus}}
          </template>
        </el-table-column>
<el-table-column label="付款状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | formatPayStatus}}
          </template>
        </el-table-column>
<el-table-column label="发货状态" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatus | formatDeliverStatus}}
          </template>
        </el-table-column>
<el-table-column label="备注" align="center">
          <template slot-scope="scope">
            {{scope.row.note}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
<el-dialog title="Modify consignee information"
               :visible.sync="receiverDialogVisible"
               width="40%">
      <el-form :model="receiverInfo"
               ref="receiverInfoForm"
               label-width="150px">
<el-form-item label="收货人姓名：">
          <el-input v-model="receiverInfo.receiverName" style="width: 200px"></el-input>
        </el-form-item>
<el-form-item label="手机号码：">
          <el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
          </el-input>
        </el-form-item>
<el-form-item label="邮政编码：">
          <el-input v-model="receiverInfo.receiverPostCode" style="width: 200px">
          </el-input>
        </el-form-item>
<el-form-item label="所在区域：">
          <v-distpicker :province="receiverInfo.receiverProvince"
                        :city="receiverInfo.receiverCity"
                        :area="receiverInfo.receiverRegion"
                        @selected="onSelectRegion"></v-distpicker>
        </el-form-item>
<el-form-item label="详细地址：">
          <el-input v-model="receiverInfo.receiverDetailAddress" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<el-button @click = "receiverDialogVisible = false" >Cancel</el-button>
<el-button type="primary" @click ="handleUpdateReceiverInfo "> OK </el-button>
      </span>
    </el-dialog>
<el-dialog title="Modify fee information"
               :visible.sync="moneyDialogVisible"
               width="40%">
      <div class="table-layout">
        <el-row>
<el-col: span= "6" class=" table-cell-title ">Item total</el-col>
<el-col: span= "6" class=" table-cell-title ">Shipping</el-col>
<el-col: span= "6" class=" table-cell-title ">Coupons</el-col>
<el-col: span= "6" class=" table-cell-title ">Credits</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.totalAmount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.freightAmount" size="mini"><template slot="prepend">￥</template></el-input>
          </el-col>
          <el-col :span="6" class="table-cell">-￥{{order.couponAmount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.integrationAmount}}</el-col>
        </el-row>
        <el-row>
<el-col: span= "6" class=" table-cell-title ">Event Offers</el-col>
<el-col: span= "6" class=" table-cell-title ">Discount amount</el-col>
<el-col: span= "6" class=" table-cell-title ">Total order amount</el-col>
<el-col: span= "6" class=" table-cell-title ">Payables amount</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">-￥{{order.promotionAmount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.discountAmount" size="mini"><template slot="prepend">-￥</template></el-input>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.totalAmount+moneyInfo.freightAmount}}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.payAmount+moneyInfo.freightAmount-moneyInfo.discountAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
<el-button @click = "moneyDialogVisible = false" >Cancel</el-button>
<el-button type="primary" @click ="handleUpdateMoneyInfo "> OK </el-button>
      </span>
    </el-dialog>
<el-dialog title="Sending station letter"
               :visible.sync="messageDialogVisible"
               width="40%">
      <el-form :model="message"
               ref="receiverInfoForm"
               label-width="150px">
<el-form-item label="标题：">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
<el-form-item label="内容：">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<el-button @click = "messageDialogVisible = false" >Cancel</el-button>
<el-button type="primary" @click ="handleSendMessage "> OK</el-button>
      </span>
    </el-dialog>
<el-dialog title="Close order"
               :visible.sync="closeDialogVisible"
               width="40%">
      <el-form :model="closeInfo"
               label-width="150px">
<el-form-item label="操作备注：">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<el-button @click = "closeDialogVisible = false" >Cancel</el-button>
<el-button type="primary" @click ="handleCloseOrder "> OK</el-button>
      </span>
    </el-dialog>
<el-dialog title="Remarks order"
               :visible.sync="markOrderDialogVisible"
               width="40%">
      <el-form :model="markInfo"
               label-width="150px">
<el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
<el-button @click = "markOrderDialogVisible = false" >Cancel</el-button>
<el-button type="primary" @click ="handleMarkOrder" > OK</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog>
  </div>
</template>
<script>
  import {getOrderDetail,updateReceiverInfo,updateMoneyInfo,closeOrder,updateOrderNote,deleteOrder} from '@/api/order';
  import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  import {formatDate} from '@/utils/date';
  import VDistpicker from 'v-distpicker';
  const defaultReceiverInfo = {
    orderId:null,
    receiverName:null,
    receiverPhone:null,
    receiverPostCode:null,
    receiverDetailAddress:null,
    receiverProvince:null,
    receiverCity:null,
    receiverRegion:null,
    status:null
  };
  export default {
    name: 'orderDetail',
    components: { VDistpicker, LogisticsDialog},
    data() {
      return {
        id: null,
        order: {},
        receiverDialogVisible:false,
        receiverInfo:Object.assign({},defaultReceiverInfo),
        moneyDialogVisible:false,
        moneyInfo:{orderId:null, freightAmount:0, discountAmount:0,status:null},
        messageDialogVisible:false,
        message: {title:null, content:null},
        closeDialogVisible:false,
        closeInfo:{note:null,id:null},
        markOrderDialogVisible:false,
        markInfo:{note:null},
        logisticsDialogVisible:false
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      getOrderDetail(this.id).then(response => {
        this.order = response.data;
      });
    },
    filters: {
      formatNull(value) {
        if(value===undefined||value===null||value===''){
return 'suspense';
        }else{
          return value;
        }
      },
      formatLongText(value) {
        if(value===undefined||value===null||value===''){
return 'suspense';
        }else if(value.length>8){
          return value.substr(0, 8) + '...';
        }else{
          return value;
        }
      },
      formatPayType(value) {
        if (value === 1) {
return 'Alipay ';
        } else if (value === 2) {
return 'WeChat ';
        } else {
return 'Not Paid ';
        }
      },
      formatSourceType(value) {
        if (value === 1) {
return 'APP order';
        } else {
return 'PC order';
        }
      },
      formatOrderType(value) {
        if (value === 1) {
return 'Lightning Orders';
        } else {
return 'normal order';
        }
      },
      formatAddress(order) {
        let str = order.receiverProvince;
        if (order.receiverCity != null) {
          str += "  " + order.receiverCity;
        }
        str += "  " + order.receiverRegion;
        str += "  " + order.receiverDetailAddress;
        return str;
      },
      formatStatus(value) {
        if (value === 1) {
return 'To be consignment';
        } else if (value === 2) {
return 'Sisping';
        } else if (value === 3) {
return 'Completed ';
        } else if (value === 4) {
return 'Closed ';
        } else if (value === 5) {
return 'Invalid order';
        } else {
return 'pending payment';
        }
      },
      formatPayStatus(value) {
        if (value === 0) {
return 'Not Paid ';
        } else if(value===4){
return 'Refunded ';
        }else{
return 'Paid ';
        }
      },
      formatDeliverStatus(value) {
        if (value === 0||value === 1) {
return 'Not Sisping';
        } else {
return 'Sisping';
        }
      },
      formatProductAttr(value){
        if(value==null){
          return '';
        }else{
          let attr = JSON.parse(value);
          let result='';
          for(let i=0;i<attr.length;i++){
            result+=attr[i].key;
            result+=":";
            result+=attr[i].value;
            result+=";";
          }
          return result;
        }
      }
    },
    methods: {
      onSelectRegion(data){
        this.receiverInfo.receiverProvince=data.province.value;
        this.receiverInfo.receiverCity=data.city.value;
        this.receiverInfo.receiverRegion=data.area.value;
      },
      formatTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStepStatus(value) {
        if (value === 1) {
//Pending goods
          return 2;
        } else if (value === 2) {
//Goods already shipped
          return 3;
        } else if (value === 3) {
//Completed
          return 4;
        }else {
//Pending, closed, unlimited orders
          return 1;
        }
      },
      showUpdateReceiverDialog(){
        this.receiverDialogVisible=true;
        this.receiverInfo={
          orderId:this.order.id,
          receiverName:this.order.receiverName,
          receiverPhone:this.order.receiverPhone,
          receiverPostCode:this.order.receiverPostCode,
          receiverDetailAddress:this.order.receiverDetailAddress,
          receiverProvince:this.order.receiverProvince,
          receiverCity:this.order.receiverCity,
          receiverRegion:this.order.receiverRegion,
          status:this.order.status
        }
      },
      handleUpdateReceiverInfo(){
this. $confirm ('Do you want to modify the receipt information? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          updateReceiverInfo(this.receiverInfo).then(response=>{
            this.receiverDialogVisible=false;
            this.$message({
              type: 'success',
message: 'Modified successfully! '
            });
            getOrderDetail(this.id).then(response => {
              this.order = response.data;
            });
          });
        });
      },
      showUpdateMoneyDialog(){
        this.moneyDialogVisible=true;
        this.moneyInfo.orderId=this.order.id;
        this.moneyInfo.freightAmount=this.order.freightAmount;
        this.moneyInfo.discountAmount=this.order.discountAmount;
        this.moneyInfo.status=this.order.status;
      },
      handleUpdateMoneyInfo(){
this. $confirm ('Do you want to modify the fee information? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          updateMoneyInfo(this.moneyInfo).then(response=>{
            this.moneyDialogVisible=false;
            this.$message({
              type: 'success',
message: 'Modified successfully! '
            });
            getOrderDetail(this.id).then(response => {
              this.order = response.data;
            });
          });
        });
      },
      showMessageDialog(){
        this.messageDialogVisible=true;
        this.message.title=null;
        this.message.content=null;
      },
      handleSendMessage(){
this. $confirm ('Do you want to send a message? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.messageDialogVisible=false;
          this.$message({
            type: 'success',
message: 'Successfully sent! '
          });
        });
      },
      showCloseOrderDialog(){
        this.closeDialogVisible=true;
        this.closeInfo.note=null;
        this.closeInfo.id=this.id;
      },
      handleCloseOrder(){
this. $confirm ('Do you want to close? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            let params = new URLSearchParams();
            params.append("ids",[this.closeInfo.id]);
            params.append("note",this.closeInfo.note);
            closeOrder(params).then(response=>{
              this.closeDialogVisible=false;
              this.$message({
                type: 'success',
message: 'The order was closed successfully! '
              });
              getOrderDetail(this.id).then(response => {
                this.order = response.data;
              });
            });
        });
      },
      showMarkOrderDialog(){
        this.markOrderDialogVisible=true;
        this.markInfo.id=this.id;
        this.closeOrder.note=null;
      },
      handleMarkOrder(){
this. $confirm ('Do you want to note the order? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("id",this.markInfo.id);
          params.append("note",this.markInfo.note);
          params.append("status",this.order.status);
          updateOrderNote(params).then(response=>{
            this.markOrderDialogVisible=false;
            this.$message({
              type: 'success',
message: 'The order note was successful! '
            });
            getOrderDetail(this.id).then(response => {
              this.order = response.data;
            });
          });
        });
      },
      handleDeleteOrder(){
this. $confirm ('Do you want to delete? ' , 'hint', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",[this.id]);
          deleteOrder(params).then(response=>{
            this.$message({
message: 'Delete successful! ' ,
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          });
        })
      },
      showLogisticsDialog(){
        this.logisticsDialogVisible=true;
      }
    }
  }
</script>
<style scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
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


