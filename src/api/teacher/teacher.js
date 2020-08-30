import request  from "@/utils/request";
export  default {
  // 条件查询带分页
  getTeacherListPage(current, limit, eduTeacherVodu) {
    return request({
      url: `/eduservice/edu-teacher/pagesKind/${current}/${limit}`,
      method: 'post',
      data: eduTeacherVodu
    })
  },
  //根据id输出
  delTeacher(id) {
    return request({
      url: `/eduservice/edu-teacher/delLogic/${id}`,
      method: 'delete',
    })
  },
  //整加讲师
  addTeacher(eduTeacher) {
    return request({
      url: '/eduservice/edu-teacher/addTeacher',
      method: 'post',
      data: eduTeacher
    })
  },
  //查询老师
   selTeacher(id) {
    return request({
      url: `/eduservice/edu-teacher/selectTeacherById/${id}`,
      method: 'get'
    })
  },
  updateTeacher(eduTeacher){
    return request({
      url: `/eduservice/edu-teacher/updateTeacher`,
      method: 'post',
      data: eduTeacher
    })
  },
  selAllTeacher() {
    return request({
      url: `/eduservice/edu-teacher/findAll`,
      method: 'get'
    })
  }
}
