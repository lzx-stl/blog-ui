import request from "@/utils/request";

export function add(data) {
    return request({
        url: "/comment/add",
        method: "post",
        data,
    });
}

export function del(id) {
    return request({
        url: "/comment/del",
        method: "post",
        params: {
            id
        },
    });

}

export function getComment(id) {
    return request({
        url: "/comment/getCommentById",
        method: "get",
        params: {
            id
        },
    });
}

export function findAllComments(articleId, parentId) {
    return request({
        url: "/comment/findAll",
        method: "get",
        params: {
            articleId,
            parentId,
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

export function getSeconds() {

}


export function upadte() {
}
