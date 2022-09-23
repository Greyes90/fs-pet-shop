import fs from "fs"
import path from "path"
import http from "http"
import express, { response } from "express"
const PORT = 3001;
const app = express()

app.get('/', function (req, res){
            res.send('request successful')
})
app.get('/pets', function (req, res){
    console.log("data retrieved");
    
    fs.readFile('./pets.json', "utf-8", function(error, petData){
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        } else {
            let petArray = JSON.parse(petData);
            res.type('json');
            res.end(petData);
            
            
        }
    })
})



app.get('/pets/*', function (req, res){
    let petUrl = req.url.split('/');
    let index = petUrl[2]
   
    fs.readFile('./pets.json', "utf-8", function(error, petData){
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        } else {
            let petArray = JSON.parse(petData);
            
            
            // res.end(petData);
            
            if (index < petArray.length && index >= 0) {
                res.type('json');
                res.end(JSON.stringify(petArray[index]))
            } else {
                res.status(404)
                console.log("excedded index param");
                res.end("pet not found")
            }
        
       }
    })
})

app.listen(PORT, function(){
    console.log("listening on", PORT);
})



// let port = process.env.PORT || 8000;
// let server = http.createServer((req, res) => {
//     let petUrl = req.url.split('/');
//     if (req.method === "GET") {
//         if (req.url === "/pets") {
//             fs.readFile('pets.json', 'utf-8', (error, data) => {
//                 if (error) {
//                     console.log('Unable to read file', error)
//                     res.statusCode = 500
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Internal Server Error")
//                     process.exit(1)
//                 }
//                 res.setHeader("Content-Type", "application/json")
//                 res.end(data)
//             })
//         } else if (petUrl.length > 2) {
//             fs.readFile('pets.json', 'utf-8', (error, data) => {
//                 if (error) {
//                     console.log('Unable to read file', error)
//                     res.statusCode = 500
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Internal Server Error")
//                     process.exit(1)
//                 }
//                 let pet = Number(petUrl[2])
//                 let dataArray = JSON.parse(data)
//                 if (pet < dataArray.length && pet >= 0) {
//                     res.setHeader("Content-Type", "application/json") //or application/json??
//                     data = JSON.stringify(dataArray[pet])
//                     res.end(data)
//                 } else {
//                     res.statusCode = 404
//                     res.setHeader("Content-Type", "text/plain")
//                     res.end("Content not found")
//                 }
//             })
//         } else {
//             res.statusCode = 404
//             res.setHeader("Content-Type", "text/plain")
//             res.end("Content not found")
//         }
//     } else {
//         res.statusCode = 404
//         res.setHeader("Content-Type", "text/plain")
//         res.end("Content not found")
//     }
// })
// server.listen(port, () => console.log("Listening on port", port));











