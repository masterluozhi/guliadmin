<template>
  <div CLASS="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="课程名">
        <el-input v-model="courseinfo.title" placeholder="课程名"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getlist()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>


    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="课程id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="课程标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="课程价格"
      width="180">
      </el-table-column>
      <el-table-column
        prop="lessonNum"
        label="课程数量">
      </el-table-column>

      <el-table-column
        label="课程封面">
        <template slot-scope="scope">
          <el-avatar  :src="scope.row.cover"></el-avatar>
        </template>
      </el-table-column>

    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <router-link :to="'/course/info/'+scope.row.id">
          <el-button type="primary" size="mini" icon="el-icon-edit">课程基本信息</el-button>
        </router-link>
        <router-link :to="'/course/chapter/'+scope.row.id">
          <el-button type="primary" size="mini" icon="el-icon-edit">修改课程大纲信息</el-button>
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
import course from "@/api/course/course";
export default {
  name: "list",
  data() {
    return {
      list: null,
      page: 1,//当前页
      limit: 5,//每页记录数
      total: 0,//总记录数,
      courseinfo:{}
    }
  },
  created() {
  this.getlist()
  },
  methods: {
    getlist( page = 1) {
      this.page = page
      course.getCourseListPage(this.page, this.limit, this.courseinfo).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        console.log(response)
      }).catch(error => {
        console.log(error)//请求失败
      })
    },
    resetData(){
      this.coursePublic={};
    },
    removeDataById(id){
   course.delAll(id).then(response=>{
     this.$message({
       type:'success',
       message:'删除成功'
     })
     this.getlist()
   })
},

  }
}
</script>

<style scoped>

</style>
