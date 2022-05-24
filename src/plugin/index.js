import mymix from './mixin';
import getVant from './vant';

const plugin = {
  install (app) {
    mymix(app)
    getVant(app)
  }
}
export default plugin
