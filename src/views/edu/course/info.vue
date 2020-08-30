<template>
  <div class="app-container">
    <!--    //进度条-->
    <el-steps :active="active" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="传教课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>

    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseinfo.title"></el-input>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseinfo.lessonNum" controls-position="right"></el-input-number>
      </el-form-item>

      <el-form-item label="课程简介">
        <el-input v-model="courseinfo.description"></el-input>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseinfo.price" controls-position="right"></el-input-number>
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/eduoss/fileoss/upload'"
          :show-file-list="false"
          :on-success="handleSussess"
          :before-upload=" beforeUpload"
        >
          <img v-if="courseinfo.cover" :src="courseinfo.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      <!--课程分类一级分类-->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseinfo.subjectParentId"
          placeholder="请选择"
          @change="subOneChange">

          <el-option
            v-for="subject in subjectOneList"
            :key="subject .id"
            :label="subject .title"
            :value="subject .id"/>

        </el-select>
      </el-form-item>


      <!--课程分类二级分类-->
      <el-form-item label="二级课程分类">
        <el-select
          v-model="courseinfo.subjectId"
          placeholder="请选择">

          <el-option
            v-for="subject in subjectTwoList"
            :key="subject .id"
            :label="subject .title"
            :value="subject .id"/>
        </el-select>

        <!-- 课程讲师 TODO -->
        <!-- 课程讲师 -->

        <el-select
          v-model="courseinfo.teacherId"
          placeholder="请选择">

          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>

        </el-select>
      </el-form-item>
    </el-form>
    <el-button style="margin-top: 12px;" :disabled="saveBtnDisabled" @click="saveOrUpdata">下一步</el-button>
  </div>

</template>

<script>

import subject from "@/api/subject/subject";
import teacher from "@/api/teacher/teacher";
import course from "@/api/course/course";

export default {
  name: "info",
  data() {
    return {
      BASE_API: 'http://localhost:9001',
      active: 0,
      courseId: '',
      saveBtnDisabled: false,
      courseinfo: {
        id: '',
        title: '',
        subjectId: '',
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: 'https://lzkguli-file.oss-cn-beijing.aliyuncs.com/2021-08-19/bbf2fa273ff641a197a4e1d958a906df02.jpg',
        price: 0
      },
      teacherList: [],
      value: '',
      subjectOneList: [],
      subjectTwoList: [],

    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getOldChapter()
      this.selAllTeacher()

    } else {

      this.subjectOne()
      this.selAllTeacher()
    }
  },
  methods: {
    next() {
      course.addCourseInfo(this.courseinfo).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })

        this.$router.push({path: '/course/chapter/' + response.data.courseId})
      })
    },
    nextUpdata() {
      course.updata(this.courseinfo).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })

        this.$router.push({path: '/course/chapter/' + this.courseId})
      })
    },
    saveOrUpdata() {
      if (!this.courseinfo.id) {
        this.next()
      } else {
        this.nextUpdata()
      }
    },
    selAllTeacher() {
      teacher.selAllTeacher().then(response => {

        this.teacherList = response.data.item
      }).catch(error => {
        console.log(error)
      })
    },
    subjectOne() {
      subject.getSubjectList().then(response => {

        this.subjectOneList = response.data.list
      })
    },
    subOneChange(value) {//value就算id值
      console.log(value)
      for (let i = 0; i < this.subjectOneList.length; i++) {
        let oneSubject = this.subjectOneList[i]
        if (value === oneSubject.id) {
          this.subjectTwoList = oneSubject.children
          this.courseinfo.subjectId = ''
        }
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleSussess(res, file) {
      console.log(res)
      this.courseinfo.cover = res.data.url
    },
    getOldChapter(){
      course.selById(this.courseId).then(response =>{
        console.log(response)
     this.courseinfo = response.data.courseInfoVo
           subject.getSubjectList().then(response=>{
             this.subjectOneList=response.data.list
             for (let i = 0; i <this.subjectOneList.length ; i++) {
              let oneSubject = this.subjectOneList[i]
               if (this.courseinfo.subjectParentId == oneSubject.id){
                 console.log(oneSubject.children)
                 this.subjectTwoList=oneSubject.children
               }
             }
           })
      })
    }



  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
