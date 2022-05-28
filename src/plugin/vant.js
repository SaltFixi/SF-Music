import {
  Button, Icon, Swipe, SwipeItem, Tab, Tabs,
  NoticeBar, Toast, Sticky, Col, Row, Skeleton,
  Tabbar, TabbarItem, Lazyload, Search,
  Form, Field, CellGroup, Popup
} from 'vant';

let vants = [
  Button, Icon, Swipe, SwipeItem, Tab, Tabs,
  NoticeBar, Toast, Sticky, Col, Row, Skeleton,
  Tabbar, TabbarItem, Lazyload, Search,
  Form, Field, CellGroup, Popup
]

export default function getVant (app) {
  vants.forEach((item) => {
    app.use(item)
  })
}
