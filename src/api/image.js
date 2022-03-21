import request from "@/utils/request";

export function findAllImage (page, limit) {
  return request({
    url: "/image/findAll",
    method: "get",
    params: {
      page, limit
    }
  });
}

export function add (data) {
  return request({
    url: "/image/add",
    method: "post",
    data,
  });
}

export function del (id) {
  return request({
    url: "/image/del",
    method: "post",
    params: {
      id
    },
  });
}

export function update (data) {
  return request({
    url: "image/update",
    method: "post",
    data,
  });
}


export function upload (data) {
  return request({
    url: 'image/upload',
    method: "post",
    data,
  });
}