const {Router} = require('express')

const router = Router();

router.get('/', (req, res)=>{
    console.log(req.user);
    res.render('index/index',{'user': req.user});
});

module.exports = router;