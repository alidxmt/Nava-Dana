var oscillator = null;
var isPlaying = false;
var context = null;
var volume = null;
var waveTablePlay = null;
function dec(decreaseTime) {
    volume.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+decreaseTime)
}
function makectn() {
        context = new AudioContext();
        volume = context.createGain();
        volume.connect(context.destination);
        oscillator = context.createOscillator();
        oscillator.type = 'sine';
        waveTablePlay = context.createPeriodicWave(curveCos, curveSin, {disableNormalization: true});
        oscillator.setPeriodicWave(waveTablePlay);
        volume.gain.setValueAtTime(1, context.currentTime);
        oscillator.frequency.setValueAtTime(0, context.currentTime);
        oscillator.connect(volume);
}
function play(Lfreq, Lgain) {
    if ((document.getElementById('btn-MousePlay').className=='btn-mouse-started')) {
        volume.gain.setValueAtTime(Lgain, context.currentTime);
        oscillator.frequency.value = parseInt(Lfreq);
        waveTablePlay = context.createPeriodicWave(curveCos, curveSin, {disableNormalization: true});
        oscillator.setPeriodicWave(waveTablePlay);
    }
}
function BeginPlay() {
    let _vl = document.getElementById('btn-MousePlay');
    if (_vl.className=='btn-mouse') {
        makectn();
        oscillator.start();
        _vl.className = 'btn-mouse-started';
    }
    else {
        if (_vl.className=='btn-mouse-started') {
            _vl.className = 'btn-mouse-paused';
            oscillator.stop();
        }
        else {
            _vl.className = 'btn-mouse-started';
            makectn();
            oscillator.start();
        }
    }
}
var oscMT = [];
var contextMt = null;
var volumeMT = [];
function BeginPlayMultitouch() {
    let clsBtn = document.getElementById("btn-multitouchPlay");
    if (clsBtn.className=="btn-touch") {
        contextMt = new AudioContext();
        for (let index = 0; index < 10; index++) {
            volumeMT[index] = contextMt.createGain();
            volumeMT[index].connect(contextMt.destination);
            oscMT[index] = contextMt.createOscillator();
            oscMT[index].type = 'sine';
            volumeMT[index].gain.setValueAtTime(0, contextMt.currentTime);
            oscMT[index].frequency.setValueAtTime(0**(index/12), contextMt.currentTime);
            oscMT[index].connect(volumeMT[index]);
            oscMT[index].start();
        }
        clsBtn.className="btn-touch-started";
    }
    else {
        if (clsBtn.className=="btn-touch-started") {
            clsBtn.className="btn-touch-paused";
        } else {
            clsBtn.className="btn-touch-started";
        }
    }   
}
function playMT(identifierMt,Lfreq, Lgain) {
    if (document.getElementById("btn-multitouchPlay").className=="btn-touch-started") {
        volumeMT[identifierMt].gain.setValueAtTime(Lgain, contextMt.currentTime);
        oscMT[identifierMt].frequency.setValueAtTime(Lfreq, contextMt.currentTime);
        waveTablePlay = contextMt.createPeriodicWave(curveCos, curveSin, {disableNormalization: true});
        oscMT[identifierMt].setPeriodicWave(waveTablePlay);
    }
}



