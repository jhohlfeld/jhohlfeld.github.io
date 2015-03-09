(function() {
  'use strict';

  // set up other ui elements

  var contactForm = $('.ui.modal.form');
  contactForm.modal();
  contactForm.form({
    email: {
      identifier: 'EMAIL',
      rules: [{
        type: 'email',
        prompt: 'Please enter your email address'
      }]
    },
    firstname: {
      identifier: 'FIRSTNAME',
      rules: [{
        type: 'empty',
        prompt: 'Please enter your first name'
      }]
    },
    lastname: {
      identifier: 'LASTNAME',
      rules: [{
        type: 'empty',
        prompt: 'Please enter your last name'
      }]
    }
  }, {
    on: 'submit'
  });

  // register contact form buttons

  $('.contact').on('click', function(e) {
    contactForm.modal('show');
  });

  var actionForm = $('.ui.action.input');
  actionForm.form({
    email: {
      identifier: 'email',
      rules: [{
        type: 'email',
        prompt: 'Please give a valid email address'
      }]
    }
  }, {
    on: 'submit',
    onSuccess: function(e) {
      contactForm.form('clear').form('set value', 'EMAIL', actionForm.form('get value', 'email')).modal('show');
    }
  });

  actionForm.on('submit', function(e) {
    e.preventDefault();
  });

  // email obfuscator

  function unCryptMailto(s) {
    var n = 0;
    var r = '';
    for (var i = 0; i < s.length; i++) {
      n = s.charCodeAt(i);
      if (n >= 8364) {
        n = 128;
      }
      r += String.fromCharCode(n - 1);
    }
    return r;
  }

  function linkToUnCryptMailto(s) {
    location.href = unCryptMailto(s);
  }

  // set up routing

  var Router = Backbone.Router.extend({
    routes: {
      ':section': 'navigate'
    },

    navigate: function(section) {
      var target = $('a[name="#/' + section + '"]');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - $('header').height(),
        }, 500);
      }
    }
  });

  new Router();

  Backbone.history.start();

  $('.ui.dropdown').dropdown();
})();
