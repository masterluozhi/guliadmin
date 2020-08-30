import request  from "@/utils/request";
export  default {
  addCourseInfo(courInfo){
    return request({
      url:'/eduservice/edu-course/addCourseInfo' ,
      method:'post',
      data: courInfo
    })
  },
  selById(courseid){
    return request({
      url:`/eduservice/edu-course/selOneByid/${courseid}`,
      method:'get'
    })
  },
  updata(courInfo){
    return request({
      url:'/eduservice/edu-course/updata' ,
      method:'post',
      data: courInfo
    })
  },
  getPublishCourseInfo(courseid){
    return request({
      url:`/eduservice/edu-course/getPublicCourseInfo/${courseid}`,
      method:'get'
    })
  },
getCourseListPage(current, limit,Courseinfo){
  return request({
    url:`/eduservice/edu-course/getCourseListPage/${current}/${limit}`,
    method:'post',
    data:Courseinfo
  })
},
  delAll(courseid){
    return request({
      url:`/eduservice/edu-course/delAll/${courseid}`,
      method:'get'
    })

  }
}
