const config = require("./knexfile");
const multer = require("multer");
const path = require("path");
const knex = require("knex");
const dbClient = knex(config);

//For Updating book
async function updateSweets(req, res) {
    try {
        const title = req.body.title;
        const price = req.body.price;
        const image = req.body.image;
        const description = req.body.description;
  
        const data = await dbClient.table("sweets_add").where({ id: req.params.id }).update({ title, price, image, description})
        res.json({
            status: true,
            success: true,
            message: "Book updated successfully."
        })
    } catch (error) {
        res.json({
            status: false,
            success: false,
            message: error.message
        });
    }
}


// For deleting book

async function deleteSweets(req,res){
    try{
      const data = await dbClient.table('sweets_add').where({id: req.params.id}).delete();
   
    res.json({
      status: 'success',
      success: true,
      message: 'Delete success'
  })
  } catch (error) {
  console.log(error)
  res.json({
      success: false,
      status: 'fail',
      message: 'failed to Delete'
  });
  }
}

// For Add to cart

async function addToCart(req, res) {
    try {
        const title = req.body.title;
        const price = req.body.price;
        const image = req.body.image;
        const email = req.body.email;
        const remarks = req.body.remarks;
  
        const data = await dbClient.table("add_to_cart").insert({ title, price, image, email,remarks})
        res.json({
            status: true,
            success: true,
            message: "Add to cart."
        })
    } catch (error) {
        res.json({
            status: false,
            success: false,
            message: error.message
        });
    }
  };

// For getting add to cart

 async function getAddToCarts(request, response){
    const email = request.params.email;
    const data = await dbClient("add_to_cart").select().where({email:email,'remarks':'pending'});
    response.json(data);
  }


//For buying books
  async function buySweets(request, response){
    const email = request.params.email;
    const id = request.params.id;
    const data = await dbClient("add_to_cart").update({'remarks':'Buy'}).where({email,id});
    response.json(data);
  }

module.exports=
{
    updateSweets,
    deleteSweets,
    addToCart,
    getAddToCarts,
    buySweets
}




