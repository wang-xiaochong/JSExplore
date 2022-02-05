
class ParamError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "ParamError"
    }
}

class HttpError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "HttpError"
    }
}


function ajax(url) {
    return new Promise((resolve, reject) => {
        if (!/^http/.test(url)) {
            throw new ParamError("请求地址格式错误")
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(JSON.parse(this.response))
            } else if (this.status == 404) {
                // 此处不能用throw抛出，因为这是在onload中，异步进行的，抛出后之前的.catch捕捉不到，需要用reject处理
                // throw new HttpError("访问路径找不到")
                reject(new HttpError("访问路径找不到"))
            }
            else {
                console.log(this.status)
                reject("加载失败")
            }
        }
        xhr.onerror = function () {
            reject(this)
        }
    })

}