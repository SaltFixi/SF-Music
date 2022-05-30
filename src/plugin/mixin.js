import * as request from '../utils/request';

// 全局过滤器
const filters = {
  // 处理播放数
  fmtPlayCount: (num) => {
    if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿'
    else if (num >= 10000) return (num / 10000).toFixed(1) + '万'
    else return num
  },
  fmt12Str: (str) => { if (str) return str.slice(0, 12) },
  fmt30Str: (str) => { if (str) return str.slice(0, 30) },
}


export default (app) => app.mixin({
  methods: {
    ...request,
    ...filters
  },
})


// 处理歌词，按行保存到数组
export const parseLyric = (text) => {
  var lines = text.split("\n");
  var pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;

  var result = [];
  while (!pattern.test(lines[0])) {
    lines = lines.slice(1);
  }
  lines[lines.length - 1].length === 0 && lines.pop();
  lines.forEach(function (item) {
    let time = item.match(pattern); // 存前面的时间段
    let value = item.replace(pattern, ""); // 存歌词
    // console.log(time) // 时间
    // console.log(value) // 歌词数据
    time.forEach(function (item1) {
      var t = item1.slice(1, -1).split(":");
      if (value !== "") {
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      }
    });
  });
  result.sort(function (a, b) {
    return a[0] - b[0];
  });
  return result;
}
