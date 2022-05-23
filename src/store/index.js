import { createStore } from 'vuex';
import { getSongUrl, getLyric } from 'api/api.js';
import createPersistedState from "vuex-persistedstate";
import { parseLyric } from '../plugin/mixin';

const store = new createStore({
  state: () => ({
    palylist: {},
    playingSong: {
      alias: {
        name: "一分一寸",
        picUrl: "https://p2.music.126.net/rUrVz-IPiryIzwgrlFnCvg==/109951166558970538.jpg",
      },
      author: [{ name: "不是花火呀" }],
      id: 1804614734,
      name: "一分一寸"
    },
    playingSongId: 1804614734,
    curMusicUrl: "http://m801.music.126.net/20220522204216/6d2599dd947eb99bd8089f2503f100ae/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096589503/36ed/fee5/d4f3/0169016949ddc614c8fea3a8ff8c7b2f.mp3",
    isShowPlayIcon: true,
    lyricList: []
  }),
  getters: {
    palylist: state => state.palylist,
    playingSong: state => state.playingSong,
    playingSongId: state => state.playingSongId,
    curMusicUrl: state => state.curMusicUrl,
    isShowPlayIcon: state => state.isShowPlayIcon,
    lyricList: state => state.lyricList,
  },
  mutations: {
    setPlaylist (state, val) {
      state.palylist = val
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
  },
  actions: {
    async getMusic ({ state, commit }, songItem) {
      console.log('songItem', songItem);
      commit('setPlayingSong', songItem)
      commit('setPlayingSongId', songItem.id)

      const res1 = await getSongUrl(state.playingSongId)
      state.curMusicUrl = res1.data[0].url

      const res2 = await getLyric(state.playingSongId)
      state.lyricList = parseLyric(res2.lrc.lyric)
      // console.log(state.lyric);
    },
  },
  modules: {},
  // 数据持久化
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer (state) {
      return {
        playingSong: state.playingSong,
        curMusicUrl: state.curMusicUrl,
        isShowPlayIcon: state.isShowPlayIcon,
      }
    }
  })]
});

export default store
