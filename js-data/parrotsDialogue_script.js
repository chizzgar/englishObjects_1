(() => {
    const parrotsPhrases = [{
        data: 'hello',
        phrase: 'Hello!'
    },
    {
        data: 'hello',
        phrase: 'Hello!'
    },
    {
        data: 'howareyou',
        phrase: 'How are you?'
    },
    {
        data: 'finethankyou',
        phrase: 'I’m fine! Thank you.'
    },
    ];



    const parrotsDialogueWrapper = document.querySelector('.parrotsDialogueWrapper');
    const parrotsDialogue = document.querySelector('.parrotsDialogue');
    const answerVariants = document.querySelector('.answerVariants');
    const parrotImages = parrotsDialogue.querySelectorAll('img')

    const interakt_zadanie = parrotsDialogueWrapper.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');





    drop.addEventListener('click', resetGame);

    let startAction = false;

    const parrotsPhrasesRandom = parrotsPhrases.sort(() => Math.random() > 0.5 ? 1 : -1);

    parrotsPhrasesRandom.forEach(elem => {

        const div = document.createElement('div');
        div.classList.add('answer');
        div.setAttribute('drag-data', elem.data);
        div.append(elem.phrase);
        answerVariants.appendChild(div);
    });

    let draggingItem;
    let elemBelow;

    const answers = document.querySelectorAll('.answer');
    answers.forEach((e) => {
        e.addEventListener('pointerdown', mouseDown);
    });

    function mouseDown(event) {
        if (event.button !== 0) return;
        draggingItem = event.target;
        draggingItem.style.backgroundColor = '#ffff'
        const elemDraggingBanBorder = interakt_zadanie; //элемент за границы которого запрещён вылет перетаскиваемой фигуры
        const elemDraggingStartPlace = answerVariants; //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)
        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
        draggingItem.style.cursor = 'grabbing';
        let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

        // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
        //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)
        let limits = {
            top: elemDraggingBanBorder.offsetTop,
            right: elemDraggingBanBorder.offsetWidth + elemDraggingBanBorder.offsetLeft,
            bottom: elemDraggingBanBorder.offsetHeight + elemDraggingBanBorder.offsetTop,
            left: elemDraggingBanBorder.offsetLeft
        };

        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 1000;
        document.body.appendChild(draggingItem);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            draggingItem.style.left = pageX - shiftX + 'px';
            draggingItem.style.top = pageY - shiftY + 'px';
        }

        elemBelow = document.elementFromPoint(event.clientX, event.clientY);

        let clickWithoutMove = true;

        function onMouseMove(event) {
            let newLocation = {
                x: limits.left,
                y: limits.top
            };
            if (event.pageX > limits.right) {
                newLocation.x = limits.right;
            } else if (event.pageX > limits.left) {
                newLocation.x = event.pageX;
            }
            if (event.pageY > limits.bottom) {
                newLocation.y = limits.bottom;
            } else if (event.pageY > limits.top) {
                newLocation.y = event.pageY;
            }

            clickWithoutMove = false
            moveAt(newLocation.x, newLocation.y);

            if (!event.path.includes(draggingItem)) {
                window.addEventListener('pointerup', moveOut);
            }

            draggingItem.hidden = true;
            elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggingItem.hidden = false;

            if (!elemBelow) return;

            // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)

            // let currentDroppable = null;

            // let droppableBelow = elemBelow.closest('.droppable'); // БЕРЁМ НУЖНЫЙ БЛОК 

            // if (currentDroppable != droppableBelow) {
            //     if (currentDroppable) { 
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
            //         leaveDroppable(currentDroppable);
            //     }
            //     currentDroppable = droppableBelow;
            // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
            //     if (currentDroppable) {
            //         enterDroppable(currentDroppable);
            //     }
            // }
        }

        // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
        function enterDroppable(currentDroppable) {
            // currentDroppable
        }
        // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
        function leaveDroppable(currentDroppable) {
            // currentDroppable
        }
        document.addEventListener('pointermove', onMouseMove);


        // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
        function moveOut(e) {
            const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
            if (elemUnderPount !== draggingItem) {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА
        draggingItem.onpointerup = function () {
            draggingItem.style.cursor = 'grab';
            startAction = true;
            checkButton_classList_changer();
            if (clickWithoutMove) {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ

            if (elemBelow.classList.contains("dialogueParrotPhrase") ||
                elemBelow.classList.contains("dialogueUserPhrase") ||
                elemBelow.classList.contains("dialogueParrotPhraseActive") ||
                elemBelow.classList.contains("kiwiFirstPhrase")) {
                changeStylesAndAppend(elemBelow, draggingItem);
                const backgroundColorElemBelow = getComputedStyle(elemBelow).backgroundColor;
                draggingItem.style.backgroundColor = backgroundColorElemBelow;
            } else {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
                draggingItem.style.backgroundColor = '#ffff'

            }
        };
        function changeStylesAndAppend(dropPlace, draggingElem) {
            draggingElem.style.position = 'relative ';
            draggingElem.style.zIndex = null;
            draggingElem.style.top = null;
            draggingElem.style.left = null;
            dropPlace.appendChild(draggingElem);
        }

    };


    function checkButton_classList_changer() {
        if (check_your.classList.contains('check_your_active') && !startAction) {
            check_your.classList.remove('check_your_active');
            check_your.removeEventListener('click', checkGameResult);
        } else if (!check_your.classList.contains('check_your_active') && startAction) {
            check_your.removeEventListener('click', checkGameResult);
            check_your.classList.add('check_your_active');
            check_your.addEventListener('click', checkGameResult);
        }
    }

    const dialogPhrasesCheck = parrotsDialogue.querySelectorAll('.dialogPhrasesCheck');


    function resetGame() {
        startAction = false;
        checkButton_classList_changer();
        feedBackChanger('reset')
        dialogPhrasesCheck.forEach(elem => {
            if (elem.childNodes.length > 1) {
                elem.childNodes[1].style.backgroundColor = '#ffff'
                answerVariants.appendChild(elem.childNodes[1]);
            }
        });
    }


    function checkGameResult() {
        let winCount = 0;
        dialogPhrasesCheck.forEach(elem => {
            if (elem.childNodes.length > 1) {
                if (elem.attributes.getNamedItem("drop-data").value === elem.childNodes[1].attributes.getNamedItem("drag-data").value) {
                    winCount++
                }
            }
        });
        if (winCount === parrotsPhrases.length) {
            feedBackChanger('win');
        } else {
            feedBackChanger('lose');
        }
        draggingItem = null;
    }


    function feedBackChanger(state) {

        if (startAction && state === 'win' || state === 'lose') {
            result.classList.add(`result_${state}`);
        } else {
            result.classList.remove(`result_win`);
            result.classList.remove(`result_lose`);
        }

    }

    function scaleImage(e) {
        item = e.target
        let modal = document.createElement('div')
        modal.style.position = 'fixed'
        modal.style.left = 0
        modal.style.top = 0
        modal.style.bottom = 0
        modal.style.right = 0
        modal.style.background = "rgba(0,0,0,0.5)"
        modal.style.zIndex = 100
        modal.style.display = 'flex'
        modal.style.justifyContent = 'center'
        modal.style.flexDirection = 'column'
        modal.style.alignItems = 'center'
        let div = document.createElement('div')
        let img = document.createElement('img')
        div.style.width = '50%';
        div.style.height = '80%';
        div.style.textAlign = 'center';
        img.src = item.src;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';

        //img.src = item.style.backgroundImage.slice(5, -2)
        div.append(img)
        modal.append(div)
        let close = document.createElement('div')
        close.style.width = '25px'
        close.style.height = '25px'
        close.style.marginLeft = 'calc(100% - 25px)'
        close.style.cursor = 'pointer'
        close.style.backgroundImage = `url(Images_1/close.png)`
        div.append(close)
        document.body.style.overflow = 'hidden'
        modal.addEventListener('click', () => {
            modal.remove()
            document.body.style.overflow = 'visible'
        })
        document.body.append(modal)
    }

    parrotImages.forEach((item => {
        item.addEventListener('click', scaleImage)
    }))
})()