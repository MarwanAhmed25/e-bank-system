function isValdate(v:string){
    //capital 
    let cap = false;
    for(let i=0; i< v.length; i++){
      if(v[i].toUpperCase() === v[i] && v[i].toLowerCase() !== v[i].toUpperCase()){                
        cap = true;
      }
    }
    // sign
    let sign = false;
    for(let i=0; i< v.length; i++){
      if(v[i] == '-' || v[i] == '*' || v[i] == '+' || v[i] == '@' || v[i] == '$' || v[i] == '&')
        sign = true;
    }
    
    const len = v.length >= 8 ? true: false;

     if(!cap || !sign || !len)
        return false;

    return true;
}

export default isValdate;