import { createStore } from 'vuex';
import { getSongUrl, getLyric } from 'api/api.js';
import createPersistedState from "vuex-persistedstate";
import { parseLyric } from '../plugin/mixin';
import userInfo from './userInfo';

const store = new createStore({
  state: () => ({
    palylist: {}, // 播放列表
    songslist: [], // 歌曲列表
    playingSong: { // 播放中的歌曲信息
      alias: {
        name: "一分一寸",
        picUrl: "https://p2.music.126.net/rUrVz-IPiryIzwgrlFnCvg==/109951166558970538.jpg",
      },
      author: [{ name: "不是花火呀" }],
      id: 1804614734,
      name: "一分一寸"
    },
    playingSongId: 1804614734, // 播放中歌曲的id
    curMusicUrl: "", // 当前音乐的url
    isShowPlayIcon: true, // 是否显示播放图标
    lyricList: [], // 歌词列表
    currentTime: 0, // 当前歌曲播放的时间
    curSongsIndex: 0, // 当前歌曲的索引号
    curDuration: '', // 歌曲的时长
  }),
  getters: {
    palylist: state => state.palylist,
    songslist: state => state.songslist,
    playingSong: state => state.playingSong,
    playingSongId: state => state.playingSongId,
    curMusicUrl: state => state.curMusicUrl,
    isShowPlayIcon: state => state.isShowPlayIcon,
    lyricList: state => state.lyricList,
    currentTime: state => state.currentTime,
    curSongsIndex: state => state.curSongsIndex,
    curDuration: state => state.curDuration,
  },
  mutations: {
    setPlaylist (state, val) {
      state.palylist = val
    },
    setSongslist (state, val) {
      state.songslist = val
    },
    setPlayingSong (state, val) {
      state.playingSong = val
    },
    setPlayingSongId (state, val) {
      state.playingSongId = val
    },
    setIsShowPlayIcon (state, val) {
      state.isShowPlayIcon = val
    },
    setCurrentTime (state, val) {
      state.currentTime = val
    },
    setCurSongsIndex (state, val) {
      state.curSongsIndex = val
    },
    setCurDuration (state, val) {
      state.curDuration = val
    },
  },
  actions: {
    async getMusic ({ state, commit }, songItem) {
      console.log('songItem', songItem);
      try {
        commit('setPlayingSong', songItem)
        commit('setPlayingSongId', songItem.id)

        const [res1, res2] = await Promise.all([
          getSongUrl(state.playingSongId),
          getLyric(state.playingSongId)
        ])

        state.curMusicUrl = res1.data[0].url
        // 将拿到的歌词数据处理一下，是个数组第一个数据是当前歌词时间，第二个是当前歌词
        state.lyricList = parseLyric(res2.lrc.lyric)
        // 将当前歌词的持续时长拿来做数组的最后一个值，
        // 避免 audioPage.vue `this.currentTime <= this.lyricList[i + 1][0]`这句报错
        if (state.curDuration) {
          const duration = state.curDuration.split(':')
          const endTime = parseInt(duration[0]) * 60 + parseInt(duration[1] + 1)
          state.lyricList.push([endTime])
        }
        // console.log(state.lyricList);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
    userInfo
  },
  // 数据持久化，防止页面刷新数据丢失
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      key: 'play',
      reducer (state) {
        return {
          playingSong: state.playingSong,
          songslist: state.songslist,
          curMusicUrl: state.curMusicUrl,
          isShowPlayIcon: state.isShowPlayIcon,
          lyricList: state.lyricList,
          curSongsIndex: state.curSongsIndex,
        }
      },
    }),
  ]
});

export default store
