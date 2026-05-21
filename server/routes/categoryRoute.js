const express = require("express");
const router = express.Router();

const {createCategory,getAllCategories,categoryDetails} = require("../controllers/categoryContoller");

router.post("/create-category",createCategory);
router.get("/getAllCategories",getAllCategories);
router.get("/categoryDetails/:categoryId",categoryDetails);


module.exports = router;