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

export function getFirstList ({ curr, limit, articleId, parentId, mode }) {
  return request({
    url: "/comment/getFirstList",
    method: "get",
    params: {
      curr, limit, articleId, parentId, mode
    },
  });
}
export function getSecondList ({ page, limit, articleId, parentId, mode}) {
  return request({
    url: "/comment/getSecondList",
    method: "get",
    params: {
      page, limit, articleId, parentId, mode
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
