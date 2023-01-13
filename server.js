const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/signUp.html')
})
app.post('/',(req,res)=>{
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;

    const data = {
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/abd99755b0"

    const options = {
        method:"POST",
        auth:"rahul:79de50dab04f9eaf50290827ab15f0d-us6"
    }
    const request = https.request(url,options,function(response){
        
        if(response.statusCode === 200){res.sendFile(__dirname + '/success.html');}
        else{
            res.sendFile(__dirname + '/failure.html')
        }
            
        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();



})

app.post('/failure',(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is listening at port 3000.")
})

// mailChimpApiKey;
// e79de50dab04f9eaf50290827ab15f0d-us6

// Audience Id 
// abd99755b0