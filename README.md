# Full-Stack CRUD rakendus — React + TypeScript + Spring Boot

See projekt on lihtne, kuid professionaalselt üles ehitatud **full-stack CRUD rakendus**,  
kus **frontend on tehtud React + TypeScriptiga** ja **backend Spring Boot (Java)** abil.  
Projekt demonstreerib puhtat arhitektuuri, REST API loomist ning andmevoogu modernse  
frontend’i ja backend’i vahel.

---

## ✨ Funktsionaalsus
- Kasutaja lisamine (nimi + email)
- tulekulKõigi kasutajate kuvamine
- Kasutaja kustutamine ID alusel
- Täielik REST API (GET, POST, DELETE)
- In-memory andmesalvestus (andmebaasi tugi lisandub)
- Selge kihiline arhitektuur:
  - Controller → Service → Repository
- CORS seadistus (React ↔ Spring Boot)

---

## 🛠️ Tehnoloogiad

### Frontend
- React 18  
- TypeScript  
- Fetch API  
- Hooks / funktsionaalsed komponendid  

### Backend
- Java 17  
- Spring Boot 3.x  
- Spring Web  
- Lombok  
- Maven  

### Tööriistad
- Git & GitHub  
- VS Code  
- Postman / Thunder Client  

---

## 🚀 Kuidas projekti käivitada

### 1. Klooni repositoorium
``bash
git clone https://github.com/<sinu-kasutajanimi>/<sinu-repo>.git
cd <sinu-repo>

2. Backend (Spring Boot)
mvn spring-boot:run


Backend töötab aadressil:
http://localhost:8080

3. Frontend (React)
cd frontend
npm install
npm start


Frontend töötab aadressil:
http://localhost:3000

---

📡 API endpointid
GET /users

Tagastab kõik kasutajad.

POST /users

Lisab uue kasutaja.
Näide:

{
  "name": "Alice",
  "email": "alice@example.com"
}

DELETE /users/{id}

Kustutab kasutaja ID järgi.

📂 Projekti struktuur
projekt/
├── src/main/java/com/example/demo
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
├── pom.xml
└── README.md

🚧 Tulevased täiustused

Kasutaja uuendamine (PUT)

Vormivalideerimine (frontend + backend)

Päris andmebaas (H2 / PostgreSQL)

Autentimine (JWT)

Rakenduse deploy (frontend + backend)
