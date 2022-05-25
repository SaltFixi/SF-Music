export default [
  {
    path: "/songsList",
    name: "songsList",
    component: () => import('views/songsList/songsList.vue'),
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
  },
];
