import request from "@/utils/request";

export function getConfig (id) {
    return request({
        url: "/config/getConfig",
        method: "get",
        params:{
            id
        }
    });
}


export function updateConfig (data) {
    console.log(data)
    return request({
        url: "/config/updateConfig",
        method: "post",
        data,
    });
}
