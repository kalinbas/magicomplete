$(function () {
    var options = [];
    var selectedOption = 0;
    var oldSearch = "";
    var service = null;
    
    var examples = [];    
    examples.push("Hello Magicomplete. (How are you?|How does this work?|What is it about?) I'm from [country] where are you from?\nI would like to talk about something else.\nI like movies similar to [title]");
    examples.push("(All movies | ([genre:genre1] [genre:genre2])?>{1,2} movies) ((where title contains [title])|(from [country])|(with color info [colorInfo])|(with production status [productionStatus])|(released between year [year:fromYear] and [year:toYear] | released in year [year])| (with a rating (of [rating]|between [rating:ratingFrom] and [rating:ratingTo]))){0,3} (ordered by [sort] [sortDirection]?)?");
   
    // setup service
    loadExample(0);
    setup();

    function setup() {
        var phrases = $("#definition").val().split('\n');
        var tokens = [{
            key: "title", type: "autocomplete", options: {
                minQueryLength: 2, sourceUrlTemplate: "http://www.omdbapi.com/?s={q}", sourceResultTransform: function (obj) {
                    return obj.Search ? obj.Search.map(function (o) { return o.Title; }) : [];
                }
            }
        },
            { key: "year", type: "number", options: { min: 1900, max: 2016, step: 1 } },
            { key: "rating", type: "number", options: { min: 1.0, max: 10.0, step: 0.1 } },
            { key: "genre", type: "string", options: { values: ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "Game-Show", "History", "Horror", "Music", "Musical", "Mystery", "News", "Reality-TV", "Romance", "Sci-Fi", "Sport", "Talk-Show", "Thriller", "War", "Western"] } },
            { key: "sort", type: "string", options: { values: ["Popularity", "A-Z", "User Rating", "Num Votes", "US Box Office", "Runtime", "Year", "United States Release Date"] } },
            { key: "sortDirection", type: "string", options: { values: ["descending"] } },
            { key: "colorInfo", type: "string", options: { values: ["Color", "Black & White", "Colorized", "ACES"] } },
            { key: "productionStatus", type: "string", options: { values: ["Post-production", "Filming", "Pre-production", "Released",  "Completed", "Script", "Optioned Property", "Announced", "Treatment/outline", "Pitch", "Turnaround", "Abandoned", "Delayed", "Indefinitely Delayed", "Active", "Unknown"] } },
            { key: "country", type: "string", options: { values: ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"] } }
      	 
       ];


        // uses service from magicomplete library
        service = new magicomplete.Service({
            phrases: phrases,
            tokens: tokens
        });

        // set empty text
        $("#search").val("");

        $("#search").focus();

        // initial search
        search("");
    }

    function loadExampleAndSetup(nr) {
        loadExample(nr);
        setup();
    }

    function loadExample(nr) {
        $("#definition").val(examples[nr]);
    }        

    $("#example0Btn").click(function() { loadExampleAndSetup(0); });
    $("#example1Btn").click(function() { loadExampleAndSetup(1); });

    $("#search").keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        // tabulator handling
        if (code == 9) {
            e.preventDefault();
            if (options.length > 0 && selectedOption === options.length) {
                $('#search').val(options[0] + " ");
            }
            search($("#search").val());
        }
    });

    $("#search").keyup(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 40) {
            selectedOption = (selectedOption + 1) % (options.length + 1);
            selectOption(selectedOption);
        } else if (code == 38) {
            selectedOption = (selectedOption - 1 + options.length + 1) % (options.length + 1);
            selectOption(selectedOption);
        } else if (code == 9) {
            //do nothing - already handled
        } else if (code == 37 || code == 39) {
            // left / right, ignore
        } else if (code == 13) {
            search($("#search").val());
        } else {
            search($("#search").val());
        }
    });

    $("#definitionBtn").click(function () {
        setup();
    });

    function selectOption(i) {
        $("#suggestions > li").removeClass("selected");
        if (i == options.length) {
            $('#search').val(oldSearch);
            setFirstSearchShadow();
        } else {
            $($("#suggestions > li").get(i)).addClass("selected");
            var text = $($("#suggestions > li").get(i)).text() + " ";
            $('#search').val(text);
            $('#searchShadow').val(text);
        }
    }

    function setFirstSearchShadow() {
        if (options.length > 0 && options[0].startsWith(oldSearch)) {
            $('#searchShadow').val(options[0]);
        } else {
            $('#searchShadow').val(oldSearch);
        }
    }

    function search(q) {

        $(".loader").show();

        service.search(q).then(function (result) {
            $(".loader").hide();

            options = result.autocomplete;
            selectedOption = options.length;
            oldSearch = q;

            $('#suggestions').empty();

            $('#searchContainer').removeClass("isReady isInvalid");
            $('#result').empty();

            if (result.isReady) {
                $('#searchContainer').addClass("isReady");
                $('#searchShadow').val("");
                $('#result').text(JSON.stringify(result.captures, null, ' '));
            } else if (result.isInvalid) {
                $('#searchContainer').addClass("isInvalid");
                $('#searchShadow').val("");
            } else if (result.isAnything) {
                $('#searchShadow').val(oldSearch.trim() + " ...");
            } else {
                setFirstSearchShadow();
            }

            $.each(options, function (index, value) {
                $('#suggestions').append($("<li>").text(value).click(function () {
                    $('#search').val(value + " ");
                    search(value);
                    $("#search").focus();
                }));
            });
        });
    }
});