const getters = {
  id: state => state.user.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  users: state => state.user.users,
  routes : state => state.permission.routes
}
export default getters