self.importScripts('./spark-md5.min.js')

self.onmessage = (e) => {
  const { fileChunkList } = e.data
  const spark = new self.SparkMD5.ArrayBuffer()
  let percent = 0
  let count = 0
  const loadNext = (index) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(fileChunkList[index].file)
    reader.onload = (e) => {
      count++
      spark.append(e.target.result)
      if (count == fileChunkList.length) {
        // 结束
        self.postMessage({
          percent: 100,
          hash: spark.end(),
        })
        self.close()
      } else {
        percent += 100 / fileChunkList.length
        self.postMessage({
          percent,
        })
        loadNext(count)
      }
    }
  }
  loadNext(0)
}

// // 引入外部js
// self.importScripts('./spark-md5.min.js')
// self.onmessage = (e) => {
//   const { fileChunkList } = e.data
//   const spark = new self.spark.ArrayBuffer()
//   let cur = 0
//   let percent = 0
//   const loadNext = (index) => {
//     const reader = new FileReader()
//     reader.readAsArrayBuffer(fileChunkList[index].file)
//     reader.onload = (e) => {
//       cur++
//       spark.append(e.target.result)
//       if (cur === fileChunkList.length) {
//         self.postMessage({
//           hash: spark.end(),
//           percent: 100,
//         })
//       } else {
//         percent += 100 / fileChunkList.length

//         self.postMessage({
//           percent,
//         })
//         loadNext(cur)
//       }
//     }
//   }
//   loadNext(0)
// }
