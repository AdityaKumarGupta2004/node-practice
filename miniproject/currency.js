import https from "https";
import readline from "readline";
import chalk from "chalk";
import { json } from "stream/consumers";

const rl = readline.Interface({
    input : process.stdin,
   output : process.stdout,
}
);
// Your API Key: 0dca425f7190f8b2f6980834
// Example Request: https://v6.exchangerate-api.com/v6/0dca425f7190f8b2f6980834/latest/USD

const apiKey = '0dca425f7190f8b2f6980834';

const url =  `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const convertCurr=(amount,rate)=>{
    return(amount*rate).toFixed(2);

}
https.get(url,(res)=>{
    let data="";
    res.on('data',(chunk)=>{
        data+= chunk;

    })
    res.on('end',()=>{
       const rates = JSON.parse(data).conversion_rates;
     rl.question("Enter the amount in USD: ",(amount)=>{
        rl.question("Enter the target currency (e.g., INR,EUR,NPR: ",(currency)=>{
            const rate = rates[currency.toUpperCase()];
            if(rate){
                console.log(`${amount} USD is approximately ${convertCurr(amount,rate)} ${currency}`);
            }else{
                console.log(`Invalid currency`);
            }
        })
     })
    })
})