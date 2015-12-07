//var g = G$('huy', 'bui');
//
//g.greet().setLang('en').greet(true).log();

$('#login').click(function() {
    
    var loginGreetr = G$($('#fname').val(), $('#lname').val());
    
    $('#logindiv').hide();
    
    loginGreetr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});