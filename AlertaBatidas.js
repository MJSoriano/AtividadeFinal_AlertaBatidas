var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-east-1'
});

exports.handler = function(event, context) {
    
    let batidas = JSON.parse(event.Records[0].body).batidas;

    var parametroEmail = {Destination: {ToAddresses: ["soriano.dev.2016@gmail.com"]},Message: {Body: {Text: {Data: "Alerta de batimento alto"}},Subject: {Data: "Alerta - Coisa Sensor"}}, Source: "soriano.dev.2016@gmail.com"    };
        
    // Função para enviar email
    function alertar(parametroEmail) {
        var email = ses.sendEmail(parametroEmail, function(err, data){
            if(err) console.log(err);
            else {
                console.log("Médico alertado");
                context.succeed(event);
            }
        });
    }
    
if (batidas > 120) {
        alertar()
    }
};