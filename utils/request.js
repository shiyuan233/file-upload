function request({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress = (e) => e,
  requestList = [],
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    for (let i of Object.keys(headers)) {
      xhr.setRequestHeader(i, headers[i])
    }

    xhr.upload.onprogress = onProgress
    xhr.send(data)
    xhr.onload = (e) => {
      resolve(JSON.parse(xhr.response))
    }
    xhr.onerror = (e) => {
      reject(e)
    }
  })
}
