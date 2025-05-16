const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
router.get('/',userController.retrieveEntries);
router.post('/add',userController.addEntries);
router.put('/update/:id',userController.updateEntries);
router.delete('/delete/:id',userController.deleteEntry);


module.exports=router;