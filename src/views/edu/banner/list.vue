<template>
  <div class="app-container">
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="轮播图编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="轮播图标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序">
      </el-table-column>

      <el-table-column
        prop="gmtCreate"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="gmtModified"
        label="最近修改时间">
      </el-table-column>
      <el-table-column
        label="图片">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.imageUrl"></el-avatar>
        </template>

      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <router-link :to="'/banner/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="getlist"
      :current-page="page"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import banner from "@/api/banner/banner";
import teacher from "@/api/teacher/teacher";
export default {
  name: "list",
  data(){
    return{
      list:[],
      page:1,
      total:0,
      limit:4
    }
  },
  created() {
    this.getlist()
  },
  methods:{
    getAllBanner(){
   banner.getAllBanner().then(response=>{
     this.list=response.data.items
   })
    },
    removeDataById(id){
      banner.delBannerByid(id).then(response=>{
        this.$message({
          type:'success',
          message:'删除成功'
        })
      })
    },
      getlist(page = 1) {
        this.page = page
       banner.pageBanner(this.page, this.limit).then(response => {
          this.list = response.data.item
          this.total = response.data.total
          console.log(response)
        }).catch(error => {
          console.log(error)//请求失败
        })
      },
    }

}
</script>

<style scoped>

</style>
