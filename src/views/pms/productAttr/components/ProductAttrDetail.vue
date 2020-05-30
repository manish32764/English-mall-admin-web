<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="productAttr" :rules="rules" ref="productAttrFrom" label-width="150px">
<el-form-item label="属性名称：" prop="name">
        <el-input v-model="productAttr.name"></el-input>
      </el-form-item>
<el-form-item label="商品类型：">
<el-select v-model="productAttr.productAttributeCategoryId” placehol der= “Please select” >
          <el-option
            v-for="item in productAttrCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
<el-form-item label="分类筛选样式:">
        <el-radio-group v-model="productAttr.filterType">
<el-radio: label= "0">Ordinary</el-radio>
<el-radio: label= "1">color</el-radio>
        </el-radio-group>
      </el-form-item>
<el-form-item label="能否进行检索:">
        <el-radio-group v-model="productAttr.searchType">
<el-radio: label= "0">No retrieval required</el-radio>
<el-radio: label= "1">keyword search</el-radio>
<el-radio: label= "2">Range Retrieval</el-radio>
        </el-radio-group>
      </el-form-item>
<el-form-item label="商品属性关联:">
        <el-radio-group v-model="productAttr.relatedStatus">
<el-radio: label= "1">Yes.</el-radio>
<el-radio: label= "0">No</el-radio>
        </el-radio-group>
      </el-form-item>
<el-form-item label="属性是否可选:">
        <el-radio-group v-model="productAttr.selectType">
<el-radio: label= "0">Unique</el-radio>
<el-radio: label= "1">Single—</el-radio>
<el-radio: label= "2">check</el-radio>
        </el-radio-group>
      </el-form-item>
<el-form-item label="属性值的录入方式:">
        <el-radio-group v-model="productAttr.inputType">
<el-radio: label= "0">Manual Entry</el-radio>
<el-radio: label= "1">Select from the list below</el-radio>
        </el-radio-group>
      </el-form-item>
<el-form-item label="属性值可选值列表:">
        <el-input :autosize="true" type="textarea" v-model="inputListFormat"></el-input>
      </el-form-item>
<el-form-item label="是否支持手动新增:">
        <el-radio-group v-model="productAttr.handAddStatus">
<el-radio: label= "1">Yes.</el-radio>
<el-radio: label= "0">No</el-radio>
        </el-radio-group>
      </el-form-item>
<el-form-item label="排序属性：">
        <el-input v-model="productAttr.sort"></el-input>
      </el-form-item>
      <el-form-item>
<el-button type="primary” @click ="onSubmit ('productAttrFrom') "> Submit </el-button>
<el-button v-if=”! isEdit” @click ="resetForm ('productAttrFrom') "> Reset</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList} from '@/api/productAttrCate'
  import {createProductAttr,getProductAttr,updateProductAttr} from '@/api/productAttr'

  const defaultProductAttr = {
    filterType: 0,
    handAddStatus: 0,
    inputList: '',
    inputType: 0,
    name: '',
    productAttributeCategoryId: 0,
    relatedStatus: 0,
    searchType: 0,
    selectType: 0,
    sort: 0,
    type: 0
  };
  export default {
    name: "ProductAttrDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        productAttr: Object.assign({}, defaultProductAttr),
        rules: {
          name: [
{required: true, message: 'Please enter attribute name', trigger: 'blur'},
{min: 2, max: 140, message: 'length between 2 and 140 characters', trigger: 'blur'}
          ]
        },
        productAttrCateList: null,
        inputListFormat:null
      }
    },
    created() {
      if(this.isEdit){
        getProductAttr(this.$route.query.id).then(response => {
          this.productAttr = response.data;
          this.inputListFormat = this.productAttr.inputList.replace(/,/g,'\n');
        });
      }else{
        this.resetProductAttr();
      }
      this.getCateList();
    },
    watch:{
      inputListFormat: function (newValue, oldValue) {
        newValue = newValue.replace(/\n/g,',');
        this.productAttr.inputList = newValue;
      }
    },
    methods: {
      getCateList() {
        let listQuery = {pageNum: 1, pageSize: 100};
        fetchList(listQuery).then(response => {
          this.productAttrCateList = response.data.list;
        });
      },
      resetProductAttr() {
        this.productAttr = Object.assign({}, defaultProductAttr);
        this.productAttr.productAttributeCategoryId = Number(this.$route.query.cid);
        this.productAttr.type = Number(this.$route.query.type);
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
this. $confirm ('Submit data ', 'Prompt', {
confirmButtonText: 'Ode',
cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              if(this.isEdit){
                updateProductAttr(this.$route.query.id,this.productAttr).then(response=>{
                  this.$message({
message: 'Modified successful',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }else{
                createProductAttr(this.productAttr).then(response=>{
                  this.$message({
message: 'Submitted successful',
                    type: 'success',
                    duration: 1000
                  });
                  this.resetForm('productAttrFrom');
                });
              }
            });

          } else {
            this.$message({
message: 'authentication failure',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.resetProductAttr();
      }
    },
  }
</script>

<style scoped>

</style>
