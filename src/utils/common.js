// import { Message } from 'element-ui'
import request from './request'
// import moment from 'moment'

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const arrayKeyBind = (arr, key = '_index_') => {
  if (arr && arr.length == 0) return []
  let i = 1
  for (let k in arr) {
    arr[k][key] = i
    i++
  }
  return arr
}

export const arrayBindKey = (arr, key) => {
  var newArr = {}
  for (var k in arr) {
    newArr[arr[k][key]] = arr[k]
  }
  return newArr
}

export const inArray = (search, array) => {
  for (var i in array) {
    if (array[i] == search) {
      return i
    }
  }
  return false
}

export const floatTool = (() => {
  function isInteger(obj) {
    return Math.floor(obj) === obj
  }

  function toInteger(floatNum) {
    var ret = {
      times: 1,
      num: 0
    }
    if (isInteger(floatNum)) {
      ret.num = floatNum
      return ret
    }
    var strfi = floatNum + ''
    var dotPos = strfi.indexOf('.')
    var len = strfi.substr(dotPos + 1).length
    var times = Math.pow(10, len)
    var intNum = parseInt(floatNum * times + 0.5, 10)
    ret.times = times
    ret.num = intNum
    return ret
  }

  function operation(a, b, op) {
    var o1 = toInteger(a)
    var o2 = toInteger(b)
    var n1 = o1.num
    var n2 = o2.num
    var t1 = o1.times
    var t2 = o2.times
    var max = t1 > t2 ? t1 : t2
    var result = null
    switch (op) {
      case 'add':
        if (t1 === t2) {
          result = n1 + n2
        } else if (t1 > t2) {
          result = n1 + n2 * (t1 / t2)
        } else {
          result = n1 * (t2 / t1) + n2
        }
        return result / max
      case 'sub':
        if (t1 === t2) {
          result = n1 - n2
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2)
        } else {
          result = n1 * (t2 / t1) - n2
        }
        return result / max
      case 'mul':
        result = (n1 * n2) / (t1 * t2)
        return result
      case 'divide':
        return (result = (function() {
          var r1 = n1 / n2
          var r2 = t2 / t1
          return operation(r1, r2, 'mul')
        })())
    }
  }

  function add(a, b) {
    // 加
    return operation(a, b, 'add')
  }

  function sub(a, b) {
    // 减
    return operation(a, b, 'sub')
  }

  function mul(a, b) {
    // 乘
    return operation(a, b, 'mul')
  }

  function divide(a, b) {
    // 除
    return operation(a, b, 'divide')
  }
  return {
    add: add,
    sub: sub,
    mul: mul,
    divide: divide
  }
})()

export const downloadPhoto = (url, name) => {
  request
    .post(
      '/api/file-download',
      { relativePath: url, name: name },
      {
        responseType: 'blob'
      }
    )
    .then(res => {
      if (!res) return
      let url = window.URL.createObjectURL(res.data)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
    })
}

// export const downloadFile = (url, name, success, error) => {
//   request({
//     url,
//     method: 'get',
//     responseType: 'blob'
//   })
//     .then(res => {
//       success && success(res)
//       const r = new FileReader()
//       r.onload = function() {
//         try {
//           const resData = JSON.parse(this.result)
//           if (resData && resData.resultCode && resData.resultCode == 2) {
//             Message.error(resData.errMsg)
//           }
//         } catch (err) {
//           const link = document.createElement('a')
//           link.style.display = 'none'
//           link.href = window.URL.createObjectURL(res.data)
//           link.setAttribute('download', `${name} - ${moment().format('YYYY-MM-DD')}.xlsx`)
//           document.body.appendChild(link)
//           link.click()
//         }
//       }
//       r.readAsText(res.data)
//     })
//     .catch(err => {
//       error && error(err)
//     })
// }

// export const downloadFilePost = (url, data, name, success, error) => {
//   request({
//     url,
//     data,
//     method: 'post',
//     responseType: 'blob'
//   })
//     .then(res => {
//       success && success(res)
//       const r = new FileReader()
//       r.onload = function() {
//         try {
//           const resData = JSON.parse(this.result)
//           if (resData && resData.resultCode && resData.resultCode == 2) {
//             Message.error(resData.errMsg)
//           }
//         } catch (err) {
//           const link = document.createElement('a')
//           link.style.display = 'none'
//           link.href = window.URL.createObjectURL(res.data)
//           link.setAttribute('download', `${name} - ${moment().format('YYYY-MM-DD')}.xlsx`)
//           document.body.appendChild(link)
//           link.click()
//         }
//       }
//       r.readAsText(res.data)
//     })
//     .catch(err => {
//       error && error(err)
//     })
// }
