const express=require('express')
const hbs=require('hbs')
const path=require('path')
require('./db/conn')
const register=require('./models/contact')


const port=process.env.PORT || 3000
const app=express();
const staticPath=path.join(__dirname,'../public')//defining static path
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.json());//for getting data on postman only otherwise it only show undefined
app.use(express.urlencoded({extended:false}));//to get data and not undefined data


app.use(express.static(staticPath))//using expres


hbs.registerPartials(partialPath)
app.set('view engine','hbs')
app.set('views', viewsPath); // Set the correct path for the views directory
app.get('/home',(req,res)=>{
    res.render("home")
  })

app.get('/about',(req,res)=>{
    res.render("about")
  })
  app.get('/course',(req,res)=>{
    res.render("courses")
  })
  app.get('/contact',(req,res)=>{
    res.render("contact")
  })
  app.get('/notes',(req,res)=>{
    res.render("cseNotes")
  })
  app.get('/csbs',(req,res)=>{
    res.render("csbs")
  })
  app.get('/aiml',(req,res)=>{
    res.render("aiml")
  })
  app.get('/prev',(req,res)=>{
    res.render("previous")
  })
  app.get('/csit',(req,res)=>{
    res.render("csit")
  })
  app.get('/lab',(req,res)=>{
    res.render("labmanual")
  })
  app.get('/login',(req,res)=>{
    res.render("login")
  })
  app.post('/login',async(req,res)=>{
    try {
      const email=req.body.email;
      const password=req.body.regPassword;
      const useremail=await register.findOne({email:email})
      if (useremail.password===password) {
        res.status(201).render('home')
        
      } else {
        res.send("invalid password")
        
      }

      
    } catch (error) {
      res.status(400).send("invalid login details")
      
    }


  
  })

  app.get('/',(req,res)=>{
    res.render("index")
  })

  app.post('/index',async(req,res)=>{
    try{


      const password=req.body.regPassword;
      const Conpassword=req.body.ConformPassword;
      // let wrong=  alert("password are note matched")

      if(password===Conpassword){
        const studentRegisterCse= register({
         
          
            username: req.body.regUsername,
      password: req.body.regPassword, 
      passwordConform: req.body.ConformPassword,
      phone: req.body.phone,
      email: req.body.email,
      branch: req.body.branch


          

        })
        const savedRegistration = await studentRegisterCse.save();
        res.status(201).render('home')


      }
     
      else{
        res.send("Password are Not Matched")
      }

     
      
      

    }
    catch(e){
      console.log(e)

    }
  })
  app.get('/*',(req,res)=>{
    res.render("error")
  })
app.listen(port,()=>{
    console.log(`the app is listen on ${port}`)
})