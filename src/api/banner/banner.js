import request from "@/utils/request";
export default {
  getAllBanner() {
    return request({
      url: '/educms/bannerFront/selAllBanner',
      method: 'get'
    })
  },
  delBannerByid(id) {
    return request({
      url: `/educms/bannerAdmin/delBannerByid/${id}`,
      method: 'delete'
    })
  },
  addBanner(banner) {
    return request({
      url: `/educms/bannerAdmin//addBanner`,
      method: 'post',
      data: banner
    })
  },
  updataBanner(banner){
    return request({
      url: `/educms/bannerAdmin/updataBanner`,
      method: 'post',
      data: banner
    })
  },
  selBannerById(id){
    return request({
      url: `/educms/bannerAdmin/selBannerByid/${id}`,
      method: 'get',
    })
  },
  pageBanner(page,limit){
    return request({
      url: `/educms/bannerAdmin/selPage/${page}/${limit}`,
      method: 'get',
    })
  }
}

