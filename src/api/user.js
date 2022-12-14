import request from "@/utils/request";


export function getUserList () {
  return request({
    url: "/user/userList",
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

export function getInfo () {
  return request({
    url: "/user/getInfo",
    method: "get"
  });
}

export function getInfoById(id)
{
  return request({
    url: "/user/getInfoById",
    method: "get",
    params:{
      id
    }
  });
}

export function loginByThird (source) {
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


export function getFansCount (followId) {
  return request({
    url: "/user/getFansCount",
    method: "get",
    params: {
      followId
    }
  });
}

export function getFollowsCount (fanId) {
  return request({
    url: "/user/getFollowsCount",
    method: "get",
    params: {
      fanId
    }
  });
}

