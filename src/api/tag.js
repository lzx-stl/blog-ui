import request from "@/utils/request";

export function findAllTag(keyWord) {
  return request({
    url: "/tag/findAll",
    method: "get",
    params:{
      keyWord
    }
  });
}


export function addTag(data) {
  return request({
    url: "/tag/add",
    method: "post",
    data,
  });
}
export function delTag(value) {
  return request({
    url: "/tag/del",
    method: "post",
    params: {
      value,
    },
  });
}

export function updateTag(data) {
  return request({
    url: "/tag/update",
    method: "post",
    data,
  });
}