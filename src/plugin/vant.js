import {
  Button, Icon, Swipe, SwipeItem, Tab, Tabs,
  NoticeBar, Toast, Sticky, Col, Row, Skeleton,
  Tabbar, TabbarItem, Lazyload, Search,
  Form, Field, CellGroup
} from 'vant';

let vants = [
  Button, Icon, Swipe, SwipeItem, Tab, Tabs,
  NoticeBar, Toast, Sticky, Col, Row, Skeleton,
  Tabbar, TabbarItem, Lazyload, Search,
  Form, Field, CellGroup
]

export default function getVant (app) {
  vants.forEach((item) => {
    app.use(item)
  })
}
