(() => {
    const letters = [
        [{
            data: 'b',
            letter: "b",
            srcImage: 'Images_1/puzzles_img/singlePazzle_yellow.png'
        },
        {
            data: 'a',
            letter: "a",
            srcImage: 'Images_1/puzzles_img/singlePazzle_blue.png'
        },
        {
            data: 'l',
            letter: "l",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_red.png'
        },
        {
            data: 'l',
            letter: "l",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_green.png'
        }
        ],

        [{
            data: 'd',
            letter: "d",
            srcImage: 'Images_1/puzzles_img/singlePazzle_yellow.png'
        },
        {
            data: 'o',
            letter: "o",
            srcImage: 'Images_1/puzzles_img/singlePazzle_blue.png'
        },
        {
            data: 'l',
            letter: "l",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_red.png'
        },
        {
            data: 'l',
            letter: "l",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_green.png'
        }
        ],

        [{
            data: 'k',
            letter: "k",
            srcImage: 'Images_1/puzzles_img/singlePazzle_yellow.png'
        },
        {
            data: 'i',
            letter: "i",
            srcImage: 'Images_1/puzzles_img/singlePazzle_blue.png'
        },
        {
            data: 't',
            letter: "t",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_red.png'
        },
        {
            data: 'e',
            letter: "e",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_green.png'
        }
        ],

        [{
            data: 't',
            letter: "t",
            srcImage: 'Images_1/puzzles_img/singlePazzle_yellow.png'
        },
        {
            data: 'o',
            letter: "o",
            srcImage: 'Images_1/puzzles_img/singlePazzle_blue.png'
        },
        {
            data: 'y',
            letter: "y",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_red.png'
        }
        ],

        [{
            data: 'c',
            letter: "c",
            srcImage: 'Images_1/puzzles_img/singlePazzle_yellow.png'
        },
        {
            data: 'a',
            letter: "a",
            srcImage: 'Images_1/puzzles_img/singlePazzle_blue.png'
        },
        {
            data: 'r',
            letter: "r",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_red.png'
        }
        ],

        [{
            data: 'r',
            letter: "r",
            srcImage: 'Images_1/puzzles_img/singlePazzle_yellow.png'
        },
        {
            data: 'o',
            letter: "o",
            srcImage: 'Images_1/puzzles_img/singlePazzle_blue.png'
        },
        {
            data: 'b',
            letter: "b",
            srcImage: 'Images_1/puzzles_img/singlePuzzle_red.png'
        },
        {
            data: 'o',
            letter: "o",
            srcImage: 'Images_1/puzzles_img/singlePazzle_blue.png'
        },
        {
            data: 't',
            letter: "t",
            srcImage: 'Images_1/puzzles_img/singlePazzle_violet.png'
        }
        ]
    ];





    const wordPazzleWrappere = document.querySelector('.wordPazzleWrappere');
    const interakt_zadanie = wordPazzleWrappere.parentElement;
    const headCheck = interakt_zadanie.previousElementSibling;

    const drop = headCheck.querySelector('.drop');
    const check_your = headCheck.querySelector('.check_your');
    const result = headCheck.querySelector('.result');

    const wordPazzle_dropWrapper = document.querySelector('.wordPazzle_dropWrapper');
    const wordPazzle_letters = document.querySelector('.wordPazzle_letters');


    // drop.addEventListener('click', resetPuzzle);

    let startAction = false;
    let interaction = 0;
    let wordPazzleDropWord = null;
    let draggingPuzzle = null;
    let draggingElemsWidth = null;
    let wordPazzleLettersHeight = null;
    let wordPazzleDropsHeight = null;

    if (interaction === 0) {
        changeInteraction();
    }

    function changeInteraction() {
        wordPazzle_dropWrapper.style.backgroundColor = '#ffff';

        drop.addEventListener('click', resetPuzzle);
        letters[interaction].forEach((elem) => {
            const dropPalce = document.createElement('div');
            dropPalce.classList.add('wordPazzle_dropWord');
            // dropPalce.style.display = 'block';
            dropPalce.setAttribute('drop-data', elem.data);
            wordPazzle_dropWrapper.appendChild(dropPalce);
        });

        const randomLetters = [...letters[interaction]].sort(() => Math.random() > 0.5 ? 1 : -1);

        randomLetters.forEach((elem) => {
            const div = document.createElement('div');
            div.classList.add('wordPazzle_letter');
            div.setAttribute('drag-data', elem.data);

            const image = document.createElement('img');
            image.classList.add('wordPazzle_letter_img');
            image.setAttribute('src', elem.srcImage);
            image.setAttribute('alt', "puzzle");
            image.setAttribute('draggable', "false");

            const paragraph = document.createElement('p');
            paragraph.classList.add('wordPazzle_letter_p');
            paragraph.append(elem.data);

            div.appendChild(image);
            div.appendChild(paragraph);
            wordPazzle_letters.appendChild(div);

        });

        wordPazzleDropWord = document.querySelectorAll('.wordPazzle_dropWord');
        draggingPuzzle = document.querySelectorAll('.wordPazzle_letter');
        draggingElemsWidth = `${letters[interaction].length * (draggingPuzzle[0].clientWidth - draggingPuzzle[0].clientWidth * 0.2)}px`;
        wordPazzleLettersHeight = `${20 + draggingPuzzle[0].clientWidth}px`;
        wordPazzleDropsHeight = `${draggingPuzzle[0].clientWidth + draggingPuzzle[0].clientWidth * 0.1}px`;

        wordPazzle_letters.style.height = wordPazzleLettersHeight;
        wordPazzle_dropWrapper.style.width = draggingElemsWidth;
        wordPazzleDropWord.forEach(elem => {
            elem.style.height = wordPazzleDropsHeight;
        });

        draggingPuzzle.forEach((e) => {
            e.addEventListener('pointerdown', mouseDown);
        });
    }

    let draggingItem;
    let elemBelow;

    function mouseDown(event) {
        if (event.button !== 0) return;
        draggingItem = event.target;
        wordPazzle_dropWrapper.style.backgroundColor = '#ffff'
        const elemDraggingBanBorder = interakt_zadanie;//?????????????? ???? ?????????????? ???????????????? ???????????????? ?????????? ?????????????????????????????? ????????????
        const elemDraggingStartPlace = wordPazzle_letters;  //?????????????? ?????????????????????????????? ???????????????????????? ?????????????????????????????? ?????????? (?????????????????? ??????????????????)

        draggingItem.style.touchAction = 'none'; //???????????????????????? ??????????????(?????????? ???????????? ?? ?????????????????? ?? ?????????? ???????????? ??????????????) 
        draggingItem.style.cursor = 'grabbing';
        let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
        let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

        // ?????????????? ?????????????????? ???????????????????????????? ?????????? ???????????????????????????????? ???????????????? ???? ????????
        //  (???? ?????????????????? interact_zadanie - ???????????????? ???????????? ??????????)
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

            // ?????????????????? ?????????????? ???????????????????? ?????? ???????????? ?? ???????????? ???? ???????? (???? ????????????????????????????)

            // let currentDroppable = null;

            // let droppableBelow = elemBelow.closest('.droppable'); // ?????????? ???????????? ???????? 

            // if (currentDroppable != droppableBelow) {
            //     if (currentDroppable) { 
            // ???????????? ?????????????????? ???????????????? "????????????" ???? DROPPABLE
            //         leaveDroppable(currentDroppable);
            //     }
            //     currentDroppable = droppableBelow;
            // ???????????? ?????????????????? ????????????????, ?????????? ???? "??????????????" ?? ??????????????
            //     if (currentDroppable) {
            //         enterDroppable(currentDroppable);
            //     }
            // }
        }

        // ?????????? ?????? ?????????????????? ????????????
        function enterDroppable(currentDroppable) {
            // currentDroppable
        }
        // ???????? ???????????????? ???? ??????????
        function leaveDroppable(currentDroppable) {
            // currentDroppable
        }
        document.addEventListener('pointermove', onMouseMove);


        // ?????????? ???? ?????????? ???????????????????????????? ???????????? ?????????????? ???? ?????????????? ???????? ???????????????? ?? ?????????????????? ???????????? ????????????????
        function moveOut(e) {
            changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            window.removeEventListener('pointerup', moveOut);
            document.removeEventListener('pointermove', onMouseMove);
        }

        // ?????????? ???????????? ?? ???????? ?????? ???????????????????????????? ?? ???????????????????????? ???????????????? ???????????? ????????????????
        draggingItem.onpointerup = function () {
            draggingItem.style.cursor = 'grab';
            startAction = true;
            // checkButton_classList_changer();
            if (clickWithoutMove) {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
            document.removeEventListener('pointermove', onMouseMove);

            // ???????????? ?????????????????? ?????????????????? ???? ???????????? ???????? ?? ????????????????
            if (elemBelow.classList.contains('wordPazzle_dropWord')) {
                changeStylesAndAppend(elemBelow, draggingItem);
            }
            else {
                changeStylesAndAppend(elemDraggingStartPlace, draggingItem);
            }
            checkPuzzleWord();
        };

        function changeStylesAndAppend(dropPlace, draggingElem) {
            draggingElem.style.position = 'relative ';
            draggingElem.style.zIndex = null;
            draggingElem.style.top = null;
            draggingElem.style.left = null;
            dropPlace.appendChild(draggingElem);

        }

    };


    // function checkButton_classList_changer() {

    //     if (check_your.classList.contains('check_your_active') && !startAction) {
    //         check_your.classList.remove('check_your_active');
    //         check_your.removeEventListener('click', checkPuzzle);
    //     }
    //     else if (!check_your.classList.contains('check_your_active') && startAction) {
    //         check_your.removeEventListener('click', checkPuzzle);
    //         check_your.classList.add('check_your_active');
    //         check_your.addEventListener('click', checkPuzzle);
    //     }
    // }


    function resetPuzzle() {
        startAction = false;
        if (interaction >= letters.length) {
            const elemImg = wordPazzleWrappere.querySelector('.wordPazzle_wrapper_wellDone');
            wordPazzleWrappere.removeChild(elemImg);
        }
        interaction = 0;
        while (wordPazzle_dropWrapper.firstChild) {
            wordPazzle_dropWrapper.removeChild(wordPazzle_dropWrapper.lastChild);
        }
        while (wordPazzle_letters.firstChild) {
            wordPazzle_letters.removeChild(wordPazzle_letters.lastChild);
        }
        changeInteraction();
    }

    // function checkPuzzle() {
    //     let winCount = 0;
    //     wordPazzle_dropWrapper.childNodes.forEach(item => {
    //         if (item.childNodes.length > 0) {
    //             if (item.attributes.getNamedItem('drop-data').value === item.childNodes[0].attributes.getNamedItem('drag-data').value) {
    //                 winCount++;
    //             }
    //         }
    //     })

    //     if (winCount === letters[interaction].length) {
    //         feedBackChanger('win');
    //     }
    //     else {
    //         feedBackChanger('lose');
    //     }
    // }
    // const wrapperForDropHeight = getComputedStyle(draggingItem).height;


    function checkPuzzleWord() {
        let gameCount = 0;
        let winCount = 0;
        wordPazzle_dropWrapper.childNodes.forEach(item => {
            if (item.childNodes.length > 0) {
                gameCount++;
                if (item.attributes.getNamedItem('drop-data').value === item.childNodes[0].attributes.getNamedItem('drag-data').value) {
                    winCount++;
                }
            }
        });

        if (winCount === letters[interaction].length) {
            drop.removeEventListener('click', resetPuzzle);
            wordPazzle_dropWrapper.style.backgroundColor = '#B8F3C0';
            setTimeout(() => {
                while (wordPazzle_dropWrapper.firstChild) {
                    wordPazzle_dropWrapper.firstChild.remove();
                }
                interaction = interaction + 1;

                if (interaction < letters.length) {
                    draggingItem = null;
                    changeInteraction();
                }
                else {
                    imgChangerFeedBack();
                }
            }, 1000)

        }
        else if (gameCount === letters[interaction].length && winCount !== letters[interaction].length) {
            wordPazzle_dropWrapper.style.backgroundColor = '#E5797B';
        }


    }

    // function feedBackChanger(state) {
    //     if (startAction && state === 'win' || state === 'lose') {
    //         result.classList.add(`result_${state}`);
    //     }
    //     else {
    //         result.classList.remove(`result_win`);
    //         result.classList.remove(`result_lose`);
    //     }

    // }

    function imgChangerFeedBack() {
        drop.addEventListener('click', resetPuzzle);
        const div = document.createElement('div');
        div.classList.add('wordPazzle_wrapper_wellDone');

        const image = document.createElement('img');
        image.classList.add('wordPazzle_wellDoneParrot');
        image.setAttribute('src', 'Images_1/puzzles_img/wellDone_parrot_old.png');
        image.setAttribute('draggable', "false");

        const paragraph = document.createElement('p');
        paragraph.classList.add('wordPazzle_wellDOne_p');
        paragraph.append('WELL DONE');

        div.appendChild(image);
        div.appendChild(paragraph);

        wordPazzleWrappere.appendChild(div);
        wordPazzle_dropWrapper.style.height = wordPazzleDropsHeight;
    }
})()