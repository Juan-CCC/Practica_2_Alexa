/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const GET_FACT_MSG_EN = "Here's a fun fact about Ferrari: ";
const GET_FACT_MSG_ES = "Aquí tienes un dato curioso sobre Ferrari: ";

const dataEN = [
    'Ferrari was founded by Enzo Ferrari in 1939, from the racing division of Alfa Romeo.',
    'The famous prancing horse logo was a symbol used by an Italian WWI pilot, Francesco Baracca.',
    'The first road car produced by Ferrari was the 125 S in 1947.',
    'Ferrari has won the 24 Hours of Le Mans 9 times, with their first victory in 1949.',
    'Ferrari is the only team to have competed in every season of the Formula One World Championship since its inception in 1950.',
    'The Ferrari F40 was the last model approved by Enzo Ferrari before his death in 1988.',
    'The Ferrari Museum in Maranello attracts over 500,000 visitors annually.',
    'Ferrari is known for producing limited models like the LaFerrari, of which only 499 units were made.'
];

const dataES = [
    'Ferrari fue fundada por Enzo Ferrari en 1939, a partir del departamento de carreras de Alfa Romeo.',
    'El famoso logo del caballo rampante fue un símbolo utilizado por un piloto italiano de la Primera Guerra Mundial, Francesco Baracca.',
    'El primer automóvil de carretera producido por Ferrari fue el 125 S en 1947.',
    'Ferrari ha ganado las 24 Horas de Le Mans 9 veces, siendo su primera victoria en 1949.',
    'Ferrari es el único equipo que ha competido en todas las temporadas del Campeonato Mundial de Fórmula 1 desde su inicio en 1950.',
    'El Ferrari F40 fue el último modelo aprobado por Enzo Ferrari antes de su muerte en 1988.',
    'El Museo Ferrari en Maranello atrae a más de 500,000 visitantes al año.',
    'Ferrari es conocido por producir modelos limitados como el LaFerrari, del cual solo se fabricaron 499 unidades.'
    
];


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es') 
            ? '¡Hola! Bienvenido a automoviles ferrari. Solicita un dato curioso diciendo "cuéntame algo de Ferrari".'
            : 'Hello! Welcome to ferrari automobiles. Request a curious fact by saying "tell me something about Ferrari".';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FrasesIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const data = locale.startsWith('es') ? dataES : dataEN;
        const randomFact = data[Math.floor(Math.random() * data.length)];
        const speakOutput = locale.startsWith('es') ? GET_FACT_MSG_ES + randomFact : GET_FACT_MSG_EN + randomFact;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('Would you like to hear another fact?') // If you want to keep the session open
            .getResponse();
    }
};


const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es') 
            ? 'Puedes solicitarme un dato curioso diciendo "dame un dato de Ferrari".'
            : 'You can ask me for a curious fact by saying "give me a fact about Ferrari".';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es') ? '¡Adiós!' : 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const speakOutput = locale.startsWith('es') 
            ? 'Lo siento, tuve problemas para hacer lo que pediste. Por favor, inténtalo de nuevo.'
            : 'Sorry, I had trouble doing what you asked. Please try again.';
        
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FrasesIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();