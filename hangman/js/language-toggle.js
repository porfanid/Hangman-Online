function toggleLanguage(lang) {
    const elementsToToggleEL = document.querySelectorAll('.lang-el');
    const elementsToToggleEN = document.querySelectorAll('.lang-en');

    if (lang === 'el') {
        elementsToToggleEL.forEach(element => {
            element.classList.remove('hidden');
        });
        elementsToToggleEN.forEach(element => {
            element.classList.add('hidden');
        });
    } else if (lang === 'en') {
        elementsToToggleEL.forEach(element => {
            element.classList.add('hidden');
        });
        elementsToToggleEN.forEach(element => {
            element.classList.remove('hidden');
        });
    }
}

function togglePasswordVisibility() {
    const inputWord = document.getElementById('input-word');
    const hiddenText = document.getElementById('hidden');

    if (inputWord.type === 'text') {
        inputWord.type = 'password';
        hiddenText.innerText = 'Απόκρυψη';
    } else {
        inputWord.type = 'text';
        hiddenText.innerText = 'Εμφάνηση';
    }
}
