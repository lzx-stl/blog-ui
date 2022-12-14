import QC from 'qc' 
export function loginByThird()
{
  console.log(`QC`, QC);
}





//定时器实现防抖函数
export function debounce (fn, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this);
    }, delay);
  }
}

//时间戳实现节流函数
export function throttle (fn, delay) {
  var previous = 0;
  return function () {
    let _this = this;
    let args = arguments;
    let now = new Date();
    if (now - previous > delay) {
      fn.apply(_this, args);
      previous = now;
    }
  }
}

//定时器实现节流函数
export function throttle2 (fn, delay) {

  let loading = false;
  return function () {
    if (!loading) {
      loading = true;
      setTimeout(() => {
        fn();
        loading = false;
      }, delay);
    }
  }
}


export function formatStr(str) {
  return str.replace(/\n/g, '<br>')
}





export function getTime (time) {
  var current = Date.now();
  var last = Date.parse(time);
  var t = (current - last) / 1000;
  if (t >= 24 * 60 * 60) {
    var date = new Date(time)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var mintues = date.getMinutes();
    return year + '-' +
      (month < 10 ? '0' : '') + month + '-' +
      (day < 10 ? '0' : '') + day + ' ' +
      (hour < 10 ? '0' : '') + hour + ':' +
      (mintues < 10 ? '0' : '') + mintues
  }
  else if (t >= 60 * 60) return parseInt(t / 60 / 60) + '小时前'
  else if (t >= 60) return parseInt(t / 60) + '分钟前'
  return parseInt(t) + '秒前'
}
