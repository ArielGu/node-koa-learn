module.exports={
    get body(){
        return this._body;
    },
    set body(data){
        this._body=data;
    },
    get status(){
        this.res.status;
    },
    set status(statusCode){
        if(typeof statusCode !=='number'){
            throw new Error('statusCode must be a number!');
        }
        this.res.statusCode=statusCode;
    }
}