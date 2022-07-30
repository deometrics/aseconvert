const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const files = document.getElementById("files");
    const formData = new FormData();
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("https://aseconvert.herokuapp.com/upload", {
        method: 'POST',
        body: formData,
    })
        .then((res) => {
            res.text().then((text) => {
                $('#home').fadeOut(700, function(){
                    const el = document.createElement('div')
                    el.setAttribute('id', 'group')
                    $(el).addClass('flex gap-2 w-max flex-wrap justify-start m-auto')
                    $(el).css("display", "none");
                    el.innerHTML = text;
                    const body = document.querySelector('body')
                    body.append(el)
                    $('#group').find('div').addClass('copyable bg-stone-300 border-l-[25px] py-2 px-4 my-2 mx-4 rounded w-[225px]')
                    $('.copyable').each(function(){
                        let text = $(this).text()
                        let regularExpression = /#(?:[0-9a-fA-F]{3}){1,2}/g 
	                    let hexCode = text.match(regularExpression);
                        $(this).addClass(`border-[${hexCode}]`)
                    });
                    
                    $(el).fadeIn()
                });
            })
        })
        .catch((err) => ("Error occured", err));
}