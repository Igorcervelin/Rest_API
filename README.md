API REST

Back-end: Node.js + MySQL


Inicialização do back-end

    • cd back-end
    • npm install
    • npm start


Endpoints

    • URL: localhost:3000
    • GET (“/produtos”)
    • GET(“/:id_produto”)
    • POST (“/produtos”)
    • POST(“/expedicao”)
    • PATCH(“/produtos”)
    • DELETE(“/produtos”)

POST produtos

{
	“nome”: “produto”
	“gtin”: “ 7890000000000 ”
	“segmento”: “Ongrid” 
	“grupo”: “Inversor”
	“altura”: “2.5”
	“largura”: “2.5”
	“profundidade”: “2.5” 
	“peso_bru”: “1.0”
	“peso_liq”: “2.0”
}


POST expedicao

{
	“id_produto”: “1”
	“quantidade”: “10”
}


Requisitos

- Node.js
- Npm
