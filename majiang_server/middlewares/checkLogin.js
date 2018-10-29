module.exports = {
  // 判断session是否存在，同时返回前端一个json作为状态判断

  checkLogin(req, res, next) {
    if (!req.session.user) {
      return res.json({
        error: '未登录',
        session: false,
        message:'noLogin',
        code:'-5'
      });
    }
    next();
  },

  checkNotLogin(req, res, next) {
    if (req.session.user) {
      return res.json({
        error: '已登录',
        session: true
      });
    }
    next();
  }
};