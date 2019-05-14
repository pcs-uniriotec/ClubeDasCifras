(function () {
    window.cifraNome

    window.setCifra = function setCifra(data) {
        localStorage.setItem('cifra', data)
    }

    window.getCifra = function getCifra() {
        return localStorage.getItem('cifra')
    }

})()