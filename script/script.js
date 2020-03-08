var EWord = [];
var ECode = 0;
var DefineState = {'task':'','value':''};
function NavaBoardDo(LocalDefineState) {
    TASKS.text(': '+DefineState.task+' '+DefineState.value)
         .attr('fill','darkblue');
    switch (LocalDefineState.task) {
        case 'color':
            d3.select('#navaboard-rect').style('fill',LocalDefineState.value);        
            break;
        case 'nava':
            play(360,0.1);
            break;
        case 'play':
            play(LocalDefineState.value,0.1);
        break;
        default:
            TASKS.text(': '+DefineState.task+' '+DefineState.value+'!')
                 .attr('fill','red')
            break;
    }
}
document.body.onkeydown = function(e){
    ECode=e.keyCode;
    if (!(ECode==13)&!(ECode==32)) {
        EWord.push(e.key);
    }
    else {
            let InteredTaskOrValue = 'task';
            if (ECode==13) {InteredTaskOrValue='value'};
            DefineState[InteredTaskOrValue]='';
            for (let index = 0; index < EWord.length; index++) {
                DefineState[InteredTaskOrValue] = DefineState[InteredTaskOrValue]+EWord[index];            
            }
            EWord = [];
            if (ECode==13) {NavaBoardDo(DefineState)};
        }    
};
Start_Nava = false;
Coord =[];
Nava_Note = [];
const MAIN_DIV = d3.select('#main-div');
const MAIN_SVG = MAIN_DIV.append('svg')
                            .attr('id','main-svg')
                            .attr('class','main-svg-class');                  
const NAVABOARD_BASE = MAIN_SVG.append('g')
                                    .attr('id','navaboard-base-g')
const NAVABOARD_BASE_board = NAVABOARD_BASE.append('rect')
                                    .attr('id','navaboard-base-rect')
                                    .attr('fill','gray')
const NAVAINFO = NAVABOARD_BASE.append('text')
                                    .attr('id','NavaInfo')
                                    .attr('visibility','hidden')
                                    .attr('x',40)
                                    .attr('y',40)
                                    .attr('opacity',.4)
                                    .text('+ 0000:0.00')
                                    .attr('fill','gray')
const TASKS = NAVABOARD_BASE.append('text')
                                    .attr('id','NavaInfoTask')
                                    .attr('visibility','hidden')
                                    .attr('x',40)
                                    .attr('y',140)
                                    .text(': ')
                                    .attr('visibility','hidden')
                                    .attr('fill','darkblue')
const NAVABOARD_SURFACE = MAIN_SVG.append('g')
                                    .attr('id','navaboard-surface-g');
function FindClosest(__aFreq,__anArray) {
    let closest = __aFreq;
    if (!(aPossibleGrid[0]==-1)){
        if (__anArray.length > 0) {
            closest = __anArray.reduce((a, b) => {
                return Math.abs(b - __aFreq) < Math.abs(a - __aFreq) ? b : a;
            });
        }
    }
    if (!(__anArray.indexOf(closest)==0)) {
        let The_closest_path = d3.select('#path'+__anArray.indexOf(closest))
        .attr("stroke", 'rgb('+128+','+128+','+128+')')
        .transition()
        .attr("stroke", 'rgb('+240+','+128+','+15+')')
        .duration(120)
        .transition()
        .attr("stroke", 'rgb('+128+','+128+','+128+')')
        .duration(6000) 
    }  
    else 
    {
        closest = 0;
    }
    closest=closest/(2**gane8Counter)

    // console.log(closest,__anArray.indexOf(closest))                
    return closest
}
var TSNaghmeFal = [];
var TSnewNavaT = [];    
var cnt = 0;
var NoteToPlayT = [];
var touch_mouse = 0;
const NAVABOARD = NAVABOARD_SURFACE.append('rect')
                            .attr('id','navaboard-rect')
                            .attr('opacity',0)
                            .on('touchstart',function(){
                                touch_mouse = 'touch'
                                Start_Nava = true;
                                event.preventDefault();
                                Coord = [event.touches[0].clientX,event.touches[0].clientY];
                                for (let index = 0; index < event.changedTouches.length; index++) {
                                    Coord = [event.changedTouches[index].clientX,event.changedTouches[index].clientY];
                                    playMT(event.changedTouches[index].identifier,FindClosest(Coord[0]*1,aPossibleGrid), (0.001*(parseInt(Coord[1]/event.touches.length)).toFixed(2)));
                                    let circle_ID_toremove = 'circle'+Coord[0]+'-'+Coord[1]+parseInt(1000*Math.random()); 
                                    let idncril = event.changedTouches[index].identifier;
                                    NAVABOARD_BASE.append('circle')
                                                    .attr('id',circle_ID_toremove)
                                                    .attr('cx',Coord[0])
                                                    .attr('cy',Coord[1])
                                                    .attr('fill','rgb('+73+','+80+','+100+')')
                                                    .attr('r',0)
                                                    .transition()
                                                    .attr('fill','rgb('+(idncril*25)+','+80+','+100+')')
                                                    .attr('r',10)
                                                    .duration(400)
                                                    .attr('opacity',1)
                                                    .transition()
                                                    .attr('fill','rgb('+73+','+80+','+100+')')
                                                    .attr('r',0)
                                                    .attr('opacity',.04)
                                                    .duration(3000)
                                    NAVABOARD_BASE.select("#"+circle_ID_toremove).transition().delay(4000).remove();
                                    let NavaInfoText = 'touches';
                                    for (let index = 0; index < event.touches.length; index++) {
                                        NavaInfoText += ' +'+(('0'+FindClosest((parseInt(event.touches[index].clientX))*1,aPossibleGrid)).substring(('0'+(parseInt(event.touches[index].clientX))).length -4)+':'+(0.001*(parseInt(event.touches[index].clientY))).toFixed(2));
                                    }                                      
                                    document.getElementById('span-touch').innerHTML = NavaInfoText;
                                    Nava_Note.push(Coord);
                                }
                            })
                            .on('touchend',function(){
                                Start_Nava = true;
                                let _aTouchExist = 1;
                                if (event.changedTouches.length==0) {
                                    _aTouchExist = 0;
                                }
                                for (let index = 0; index < event.changedTouches.length; index++) {
                                    playMT(event.changedTouches[index].identifier,_aTouchExist*FindClosest(0,aPossibleGrid),0);
                                }
                                let NavaInfoText = 'touches';
                                for (let index = 0; index < event.touches.length; index++) {
                                    NavaInfoText += ' +'+(('0'+FindClosest((parseInt(event.touches[index].clientX))*1,aPossibleGrid)).substring(('0'+(parseInt(event.touches[index].clientX))).length -4)+':'+(0.001*(parseInt(event.touches[index].clientY))).toFixed(2));
                                }                                      
                                document.getElementById('span-touch').innerHTML = NavaInfoText;
                                if (event.touches.length==0) {
                                    document.getElementById('span-touch').innerHTML = "";
                                }
                            })
                            .on('touchmove',function(){
                                touch_mouse = 'touch'
                                Start_Nava = true;
                                event.preventDefault();
                                Coord = [event.touches[0].clientX,event.touches[0].clientY];
                                for (let index = 0; index < event.changedTouches.length; index++) {
                                    Coord = [event.changedTouches[index].clientX,event.changedTouches[index].clientY];
                                    playMT(event.changedTouches[index].identifier,FindClosest(Coord[0]*1,aPossibleGrid), (0.001*(parseInt(Coord[1]/event.touches.length))).toFixed(2));
                                    let circle_ID_toremove = 'circle'+Coord[0]+'-'+Coord[1]+parseInt(1000*Math.random());   
                                    let idncril = event.changedTouches[index].identifier;
                                    NAVABOARD_BASE.append('circle')
                                    .attr('id',circle_ID_toremove)
                                                    .attr('cx',Coord[0])
                                                    .attr('cy',Coord[1])
                                                    .attr('fill','rgb('+73+','+80+','+100+')')
                                                    .attr('r',0)
                                                    .transition()
                                                    .attr('fill','rgb('+(idncril*25)+','+80+','+100+')')
                                                    .attr('r',10)
                                                    .duration(400)
                                                    .attr('opacity',1)
                                                    .transition()
                                                    .attr('fill','rgb('+73+','+80+','+100+')')
                                                    .attr('r',0)
                                                    .attr('opacity',.04)
                                                    .duration(3000)

                                    NAVABOARD_BASE.select("#"+circle_ID_toremove).transition().delay(4000).remove();
                                    let NavaInfoText = '<span class="span-touch">touches';
                                    for (let index = 0; index < event.touches.length; index++) {
                                        NavaInfoText += ' +'+(('0'+FindClosest((parseInt(event.touches[index].clientX))*1,aPossibleGrid)).substring(('0'+(parseInt(event.touches[index].clientX))).length -4)+':'+(0.001*(parseInt(event.touches[index].clientY))).toFixed(2));
                                    }                                      
                                    document.getElementById('span-touch').innerHTML = NavaInfoText;                                    
                                    Nava_Note.push(Coord);
                                }      
                            })
                            .on("mousedown", function() {
                                touch_mouse = 'mouse'
                                Start_Nava = true;
                                Coord = d3.mouse(this);
                                play(FindClosest(Coord[0]*1,aPossibleGrid),(0.001*(parseInt(Coord[1]))))    
                                let CoordClick = d3.mouse(this);
                                let circle_ID_toremove = 'circle'+Coord[0]+'-'+Coord[1]+parseInt(1000*Math.random());   
                                NAVABOARD_BASE.append('circle')
                                                    .attr('id',circle_ID_toremove)
                                                    .attr('cx',Coord[0])
                                                    .attr('cy',Coord[1])
                                                    .attr('fill','rgb('+0*25+','+80+','+100+')')
                                                    .attr('r',0)
                                                    .transition()
                                                    .attr('fill','rgb('+(0*25)+','+80+','+100+')')
                                                    .attr('r',10)
                                                    .duration(400)
                                                    .attr('opacity',1)
                                                    .transition()
                                                    .attr('fill','rgb('+0*25+','+80+','+100+')')
                                                    .attr('r',0)
                                                    .attr('opacity',.04)
                                                    .duration(3000)
                                NAVABOARD_BASE.select("#"+circle_ID_toremove).transition().delay(4000).remove();
                                let NavaInfoText = 'mouse+'+(('0'+(FindClosest(Coord[0]*1,aPossibleGrid))).substring(('0'+(parseInt(Coord[0]))).length -4)+':'+(0.001*(parseInt(Coord[1]))).toFixed(2));
                                document.getElementById('span-mouse').innerHTML = NavaInfoText;
                                //NAVAINFO.text(NavaInfoText);
                                Nava_Note.push(Coord);
                            })
                            .on("mouseup", function() {
                                Start_Nava = false;
                                Coord = d3.mouse(this);
                                document.getElementById('span-mouse').innerHTML = '';
                                //NAVAINFO.text('+ 0000:0.00');  
                                play(FindClosest(0,aPossibleGrid),0)
                            })
                            .on("mousemove", function() {                               
                                if ((Start_Nava==true)&(!(touch_mouse == 'touch'))) {
                                    Coord = d3.mouse(this);
                                    play(FindClosest(Coord[0]*1,aPossibleGrid),(0.001*(parseInt(Coord[1]))))
                                    let circle_ID_toremove = 'circle'+Coord[0]+'-'+Coord[1]+parseInt(1000*Math.random());   
                                    NAVABOARD_BASE.append('circle')
                                                        .attr('id',circle_ID_toremove)
                                                        .attr('cx',Coord[0])
                                                        .attr('cy',Coord[1])
                                                        .attr('fill','rgb('+0*25+','+80+','+100+')')
                                                        .attr('r',0)
                                                        .transition()
                                                        .attr('fill','rgb('+(0*25)+','+80+','+100+')')
                                                        .attr('r',10)
                                                        .duration(400)
                                                        .attr('opacity',1)
                                                        .transition()
                                                        .attr('fill','rgb('+0*25+','+80+','+100+')')
                                                        .attr('r',0)
                                                        .attr('opacity',.04)
                                                        .duration(3000)
                                    NAVABOARD_BASE.select("#"+circle_ID_toremove).transition().delay(4000).remove();
                                    let NavaInfoText = 'mouse+'+(('0'+(FindClosest(Coord[0]*1,aPossibleGrid))).substring(('0'+(parseInt(Coord[0]))).length -4)+':'+(0.001*(parseInt(Coord[1]))).toFixed(2));
                                    document.getElementById('span-mouse').innerHTML = NavaInfoText; 
                                    //NAVAINFO.text(NavaInfoText);
                                    Nava_Note.push(Coord);
                                }
                            });
function twoArrayDiffproperty(_arr1,_arr2,_property) {
    if (_arr1.length>_arr2.length) {
            
        let DiffArr = [];
        for (let index = 0; index < _arr1.length; index++) {
            let ishere = false;
            for (let indexIn = 0; indexIn < _arr2.length; indexIn++) {
                if (_arr1[index][_property]==_arr2[indexIn][_property]) {
                    ishere = true;
                }                                        
            }
            if (ishere==false) {
                DiffArr.push(_arr1[index])
            }                                   
        }
        return DiffArr;
    }
    else {
        return "the first array length should be equal or longer than the second array"
    }
}
function AddOptionInterval(__tag = "nava") {
    let interval_select = document.getElementById("select-input-gahs");
    let option = document.createElement("option");
    option.text += __tag;
    interval_select.add(option);
}
class Nava_Intervals {
    constructor(_interval_name,_interval_array=[-1],_n_equal_temp=-1,_n_just_temp=-1) {
        this.name = _interval_name;
        this.array= this.arraybuilder(_interval_array,_n_equal_temp,_n_just_temp);
        this.Equaltemp = _n_equal_temp;
        //console.log(_interval_name+" "+_n_equal_temp+" "+_n_just_temp)
        this.JustIntonation = _n_just_temp;
        this.string = this.array.join(' ');
    }
    arraybuilder(_interval_array,_n_equal_temp,_n_just_temp) {
        let __result = [];
        if (!(_interval_array[0]==-1)) {
            __result =  _interval_array;  
        }
        else {
            if (!(_n_just_temp==-1)) {
                __result = this.make_just_temperement(_n_just_temp)
            } else {
                __result = this.make_equal_temperement(_n_equal_temp)
            }
        }
        return __result
    }
    make_equal_temperement(__n_) {
        let _result = [32];
        for (let index = 0; index < (8*__n_); index++) {
            let __scale = 8192/((2)**(index/__n_));
            _result[index]=(parseInt(__scale))
        }
        return _result
    }
    makeMetheGird() {
        aPossibleGrid = this.array;
        document.getElementById("input-gahs").value=this.string;
        if (this.string=="") {aPossibleGrid[0]=-1}
    }
    make_just_temperement(__n_) {
        let _just_result = [32];            
        let cnt_just = 0;
        let ArrJu_c = [];
        for (let index = 5; index < 13; index++) {
            let the_hashtgah = 2**(index)
            for (let IndxIn = 1; IndxIn < __n_+1; IndxIn++) {
                for (let indexInn = 1; indexInn < IndxIn; indexInn++) {
                    if (((IndxIn)/indexInn)<=2) {
                        let the_intvalI = parseInt(the_hashtgah*((IndxIn)/indexInn));
                        _just_result[cnt_just] = the_intvalI;
                        ArrJu_c[cnt_just]=indexInn+"/"+IndxIn;
                        cnt_just = cnt_just+1;                    
                    }               
                }              
            }
        }
        let Sjhs = new Set(_just_result);
        _just_result = Array.from(Sjhs);
        _just_result.sort(compareNumbers);
        return _just_result
    }
}


var aPossibleGrid = [-1];
//making equal temperements 0-360
var Equal_temps = [];
for (let index = 4; index < 361; index++) {
    Equal_temps[index] = new Nava_Intervals(index+"-equal-temperement",[-1],index,-1);
}
//end
//Making all just intonation 0-60
var Just_Intonations = [];
for (let index = 4; index < 13; index++) {
    Just_Intonations[index] = new Nava_Intervals(index+"-just-Intonation",[-1],-1,index);
}
function compareNumbers(a, b) {
    return a - b;
}
function compareNumbers(a, b) {
    return a - b;
}
//Making all special intonations
//harmonic series 
var Special_Intonations = [];
var HarmonicSeriesArray = [];
for (let index = 1; index < 256; index++) {
    HarmonicSeriesArray[index-1]=parseInt(8192/index);
}
let Sjhs = new Set(HarmonicSeriesArray);
HarmonicSeriesArray = Array.from(Sjhs);
HarmonicSeriesArray.sort(compareNumbers);

Special_Intonations[0] = new Nava_Intervals("0-sp-HarmonicSeries",HarmonicSeriesArray,-1,-1);

var All_N_Frequencies_array = [];
for (let index = 32; index < 8193; index++) {
    All_N_Frequencies_array[index-32]=index;
}
Special_Intonations[1] = new Nava_Intervals("1-sp-AllNaturalFreq",All_N_Frequencies_array,-1,-1);





AddOptionInterval("0-sp-HarmonicSeries");
AddOptionInterval("1-sp-AllNaturalFreq")

AddOptionInterval("4-just-Intonation");
AddOptionInterval("5-just-Intonation");
AddOptionInterval("6-just-Intonation");
AddOptionInterval("7-just-Intonation");
AddOptionInterval("8-just-Intonation");
AddOptionInterval("9-just-Intonation");
AddOptionInterval("10-just-Intonation");
AddOptionInterval("11-just-Intonation");
AddOptionInterval("12-just-Intonation");

//aPossibleGrid = Equal_temps[12].array;
///end just intonation
AddOptionInterval("4-equal-Temperement")
AddOptionInterval("12-equal-Temperement")
AddOptionInterval("24-equal-Temperement")
AddOptionInterval("53-equal-Temperement")
AddOptionInterval("60-equal-Temperement")
AddOptionInterval("72-equal-Temperement")
 

function removeallpathesgrid() {
    let AllPathGridsavailable = document.getElementsByClassName("grid-path-class");
    let __lFor = AllPathGridsavailable.length;
    for (let index = 0; index < __lFor; index++) {
        d3.select("#"+"path"+index).remove();  
    }
}
function setIntervalsonBoard(__b) {
     
    if ((__b.split("-"))[1]=="equal") {
        Equal_temps[(__b.split("-"))[0]].makeMetheGird();
        GridBoard(aPossibleGrid)
    }
    if ((__b.split("-"))[1]=="just") {
        Just_Intonations[(__b.split("-"))[0]].makeMetheGird();
        GridBoard(aPossibleGrid)
    }
    if ((__b.split("-"))[1]=="sp") {
        Special_Intonations[(__b.split("-"))[0]].makeMetheGird();
        GridBoard(aPossibleGrid)
    }
    ye_Gheri_Bia_just_one();

}

function gridThecostumeGah() {
        let oldaPossibleGrid = aPossibleGrid;
        let inp_gahs = document.getElementById("input-gahs");
        let ArrSt_In = inp_gahs.value.split(" ");
        let ArrSt_InParseInt = [];
        let _isANan = false;
        for (let index = 0; index < ArrSt_In.length; index++) {

            if ((isNaN(ArrSt_In[index])||(ArrSt_In[index]==""))==true) {

                _isANan = true;
                inp_gahs.value = oldaPossibleGrid.join(" ");
                inp_gahs.style.color = 'rgb(230, 182, 27)';
                index = ArrSt_In.length;
                setTimeout(() => {
                    inp_gahs.style.color = 'rgb(161, 161, 161)';
                }, 1000);
            }
            else {
                ArrSt_InParseInt[index] = parseInt(ArrSt_In[index]);
            }
        }
        if (_isANan==true) {           
            aPossibleGrid = oldaPossibleGrid;
            return oldaPossibleGrid
        }
        else {
            aPossibleGrid= ArrSt_InParseInt;

            GridBoard(aPossibleGrid)
            return aPossibleGrid        
        }
}

function HamepathhaRo__Belarzon() {
    let AllPathGridsavailable = document.getElementsByClassName("grid-path-class");
    for (let index = 0; index < AllPathGridsavailable.length; index++) {
        const __A_Path = AllPathGridsavailable[index];
        let __A_Path_d = (__A_Path.getAttribute('d'));
        let __A_Path_d_Arr = __A_Path_d.split(" ");
        __A_Path_d_Arr[0] = __A_Path_d_Arr[0].substring(1)
        let __A_Path_stroke = __A_Path.getAttribute('stroke')
        let __mid = window.innerHeight/2;
        let points_curve = [[],[]]

        d3.select("#"+__A_Path.id)
            .attr("d", __A_Path_d)
            .transition()
            .attr("d", "M"+__A_Path_d_Arr[0]+" "+0+" q "+(__A_Path_d_Arr[0]+0)+" "+__mid+" "+(0)+" "+(__mid*2))
            .duration(8000)                
            .transition()
            .attr("d",__A_Path_d)
            .duration(2000) 
    }
    return AllPathGridsavailable
}


function ye_Gheri_Bia_just_one() {
    let AllPathGridsavailable = document.getElementsByClassName("grid-path-class");
    for (let index = 0; index < AllPathGridsavailable.length; index++) {
        const __A_Path = AllPathGridsavailable[index];
        let __A_Path_d = __A_Path.getAttribute('d')
        let __A_Path_stroke = __A_Path.getAttribute('stroke')
        let __freq = (AllPathGridsavailable.length-index)*(window.innerWidth/AllPathGridsavailable.length);
        d3.select("#"+__A_Path.id)
            .attr("stroke",__A_Path_stroke)
            .attr("opacity",1)
            .transition()
            .attr("d", "M"+__freq+" "+0+" L"+__freq+" "+2400+" L"+(__freq+1)+" "+(2400)+" L"+(__freq+1)+" "+0+" Z")
            .attr("stroke","rgb("+120+","+140+","+120+")")
            .attr("opacity",.2)
            .duration(100)                
            .transition()
            .attr("d",__A_Path_d)
            .attr("opacity",.9)
            .attr("stroke",__A_Path_stroke)
            .duration(200) 
    }
    SetHasht('rast')
    SetHasht('left')
    return AllPathGridsavailable
}

var gane8Counter = 0;


function SetHasht(_RorL) {
    let oldgane8Counter = gane8Counter;
    if (_RorL=='rast') {
        gane8Counter = gane8Counter-1;
    } 
    if (_RorL=='left') {
        gane8Counter = gane8Counter+1;
    } 

    if ((gane8Counter>3)||(gane8Counter<-3)) {
        gane8Counter=oldgane8Counter;
    } 
    else{




    // for (let index = 0; index < d3.selectAll('path')._groups[0].length; index++) {
    //     d3.select('#path'+index)
    //                 .transition()
    //                 .attr('transform','translate(100,0)')
    //                 .duration(100)
    //                 .transition()
    //                 .attr('transform','translate(0,0)')
    //                 .duration(100)

    
    // }


        d3.selectAll('path')
                .transition()
                .attr("opacity",.6-gane8Counter*.1)
                .attr("stroke","rgb("+120+","+120+","+120+")")
                .duration(20)
                

        
    }    
}

function GridBoard(__arr=aPossibleGrid) {
    removeallpathesgrid();
    let _colorPath_Su='rgb('+128+','+128+','+128+')';

    for (let index = 0; index < __arr.length; index++) {
        let __freq = parseInt(__arr[index]);
        NAVABOARD_BASE.append("path")
        .attr("d", "M"+__freq+" "+0+" L"+__freq+" "+window.innerHeight+" L"+(__freq+1)+" "+(window.innerHeight)+" L"+(__freq+1)+" "+(0)+" Z")
        .attr("stroke", _colorPath_Su)
        .attr("stroke-width", function() {if ((is2__i_3_4(__freq)==true)||(is2__i(__freq)==true)||(is2__i_2_3(__freq))==true) {return 3} else {return 1}})
        .attr("fill", "none")
        .attr("class","grid-path-class")
        .attr("opacity",.6)
        .attr("id","path"+index);
    }  
}



function is2__i_2_3(__a) {
    let _result = false;
    for (let index = 4; index < 14; index++) {
        if (Math.abs(__a-(2**index*3/2))<4) {
            _result = true;

        }

    }
    return _result
}



function is2__i_3_4(__a) {
    let _result = false;
    for (let index = 4; index < 14; index++) {
        if (Math.abs(__a-(2**index*4/3))<4) {
            _result = true;

        }

    }
    return _result
}



function is2__i(__a) {
    let _result = false;
    for (let index = 4; index < 14; index++) {
        if (__a==(2**index)) {
            _result = true;
        }
    }
    
    return _result
}






