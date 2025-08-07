/**for(var i=1; i<=50;i++){
    if(i % 3 === 0 && i % 5 === 0){
        console.log("FizzBuzz");
    }
}

for (var i=1;i<=50;i++){
    if(i%2!==0){
      continue
    }
 console.log(i);
}**/

//nested loop
for(var i=0; i<10;i++){
    for(var j=0;j<10;j++){
        if(j%2 !== 0){
            continue;
        }
        console.log(j)
    }
    
    
}
// break statement
for(var i=0; i<10;i++){
    if(i ===5){
        break;

    }
    console.log("heyyy "+ i )
}