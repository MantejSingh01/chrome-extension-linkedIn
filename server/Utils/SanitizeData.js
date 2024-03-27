function SanitizeData(result){
    const pattern = /\n\s*?(\n\s*?)+/g;
    const sanitizedData = {};
    for (const key in result) {
        if (result.hasOwnProperty(key)) {
            sanitizedData[key] = result[key].replace(pattern, '').trim();
            if(key == 'Website'){
             
               sanitizedData[key] =  sanitizedData[key].split(" ")[0]
            }
        }
    }
return sanitizedData;
}


module.exports = SanitizeData;