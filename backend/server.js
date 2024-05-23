const app =require('./app');

const port = 3001;
const host = '127.0.0.1';

const server = app.listen(port,host,()=>{
    console.log(
        `Node server running on \nAddress: ${server.address().address} \nPort: ${server.address().port}`);
})