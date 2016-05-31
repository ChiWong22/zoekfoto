$(document).ready(function(){
    var zoeken;
    $('#opzoeken').click(function(){
        zoeken = $('#zoeken').val();
        fotosOphalen();
    });
    $('#zoeken').keydown(function(e){
        if(e.keyCode == 13){
            zoeken = $(this).val();
            fotosOphalen();
        }
    });
    
    function fotosOphalen(){
        var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=" + zoeken + "&jsoncallback=?"
        $.ajax(
            {
                dataType: 'json',
                method: 'GET',
                url: flickrURL,
                success: fotosVerwerken
            }
        )
    }
    
    function fotosVerwerken(data){
        console.log(data);
        $('#fotos').html("");
        for(var i=0; i<data.items.length; i++){
            var foto = data.items[i];
            var htmlCode = "<div class='houder'><div class='afbeelding'><a href='" + foto.link + "' target='_blank'><img src='" + foto.media.m + "' alt='" + foto.title + "'></a></div><h4>" + foto.link + "</h4></div>";
            $('#fotos').append(htmlCode);
        }
        $('#bron a').attr("href", data.link).text(data.title + " door Flickr.com");
        
    }
})