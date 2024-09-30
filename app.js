let dropArea = document.getElementById('drop-area')
console.log(dropArea)
let fileCount = document.getElementById('file-count')
let filePreview = document.getElementById('file-preview')
let filePreviewClose = document.getElementById('file-preview-close')
let filePreviewContent = document.getElementById('file-preview-content')
let fileAccumulated = []
let fileInput = document.getElementById('file-input')
let fileRemoveAll = document.getElementById('file-remove-all')


fileInput.addEventListener('change',function(event){
        event.preventDefault()
        handleFiles(event.target.files)
})
fileRemoveAll.addEventListener('click',function(){
    removeAllFiles()
})
filePreviewClose.addEventListener('click',function(){
    filePreview.style.display = 'none'
})

fileCount.addEventListener('click',function(){
    filePreview.style.display = 'block'
})
Array.from(['dragover','dragleave','dragenter','drop']).forEach(action =>{
    // console.log(action)
    dropArea.addEventListener(action, handleDragEvent)
})

function handleDragEvent(event){
    event.preventDefault()
    event.stopPropagation()

    switch(event.type){
        case 'dragover':
            dropArea.style.backgroundColor = '#fcdcdc'
            break
        case 'dragenter':
            dropArea.style.borderColor = '#e91b3a'
            break
        case 'dragleave':
            dropArea.style.background = '#f0f0f0'
            dropArea.style.borderColor = '#ccc'
            break
        case 'drop':
            dropArea.style.backgroundColor = '#f0f0f0'
            dropArea.style.borderColor = '#ccc'
            handleFiles(event.dataTransfer.files)
            break
    }
}

function handleFiles(files){
    Array.from(files).forEach(file=>{
        if(!isDuplicateFile(file) && file.type.indexOf('image/') === 0){
            addToFileAccumulated(file)
            addToFilePreview(file)
        }
    })
    updateFileCount()
}


function isDuplicateFile(newFile){
    return fileAccumulated.some(file => 
        file.name == newFile.name && 
        file.size === newFile.size 
    )
}
function addToFilePreview(file){
    var reader = new FileReader()
    reader.onload = function(e){
        var img = new Image()
        img.src = e.target.result
        img.alt = file.name
        img.title = file.name 
        img.style.maxWidth = '100px'
        img.style.maxHeight = '100px'
        img.addEventListener('dblclick',function(){
            removeFile(this)
        })

        filePreviewContent.appendChild(img)
    }
    reader.readAsDataURL(file)
}

function removeFile(item){
    fileAccumulated.forEach((file, index) => {
        if(file.name === item.alt){
            fileAccumulated.splice(index,1)
            item.remove();
        }
    })
    updateFileCount();
}

function removeAllFiles(){
    filePreviewContent.innerHTML = ''
    fileAccumulated = []
    updateFileCount()
}
function addToFileAccumulated(file){
    fileAccumulated.push(file)
}

function updateFileCount(){
    if (fileAccumulated.length > 0){
        fileCount.textContent = 'File Selected (' + fileAccumulated.length + ')'
    
    } else {
        fileCount.textContent  = ''
    }
}

