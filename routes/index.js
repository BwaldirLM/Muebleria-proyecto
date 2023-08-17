const {Router} = require('express')

const router = Router();

router.get('/', (req, res)=>{
    console.log(req.user);
    res.render('index/index');
});

module.exports = router;