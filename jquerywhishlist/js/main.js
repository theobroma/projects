(function(window, document) {
    var wishes = {

            wishes : [
                {title:"Я хотел бы быть котом. Остальные два потом...", completed:false, cid : 1465330576000 },
                {title:"Cкушать гору шашлычка", completed:true, cid : 1465330589000},
                {title:"и еще поспать чуток", completed:true, cid : 1465330595000},
                {title:"и еще", completed:false, cid : 1465330595001},
            ],
            init : function () {
                this.cacheDom();
                this.bindEvents();
                this.render();
            },
            cacheDom : function () {
                this.$el = $("#wishlist");
                this.$tpl = $("#wish-tpl");
                this.$ul = this.$el.find(">ul");
                this.$input = this.$el.find("input");
                this.$addBtn = this.$el.find("#add");
                this.$todoCount = $("#todo-count");
                this.$clearCompleted = $("#clear-completed");
            },
            bindEvents : function () {
                this.$addBtn.on("click", this.addWish.bind(this));
                this.$input.on("keypress", function(e) {
                    if(e.which == 13) {
                        wishes.addWish();
                    };

                });
                this.$clearCompleted.on("click", this.destroyCompleted.bind(this));

                this.$ul.on("click","li button", this.deleteWish.bind(this));
                this.$ul.on("click", "li input:checkbox" , this.toggle.bind(this));
                this.$ul.on("click","li", this.edit.bind(this));
                this.$ul.on('keyup', '.edit', this.editKeyup.bind(this));
                this.$ul.on('focusout', '.edit', this.update.bind(this));
            },
            render : function () {
                var data = {
                    wishes: this.wishes ,
                };
                var source   = this.$tpl.html();
                var template = Handlebars.compile(source);
                var html    = template(data);
                this.$ul.html(html);
                this.renderFooter();

                this.clear();
                this.cacheDom();

                console.log(JSON.stringify(this.wishes) );

            },
            renderFooter: function () {
                    var Count = this.getActiveWishes().length;
                    this.$todoCount.html(Count);
            },
            clear : function () {
                this.$input.val("").focus();
            },
            validate : function (item) {
                var itemLength = /[а-яА-ЯёЁa-zA-Z0-9]{3,}/i.test(item);
                var onlyDigits = /^[0-9]*$/i.test(item);
                var errorMessage ='';
                if (!itemLength) {
                    errorMessage += "Слишком короткое желание: минимум 3 символа!"
                }
                if (onlyDigits) {
                    errorMessage += "Должны быть не только цифры, но и буквы!"
                }

                return {
                    valid: itemLength && !onlyDigits,
                    errorMessage : errorMessage
                }
            },

            addWish : function () {
                var title = this.$input.val();
                var formGroup = this.$input.closest(".form-group");

                if ( this.validate(title).valid ) {
                    this.$input.closest(".form-group").removeClass("has-error");
                    formGroup.find(".control-label").text("");
                    this.set({title:title});
                } else {
                    formGroup.addClass("has-error");
                    formGroup.find(".control-label").text(this.validate(title).errorMessage);
                }
            },
            toggle: function (e) {
                let i = this.indexFromEl(e);
                this.wishes[i].completed = !this.wishes[i].completed;
                console.log('test');
                this.render();
            },
            set : function (obj) {
                    cid = this.uuid();
                    var wish = {
                        title:obj.title,
                        completed: false,
                        cid : cid
                    };
                    this.wishes.push(wish);
                    this.render();
            },
            indexFromEl : function (e){
                let cid =$(e.target).closest("li").data("cid");
                var wishes = this.wishes;
                var i = wishes.length;
                while (i--) {
                    if (wishes[i].cid === cid) {
                        return i;
                    }
                }
            },
            deleteWish : function (event) {
                var $remove = $(event.target).closest("li");
                var i = this.$ul.find("li").index($remove);
                this.wishes.splice(i,1);
                this.render();
            },
            getActiveWishes: function (){
                var activeWishes = this.wishes.filter(function(wish) {
                    if(wish.completed == false){
                        return wish;
                    };
                });
                return activeWishes;
            },
            getCompletedWishes: function (){
                var completedWishes = this.wishes.filter(function(wish) {
                    if(wish.completed == true){
                        return wish;
                    };
                });
                return completedWishes;
            },
            destroyCompleted: function () {
                var activeWishes = this.wishes.filter(function(wish) {
                    if(wish.completed == false){
                        return wish;
                    };
                });
                this.wishes = activeWishes;
                this.render();
            },
            edit: function (e) {
                var $input = $(e.target).closest('li').addClass('editing').find('.edit');
                $input.val($input.val()).focus();
            },
            editKeyup: function (e) {
                if (e.which === 13) {
                    e.target.blur();
                }

                if (e.which === 27) {
                    $(e.target).data('abort', true).blur();
                }
            },
            update: function (e) {
                var $input = $(e.target).closest('li').removeClass('editing').find('.edit');

                var el = e.target;
                var $el = $(el);
                var val = $el.val().trim();
                /*if (!val) {
                    this.destroy(e);
                    return;
                }*/

                if ($el.data('abort')) {
                    $el.data('abort', false);
                } else {
                    wishes.wishes[this.indexFromEl(e)].title = val;
                }

                this.render();
        },
            uuid: function () {
                var ms = Date.parse(new Date);
                var r1 = Math.random() * 1000 | 0;
                var r2 = Math.random() * 1000 | 0;
                return ms+"-"+r1+"-"+r2;
            }
    }
    wishes.init();

})(window, document);
