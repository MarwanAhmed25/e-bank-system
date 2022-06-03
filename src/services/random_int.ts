
function get_random_number(id:number){
    if(id<0)
        id *=-1;
    
    const n= (Math.floor(Math.random() * (999999 - 11111 + 1) + 11111));
    console.log(n);
    
    return String(n)+id;
}

export default get_random_number;