var AddView = Backbone.View.extend({
    template: _.template( $('#form-tpl').html() ),
    initialize: function () {
        wishesCollection.fetch();
    },
    events:{
        'click #add':'addWish',
        'keypress #input': 'createOnEnter',
        'click #clear':'clearStorage'
    },
    render: function() {
        this.$el.html( this.template() );
        return this;
    },
    addWish : function (e){
        this.collection.create({title: this.$("#input").val(), completed: false});
        this.clearInput();
    },
    createOnEnter : function (e){
        if (e.which === 13 && this.$("#input").val().trim()) {
           this.addWish();
        }
    },

    clearStorage : function () {
         localStorage.clear();
         this.collection.reset();
         this.render();
    },
    clearInput : function () {
        this.$("input").val("").focus();
    }

});


var WishView = Backbone.View.extend({
    tagName: 'li',

    template: _.template( $('#wish-tpl').html() ),

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events:{
       "click .del-btn":"deleteWish",
       "click .toggle":"toggle"
    },

    render: function() {
        this.$el.toggleClass('completed', this.model.get('completed'));
        console.log("wishview render");
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    },

    deleteWish : function (e){
        this.model.destroy();
    },
    toggle : function (e){
       this.model.set("completed", !this.model.get("completed"));
       this.model.save();
    }
});

var WishListView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
        this.collection.on('add', this.addOne, this);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'reset', function(){console.log('collection reset');});
        this.listenTo(this.collection, 'remove', this.render);
    },
    render: function() {
        this.$el.empty();
        this.collection.each(this.addOne,this);
        return this;
    },
    addOne: function (wish) {
        var wishView = new WishView({ model: wish });
        this.$el.append(wishView.render().el);
    },
});

var StatsView = Backbone.View.extend({
    tagName: 'ul',
    statsTemplate: _.template($('#stats-template').html()),
    initialize: function () {
       this.listenTo(this.collection, 'all', this.initCap);
    },
    initCap : function () {
        this.render();
    },
    events:{
        "click #clear-completed":"clearCompleted"
    },
    render: function() {
        var remaining = wishesCollection.remaining().length;
        this.$el.html( this.statsTemplate({remaining: remaining}) );
        return this;
    },
    addWish : function (e){
        console.log(e);
    },
    clearCompleted : function (){
        console.log('clearCompleted');
        _.invoke(wishesCollection.completed(), 'destroy');
        return false;
    }

});




var addView = new AddView({ collection: wishesCollection });
$('#addwish-mount').append(addView.render().el);

var wishesView = new WishListView({ collection: wishesCollection });
$('#whishlist-mount').append(wishesView.render().el);

var statsView = new StatsView({ collection: wishesCollection });
$('#stats-mount').append(statsView.render().el);

