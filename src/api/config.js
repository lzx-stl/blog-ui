import request from "@/utils/request";

export function getBannerList () {
  return request({
    url: "/banner/getList",
    method: "get"
  });
}



export function updateConfig (data) {
    return request({
        url: "/config/updateConfig",
        method: "post",
        data,
    });
}
