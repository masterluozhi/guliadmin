import request from "@/utils/request";
export default {
  getAllChapter(courseId){
   return  request({
      url: `/eduservice/edu-chapter/getCgapterVideo/${courseId}`,
      method:'get'
    })
  },
  updataChapter(chapter){
    return request({
      url:`/eduservice/edu-chapter/updataChapter`,
      method:'post',
      data:chapter
    })
  },
  delChapter(chapterId){
    return request({
      url:`/eduservice/edu-chapter/del/${chapterId}`,
      method:'delete',
    })
  },
  addChapter(chapter){
    return request({
      url:`/eduservice/edu-chapter/addChapter`,
      method:'post',
      data:chapter
    })
  },
  getById(chapterId){
    return request({
      url:`/eduservice/edu-chapter/getById/${chapterId}`,
      method:'get'
    })
  }


}
