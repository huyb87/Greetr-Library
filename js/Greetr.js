/*!
 * Greetr JavaScript Library v1.0
 *
 * Includes jQuery
 * http://jquery.com/
 *
 * By: Huy Bui
 * Date: Dec-05-2015
 */


(function(global, $) {
    
    // 'new' an object so we dont always have to type 'new' when using Greetr
	var Greetr = function(firstName, lastName, language) {
		return new Greetr.init(firstName, lastName, language);
	}
    
    // These variables are hidden within the scope of the IIFE and never directly accesible
    var supportedLangs = ['en', 'vn', 'kr', 'es'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        vn: 'Chao',
        kr: 'Annyeonghaseyo'
    };
    
    
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        vn: 'Xin Chao',
        kr: 'Mannaseo Bangawo'
    };
    
    
    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio Sesion',
        vn: 'Di vo roi',
        kr: 'Logeu-in'
    }
    
    
    // prototype that all following created objects inherit methods from
	Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function() {
            // check if language entered is supported
            // references the externally inaccessible 'supportLangs' within the closure
            if ( supportedLangs.indexOf(this.language) === -1 ) {
                throw 'Invalid Language';    
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        // chainable methods that return their own containing object
        greet: function(formal) {
            
            var msg;
            
            //if undefined or null it will be coerced to 'false'
            if ( formal ) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            if ( console ) {
                console.log(msg);
            }
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function() {
            if ( console ) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            // make chainable
            return this;
        },
        
        setLang: function(lang) {
            // set the language
            this.language = lang;
            
            // validate
            this.validate();
            
            // make chainable
            return this;
            
        },
        
        HTMLGreeting: function(selector, formal ) {
            
            if ( !$ ) {
                throw 'jQuery not loaded';
            }
            
            if ( !selector ) {
                throw 'Missing jQuery selector';
            }
            
            
            // determine the message
            var msg;
            if ( formal ) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            
            // make chainable
            return this;
        }
        
    };
    
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
	Greetr.init = function(firstName, lastName, language) {

		var self = this;
		self.firstName = firstName || 'empty';
		self.lastName = lastName || 'empty';
		self.language = language || 'en';
        
        // validate after creation
        self.validate();
        
	}
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
	Greetr.init.prototype = Greetr.prototype;
    
    // attach Greetr to the global object, and provide a shorthand 'G$' for ease of use
	global.Greetr = global.G$ = Greetr;

}(window, jQuery));