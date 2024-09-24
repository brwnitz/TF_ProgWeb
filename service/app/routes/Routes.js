const express = require('express');
const ValidTokenController = require('../controllers/ValidTokenController');
const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();
const path = require('path');

const multer  = require('multer');
const ProductController = require('../controllers/ProductController');
const SalesController = require('../controllers/SalesController');



const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./app/public/uploads/");
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
    
});

const fileFilterObject = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === "image/png" || file.mimetype === "image/svg" || file.mimetype === "image/webp" ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilterObject
});

router.post('/registerUser', UserController.insertUserControll);
router.post('/login', UserController.login); 
router.put('/updateUser', ValidTokenController.validToken, UserController.updateUser);
router.delete('/deleteUser', ValidTokenController.validToken, UserController.deleteUser);

router.post('/registerCategory', ValidTokenController.validToken, CategoryController.insertCategoryControll);
router.get('/selectCategory', CategoryController.selectAllCategory);
router.get('/selectCategoryById', CategoryController.selectOneCategory); 
router.put('/updateCategory', ValidTokenController.validToken, CategoryController.updateCategory);
router.delete('/deleteCategory', ValidTokenController.validToken, CategoryController.deleteCategory);

router.post('/registerImageProduct', ValidTokenController.validToken, upload.single('imageProduct'), ProductController.insertImageProduct);
router.delete('/deleteImagesProduct', ValidTokenController.validToken, ProductController.deleteImageProduct);

router.post('/registerProduct', ValidTokenController.validToken, ProductController.insertProduct);
router.get('/selectAllProduct', ProductController.selectAllProducts);
router.get('/selectProductById', ProductController.selectOneProduct);
router.get('/selectProductByCategory', ProductController.selectAllProductsByCategory); 
router.put('/updateProduct', ValidTokenController.validToken, ProductController.updateProduct);
router.delete('/deleteProduct', ValidTokenController.validToken, ProductController.deleteProduct);

//relatórios
router.get('/reportStock', ValidTokenController.validToken, ProductController.selectReportProductWithoutStock);
router.get('/reportSaleClient', ValidTokenController.validToken, SalesController.selectReportTotalPurchasesPerClient);
router.get('/reportSalesValueTotal', ValidTokenController.validToken, SalesController.selectReportSalesValueTotal);

router.post('/registerSale', ValidTokenController.validToken, SalesController.insertSale);
router.get('/selectAllSales', ValidTokenController.validToken, SalesController.selectAllSales);
router.get('/selectAllSalesUser', ValidTokenController.validToken, SalesController.selectAllSalesUser);
router.delete('/deleteSale', ValidTokenController.validToken, SalesController.deleteSale);




module.exports = router;