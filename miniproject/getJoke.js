import https from 'https';
import chalk from 'chalk';
import { error } from 'console';


const getJoke = ()=>{
    const url = 'https://official-joke-api.appspot.com/random_joke';

    https.get(url,(response)=>{
            let data ="";
            response.on('data',(chunk)=>{
                data+= chunk;
            });
            response.on('end',()=>{
                const joke = JSON.parse(data);

                console.log(`Here the Random ${joke.type} joke`);
                console.log(chalk.red(`${joke.setup}`));
                console.log(chalk.blue.bgRed.bold(`${joke.punchline}`));
                
            });
            response.on('error',(error)=>{
                console.error(error.message);
            });
    })
}
getJoke();