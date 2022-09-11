import request from "@/utils/request";

export function add (data) {
  return request({
    url: "/comment/add",
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

export function findAllComments ({ current, limit, articleId, parentId, sortMode }) {
  return request({
    url: "/comment/findAll",
    method: "get",
    params: {
      current, limit, articleId, parentId, sortMode
    },
  });
}
export function findAllCommentsByPage ({ page, limit, articleId, parentId }) {
  return request({
    url: "/comment/findAllByPage",
    method: "get",
    params: {
      page, limit, articleId, parentId
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


export function getRelativeComments ({ page, limit, fromId, toId }) {
  return request({
    url: "/comment/getRelativeComments",
    method: "get",
    params: {
      page, limit, fromId, toId
    },
  });
}
