const getters = {
  id: state => state.user.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  
  nickname: state => state.user.nickname,
  users: state => state.user.users,
  routes : state => state.permission.routes,
  
  userRoutes : state => state.permission.userRoutes,
}
export default getters