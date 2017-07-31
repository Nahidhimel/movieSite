
    (function start(){

        this.runFuntion = function(){
            alert('hey')
        };


    })();


    var goodMovie = {};
    goodMovie.runFunction = function(){
        alert('hey');
    };


    goodMovie.database = [];
    goodMovie.loadAssets = function(){
            $.getJSON( "db/movies.json", function( data ) {
                goodMovie.database = data;
                goodMovie.init();
            })
        };

    goodMovie.init  = function(){
        goodMovie.filterSlider();
        goodMovie.getTypes();
        goodMovie.getDirector();
        goodMovie.generateMarkup();
        };


    goodMovie.filterSlider = function(){
            $(".filter.open").on("click",function(){

                $('.filter_container').slideToggle(300,function(){
                    var btn = $(this).prev();
                    if(btn.hasClass('active')){
                        $('.filter.open').find('.btn_title').text('Filter by');
                        btn.removeClass('active');
                    }else{
                        $('.filter.open').find('.btn_title').text('Close');
                        btn.addClass('active');
                    }
                });

            });
        };


    goodMovie.getTypes = function() {
            var types = [];

            $.each( goodMovie.database, function( index ) {
                if($.inArray(goodMovie.database[index].type, types)){
                    var typeValue = goodMovie.database[index].type;
                    types.push(typeValue);
                    $('#categories').append('<option value="'+typeValue +'">' + typeValue + '</option>')
                }
            });
        };


    goodMovie.getDirector = function(){
            var db = goodMovie.database;
            var director = [];

            $.each(db,function (index) {
                if($.inArray(db[index].director, director)){
                    var directorValue = db[index].director;
                    director.push(directorValue);
                    $('#directors').append('<option value="'+ directorValue +'">' + directorValue + '</option>')
                }
            })

        };


    goodMovie.generateMarkup = function(){

            var template = '';

            $.each(goodMovie.database,function (index) {

                var db = goodMovie.database;
                var id = db[index].id;

                template +=  '<div class="movie_item" data-id="'+ id +'" >';
                template +=     '<div class="header">';
                template +=         '<div class="left">';
                template +=             '<img src="images/'+ db[index].img +'">';
                template +=         '</div>';
                template +=         '<div class="right">';
                template +=             '<h3>'+ db[index].title +'</h3>';
                template +=             '<div class="node">';
                template +=                 '<span>Year:</span> '+ db[index].year;
                template +=             '</div>';
                template +=             '<div class="node">';
                template +=                 '<span>Director:</span> '+ db[index].director;
                template +=             '</div>';
                template +=             '<div class="node">';
                template +=                 '<span>Type:</span> '+ db[index].type ;
                template +=             '</div>';
                template +=             '<div class="show_desc">See description</div>';
                template +=         '</div>';
                template +=     '</div>';
                template +=     '<div class="description">';
                template +=         '<strong>Description:</strong> ' + db[index].desc;
                template +=     '</div>';
                template += '</div>';
            });

            $('.movies_content').append(template);
            goodMovie.showDescription();
            goodMovie.startFilter();

        };

    goodMovie.showDescription = function(){

            $('.show_desc').on("click", function(){
                var $this = $(this);
                var parent = $(this).parents().eq(2);
                var element = parent.find('.description');

                element.slideToggle("300",function(){
                    if($this.hasClass('active')){
                        $this.text('See description').removeClass('active');
                    }else{
                        $this.text('Hide description').addClass('active');
                    }
                });

            });
        };


    goodMovie.startFilter = function(){

            $('select').on("change",function(){

                var db = goodMovie.database;
                var type = $('#categories').val();
                var director = $('#directors').val();
                var results = [];

                $.each(db,function (index) {
                    // CATEGORIES
                    if(db[index].type === type){
                        results.push(db[index].id);
                    }
                    if(db[index].director === director){
                        results.push(db[index].id);
                    }
                    //console.log(results);
                });

                if(results.length < 1){
                    $('.movie_item').show();
                }else{
                    var uniqueArray = [];
                    $.each(results, function(i, e) {
                        if ($.inArray(e, uniqueArray) == -1) uniqueArray.push(e);
                    });

                    $('.movie_item').hide();
                    $.each(uniqueArray, function(i,e) {
                        $('div[data-id="'+ e +'"]').show();
                    });
                }
            });

        };

    goodMovie.loadAssets();


