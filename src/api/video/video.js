import request from "@/utils/request";
export  default {
  addVideo(video) {
    return request({
      url: `/eduservice/edu-video/addVideo`,
      method: 'post',
      data: video
    })
  },
  updataVideo(video) {
    return request({
      url: `/eduservice/edu-video/updataVideo`,
      method: 'post',
      data: video
    })
  },
  delVideo(videoId) {
    return request({
      url: `/eduservice/edu-video/delVideo/${videoId}`,
      method: 'delete',
    })
  },
  selVideoById(videoId){
    return request({
      url: `/eduservice/edu-video/selVideoById/${videoId}`,
      method: 'get',
    })
  },
  delAliyunVideo(videoId){
    return request({
      url: `/eduvod/delByid/${videoId}`,
      method: 'delete',
    })
  }
}
