const express=require("express");
const router=express.Router();

const sellerData=require("../data/sellerData");

router.get("/",(req,res)=>res.json({data:"Seller Home!"}));

router.get("/list",(req,res)=>{
    return res.json({data:sellerData});
})

//add new seller
router.post("/addseller",(req,res)=>{
    const {newSeller}=req.body;
    sellerData.push(newSeller);
    return res.json({data:sellerData});
});

//fetch seller details based on product name

//update seller (add/remove products)

//delete seller

module.exports=router;