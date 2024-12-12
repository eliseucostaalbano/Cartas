const objetosCartasDefinição = [
    { id: 1, ImagePath: "Imagens/card-KingHearts.png" },
    { id: 2, ImagePath: "Imagens/card-JackClubs.png" },
    { id: 3, ImagePath: "Imagens/card-QueenDiamonds.png" },
    { id: 4, ImagePath: "Imagens/card-AceSpades.png" }
]

const cardBackImgPath = "Imagens/card-back-Blue.png"

const cartaContainerElem = document.querySelector('carta-container')

{/* <div class="carta">
                <div class="carta-dentro">
                    <div class="carta-frente">
                        <img src="Imagens/card-JackClubs.png" alt="" class="carta-img">
                    </div>
                    <div class="carta-verso">
                        <img src="Imagens/card-back-Blue.png" alt="" class="carta-img">
                    </div>
                </div>
            </div>  */}

function criarCarta(cartaItem) {
    // criar o elemento div que faz a carta
    const cartaElem = criarElemento('div')
    const cartaDentroElem = criarElemento('div')
    const cartaFrenteElem = criarElemento('div')
    const cartaVersoElem = criarElemento('div')

    // criar as imagens frente e verso das cartas
    const cartaFrenteImg = criarElemento('img')
    const cartaVersoImg = criarElemento('img')

    // adicionar class e id para o elemento carta
    addClassParaElemento(cartaElem, 'carta')
    addIdParaElemento(cartaElem, cartaItem.id)

    // adicionar class para o elemento cartaDentro
    addClassParaElemento(cartaDentroElem, 'carta-dentro')

    // adicionar class para o elemento cartaFrente
    addClassParaElemento(cartaFrenteElem, 'carta-frente')

    // adicionar class  para o elemento cartaVerso
    addClassParaElemento(cartaVersoElem, 'carta-verso')

    // adicionar atributo src e valor apropriado para o elemento - carta-frente
    addSrcParaImageElemento(cartaVersoElem, cardBackImgPath)

    // adicionar atributo src e valor apropriado para o elemento - carta-verso
    addSrcParaImageElemento(cartaFrenteElem, cartaItem.ImagePath)

    // coloca class carta-img para a frente da carta 
    addClassParaElemento(cartaFrenteElem, "carta-img")

    // coloca class carta-img para a frente da carta 
    addClassParaElemento(cartaVersoElem, "carta-img")

    //adiciona o elemento da imagem da frente como um child element para o elemento carta frente
    addChildElemento(cartaFrenteElem, cartaFrenteImg)

    //adiciona o elemento da imagem de tras como um child element para o elemento carta verso
    addChildElemento(cartaVersoElem, cartaVersoImg)

    //adiciona o elemento da imagem da frente como um child element para o elemento carta dentro
    addChildElemento(cartaDentroElem, cartaFrenteElem)

    //adiciona o elemento da imagem de tras como um child element para o elemento carta dentro
    addChildElemento(cartaDentroElem, cartaVersoElem)

    //adiciona o elemento carta dentro como um child element do elemene carta
    addChildElemento(cartaElem, cartaDentroElem)
    
}

function criarElemento(elemType) {
    return document.createElement(elemType)
}

function addClassParaElemento(elem, className) {
    elem.classList.add(className)
}

function addIdParaElemento(elem, id) {
    elem.id = id
}

function addSrcParaImageElemento(imgElem, src) {
    imgElem.src = src
}

function addChildElemento(parentElem, childElem) {
    parentElem.appendChild(childElem)
}