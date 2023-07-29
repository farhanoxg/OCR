const FileSelect = document.querySelector('input'),
start =document.querySelector('button'),
img = document.querySelector('img'),
progress = document.querySelector('.progress'),
textarea = document.querySelector('textarea'),
copyBtn = document.querySelector(".copyBtn"),
container=document.querySelector(".container"),
reset=document.querySelector(".reset");

FileSelect.onchange = ()=>{
    var file =FileSelect.files[0];
    var imgUrl= window.URL.createObjectURL(new Blob ([file],{type: 'image/jpg'}))
}

start.onclick=()=>{
    textarea.innerHTML=''
    const rec = new Tesseract.TesseractWorker()
    rec.recognize(FileSelect.files[0])
    .progress(function(response){
        if(response.status == 'recognizing text'){
            progress.innerHTML=response.status+ ' '+ response.progress 
         }else{

            progress.innerHTML=response.status
        }
    })
    .then(function (data){
        textarea.innerHTML=data.text
        progress.innerHTML= 'Done!'
    })
    
}

copyBtn.addEventListener("click", () => {
    let text = container.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);

});

reset.addEventListener("click", () => {
    window.location.reload();
})
