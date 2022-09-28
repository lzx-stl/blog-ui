import request from "@/utils/request";


export function getUserList () {
  return request({
    url: "/user/getList",
    method: "get",
  });
}


export function getInformation (id) {
  return request({
    url: "/user/getUser",
    method: "get",
    params: {
      id,
    },
  });
}

export function getInfor (token) {
  return request({
    url: "/user/getInfor",
    method: "get",
    params: {
      token
    },
  });

}

export function login (source) {
  return request({
    url: "/oauth/render",
    method: "post",
    params: {
      source
    }
  });
}

export function logout (id) {
  return request({
    url: "/user/logout",
    method: "post",
    params: {
      id,
    },
  });
}

export function add () { 

}

export function del () { }

export function updateUser (data) {
  return request({
    url: "/user/update",
    method: "post",
    data
  });
}

