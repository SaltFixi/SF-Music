export default [
  {
    path: "/recomPlaysList",
    name: "recomPlaysList",
    component: () => import('views/songsList/recomPlaysList.vue'),
    props: $route => ({
      playlistId: $route.query.playlistId
    }),
    meta: {
      title: '歌单详情页'
    }
  },
  {
    path: "/newSongList",
    name: "newSongList",
    component: () => import('views/songsList/newSongList.vue'),
    meta: {
      title: '新歌速递'
    }
  },
  {
    path: "/mySongList",
    name: "mySongList",
    component: () => import('views/songsList/mySongList.vue'),
    meta: {
      title: '我的歌单'
    }
  }
];
