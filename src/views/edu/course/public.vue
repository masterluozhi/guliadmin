<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="传教课程大纲"></el-step>
      <el-step title="最终发布"></el-step>
    </el-steps>

    <div class="ccInfo">
      <img :src="coursePublic.cover">


    <div class="main">
      <h2>{{coursePublic.title}}</h2>
      <p class="gary">
        <span>共{{coursePublic.lessonNum}}节课</span>
      </p>
      <p>
        <span>分类所属：{{coursePublic.oneSubject}}-{{coursePublic.twoSubject}}</span>
      </p>
      <P>课程讲师：{{coursePublic.name}}</P>
      <h3 class="red">￥{{coursePublic.price}}</h3>
    </div>
</div>

  <div>
    <el-button style="margin-top: 12px;"   @click="before">返回修改</el-button>
    <el-button style="margin-top: 12px;" :disabled="saveBtnDisabled" type="primary" @click="next">发布课程</el-button>
  </div>
  </div>

</template>

<script>
import course from "@/api/course/course";
export default {
  name: "public",
  data() {
    return {
      active: 2,
      saveBtnDisabled: false,
      courseId:'',
      coursePublic:{}
    };
  },
created() {
    if (this.$route.params && this.$route.params.id){
      this.courseId = this.$route.params.id
      this.getPublicCourseInfo(this.courseId)
    }
},
  methods: {
    next() {
      this.$router.push({path:'/course/list'})
    },
    before(){
      this.$router.push({path:'/course/chapter/'+this.courseId})
    },
    getPublicCourseInfo(id){
      course.getPublishCourseInfo(id).then(response=>{
        console.log(response)
        this.coursePublic = response.data.item
      })
    }
  }
}
</script>

<style scoped>
.ccInfo{
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img{
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}

.ccInfo.main{
  margin-left: 520px;
}
.ccInfo.main h2{
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  margin-bottom: 30px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
.ccInfo.main p{
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo.main h3{
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}

</style>
