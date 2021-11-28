const express=require("express");
const router=express.Router();

const companyData=require("../data/companyData");
const productData=require("../data/productData");

router.get("/",(req,res)=>res.json({data:"Company Home!"}));

router.get("/list",(req,res)=>{
    return res.json({data:companyData});
});

//add new company
router.post("/addcompany",(req,res)=>{
    const {newCompany}=req.body;
    companyData.push(newCompany);
    return res.json({data:companyData});
});

//fetch company details based on product name
router.post("/retrieve/:pname", (req,res)=>{
    const pname=req.params.pname;
    const product= productData.filter((p)=>p.title === pname);
    const companyid=product.map((p)=>p.company_id);
    const company=companyData.filter((c)=>c.company_id === String(companyid));
    return res.json({data:company});
});

//update company (add/remove products)
router.put("/updatecompany/:cname",(req,res)=>{
    const cname=req.params.cname;
    const pid=req.body.pid;
    const index=companyData.findIndex((c)=>c.name === cname);
    if(index>=0){
        companyData[index].product_id.push(pid)
        return res.json({"after update":companyData});
    }
    return res.json({data:"Company data not found"});
});

//delete company
router.delete("/delcompany/:name",(req,res)=>{
    const cname=req.params.name; 
    const index=companyData.findIndex((c)=>c.name === cname);
    if(index>=0){
        return res.json({"Deleted Company Record":companyData.splice(index,1),data:companyData});
    }
    return res.json({data:"Company data not found"});
});

module.exports=router;