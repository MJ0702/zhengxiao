//时间过滤器方法
export function formatDate(date, fmt) {
    // if (/(y+)/.test(fmt)) {
    //     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    // }
    // let o = {
    //     'M+': date.getMonth() + 1,
    //     'd+': date.getDate(),
    //     'h+': date.getHours(),
    //     'm+': date.getMinutes(),
    //     's+': date.getSeconds()
    // };
    // for (let k in o) {
    //     if (new RegExp(`(${k})`).test(fmt)) {
    //         let str = o[k] + '';
    //         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    //     }
    // }
    // return fmt;
    let dateTime = new Date(date);
    var o = {
        "M+": dateTime.getMonth() + 1,               //月份   
        "d+": dateTime.getDate(),                    //日   
        "h+": dateTime.getHours(),                   //小时   
        "m+": dateTime.getMinutes(),                 //分   
        "s+": dateTime.getSeconds(),                 //秒   
        "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度   
        "S": dateTime.getMilliseconds()             //毫秒   
    };
 
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

// function padLeftZero(str) {
//     return ('00' + str).substr(str.length);
// }