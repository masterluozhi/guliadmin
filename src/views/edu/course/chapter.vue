<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>

    <!-- 章节 -->
    <ul class="chanpterList">
      <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
               <el-button type="text" @click="openEVideo(chapter.id)">添加小节</el-button>
            <el-button type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="del(chapter.id)">删除</el-button>
            </span>
        </p>
        <ul class="chanpterList videoList">
          <li
            v-for="video in chapter.children"
            :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
            <el-button type="text" @click="updataVideo(video.id)">编辑</el-button>
            <el-button type="text" @click="delVideo(video.id)">删除</el-button>
            </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click=" openChapterDialog">取 消</el-button>
        <el-button @click="saveOrUpdata()">保存</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加章节">
      <el-form :model="video" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
     <el-radio-group v-model="video.isFree">
       <el-radio :label="0">免费</el-radio>
       <el-radio :label="1">不免费</el-radio>
     </el-radio-group>

        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            class="upload-demo"
            :action="BASE_API+'/eduvod/uploadVod'"
            :on-remove="handleRemove"
            :on-success="handleVodUploadSuccess"
            :before-remove="beforeRemove"
             multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只能上传 视频文件，且不超过 100mb</div>
            </template>
          </el-upload>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click=" openVideoDialog">取 消</el-button>
        <el-button @click="saveOrUpdataVideo()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chapter from "@/api/chapter/chapter";
import video from "@/api/video/video";

export default {
  data() {
    return {
      BASE_API: 'http://120.55.81.130:9001',
      saveBtnDisabled: false,
      courseId: '',//课程id
      chapterVideoList: [],
      chapter: { //封装章节数据
        title: '',
        sort: 0,
        courseId: '',
      },
     video:{
        title:'',
       sort:0,
       isFree:0,
       chapterId:'',
       courseId:'',
       id:'',
       videoOriginalName:'',//上传的视频名称
       videoSourceId:''//视频id

     },
      dialogChapterFormVisible: false,//章节弹框
      dialogVideoFormVisible:false,
      fileList:[],
      obj:{
        name:'',
        url:''
      }

    }
  },
  created() {
    //获取路由的id值
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      //根据课程id查询章节和小节
      this.getChapterVideo()
    }
  },
  methods: {
//
    //弹出添加章节页面
    openChapterDialog() {
      //弹框
      this.dialogChapterFormVisible = true
      //表单数据清空
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    //弹出添加小节列表
    openEVideo(chapterId){
      this.dialogVideoFormVisible=true
      this.video.chapterId=chapterId
      this.video.sort=0
      this.video.title=''
      this.video.free=''
      this.video.videoOriginalName=''
      this.video.videoSourceId=''

    },
    //添加小节
    addVideo(){
      this.video.courseId=this.courseId
        video.addVideo(this.video).then(response=>{
         this.$message({
           type:'success',
           message:'添加小节成功'
         })
          this.dialogVideoFormVisible=false
          this.getChapterVideo()
        })
    },
    //修改小节回显
    updataVideo(id){
            this.dialogVideoFormVisible=true
             video.selVideoById(id).then(response=>{
               console.log(response)
               this.video=response.data.item
               if (this.fileList.length<1){
                 this.fileList.push({name:this.video.videoOriginalName,url:''});
               }
             })
    },
    //修改小节
    updataVideoS(){
      video.updataVideo(this.video).then(response=>{
        this.dialogVideoFormVisible=false
        this.getChapterVideo()
      })
    },
    //修改或者保存小节
    saveOrUpdataVideo(){
      if (!this.video.courseId){
        this.addVideo()
      }else {
        this.updataVideoS()
      }
    },
    //删除小节
    delVideo(id){
      this.$confirm('确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
       video.delVideo(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          //回到列表
          this.getChapterVideo()
        })
      })
    },
    //根据课程id查询章节和小节
    getChapterVideo() {
      chapter.getAllChapter(this.courseId).then(response => {
        this.chapterVideoList = response.data.item
      })
    },
    //编辑章节回显
    openEditChapter(id) {
      this.dialogChapterFormVisible = true
      chapter.getById(id).then(response => {
        console.log(response)
        this.chapter = response.data.item
      })
    },
    //修改章节
    updataChapter() {
      chapter.updataChapter(this.chapter).then(response => {
        this.$message({
          type: 'success',
          message: '修改章节成功'
        });
        this.dialogChapterFormVisible = false
        this.getChapterVideo()
      })
    },
    //保存章节
    saveChapter() {
      this.chapter.courseId = this.courseId
      this.$confirm('确定保存？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() =>
        chapter.addChapter(this.chapter).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          //回到列表
          this.dialogChapterFormVisible = false;
          this.getChapterVideo()

        })
      )
    },
    //保存或者修改
    saveOrUpdata() {
      if (!this.chapter.id) {
        this.saveChapter()
      } else {
        this.updataChapter()
      }


    },
    //删除章节
    del(id) {
      this.$confirm('确定删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        chapter.delChapter(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          //回到列表
          this.getChapterVideo()
        })
      })
    },
    openVideoDialog(){
     this. dialogVideoFormVisible=false
      //表单数据清空
      this.video.title = ''
      this.video.sort = 0
    },
    previous() {
      this.$router.push({path: '/course/info/' + this.courseId})
    },
    next() {
      //跳转到第二步
      this.$router.push({path: '/course/public/' + this.courseId})
    },
    //上传成功的方法
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove() {
           video.delAliyunVideo(this.video.videoSourceId).then(response=>{
             this.$message({
               type:'success',
               message:'删除成功'
             })
             this.fileList=[]
             this.video.videoSourceId=''
             this.video.videoOriginalName=''
           })
    },
    handleVodUploadSuccess(response,file,fileList) {
      console.log(response)
      this.video.videoSourceId=response.data.videoId
      this.video.videoOriginalName=file.name
      console.log(this.video.videoOriginalName)
    },
  }
}
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
