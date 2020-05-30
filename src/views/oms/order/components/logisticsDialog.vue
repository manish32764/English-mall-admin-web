<template> 
<el-dialog title="order tracking"
             :visible.sync="visible"
             :before-close="handleClose"
             width="40%">
    <el-steps direction="vertical"
              :active="6"
              finish-status="success"
              space="50px">
      <el-step  v-for="item in logisticsList"
                :key="item.name"
                :title="item.name"
                :description="item.time"></el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
  const defaultLogisticsList=[
{name: 'Orders submitted, pending payment ', time: '2017-04-01 12:00:00'},
{name: 'The order was paid successful', time: '2017-04-01 12:00:00 '},
{name: 'Scan down site in Beijing, waiting for payment ', time: '2017-04-01 12:00:00'},
{name: 'Unloading scanning at the distribution center Shenzhen Company, Guangdong Company, waiting for payment ', time: '2017-04-01 12:00:00'},
{name: 'Sent Scan in Shenzhen, Guangdong Company ', time: '2017-04-01 12:00:00'},
{name: 'Arrive at destination in Shenzhen, Guangdong, the shipment will be delivered soon', time: '2017-04-01 12:00:00 '},
{name: 'The order has been signed and looks forward to serving you again', time: '2017-04-01 12:00:00 '}
  ];
  export default {
    name:'logisticsDialog',
    props: {
      value: Boolean
    },
    computed:{
      visible: {
        get() {
          return this.value;
        },
        set(visible){
          this.value=visible;
        }
      }
    },
    data() {
      return {
        logisticsList:Object.assign({},defaultLogisticsList)
      }
    },
    methods:{
      emitInput(val) {
        this.$emit('input', val)
      },
      handleClose(){
        this.emitInput(false);
      }
    }
  }
</script>
<style></style>


