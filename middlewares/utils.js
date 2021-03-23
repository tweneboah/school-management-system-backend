
export const stringtoLowerCaseSpace = (string) => {
    if(string){
        return  string.toLowerCase().replace(/\s/g, '')
    }
    else return 0;
  
}  


export const stringtoLowerCase = (string) => {
    if(string){
        return  string.toLowerCase()
    }
    else return 0;
    
}

export const stringSpace = (string) => {
    if(string){
        return  string.replace(/\s/g, '')
    }
    else return 0
   
}