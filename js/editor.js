const table      = document.querySelector(".icon-table")
const editor     = document.querySelector("#editor")
const paleta     = document.querySelector("#paleta")
const fontColor  = document.querySelector("#fontColor")
const backColor  = document.querySelector("#backColor")
const upload     = document.querySelector("#upload")

table.addEventListener("click", () => {
    let linha = +prompt('Qual número de linhas?')
    let coluna= +prompt('Qual número de colunas?')

    if(linha && coluna)
    {
        let t    = document.createElement("table")
        t.border = "1"
        t.style.borderCollapse = "collapse"
        t.style.border = "1px solid #ccc"
	t.style.margin = "auto"

        for( let l=0; l<linha; l++)
        {
            let tr   = document.createElement("tr")
            tr.style.border = "1px solid #ccc"

            for( let c=0; c<coluna; c++)
            {
                let td   = document.createElement("td")
                td.style.border = "1px solid #ccc"
                td.innerHTML = " - "
                tr.appendChild(td)
            }
            t.appendChild(tr)
        }
        editor.appendChild(t)
		
		let small  = document.createElement("small")
		small.innerHTML = "Fonte:"
        editor.appendChild(small)
    }
})

upload.addEventListener("change", e => {
    let file    = e.currentTarget.files[0]
    let reader  = new FileReader()
    let img     = new Image(100, 100)
    reader.onloadend = () => {
        img.src = reader.result
        editor.appendChild(img)
        upload.value=""
    }
    reader.readAsDataURL(file)
})

const rgbToHex = (r, g, b) => '#' + [r,g,b].map( x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex   
}).join('')

fontColor.addEventListener("click", () => {
    let color = paleta.style.backgroundColor.replace("rgb(", "").replace(")", "").split(",")
    document.execCommand('foreColor', false, rgbToHex( parseInt(color[0]), parseInt(color[1]), parseInt(color[2]) ) )
})
backColor.addEventListener("click", () => document.execCommand('backColor', false, paleta.style.backgroundColor ))

const link = () => document.execCommand('createlink', false, prompt('Enter a URL:', 'http://') )
const alterFont    = size => document.execCommand("fontSize", false, parseInt(size) )
const applyCommand = comand => document.execCommand(comand)
