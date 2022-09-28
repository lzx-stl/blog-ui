import request from "../utils/request";

export function getData () {
  return request({
    url: "/data",
    method: "get",
  })
}

export function findAll ({ page, limit, tag, keyWord, all, authorId, mode }) {

  return request({
    url: "/article/findAll",
    method: "get",
    params: {
      page,
      limit,
      tag,
      keyWord,
      all,
      authorId,
      mode
    },
  });
}


export function addArticle (data) {
  return request({
    url: "/article/add",
    method: "post",
    data,
  });
}

export function del (id) {
  return request({
    url: "/article/del",
    method: "post",
    params: {
      id,
    },
  });
}

export function updateArticle (data) {
  return request({
    url: "/article/update",
    method: "post",
    data,
  });
}

export function updateState (id, state) {
  return request({
    url: "/article/updateState",
    method: "post",
    params: {
      id, state
    },
  });
}


export function updateReadCnt (id) {
  return request({
    url: "/article/updateReadCnt",
    method: "post",
    params: {
      id,
    },
  });
}

export function getArticle (id) {
  return request({
    url: "/article/getArticle",
    method: "get",
    params: { id },
  });
}


