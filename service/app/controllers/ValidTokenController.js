require('dotenv').config();
const jwt = require('jsonwebtoken');
const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT;

const ValidTokenController = {
    validToken(req, res, next){
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token) {
                jwt.verify(token, PRIVATE_KEY_JWT, function(err, decoded) {      
                    if (err) {
                        return res.json({ type: "E", message: 'Falha ao tentar autenticar o token!' });    
                    } else {
                        //se tudo correr bem, salvar a requisição para o uso em outras rotas
                        req.decoded = decoded;    
                        next();
                    }
                });
        } else {
                // se não tiver o token, retornar o erro 403
                return res.status(403).send({ 
                    type: "E", 
                    message: '403 - Forbidden' 
                });       
        }
    }  
};
module.exports = ValidTokenController;