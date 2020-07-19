function getTsValue(Tse){
    showGroundType(Tse);
    const btn = document.getElementById('confirm_location')
    btn.addEventListener('click', function(e){
    var site_location = document.getElementById('site-location');
    var site = site_location.options[site_location.selectedIndex].value;
        if(site === 'Malaysia'){
            var s = document.getElementById('S').style.display = 'inline'; ; 
            var tb = document.getElementById('tb').style.display = 'inline'; ;
            var tc = document.getElementById('tc').style.display = 'inline';
            var td = document.getElementById('TDp').style.display = 'inline';
        }
        else if(site === 'Sarawak'){
            var s = document.getElementById('S').style.display ='inline';
            var tb = document.getElementById('tb').style.display = 'inline';
            var tc = document.getElementById('tc').style.display = 'inline';
            var td = document.getElementById('TDs').style.display = 'inline';
        }
        else if(site === 'Sabah'){
            var s = document.getElementById('S').style.display ='inline';
            var tb = document.getElementById('tb').style.display = 'inline';
            var tc = document.getElementById('tc').style.display = 'inline';
            var td = document.getElementById('TDsb').style.display = 'inline';
        }
        else{
            console.log("Do Nothing");
        }
    });
}

function showGroundType(Tse){
    var ground_type = document.getElementById('ground-type');
    if(Tse < 0.15){
        var input = document.createElement('input');
        input.type = "text";
        input.disabled = "disabled";
        input.value = `Ground Type A`;  
        ground_type.appendChild(input);
    }
    else if( 0.15 < Tse < 0.5){
        var input = document.createElement('input');
        input.type = "text";
        input.disabled = "disabled";
        input.value = `Ground Type B`;  
        ground_type.appendChild(input);
    }
    else if(0.5 < Tse < 0.7){
        var input = document.createElement('input');
        input.type = "text";
        input.disabled = "disabled";
        input.value = `Ground Type C`;  
        ground_type.appendChild(input);
    }
    else if(0.7 < Tse < 1.0){
        var input = document.createElement('input');
        input.type = "text";
        input.disabled = "disabled";
        input.value = `Ground Type D`;  
        ground_type.appendChild(input);
    }
    else {
        var input = document.createElement('input');
        input.type = "text";
        input.disabled = "disabled";
        input.value = `Ground Type E`;  
        ground_type.appendChild(input);
    }
}


const btn_ok = document.getElementById('confirm_selectbox');
btn_ok.addEventListener('click', function(e){
    var s = document.getElementById('S');
    var s_val = s.options[s.selectedIndex].value;
    var tb = document.getElementById('tb').value;
    var tb_val = Number(tb);
    var tc = document.getElementById('tc');
    var tc_val = Number(tc.options[tc.selectedIndex].value);
    var n = (tc_val - tb_val)/9;
    var site = document.getElementById('site-location');
    var site_opt = site.options[site.selectedIndex].value;
    if(site_opt === 'Malaysia'){
        var td = document.getElementById('TDp');
        var td_val = Number(td.options[td.selectedIndex].value);
    }
    else if(site_opt === 'Sarawak'){
        var td = document.getElementById('TDs');
        var td_val = Number(td.options[td.selectedIndex].value);
    }
    else if(site_opt === 'Sabah'){
        var td = document.getElementById('TDsb');
        var td_val = Number(td.options[td.selectedIndex].value);
    }
    else {
        console.log("Do nothing");
    }
    var y = (td_val-tc_val)/10;
    var z = (4-td_val)/11;
    var imp_class = document.getElementById('importance-class');
    var imp_class_val = imp_class.options[imp_class.selectedIndex].value;
    var i = document.getElementById('i');
    var i_val = i.options[i.selectedIndex].value;
    const btn_rsa_min = document.getElementById('rsamin');
    btn_rsa_min.addEventListener('click', function(e){
        var pgrock = document.getElementById('pgrock').value;
        var rsa = calculateRSAMin(i_val, pgrock);
        var rsa_output = document.getElementById('rsa');
        var input1 = document.createElement('input');
        input1.type = 'number';
        input1.disabled ='disabled';
        input1.value = `${rsa}`;
        var label1 = document.getElementById('label').style.display ='inline';
        rsa_output.appendChild(input1);  
        var arrT1 = [0, 0.001, tb_val];
        var arrT2 = [1*n + tb_val, 2*n + tb_val, 3*n + tb_val, 4*n + tb_val, 5*n + tb_val, 6*n + tb_val, 7*n + tb_val, 8*n + tb_val];
        arrT2 = arrT2.map(a => a.toFixed(3));
        var arrT3 = [1*y + tc_val,2*y+tc_val,3*y+tc_val,4*y+tc_val,5*y+tc_val,6*y+tc_val,7*y+tc_val,8*y+tc_val,9*y+tc_val,td_val ]
        arrT3 = arrT3.map(a => a.toFixed(3));
        var arrT4 = [1*z+td_val ,2*z+td_val ,3*z+td_val ,4*z+td_val ,5*z+td_val ,6*z+td_val ,7*z+td_val ,8*z+td_val ,9*z+td_val ,10*z+td_val,4];
        arrT4 = arrT4.map(a => a.toFixed(3)); 
        var arrT =[];
        arrT = arrT.concat(arrT1, arrT2, tc_val, arrT3, arrT4);
       
        arrRSAFinal = getRSAValues(arrT1, arrT2, arrT3, arrT4, pgrock, s_val, i_val, tb_val, tc_val, td_val);
        

        arrRSAwithoutB = getRSAValueWithoutB(arrT1, arrT2, arrT3, arrT4, pgrock, s_val, i_val, tb_val, tc_val, td_val);
       

        arrRSDFinal = calculateRSD(arrRSAwithoutB, arrT);

        drawTable(arrT,arrRSAFinal,arrRSAwithoutB, arrRSDFinal);

        plotTable(arrT, arrRSAFinal, arrRSAwithoutB, arrRSDFinal);

        storeTableToLocalStorage(arrT,arrRSAFinal,arrRSAwithoutB,  arrRSDFinal);

    }, {once: true});
});

    
const btn_clear = document.getElementById('clear').addEventListener('click', function(e){

    var output = document.getElementById('final_table');

    while(output.firstChild){
        output.removeChild(output.firstChild);
    }
    

    localStorage.clear();
    e.preventDefault();
})
