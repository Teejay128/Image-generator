const genButton = document.querySelector('#generate');

genButton.addEventListener('click', generate);

function generate(e){
    e.preventDefault();

    document.querySelector

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt == ""){
        alert('Please add a prompt!!');
        return;
    }

    generateImageRequest(prompt, size);

}

async function generateImageRequest(prompt, size){
    try{
        document.querySelector('body').style.opacity = 0.5
        
        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if(!response.ok){
            document.querySelector('body').style.opacity = 1.0
            throw new Error('Your image could not be generated');
        }

        const data = await response.json();
        console.log(data);
        const imageUrl = data.image;

        const image = `
            <img src="${imageUrl}" id="image" alt="Generated image goes here" class="img-fluid" width="256" height="256">
        `

        document.querySelector('#img-container').innerHTML = image;


        document.querySelector('body').style.opacity = 1.0

    }
    catch(error){
        alert(error);
        document.querySelector('body').style.opacity = 1.0
    }
}
