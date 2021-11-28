const express=require("express");
const router=express.Router();

const productData=require("../data/productData");
const companyData=require("../data/companyData");

router.get("/",(req,res)=>res.json({data:"Product Home!"}));

router.get("/list", async(req,res)=>{
    if(productData.length===0){
        return res.json({data:"Product not found"})
    }
    return res.json({data:productData});
});

//add new product
router.post("/addproduct", (req,res)=>{
    const {newProduct}=req.body;
    productData.push(newProduct);
    return res.json({data:productData});
});
//fetch all products of a company
router.post("/retrieve/:pname", (req,res)=>{
    const pname=req.params.pname;
    const product= productData.filter((p)=>p.title === pname);
    const companyid=product.map((p)=>p.company_id);
    const company=companyData.filter((c)=>c.company_id === String(companyid));
    return res.json({data:company});
});

//fetch all products of a seller
router.post("/retrieve/:pname", (req,res)=>{
    const pname=req.params.pname;
    const product= productData.filter((p)=>p.title === pname);
    const companyid=product.map((p)=>p.company_id);
    const company=companyData.filter((c)=>c.company_id === String(companyid));
    return res.json({data:company});
});
//update product (add/remove category)
router.put("/updateproduct/:pname", async(req,res)=>{
    const pname=req.params.pname;
    const companydata=productModel.findOneAndUpdate();
    return res.json({data:companydata});
});

//delete product
router.delete("/delproduct/:id",(req,res)=>{
    const cid=req.params.id;
    const companydata=companyData.filter((c)=>c.company_id === cid)
    const index=companyData.indexof(companydata);
    return res.json({data:index});
});


module.exports=router;