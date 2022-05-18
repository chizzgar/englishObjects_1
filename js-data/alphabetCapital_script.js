(() => {
    const alphabetSmallCapital = [
        {

            data: 'alphCapSmallCapital_1',
            letterCapital: 'A',
            letterSmall: 'a'
        },
        {

            data: 'alphCapSmallCapital_2',
            letterCapital: 'B',
            letterSmall: 'b'
        },
        {

            data: 'alphCapSmallCapital_3',
            letterCapital: 'C',
            letterSmall: 'c'
        },
        {

            data: 'alphCapSmallCapital_4',
            letterCapital: 'D',
            letterSmall: 'd'
        },
        {

            data: 'alphCapSmallCapital_5',
            letterCapital: 'E',
            letterSmall: 'e'
        },
        {

            data: 'alphCapSmallCapital_6',
            letterCapital: 'F',
            letterSmall: 'f'
        },
        {

            data: 'alphCapSmallCapital_7',
            letterCapital: 'G',
            letterSmall: 'g'
        },
        {

            data: 'alphCapSmallCapital_8',
            letterCapital: 'H',
            letterSmall: 'h'
        },
        {

            data: 'alphCapSmallCapital_9',
            letterCapital: 'I',
            letterSmall: 'i'
        },
        {

            data: 'alphCapSmallCapital_10',
            letterCapital: 'J',
            letterSmall: 'j'
        },
        {

            data: 'alphCapSmallCapital_11',
            letterCapital: 'K',
            letterSmall: 'k'
        },
        {

            data: 'alphCapSmallCapital_12',
            letterCapital: 'L',
            letterSmall: 'l'
        },
        {

            data: 'alphCapSmallCapital_13',
            letterCapital: 'M',
            letterSmall: 'm'
        },
        {

            data: 'alphCapSmallCapital_14',
            letterCapital: 'N',
            letterSmall: 'n'
        },
        {

            data: 'alphCapSmallCapital_15',
            letterCapital: 'O',
            letterSmall: 'o'
        },
        {

            data: 'alphCapSmallCapital_16',
            letterCapital: 'P',
            letterSmall: 'p'
        },
        {

            data: 'alphCapSmallCapital_17',
            letterCapital: 'Q',
            letterSmall: 'q'
        },
        {

            data: 'alphCapSmallCapital_18',
            letterCapital: 'R',
            letterSmall: 'r'
        },
        {

            data: 'alphCapSmallCapital_19',
            letterCapital: 'S',
            letterSmall: 's'
        },
        {

            data: 'alphCapSmallCapital_20',
            letterCapital: 'T',
            letterSmall: 't'
        },
        {

            data: 'alphCapSmallCapital_21',
            letterCapital: 'U',
            letterSmall: 'u'
        },
        {

            data: 'alphCapSmallCapital_22',
            letterCapital: 'V',
            letterSmall: 'v'
        },
        {

            data: 'alphCapSmallCapital_23',
            letterCapital: 'W',
            letterSmall: 'w'
        },
        {

            data: 'alphCapSmallCapital_24',
            letterCapital: 'X',
            letterSmall: 'x'
        },
        {

            data: 'alphCapSmallCapital_25',
            letterCapital: 'Y',
            letterSmall: 'y'
        },
        {

            data: 'alphCapSmallCapital_26',
            letterCapital: 'Z',
            letterSmall: 'z'
        },
    ];

    // 


    const alphabetWrapper = document.querySelector('.alphabetWrapper_capital ');
    const alphabetDropPlace = document.querySelector('.alphabetDropPlace_capital ');
    const alphabetDragPlace = document.querySelector('.alphabetDragPlace_capital ');

    const interakt_zadanie = alphabetWrapper.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');

    drop.addEventListener('click', resetPuzzle);
    let startAction = false;

    // <div class="letterCard_capital"><p style={{ pointerEvents: 'none' }} drop-data={item.data}>{item.letter}</p> <span className="localReset" onClick={localResetHandler} title="Очистить" >&times;</span></div>
    // <span className="localReset" onClick={localResetHandler} title="Очистить" >&times;</span>
    alphabetSmallCapital.forEach((elem) => {
        const dropPalce = document.createElement('div');
        dropPalce.classList.add('letterCardDrop_capital');

        const paragraph = document.createElement('p');
        paragraph.classList.add('letterCardDrop_capital_p');
        paragraph.append(elem.letterCapital);


        const span = document.createElement('span');
        span.classList.add('localReset');
        // span.appendChild(document.createTextNode('x'));
        span.innerHTML = `&times;`;
        span.setAttribute('title', 'Очистить');
        span.style.pointerEvents = 'none';
        span.addEventListener('click', localReset_letter);



        // dropPalce.style.display = 'block';
        dropPalce.appendChild(paragraph);
        dropPalce.appendChild(span);

        dropPalce.setAttribute('drop-data', elem.data);
        alphabetDropPlace.appendChild(dropPalce);
    });


    const alphabetRandomLetters = alphabetSmallCapital.sort(() => Math.random() > 0.5 ? 1 : -1);
    const localReset_lettersAll = document.querySelectorAll('.localReset')
    // <div class="letterCard_small"><p style={{ pointerEvents: 'none' }} drag-data={item.data}>{item.letter}</p></div>
    alphabetRandomLetters.forEach((elem) => {
        const div = document.createElement('div');
        div.classList.add('letterCardDrag_small');
        div.setAttribute('drag-data', elem.data);

        const paragraph = document.createElement('p');
        paragraph.classList.add('letterCardDrag_small_p');
        paragraph.append(elem.letterSmall);



        div.appendChild(paragraph);
        alphabetDragPlace.appendChild(div);
    });

    const letterCard_drop = document.querySelectorAll('.letterCardDrop_capital');
    const letterCard_drag = document.querySelectorAll('.letterCardDrag_small');

    letterCard_drag.forEach((e) => {
        e.addEventListener('pointerdown', mouseDown);
    });

    function changeStylesAndAppend(dropPlace, draggingElem) {
        draggingElem.style.position = 'relative ';
        draggingElem.style.zIndex = null;
        draggingElem.style.top = null;
        draggingElem.style.left = null;
        dropPlace.appendChild(draggingElem);
    }

    let draggingItem;
    let elemBelow;

    function mouseDown(event) {
        if (event.button !== 0) return;
        draggingItem = event.target;


        // draggingItem.classList.remove('letterCard_drag_active')
        // draggingItem.classList.add('letterCard_drag')

        // const draggingItemMarginTop = parseInt(getComputedStyle(draggingItem).marginTop.match(/\d+/)); // Если в стилях перетаскиваемого элемента используются margin
        // const draggingItemMarginLeft = parseInt(getComputedStyle(draggingItem).marginLeft.match(/\d+/)); // Если в стилях перетаскиваемого элемента используются margin
        const elemDraggingBanBorder = interakt_zadanie;//элемент за границы которого запрещён вылет перетаскиваемой фигуры
        const elemDraggingStartPlace = alphabetDragPlace;  //элемент первоначального расположения перетаскиваемых фигур (стартовое состояние)

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
            }
            else if (event.pageX > limits.left) {
                newLocation.x = event.pageX;
            }
            if (event.pageY > limits.bottom) {
                newLocation.y = limits.bottom;
            }
            else if (event.pageY > limits.top) {
                newLocation.y = event.pageY;
            }

            clickWithoutMove = false
            moveAt(newLocation.x, newLocation.y);

            if (!event.path.includes(draggingItem)) {
                window.addEventListener('pointerup', moveOut);
            }
            if (event.path.includes(draggingItem)) {
                window.removeEventListener('pointerup', moveOut);
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
            changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
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
            if (elemBelow.classList.contains('letterCardDrop_capital')) {
                elemBelow.style.backgroundColor = '#5a8efd';
                elemBelow.style.color = 'white';
                elemBelow.style.pointerEvents = 'none';
                draggingItem.classList.remove('letterCardDrag_small');
                draggingItem.classList.add('letterCardDrag_small_action');
                changeStylesAndAppend(elemBelow, draggingItem);
                elemBelow.childNodes[1].style.pointerEvents = 'auto';
            }
            else {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
            // localReset_lettersAll.forEach(elem => {
            //     elem.style.pointerEvents = 'auto';
            // })
        };


    };


    function checkButton_classList_changer() {

        if (check_your.classList.contains('check_your_active') && !startAction) {
            check_your.classList.remove('check_your_active');
            check_your.removeEventListener('click', checkPuzzle);
        }
        else if (!check_your.classList.contains('check_your_active') && startAction) {
            check_your.removeEventListener('click', checkPuzzle);
            check_your.classList.add('check_your_active');
            check_your.addEventListener('click', checkPuzzle);
        }
    }

    function resetPuzzle() {
        startAction = false;
        checkButton_classList_changer();
        feedBackChanger('reset');

        letterCard_drop.forEach(elem => {
            if (elem.childNodes.length > 2) {
                elem.childNodes[2].classList.add('letterCardDrag_small');
                elem.childNodes[2].classList.remove('letterCardDrag_small_action');
                changeStylesAndAppend(alphabetDragPlace, elem.childNodes[2]);
                elem.childNodes[1].style.pointerEvents = 'none';
                elem.style.backgroundColor = '#ffffff';
                elem.style.color = '#434553';
                elem.style.pointerEvents = 'auto';
            }
        })
    }

    function checkPuzzle() {
        let winCount = 0;
        letterCard_drop.forEach(elem => {
            if (elem.childNodes.length > 2 &&
                elem.childNodes[2].attributes.getNamedItem("drag-data").value ===
                elem.attributes.getNamedItem("drop-data").value
            ) {
                winCount++;
            }
        })
        if (winCount === alphabetSmallCapital.length) {
            feedBackChanger('win');
        }
        else {
            feedBackChanger('lose');
        }
    }

    function feedBackChanger(state) {
        if (startAction && state === 'win' || state === 'lose') {
            result.classList.add(`result_${state}`);
        }
        else {
            result.classList.remove(`result_win`);
            result.classList.remove(`result_lose`);
        }

    }

    function localReset_letter(event) {
        event.target.parentElement.childNodes[1].style.pointerEvents = 'none';
        event.target.parentElement.style.backgroundColor = '#ffffff';
        event.target.parentElement.style.color = '#434553';
        event.target.parentElement.childNodes[2].classList.add('letterCardDrag_small');
        event.target.parentElement.childNodes[2].classList.remove('letterCardDrag_small_action');
        event.target.parentElement.style.pointerEvents = 'auto';
        changeStylesAndAppend(alphabetDragPlace, event.target.parentElement.childNodes[2]);
    }

})()