const length=document.getElementById('length');
const width=document.getElementById('width');
const length$=Rx.Observable.fromEvent(length,'keyup').pluck('target','value').flatMap(_=>{
return Rx.Observable.interval(1000);});
length$.subscribe(val=>console.log(val));