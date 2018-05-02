// CONNEXION & INSCRIPTION
var loginform = {
      
      init: function() {
        this.bindUserBox();
      },
      
      bindUserBox: function() {
        var result = {};
        
        $(".form").delegate("input[name='logemail']", 'blur',  function(){
          var $self = $(this);
          
          // ce grep serait remplacé par $ .post tp check db pour l'utilisateur
          result = $.grep(users, function(elem, i){  
            return (elem.name == $self.val());
          });
          
          // Ce serait rappel
          if (result.length === 1) {
            if( $("div.login-wrap").hasClass('register')) {
              loginform.revertForm();
              return;
            }
            else{
              return;
            }
          }
          
          if( !$("div.login-wrap").hasClass('register') ) {
            if ( $("input[name='logemail']").val().length > 4 )
              loginform.switchForm();
          }
    
        });
      },
      switchForm: function() {
        var $html = $("div.login-wrap").addClass('register');
        $html.children('h2').html('Register');
        $html.find(".form input[name='logpassword']").after("<input type='password' placeholder='Re-type password' name='rlogpassword' />");
        $html.find('button').html('Sign up');
      },
      revertForm: function() {
        var $html = $("div.login-wrap").removeClass('register');
        $html.children('h2').html('Login');
        $html.find(".form input[name='rlogpassword']").remove();
        $html.find('button').html('Sign in');
      },
      submitForm: function(){
        // ajax pour gérer le registre ou se connecter
      }
      
    }// Formulaire de connexion {}
    
    
   // Init formulaire de connexion
    loginform.init();
    
    
    // boîte d'alignement verticale  
    (function(elem){ 
        elem.css("margin-top", Math.floor( ( $(window).height() / 2 ) - ( elem.height() / 2 ) ) );
    }($(".login-wrap")));
    
    $(window).resize(function(){
        $(".login-wrap").css("margin-top", Math.floor( ( $(window).height() / 2 ) - ( $(".login-wrap").height() / 2 ) ) );
      
    });

