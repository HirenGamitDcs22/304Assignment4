const express=require("express");
const router=express.Router();

const sellerData=require("../data/sellerData");
const productData=require("../data/productData");

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
router.post("/retrieve/:pname", (req,res)=>{
    const pname=req.params.pname;
    const product= productData.filter((p)=>p.title === pname);
    const sellerid=product.map((p)=>p.seller_id);
    const seller=sellerData.filter((c)=>c.seller_id === String(sellerid));
    return res.json({data:seller});
});

//update seller (add/remove products)
router.put("/updateseller/:id",(req,res)=>{
    const id=req.params.id;
    const pid=req.body.pid;
    const index=sellerData.findIndex((s)=>s.seller_id === id);
    console.log(index);
    if(index>=0){
        sellerData[index].product_id.push(pid);
        return res.json({"after update":sellerData});
    }
    return res.json({data:"Seller not found"})
});

//delete seller
router.delete("/delseller/:name",(req,res)=>{
    const sname=req.params.name; 
    const index=sellerData.findIndex((s)=>s.name === sname);
    if(index>=0){
        return res.json({"Deleted Company Record":sellerData.splice(index, 1),data:sellerData});
    }
    return res.json({data:"Seller Record not found"});
});

module.exports=router;