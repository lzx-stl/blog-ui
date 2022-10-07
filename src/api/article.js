import request from "../utils/request";

export function getRelation (articleId, userId) {
  return request({
    url: "/article/getRelation",
    method: "get",
    params: {
      userId, articleId
    }
  })
}


export function updateRelation (data) {
  return request({
    url: "/article/updateRelation",
    method: "post",
    data
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

export function getBookList ({ curr, limit, userId }) {
  return request({
    url: "/article/getBookList",
    method: "get",
    params: {
      curr,
      limit,

      userId,

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

export function getArticleStatus (articleId) {
  return request({
    url: "/article/getArticleStatus",
    method: "get",
    params:{
      articleId
    },
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