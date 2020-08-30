<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="讲师姓名">
        <el-input v-model="eduTeacherVodu.name" placeholder="讲师姓名"></el-input>
      </el-form-item>
      <el-form-item label="讲师等级">
        <el-select v-model="eduTeacherVodu.level" placeholder="讲师头衔">
          <el-option label="首席讲师" value="1"></el-option>
          <el-option label="高级讲师" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="授课">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择开始日期" v-model="eduTeacherVodu.gmtCreate"
                   value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择上次授课日期" v-model="eduTeacherVodu.gmtModified"
                          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"
                          style="width: 100%;"></el-date-picker>
        </el-col>
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
        label="讲师编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="讲师姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="讲师等级">
        <template slot-scope="scope">
          {{scope.row.level===1?'高级讲师':'首席讲师'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="讲师简介">
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="授课开始时间">
      </el-table-column>
      <el-table-column
        prop="gmtModified"
        label="最近授课时间">
      </el-table-column>
      <el-table-column
        label="头像">
        <template slot-scope="scope">
          <el-avatar  :src="scope.row.avatar"></el-avatar>
        </template>

      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
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
import teacher from "@/api/teacher/teacher";

export default {
  name: "list",
  data() {
    return {
      list: [],//查询后接口返回集合
      page: 1,//当前页
      limit: 5,//每页记录数
      total: 0,//总记录数

      eduTeacherVodu: {
      }
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist(page = 1) {
      this.page = page
      teacher.getTeacherListPage(this.page, this.limit, this.eduTeacherVodu).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        console.log(response)
      }).catch(error => {
        console.log(error)//请求失败
      })
    },
    resetData(){
      this.eduTeacherVodu={};
    },
    removeDataById(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () =>
          teacher.delTeacher(id).then(response =>{
            alert(response.message)
            this.getlist()
          }))
    }
  }
}
</script>

<style scoped>

</style>
