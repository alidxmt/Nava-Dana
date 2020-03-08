function addParsiNava() {
    

window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
let currentBuffer = null;

}

var Maraghei_base = [8192.0,7776.0,7520.8,7281.8,6912.0,6685.1,6472.7,6144.0,5832.0,5640.6,5461.3,5184.0,5013.9,4854.5,4608.0,4456.8,4315.1,4096];
var MaragheiArray = [];
var ctn_mrghei = 0;
for (let indexU = 0; indexU < 8; indexU++) {
    for (let index = 0; index < Maraghei_base.length; index++) {
        MaragheiArray[ctn_mrghei] = Maraghei_base[index]/(2**indexU);
        ctn_mrghei=ctn_mrghei+1;        
    }
    
}
Sjhs = new Set(MaragheiArray);
MaragheiArray = Array.from(Sjhs);
MaragheiArray.sort(compareNumbers);
Special_Intonations[2] = new Nava_Intervals("2-sp-Marghei",MaragheiArray,-1,-1);

AddOptionInterval("2-sp-Marghei");



var vaziriTarBasepower = [0,2,3,4,6,7,8,10,12,13,14,16,17,18,20,21,22,24]
var VaziriArray = []
var ctn_vaziri = 0;
for (let indexU = 0; indexU < 8; indexU++) {
    for (let index = 0; index < vaziriTarBasepower.length; index++) {
        VaziriArray[ctn_vaziri] = 8192/(2**(indexU+(vaziriTarBasepower[index]/24)));
        ctn_vaziri=ctn_vaziri+1;        
    }
}

var Sjhs_vz = new Set(VaziriArray);
VaziriArray = Array.from(Sjhs_vz);
VaziriArray.sort(compareNumbers);
Special_Intonations[3] = new Nava_Intervals("3-sp-Vaziri",VaziriArray,-1,-1);

AddOptionInterval("3-sp-Vaziri");





