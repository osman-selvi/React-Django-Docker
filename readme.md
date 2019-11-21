# drf-react
django rest framework ve react kullanım için hazır araç gereç ve örnek bir blog uygulaması

## Neler var
* Arkayüzde için django, django-rest-framework, postgresql
* Önyüz için react
* Geliştirme ve canlı ortam için docker

### Kurulum
İnternet yavaş olduğu için imajı dockera pushlayamadım. O yüzden lokalde build etmelisiniz.

```
cp .env.example .env
cd assets && npm install
```

### Çalıştırma
Geliştirme ortamı (attach)
```
make development
cd assets && npm run start (yeni bir terminal)
```

Canlı ortam (nginx)
```
cd assets && npm run build
make production 
```