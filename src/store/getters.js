const getters = {
  id: state => state.user.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,

  nickname: state => state.user.nickname,
  users: state => state.user.users,
  permission_routes: state => state.permission.routes,

  userRoutes: state => state.permission.userRoutes,
  bannerList: state => state.app.bannerList
}
export default getters