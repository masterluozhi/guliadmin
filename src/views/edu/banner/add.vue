<template>
  <div class="app-container">
  <el-form ref="form" :model="banner" label-width="80px">
    <el-form-item label="标题" >
      <el-input v-model="banner.title" ></el-input>
    </el-form-item>
    <!-- 讲师头像：TODO -->
    <!-- 讲师头像 -->
    <el-upload
      class="avatar-uploader"
      :action="BASE_API+'/eduoss/fileoss/upload'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="banner.imageUrl" :src="banner.imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form-item>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
import banner from "@/api/banner/banner";
export default {
  name: "add",
  data(){
    return{
      banner:{},
      BASE_API:'http://120.55.81.130:9001',
      saveBtnDisabled:false
    }
  },
  created() {
    if(this.$route.params && this.$route.params.id){
      this.selBanner();
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
            this.banner.imageUrl=res.data.url
    },
    beforeAvatarUpload(file) {
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
    save(){
      banner.addBanner(this.banner).then(response=>{
        this.$router.push({path:'/banner/list'})
      })
    },
    updata(){
      banner.updataBanner(this.banner).then(response=>{
        this.$router.push({path:'/banner/list'})
      })
    },
    saveOrUpdate(){
           if(!this.$route.params && this.$route.params.id){
             this.save()
           }else{
             this.updata()
           }
    },
    //修改回显数据
    selBanner(){
       banner.selBannerById(this.$route.params.id).then(response=>{
         this.banner=response.data.item
       })
    }
  }
}
</script>

<style scoped>

</style>
