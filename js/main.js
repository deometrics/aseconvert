const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const files = document.getElementById("files");
    const formData = new FormData();
    for (let i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }

    fetch("https://aseconvert.herokuapp.com/upload", {
        method: 'POST',
        body: formData,
    })
        .then((res) => {
            res.text().then((text) => {
                $('#home').fadeOut(700, function () {
                    const el = document.createElement('div')
                    el.setAttribute('id', 'group')
                    $(el).addClass('flex gap-2 w-max flex-wrap justify-center m-auto')
                    $(el).css("display", "none");
                    el.innerHTML = text;
                    const body = document.querySelector('body')
                    body.append(el)
                    $('#group').find('div').addClass('copyable bg-stone-300 border-l-[25px] py-2 px-4 my-2 mx-4 rounded w-[225px]')
                    $('.copyable').each(function () {
                        let text = $(this).text()
                        let regularExpression = /#(?:[0-9a-fA-F]{3}){1,2}/g
                        let hexCode = text.match(regularExpression);
                        let cardIndex = 0
                        $(this).attr('id', `card${cardIndex}`)
                        $(this).addClass(`border-[${hexCode}]`)
                        $(this).append('<div class="copyButton float-right w-6 opacity-30 pl-1"> <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z"/></svg> </div>')
                        this.addEventListener('click', copyText)
                        function copyText() {
                            navigator.clipboard.writeText(text);
                            $(document).bind('mousemove', function (e) {
                                $('#successCopy').css({
                                    left: e.pageX + 5,
                                    top: e.pageY - 20,
                                });
                            });
                            $('#successCopy').css({
                                "border-color": hexCode
                            });
                            $('#successCopy').delay(100).fadeIn(100).delay(800).fadeOut(100)
                        }
                    });
                    $(el).fadeIn()
                });
            })
        })
        .catch((err) => ("Error occured", err));
}