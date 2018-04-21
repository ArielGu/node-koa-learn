let url=require('url');

module.exports={
    get query(){
        console.log(this);
        return url.parse(this.req.url,true).query;
    }
}