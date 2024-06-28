document.getElementById('yorum-formu').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Form verilerini al
    const isim = document.getElementById('isim').value;
    const yorum = document.getElementById('yorum').value;
    const puan = document.getElementById('puan').value;
    
    // Yorum elemanını oluştur
    const yorumElemani = document.createElement('li');
    yorumElemani.innerHTML = `<strong>${isim}</strong> - Puan: ${puan}<br>${yorum}`;
    
    // Yorum elemanını yorum listesine ekle
    document.getElementById('yorum-listesi').appendChild(yorumElemani);
    
    // Formu temizle
    document.getElementById('yorum-formu').reset();
});