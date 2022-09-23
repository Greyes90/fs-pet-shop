import fs from "fs"
import { argv } from "node:process";
let crud = '';
if (process.argv.length > 2) {

     crud = process.argv[2].toLowerCase();
} else {
    console.log("no command");
    proccess.exit(1);
}
let original = [];
//fs library reads the pets.json file, the function allows to prompt and error message or 
//give us the ability to input a read index and select that speific array
fs.readFile("pets.json", "utf-8", function (error, data) {
    if (error) {
        console.log(error)
        process.exit(0);
    }
    data = (JSON.parse(data))
    original = [...data]
    // console.log(original);
    // console.log(process.argv);
    if (crud == "read") {
        read(process.argv[3], data);

    } else if (crud == "create") {
        create(original, process.argv)


    } else if (crud == "update") {
        update(data, process.argv)
    }

   
})
//create allows to create a new array with the 3 specific keys 
function create(data, args) {
    if (args.length < 6){
        console.log('all 3 arguments required!');
        process.exit(1);
    } 
    let obj = {
        age: Number(args[3]),
        kind: args[4],
        name: args[5]
    }
    //the new data is pushed to the terminal then converted to a string 
    data.push(obj)
    let newData = JSON.stringify(data);
    fs.writeFile('./pets.json', newData, function (error) {
        if (error) {
            console.log(error)
            process.exit(0);
        }
        console.log('it worked');
    })
}
//allows us to prompt the read command which outputs one of the objects from pets.json 
//based on the specific index indicated
function read(command, data) {
    if (command) {
    if (command < data.length) {
        console.log(data[command]);
    } else {
        console.log("index out of bounds")
        process.exit(1);
    }
    } else {
        console.log(data);
    }
}

// Allows us to update the information in the appropiate indexes
function update(data, newInfo) {
    let index = Number(newInfo[3]);
    let age = NumbernewInfo[4];
    let kind = newInfo[5];
    let name = newInfo[6];
    console.log('information changed');
data[index].age = age;
data[index].kind = kind;
data[index].name = name;
let newData = JSON.stringify(data);
fs.writeFile('./pets.json', newData, function (error) {
    console.log('writing to file');
    if (error) {
        console.log(error)
        process.exit(0);
    }
    console.log('it worked');
})
}


