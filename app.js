
const soil_layers = document.getElementById('soil-layers').addEventListener('click',function(e){
    const layers = document.getElementById('borehole').value;
    const tbl = document.getElementById('Depth-SPTN');
    if(layers === ''){
        alert("Please Enter the integer Value");
    }
    else{
        for(var i=0; i < layers; i++){
            var tr = document.createElement('tr');
            tr.className = "data";
            for(var j=0 ; j<=1 ; j++){
                var td = document.createElement('td');
                var input1 = document.createElement('input');
                input1.type = "number";
                input1.className = "column-data";
                input1.size = '1';
    
                td.appendChild(input1);
    
                tr.appendChild(td);  
            }  
        tbl.appendChild(tr);  
    }

    e.preventDefault();
    }
}, {once:true});

const btn = document.getElementById('ok').addEventListener('click',function(e){
    var myTable = document.getElementById('myTable');
    var rowLength = myTable.rows.length;
    var arrValue = [];
    for(var i=0; i<rowLength; i++){
        var inputs = myTable.rows.item(i).getElementsByTagName("input");
        var inLen = inputs.length;  
        for(var j=0;j<inLen;j++){
            var inputVal = inputs[j].value;    
            arrValue.push(inputVal); 
        }

    }

    getSptnValue(arrValue);

    e.preventDefault();
}, {once: true});

function getSptnValue(arrValue){
       var depthArray = [];
        var newArr = [];
        for(var x = 0; x < arrValue.length; x++){
            if(x%2 === 0){
                depthArray.push(arrValue[x]); 
            }
            else{
                newArr.push(arrValue[x]);
            }
        }  
    compareValue(newArr);
       var sh = getVelocity();
    // const btn_Swv = document.getElementById('average-shear-velocity').addEventListener('click', function(){
        depth_total = getDepthTotal(depthArray);
        swv = getShearAverageVelocity(sh, depthArray);
        var average_shear_velocity = document.querySelector('.average-shear-velocity');
        var aswv = document.createElement('input');
        aswv.type= "number";
        aswv.disabled = "disabled";
        aswv.value = `${swv}`;
        average_shear_velocity.appendChild(aswv);
   
    // const btn_two = document.getElementById('average-velocity').addEventListener('click', function(){
        Tse = getNaturalTimePeriod(sh, depthArray);
        var output = document.querySelector('.output');
        var averageval = document.createElement('input');
        averageval.type="number";
        averageval.disabled = "disabled";
        averageval.id = "time-period";
        averageval.value = `${Tse}`;
        output.appendChild(averageval);
        getTsValue(Tse);

    // }, {once:true});    
};

function compareValue(newArr){
    for(var i=0; i<newArr.length; i++){
        if(newArr[i] <= 50){
            var N = newArr[i];
            var shearval = getShearVelocity(N, 30 ,0.215,0.275);
            var list = document.getElementById('set-value');
            var row = document.createElement('tr');
            row.innerHTML = `<td>${N}</td>
                             <td>${shearval}</td>`;
            
            list.appendChild(row);                  
        }
        
        else{
            var N = 50/newArr[i] * 300;
            var shearval = getShearVelocity(N, 30 ,0.215,0.275);
            var list = document.getElementById('set-value');
            var row = document.createElement('tr');
            row.innerHTML = `<td>${N}</td>
                            <td>${shearval}</td>`;

            list.appendChild(row);

        }
    }
}


function getShearVelocity(N, a, b, c){
    var veli = a*Math.pow(N,b)*Math.pow(135,c);
    var Vi = veli.toFixed(2);
    return Vi;
}


function getDepthTotal(depthArray){
    var depth_total = 0; 
    for(var i =0; i<(depthArray.length-1); i++){
        depth_total += Number(depthArray[i]);
    }
    return depth_total;
}

function getShearAverageVelocity(sh, depthArray){
    var total = 0;
    var result = 0;
    for(var i =0; i<(depthArray.length-1); i++){
        total += Number(depthArray[i]);
    }
    var C = [];
    if(depthArray[0] === '0' && sh[0] === '0.00'){
        depthArray.shift();
        sh.shift();
        for (var i = 0; i < depthArray.length; i++) {
            C.push(depthArray[i] / sh[i]);
        }
        for(var c=0; c<(C.length-1); c++){
            result += C[c];    
        }
    }
    else{
        for (var i = 0; i < depthArray.length; i++) {
            C.push(depthArray[i] / sh[i]);
        }
        for(var c=0; c<(C.length-1); c++){
            result += C[c];
        }
    }
    var aswv = total/result;
    var swv = aswv.toFixed(2);
    return swv;   
}

function getNaturalTimePeriod(sh, depthArray){
    var result1 = 0;
    var D = [];
    if(depthArray[0] === '0' && sh[0] === '0'){
        depthArray.shift();
        sh.shift();
        for (var i = 1; i < depthArray.length; i++) {
            D.push(depthArray[i] / sh[i]);
        }
        for(var d=0; d<(D.length-1); d++){
            result1 += D[d];
        }
    }
    else{
        for (var i = 0; i < depthArray.length; i++) {
            D.push(depthArray[i] / sh[i]);
        }
        for(var d=0; d<(D.length-1); d++){
            result1 += D[d];
        }
    }
    var Tsec = 4*result1;
    var Tse = Tsec.toFixed(3);
    return Tse;
    
}



function getVelocity(){
    var table = document.getElementById("Adjusted-sptn-values");
    rowLen = table.rows.length;
    var val = [];
    for(var r=1, n=table.rows.length; r<n; r++){
        var cellValue = table.rows.item(r).cells;
        for(var c=0; c < cellValue.length ; c++){
            val.push(cellValue.item(c).innerHTML);
        }
    }
    shearVelArray = [];
    for(var i=0; i<val.length; i++){
        if(i%2 != 0){
            shearVelArray.push(val[i]);
        }
    }
    return shearVelArray;

}
