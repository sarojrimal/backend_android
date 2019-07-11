const config = require("./knexfile");
const multer = require("multer");
const path = require("path");
const knex = require("knex");
const dbClient = knex(config);


//For Registeration

const registerUser = (req, res) => {
    const Name = req.body.Name;
    const Phone = req.body.Phone;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Password = req.body.Password;
  

    dbClient("register")
      .insert({ Name, Phone, Address, Email,Password })
      .then(() =>
        res.json({ status: true, message: "User created successfully." })
      )
      .catch(err => res.json({ status: false, message: err.message }));
  };

//For Getting User
  async function getUsers(request, response) {
    const data = await dbClient.table('register').select()
    response.json(data)
     
  }

// For Getting user by email
  async function getUserByEmail(request, response){
    const email = request.params.email;
    const data = await dbClient("register").select().where({email});
    response.json(data[0]);
  }

// For Updating User

async function updateUser(req, res) {
  try {
    const Name = req.body.Name;
    const Phone = req.body.Phone;
    const Address = req.body.Address;
    const Password = req.body.Password;

      const data = await dbClient.table('register').where({ email: req.params.email }).update({ Name, Phone, Address, Password });

      res.json({
          status: 'success',
          success: true,
          message: 'update success'
      })
  } catch (error) {
      console.log(error)
      res.json({
          success: false,
          status: 'fail',
          message: 'failed to update'
      })
  }
}


//For Deleting User

async function deleteUser(req,res){
  try{
    const data = await dbClient.table('register').where({email: req.params.email}).delete();
 
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
})
}
}


// For Login
const loginUser =(req,res)=>
{
  const Email = req.body.Email;
  const Password = req.body.Password;


  console.log(Email, Password);
  

  dbClient("register")
  .select()
  .where({email:Email,password:Password})
  .then(function(data) {

    console.log(data.length);
    

      if(data.length == 0)
      {
        res.json({success:false})
      }
      else
      {
        res.json({success:true})
      }
  })
  .catch(err => res.json({success:false,message: err.message}));
  
};

// For adding book

async function addSweets(req, res) {
  try {
      const title = req.body.title;
      const price = req.body.price;
      const image = req.body.image;
      const description = req.body.description;

      const data = await dbClient.table("sweets_add").insert({ title, price, image, description})
      res.json({
          status: true,
          success: true,
          message: "Book added successfully."
      })
  } catch (error) {
      res.json({
          status: false,
          success: false,
          message: error.message
      });
  }
};

// For getting book

const getAllSweets = (req, res) => {
  dbClient("sweets_add")
    .select()
    .then(data => res.json( data ))
    .catch(err => res.json({ status: false, message: err.message }));
};

//For Image Upload
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});


const upload = multer({ storage }).single("image");

const uploadImage = (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({ status: false, message: err.message });
    } else {
      res.json({ status: true, message: req.file.filename });
    }
  });
};


module.exports = {
registerUser,
getUsers,
getUserByEmail,
updateUser,
deleteUser,
loginUser,
addSweets,
getAllSweets,
uploadImage    
    
};
