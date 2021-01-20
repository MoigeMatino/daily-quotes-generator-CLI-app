#!/usr/bin/env node

// console.log( "First CLI app" );
const yargs = require("yargs");
const axios = require("axios");

const options = yargs
.usage("Usage: -n <name>")
.option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
.argv;


const greeting = `Hello, ${options.name}!`;

console.log(greeting);

console.log("Here's today's quote for you:");

const url = "https://www.stands4.com/services/v2/quotes.php";


axios.get(url, { headers: { Accept: "application/json" } })
.then(res => {
    console.log(res.results.result);
});