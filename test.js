let nap = 'responseBodyDupa';
let output = '';



for (let i = 0; i < nap.length; i++) {
    if(nap.charAt(i).toUpperCase() === nap.charAt(i)){
        output += ' ' + nap.charAt(i).toLowerCase();
    }else{
        output += nap.charAt(i)
    }
}

output = output.charAt(0).toUpperCase() + output.slice(1);

console.log(output);