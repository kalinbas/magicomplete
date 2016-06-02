// use service from magicomplete library
var service = new Service.Service({ phrases: ["test|other|whatever"], tokens: {} });

$(function () {
    var options = [];
    var selectedOption = 0;
    var oldSearch = "";

    // initial search
    search("");
    $("#search").focus();

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
                $('#result').text(JSON.stringify(result.captures));
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