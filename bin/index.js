#!/usr/bin/env node

// console.log( "First CLI app" );
const yargs = require("yargs");
const axios = require("axios");

const options = yargs
.usage("Usage: -n <name>")
.option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
.option("s", {alias: "search", describe: "Your search", type: "string"})
.argv;


const greeting = `Hello, ${options.name}!`;

console.log(greeting);
// searchOption = String(options.search)


// Message to display depending on option
if (options.search){
    console.log(`Retrieving author ${options.search}'s quotes`)
}else{
    console.log("Here's today's random quote for you:");
}

// The url will depend on whether the option is search or not
const url = options.search ? `https://api.quotable.io/authors/?id=${escape(options.search)}` :"https://api.quotable.io/random?tags=technology,famous-quotes" 

const getRequest = async () =>{
    try{
        const res = await axios.get(url, { headers: { Accept: "application/json" } })
            
        if (options.search){
            // console.log(res.data.results.name)
            console.log("Name of author: " + res.data.name);
            [res.data.quotes].forEach(quote => {
                console.log(quote.content)            
            });
            if (!res.data.id){
                console.log("Author with that id does not exist. Try again!")
            }
            
        }else{
            console.log(res.data.content)
        } 
        }catch(err){
        console.log(err)
    }
}
getRequest();
