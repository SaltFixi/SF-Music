import {
  Button, Icon, Swipe, SwipeItem, Tab, Tabs,
  NoticeBar, Toast, Sticky, Col, Row, Skeleton,
  Tabbar, TabbarItem, Popup, Lazyload
} from 'vant';

let vants = [
  Button, Icon, Swipe, SwipeItem, Tab, Tabs,
  NoticeBar, Toast, Sticky, Col, Row, Skeleton,
  Tabbar, TabbarItem, Popup, Lazyload
]

export default function getVant (app) {
  vants.forEach((item) => {
    app.use(item)
  })
}
