console.log("----start-----");

console.log( __dirname );

function sum(a,b){
    return a + b;
}
function max(a,b){
    return Math.max(a ,b);
}

module.exports = {
    summary : sum,
    maximum : max
};
