const express=require("express");
const router=express.Router();

const productData=require("../data/productData");
const companyData=require("../data/companyData");
const sellerData=require("../data/sellerData");

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
router.post("/retrieve/company/:cname", (req,res)=>{
    const cname=req.params.cname;
    const company=companyData.filter((c)=>c.name === cname);
    const companyid=company.map((c)=>c.company_id);
    const product=productData.filter((p)=>p.company_id === String(companyid));
    return res.json({data:product});
});

//fetch all products of a seller
router.post("/retrieve/seller/:sname", (req,res)=>{
    const sname=req.params.sname;
    const seller = sellerData.filter((s)=>s.name === sname);
    const productids=seller.map((s)=>s.product_id);
    const pid=String(productids);
    const pidarr=pid.split(",");
    var products=[];
    pidarr.forEach(pid=>{
        const product = productData.filter((p)=>p.product_id === String(pid));
        if(product.length>0){
            products.push(product);
        }
    });
    if(products.length===0){
        return res.json({data:"Product not found"})
    }
    return res.json({data:products});
});
//update product (add/remove category)
router.put("/updateproduct/:id",(req,res)=>{
    const pid=req.params.id;
    const category=req.body.category;
    const index=productData.findIndex((p)=>p.product_id === pid);
    if(index>=0){
        console.log(productData[index]);
        productData[index].category.push(category);
        return res.json({"after update":productData});
    }
    return res.json({data:"Product not found"});
});

//delete product
router.delete("/delproduct/:id",(req,res)=>{
    const pid=req.params.id; 
    const index=productData.findIndex((p)=>p.product_id === pid)
    if(index >=0){
        return res.json({"Deleted Company Record":productData.splice(index,1),data:productData});
    }
    return res.json({data:"Product record not found"});
});


module.exports=router;