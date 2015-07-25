// Backbone refactor of the chatterbox

var Message = Backbone.Model.extend({
  url : 'http://127.0.0.1:3000/classes/chatterbox/',

  idAttribute: 'objectId',

  defaults: {
    username: '',
    text:   '',
  },
});

var Messages = Backbone.Collection.extend({
  model: Message,
  url : 'http://127.0.0.1:3000/classes/chatterbox/',

  load: function(){
    this.fetch({data: {order: '-createdAt'}});
  },

  parse: function(response, options) {
    var reversed = response.results.reverse()
    return reversed;
  }

});

var FormView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('sync', this.stopSpinner, this);
  },

  events: {
    'submit #send': 'submitMessage'
  },

  submitMessage: function(e){
    e.preventDefault();

    this.startSpinner();

    var $text = this.$('#message');

    this.collection.create({
      username: window.location.search.substr(10),
      text: $text.val(),
    });

    $text.val('');
  },

  stopSpinner: function(){
    this.$('.spinner img').fadeOut();
    this.$('form input[type=submit]').attr('disabled', null);
  },

  startSpinner: function(){
    this.$('.spinner img').show();
    this.$('form input[type=submit]').attr('disabled', 'true');
  }

});


var MessageView = Backbone.View.extend({

  template: _.template('<div class="chat"> \
                        <div class="user"><%- username %></div> \
                        <div class="text"><%- text %><div> \
                        <div>'),

  render: function(){
    this.$el.html(this.template(this.model.attributes));  // {data: this.model.attributes}
    return this.$el;
  }
});

var MessagesView = Backbone.View.extend({

  initialize: function(){

    this.collection.on('add', this.renderMessage, this);
  },

  render: function(){
    this.collection.each(this.renderMessage, this);
  },

  renderMessage: function(message){
    console.log(this.collection);
    var messageView = new MessageView({model: message});
    var $html = messageView.render();
    this.$el.prepend($html);
  }
});

