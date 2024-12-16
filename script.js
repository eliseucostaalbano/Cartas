const objetosCartasDefinição = [
    { id: 1, ImagePath: "Imagens/card-KingHearts.png" },
    { id: 2, ImagePath: "Imagens/card-JackClubs.png" },
    { id: 3, ImagePath: "Imagens/card-QueenDiamonds.png" },
    { id: 4, ImagePath: "Imagens/card-AceSpades.png" }
]

const cartaVersoImgPath = "Imagens/card-back-Blue.png"

let cartas = []

const jogarJogoButtonElem = document.getElementById('jogarJogo')

const cartaContainerElem = document.querySelector('.carta-container')

const collapsedGridAreaTemplate = '"a a" "a a"'
const colecaoCartasCellClass = ".carta-pos-a"

carregarJogo()

function carregarJogo() {
    criarCartas()
    cartas = document.querySelectorAll('.carta')
    jogarJogoButtonElem.addEventListener('click', () => começarJogo())
}

function começarJogo() {
    inicializarNovoJogo()
    começarRodada()
}

function inicializarNovoJogo() {
    
}

function começarRodada() {
    inicializarNovaRodada()
    coletarCartas()
}

function inicializarNovaRodada() {
    
}

function coletarCartas() {
    transformGridArea(collapsedGridAreaTemplate)
    addCardsToGridAreaCell(colecaoCartasCellClass)
}

function transformGridArea(areas) {
    cartaContainerElem.style.gridTemplateAreas = areas
}

function addCardsToGridAreaCell(cellPositionClassName)
{
    const cellPositionElem = document.querySelector(cellPositionClassName)

    cartas.forEach((carta, index) =>{
        addChildElement(cellPositionElem, carta)
    })

}

function criarCartas() {
    objetosCartasDefinição.forEach(cartaItem => {
        criarCarta(cartaItem)
    });
}

function criarCarta(cartaItem) {

    //criar elementos div que fazem a carta 
    const cartaElem = createElement('div')
    const cartaDentroElem = createElement('div')
    const cartaFrenteElem = createElement('div')
    const cartaVersoElem = createElement('div')

    //criar as imagens de frente e verso da carta
    const cartaFrenteImg = createElement('img')
    const cartaVersoImg = createElement('img')

    //adiciona class e id para o elemento carta
    addClassToElement(cartaElem, 'carta')
    addIdToElement(cartaElem, cartaItem.id)

    //adiciona class para a parte de dentro do elemento carta
    addClassToElement(cartaDentroElem, 'carta-dentro')

    //adiciona class para o elemento carta-frente 
    addClassToElement(cartaFrenteElem, 'carta-frente')

    //adiciona class para o elemento carta-verso
    addClassToElement(cartaVersoElem, 'carta-verso')

    //adiciona src attribute e valor apropriado para o elemento img  - verso da carta
    addSrcToImageElem(cartaVersoImg, cartaVersoImgPath)

    //adiciona src attribute e valor apropriado para o elemento img  - frente da carta
    addSrcToImageElem(cartaFrenteImg, cartaItem.ImagePath)

    //assimila class para elemento image do verso da carta
    addClassToElement(cartaVersoImg, 'carta-img')

    //assimila class para elemento image do verso da carta
    addClassToElement(cartaFrenteImg, 'carta-img')

    //adiciona o elemento frente image como child element do elemento frente-carta
    addChildElement(cartaFrenteElem, cartaFrenteImg)

    //adiciona o elemento verso image como child element do elemento verso-carta
    addChildElement(cartaVersoElem, cartaVersoImg)

    //adiciona o elemento dentro image como child element do elemento carta-dentro
    addChildElement(cartaDentroElem, cartaFrenteElem)

    //adiciona o elemento carta-verso elemento como child element do dentro-carta
    addChildElement(cartaDentroElem, cartaVersoElem)

    //adiciona o elemento carta-detro elemento como child element para o elemento carta
    addChildElement(cartaElem, cartaDentroElem)

    //adiciona o elemento carta como child element na posição apropriada do grid 
    addCardToGridCell(cartaElem)

}

function createElement(elemType) {
    return document.createElement(elemType)

}
function addClassToElement(elem, className) {
    elem.classList.add(className)
}
function addIdToElement(elem, id) {
    elem.id = id
}
function addSrcToImageElem(imgElem, src) {
    imgElem.src = src
}

function addChildElement(parentElem, childElem) {
    parentElem.appendChild(childElem)
}


function addCardToGridCell(carta) {
    const cartaPositionClassName = mapCardIdToGridCell(carta)

    const cartaPosElem = document.querySelector(cartaPositionClassName)

    addChildElement(cartaPosElem, carta)

}
function mapCardIdToGridCell(carta) {

    if (carta.id == 1) {
        return '.carta-pos-a'
    }
    else if (carta.id == 2) {
        return '.carta-pos-b'
    }
    else if (carta.id == 3) {
        return '.carta-pos-c'
    }
    else if (carta.id == 4) {
        return '.carta-pos-d'
    }
}