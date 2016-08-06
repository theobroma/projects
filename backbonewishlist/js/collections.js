
var WishesCollection = Backbone.Collection.extend({
    model: Wish,
    localStorage: new Backbone.LocalStorage("SomeCollection"),
    completed: function () {
        return this.where({completed: true});
    },
    remaining: function () {
        return this.where({completed: false});
    }
});


var wishesCollection = new WishesCollection([
    {
        title: 'Я хотел бы быть котом...',
        completed: false
    },
    {
        title: 'Cкушать гору шашлычка',
        completed: false
    },
    {
        title: 'и еще поспать чуток',
        completed: false
    }
]);
