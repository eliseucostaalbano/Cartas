const objetosCartasDefinição = [
    { id: 1, ImagePath: "Imagens/card-KingHearts.png" },
    { id: 2, ImagePath: "Imagens/card-JackClubs.png" },
    { id: 3, ImagePath: "Imagens/card-QueenDiamonds.png" },
    { id: 4, ImagePath: "Imagens/card-AceSpades.png" }
]

const aceId = 4

const cartaVersoImgPath = "Imagens/card-back-Blue.png"

let cartas = []

const jogarJogoButtonElem = document.getElementById('jogarJogo')

const cartaContainerElem = document.querySelector('.carta-container')

const collapsedGridAreaTemplate = '"a a" "a a"'
const colecaoCartasCellClass = ".carta-pos-a"

const numCartas = objetosCartasDefinição.length

let posicoesCartas = []

let jogoEmProgresso = false
let misturamentoEmProgesso = false
let cartasReveladas = false

const atualGameStatusElem = document.querySelector('.status-atual')
const placarContainerElem = document.querySelector('.header-placar-container')
const placarElem = document.querySelector('.placar')
const rodadaContainerElem = document.querySelector('.header-rodada-container')
const rodadaElem = document.querySelector('.rodada')

const corGanhou = "green"
const corPerdeu = "red"
const corPrincipal = "black"

let rodadaNum = 0
let maxRodadas = 4
let placar = 0

let gameObj =  {}

const localStorageGameKey = "HTA"

carregarJogo()

function gameOver() {
    updateStatusElement(placarContainerElem, "none")
    updateStatusElement(rodadaContainerElem, "none")

    const mensagemFimDeJogo = `Fim De Jogo! Você fez <span class = 'badge'>${placar}</span> Pontos. Clique no Botão 'Começar Jogo' para Jogar novamente`
    updateStatusElement(atualGameStatusElem, "block", corPrincipal, mensagemFimDeJogo)

    jogoEmProgresso = false
    jogarJogoButtonElem.disabled = false

}

function finalizarRodada() {
    setTimeout(() => {
        if (rodadaNum == maxRodadas) {
            gameOver()
            return
        } else {
            começarRodada()
        }
    }, 3000)
}

function escolherCarta(carta) {
    if (podeEscolherCarta()) {
        avaliarEscolhaCarta(carta)
        saveGameObjectToLocalStorage(placar, rodadaNum)
        fliparCarta(carta, false)

        setTimeout(() => {
            fliparCartas(false)
            updateStatusElement(atualGameStatusElem, "block", corPrincipal, "Posição Das Cartas Reveladas")
            finalizarRodada()
        }, 3000)
        cartasReveladas = true
    }
}

function calcularPlacarParaAdd(rodadaNum) {
    if (rodadaNum == 1) {
        return 100
    } else if (rodadaNum == 2) {
        return 50
    } else if (rodadaNum == 3) {
        return 25
    } else {
        return 10
    }
}

function calcularPlacar() {
    const placarParaAdd = calcularPlacarParaAdd(rodadaNum)
    placar = placar + placarParaAdd
}

function updatePlacar() {
    calcularPlacar()
    updateStatusElement(placarElem, "block", corPrincipal, `Placar: <span class = 'badge'>${placar}</span>`)
}

function updateStatusElement(elem, display, cor, innerHTML) {
    elem.style.display = display

    if (arguments.length > 2) {
        elem.style.color = cor
        elem.innerHTML = innerHTML
    }
}

function outputChoicheFeedBack(hit) {
    if (hit) {
        updateStatusElement(atualGameStatusElem, "block", corGanhou, "Acertou - Parabéns")
    } else {
        updateStatusElement(atualGameStatusElem, "block", corPerdeu, "Errou - Que pena")
    }
}

function avaliarEscolhaCarta(carta) {
    if (carta.id == aceId) {
        updatePlacar()
        outputChoicheFeedBack(true)
    } else {
        outputChoicheFeedBack(false)
    }
}

function podeEscolherCarta() {
    return jogoEmProgresso == true && !misturamentoEmProgesso && !cartasReveladas
}

function carregarJogo() {
    criarCartas()

    cartas = document.querySelectorAll('.carta')
    efeitoCartaFlyIn()
    jogarJogoButtonElem.addEventListener('click', () => começarJogo())

    updateStatusElement(placarContainerElem, "none")
    updateStatusElement(rodadaContainerElem, "none")
}

function checarPorJogoIncompleto() {
    const serializedGameObj= getLocalStorageItemValue(localStorageGameKey)

    if (serializedGameObj) {
        gameObj= getObjectFromJSON(serializedGameObj)
    }

    if (gameObj.rodada >= maxRodadas) {
        removeLocalStorageItem(localStorageGameKey)
    } else {
        if (confirm('você gostaria de continuar onde parou')) {
            placar = gameObj.placar
            rodada = gameObj.rodada
        }
    }
}

function começarJogo() {
    inicializarNovoJogo()
    começarRodada()
}

function inicializarNovoJogo() {
    placar = 0
    rodadaNum = 0

    checarPorJogoIncompleto()

    misturamentoEmProgesso = false
    updateStatusElement(placarContainerElem, "flex")
    updateStatusElement(rodadaContainerElem, "flex")

    updateStatusElement(placarElem, "block", corPrincipal, `Placar: <span class='badge'>${placar}</span>`)
    updateStatusElement(rodadaElem, "block", corPrincipal, `Rodada: <span class='badge'>${rodadaNum}</span>`)
}

function começarRodada() {
    inicializarNovaRodada()
    coletarCartas()
    fliparCartas(true)
    embaralharCartas()
}

function inicializarNovaRodada() {
    rodadaNum++
    jogarJogoButtonElem.disabled = true

    jogoEmProgresso = true
    misturamentoEmProgesso = true
    cartasReveladas = false

    updateStatusElement(atualGameStatusElem, "block", corPrincipal, "Embaralhando...")
    updateStatusElement(rodadaElem, "block", corPrincipal, `Rodada: <span class='badge'>${rodadaNum}</span>`)
}

function coletarCartas() {
    transformGridArea(collapsedGridAreaTemplate)
    addCardsToGridAreaCell(colecaoCartasCellClass)
}

function transformGridArea(areas) {
    cartaContainerElem.style.gridTemplateAreas = areas
}

function addCardsToGridAreaCell(cellPositionClassName) {
    const cellPositionElem = document.querySelector(cellPositionClassName)

    cartas.forEach((carta, index) => {
        addChildElement(cellPositionElem, carta)
    })

}
function fliparCarta(carta, fliparParaTras) {
    const dentroCartaElem = carta.firstChild

    if (fliparParaTras && !dentroCartaElem.classList.contains('flipar')) {
        dentroCartaElem.classList.add('flipar')
    } else if (dentroCartaElem.classList.contains('flipar')) {
        dentroCartaElem.classList.remove('flipar')
    }
}

function fliparCartas(fliparParaTras) {
    cartas.forEach((carta, index) => {
        setTimeout(() => {
            fliparCarta(carta, fliparParaTras)
        }, index * 100)
    })
}

function efeitoCartaFlyIn() {
    const id = setInterval(flyIn, 5)

    let cartaContagem = 0;

    let contagem = 0

    function flyIn() {
        contagem++
        
        if(cartaContagem == numCartas){
         clearInterval(id)
         jogarJogoButtonElem.style.display = "inline-flex"
        }
       
        if(contagem == 1|| contagem == 250|| contagem == 500|| contagem == 750){
             cartaContagem++

             let carta = document.getElementById(cartaContagem)
             carta.classList.remove("fly-in")
        }
    }
}

function removerClasseseEmbaralhamento() {
        cartas.forEach((carta) =>{
            carta.classList.remove("misturar-esquerda")
            carta.classList.remove("misturar-direita")
        })
}

function animarEmbaralhamento(contagemEmbaralhar) {

    const random1 = Math.floor(Math.random() * numCartas) + 1
    const random2 = Math.floor(Math.random() * numCartas) + 1

    let carta1 = document.getElementById(random1)
    let carta2 = document.getElementById(random2)

    if (contagemEmbaralhar % 4 == 0) {
        carta1.classList.toggle("misturar-esquerda")
        carta1.style.zIndex = 100
    }

    if (contagemEmbaralhar % 10 == 0) {
        carta2.classList.toggle("misturar-direita")
        carta2.style.zIndex = 200
    }
}

function embaralharCartas() {
    const id = setInterval(embaralhar, 12)
    let contagemEmbaralhar = 0

    function embaralhar() {
        randomizeCardPositions()
        animarEmbaralhamento(contagemEmbaralhar)
        if (contagemEmbaralhar === 500) {
            clearInterval(id)
            misturamentoEmProgesso = false
            removerClasseseEmbaralhamento()
            lidarCartas()
            updateStatusElement(atualGameStatusElem, "block", corPrincipal, "Escolha a carta que você acha ser o As de Espadas")
        } else {
            contagemEmbaralhar++
        }
    }

}

function randomizeCardPositions() {
    const random1 = Math.floor(Math.random() * numCartas) + 1
    const random2 = Math.floor(Math.random() * numCartas) + 1

    const temp = posicoesCartas[random1 - 1]

    posicoesCartas[random1 - 1] = posicoesCartas[random2 - 1]
    posicoesCartas[random2 - 1] = temp

}

function lidarCartas() {
    addCardsToAppropiateGridCell()

    const areasTemplate = returnGridAreasMappedToCardPos()

    transformGridArea(areasTemplate)
}

function returnGridAreasMappedToCardPos() {
    let parteUm = ""
    let parteDois = ""
    let areas = ""

    cartas.forEach((carta, index) => {
        if (posicoesCartas[index] == 1) {
            areas = areas + "a "
        }
        else if (posicoesCartas[index] == 2) {
            areas = areas + "b "
        }
        else if (posicoesCartas[index] == 3) {
            areas = areas + "c "
        }
        else if (posicoesCartas[index] == 4) {
            areas = areas + "d "
        }
        if (index == 1) {
            parteUm = areas.substring(0, areas.length - 1)
            areas = "";
        }
        else if (index == 3) {
            parteDois = areas.substring(0, areas.length - 1)
        }

    })

    return `"${parteUm}" "${parteDois}"`


}

function addCardsToAppropiateGridCell() {
    cartas.forEach((carta) => {
        addCardToGridCell(carta)
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
    addClassToElement(cartaElem, 'fly-in')
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

    initializeCardPositions(cartaElem)

    attatchClickEventHandlerToCard(cartaElem)

}

function attatchClickEventHandlerToCard(carta) {
    carta.addEventListener('click', () => escolherCarta(carta))
}

function initializeCardPositions(carta) {
    posicoesCartas.push(carta.id)
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

//local storage functions
function getSerializedObjectAsJSON(obj)
{
    return JSON.stringify(obj)
}
function getObjectFromJSON(json)
{
    return JSON.parse(json)
}
function updateLocalStorageItem(key, value)
{
    localStorage.setItem(key, value)
}
function removeLocalStorageItem(key)
{
    localStorage.removeItem(key)
}
function getLocalStorageItemValue(key)
{
    return localStorage.getItem(key)
}

function updateGameObject(placar,rodada)
{
    gameObj.placar = placar
    gameObj.rodada = rodada
}
function saveGameObjectToLocalStorage(placar,rodada)
{
    updateGameObject(placar, rodada)
    updateLocalStorageItem(localStorageGameKey, getSerializedObjectAsJSON(gameObj))
}