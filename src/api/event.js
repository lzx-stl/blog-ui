import request from "@/utils/request";

export function add (data) {
  return request({
    url: "/event/add",
    method: "post",
    data,
  });
}

export function findAll () {
  return request({
    url: "/event/findAll",
    method: "get",
  });
}

export function update (data) {
  return request({
    url: "/event/update",
    method: "post",
    data
  });
}

export function del (id) {
  return request({
    url: "/event/del",
    method: "post",
    params: {'id' : id}
  });
}
