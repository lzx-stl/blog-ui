import request from "../utils/request";

export function getSettings (userId, articleId) {
  return request({
    url: "/article/settings",
    method: "get",
    params:{
      userId, articleId
    }
  })
}


export function getData () {
  return request({
    url: "/data",
    method: "get",
  })
}

export function findAll ({ curr, limit, tag, keyword, isPublish, authorId, mode }) {

  return request({
    url: "/article/findAll",
    method: "get",
    params: {
      curr,
      limit,
      tag,
      keyword,
      isPublish,
      authorId,
      mode
    },
  });
}

export function findBookAll ({ page, limit, tag, keyword, all, userId, mode }) {
  return request({
    url: "/article/findBookAll",
    method: "get",
    params: {
      page,
      limit,
      tag,
      keyword,
      all,
      userId,
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


export function like (userId, articleId) {
  return request({
    url: "/article/like",
    method: "post",
    params: {
      userId, articleId
    }
  })
}


export function book (userId, articleId) {
  return request({
    url: "/article/book",
    method: "post",
    params: {
      userId, articleId
    }
  })
}