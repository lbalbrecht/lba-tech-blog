const router = require('express').Router();
const apiRoutes = require('./api')
const homeRoutes = require('./home-routes')
const authRoutes = require('./auth-routes')

router.use('/', homeRoutes);
router.use('/portal', authRoutes);
router.use('/api', apiRoutes);

module.exports = router;