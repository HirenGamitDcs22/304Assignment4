const express=require("express");
const app=express();
const port=5000;

app.use(express.json());

const sellerRouter=require("./routes/seller");
const companyRouter=require("./routes/company");
const productRouter=require("./routes/products");

app.use("/seller",sellerRouter);

app.use("/company",companyRouter);

app.use("/products",productRouter);

app.get("/",(req,res)=> console.log("Hello world!"));

app.listen(port, () => console.log(`Server running on port ${port}`));