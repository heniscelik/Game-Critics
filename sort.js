function sirala() {
    const oyunListesi = document.getElementById('oyun-listesi');
    const oyunlar = Array.from(oyunListesi.getElementsByTagName('li'));

    oyunlar.sort((a, b) => {
        const puanA = parseFloat(a.getAttribute('data-puan'));
        const puanB = parseFloat(b.getAttribute('data-puan'));
        return puanB - puanA;
    });

    // Sıralanmış oyunları tekrar listeye ekliyo
    oyunlar.forEach(oyun => oyunListesi.appendChild(oyun));
}
