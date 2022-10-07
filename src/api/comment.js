import request from "@/utils/request";

export function addComment (data) {
  return request({
    url: "/comment/addComment",
    method: "post",
    data,
  });
}

export function del (id) {
  return request({
    url: "/comment/del",
    method: "post",
    params: {
      id
    },
  });

}

export function getComment (id) {
  return request({
    url: "/comment/getCommentById",
    method: "get",
    params: {
      id
    },
  });
}

export function getFirstList ({ curr, limit, articleId, parentId, mode }) {
  return request({
    url: "/comment/getFirstList",
    method: "get",
    params: {
      curr, limit, articleId, parentId, mode
    },
  });
}
export function getSecondList ({ curr, limit, articleId, parentId, mode }) {
  return request({
    url: "/comment/getSecondList",
    method: "get",
    params: {
      curr, limit, articleId, parentId, mode
    },
  });
}


// export function getFirstIds (articleId, parentId) {
//   return request({
//     url: "/comment/getComments",
//     method: "get",
//     params: {
//       articleId,
//       parentId,
//     },
//   });
// }

export function getSeconds () {

}


export function like (id, up) {
  return request({
    url: "/comment/like",
    method: "post",
    params: {
      id, up
    },
  });
}


export function getCommentSum (articleId) {
  return request({
    url: "/comment/getSum",
    method: "get",
    params: {
      articleId
    },
  });
}


export function getCommentsFrom ({ curr, limit, fromId }) {
  return request({
    url: "/comment/getCommentsFrom",
    method: "get",
    params: {
      curr, limit, fromId
    },
  });
}


export function getCommentsTo ({ curr, limit, toId }) {
  return request({
    url: "/comment/getCommentsTo",
    method: "get",
    params: {
      curr, limit, toId
    },
  });
}