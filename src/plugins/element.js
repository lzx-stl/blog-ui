import Vue from 'vue'
import { Button } from 'element-ui'
import {Message} from "element-ui";
import { MessageBox } from 'element-ui';

Vue.use(Button);
Vue.use(MessageBox);
Vue.prototype.$message = Message;