<template>
<div class="app-container">
  <el-form ref="form" :model="eduTeacher" label-width="80px">
    <el-form-item label="讲师姓名" >
      <el-input v-model="eduTeacher.name" ></el-input>
    </el-form-item>
    <el-form-item label="讲师排序">
      <el-input-number v-model="eduTeacher.sort" controls-position="right" :min="0" />
    </el-form-item>
    <el-form-item label="讲师头衔">
      <el-select v-model="eduTeacher.level" placeholder="请选择讲师头衔">
        <el-option label="首席讲师" value="1"></el-option>
        <el-option label="高级讲师" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="讲师资历">
      <el-input v-model="eduTeacher.career"></el-input>
    </el-form-item>
    <el-form-item label="讲师简历">
      <el-input v-model="eduTeacher.intro"></el-input>
    </el-form-item>
    <!-- 讲师头像：TODO -->
    <!-- 讲师头像 -->
    <el-form-item label="讲师头像">

      <!-- 头衔缩略图 -->
      <pan-thumb :image="String(eduTeacher.avatar)"/>
      <!-- 文件上传按钮 -->
      <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
      </el-button>

      <!--
  v-show：是否显示上传组件
  :key：类似于id，如果一个页面多个图片上传控件，可以做区分
  :url：后台上传的url地址
  @close：关闭上传组件
  @crop-upload-success：上传成功后的回调
    <input type="file" name="file"/>
  -->
      <image-cropper
        v-show="imagecropperShow"
        :width="300"
        :height="300"
        :key="imagecropperKey"
        :url="BASE_API+'/eduoss/fileoss/upload'"
        field="file"
        @close="close"
        @crop-upload-success="cropSuccess"/>
    </el-form-item>

    <el-form-item>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import teacher from "@/api/teacher/teacher";
import PanThumb from "@/components/PanThumb";
import ImageCropper from '@/components/ImageCropper';
export default {
  name: "add",
  components:{
    ImageCropper,
     PanThumb
  },
  data() {
    return {
      eduTeacher: {
        name: '',
        sort: 0,
        level: '',
        career: '',
        intro: '',
        avatar:''
      },
      //上传弹框组件是否显示
      imagecropperShow:false,
      imagecropperKey:0,//上传组件key值
      BASE_API:'http://localhost:9001', //获取dev.env.js里面地址
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  created() {
    //根据url中是否有id数值调用add或者updata回显
    this.init()
    console.log("这是"+this.BASE_API)
  },
  watch:{
    $router(to,from){
      this.init()
    }
  },
  methods: {
    close() { //关闭上传弹框的方法
      this.imagecropperShow=false
      //上传组件初始化
      this.imagecropperKey = this.imagecropperKey+1
    },
    //上传成功方法
    cropSuccess(data) {
      this.imagecropperShow=false
      //上传之后接口返回图片地址
      this.eduTeacher.avatar = data.url
      this.imagecropperKey = this.imagecropperKey+1
    },
    //添加讲师
    addTea() {
      teacher.addTeacher(this.eduTeacher).then(response => {
        console.log(response)
        alert(response.message)
        this.$router.push({path: '/teacher/table'})

      }).catch(error => {
        console.log(error)
      })
    },
    //修改讲师的方法
    updateTeacher() {
      teacher.updateTeacher(this.eduTeacher)
        .then(response => {
          //提示信息
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/teacher/table'})
        })
    },
    saveOrUpdate(){
     if (!this.eduTeacher.id){
       this.addTea()
     }else{
       this.updateTeacher()
     }
    },
    //回显讲师数据
    info(id) {
      teacher.selTeacher(id).then(response => {
        console.log(response)
        this.eduTeacher = response.data.teacher
      })
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.info(id)
      }else {
        this.eduTeacher={}
      }
    }
  }
}
</script>

<style scoped>

</style>
