import request from "@/utils/request";


export function getUserList () {
  return request({
    url: "/getList",
    method: "get",
  });
}


export function getInformation (uuid) {
  return request({
    url: "/getUser",
    method: "get",
    params: {
      uuid,
    },
  });
}

export function getInfor(token){
  return request({
    url: "/getInfor",
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
    params:{
      source
    }
  });
}

export function logout (id) {
  return request({
    url: "/logout",
    method: "post",
    params: {
      id,
    },
  });
}

export function add () { }
export function del () { }
export function update (data) {
  return request({
    url: "/update",
    method: "post",
    data
  });
}

