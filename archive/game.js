// variables

var kuzcoHP = 120;
var $kuzcoHP = $("#kuzco-hp");
var pachaHP = 100;
var $pachaHP = $("#pacha-hp");
var yzmaHP = 150;
var $yzmaHP = $("#yzma-hp");
var kronkHP = 175;
var $kronkHP = $("#kronk-hp");
var yourCharacter = "";
var $yourCharacter = $(".your-character");
var characterSelected = false;
var $enemies = $(".enemies");
var defender = "";
var $defender = $(".defender")
var defenderSelected = false;


function startGame() {
    $kuzcoHP.html(kuzcoHP);
    $pachaHP.html(pachaHP);
    $yzmaHP.html(yzmaHP);
    $kronkHP.html(kronkHP);
}
// functions
// select characters allows you to make a selection for your character (only one selection)
// based off your selection, you can now chose from the enemies
// once you select one enemy(the defender), you are set up to push the attack button
// PS, I didn't know how to make all other nonclicked elements move to the enemies section so this code became very not DRY, =(
function selectCharacters() {
    $('#kuzco, #pacha, #yzma, #kronk').on('click', function () {
        if (characterSelected === false) {
            if ($(this).attr("id") === "kuzco") {
                yourCharacter = $("#kuzco");
                $($yourCharacter).append(yourCharacter);
                $($enemies).append($("#pacha"));
                $($enemies).append($("#yzma"));
                $($enemies).append($("#kronk"));
                characterSelected = true;
            } else if ($(this).attr("id") === "pacha") {
                yourCharacter = $("#pacha");
                $($yourCharacter).append(yourCharacter);
                $($enemies).append($("#kuzco"));
                $($enemies).append($("#yzma"));
                $($enemies).append($("#kronk"));
                characterSelected = true;
            } else if ($(this).attr("id") === "yzma") {
                yourCharacter = $("#yzma");
                $($yourCharacter).append(yourCharacter);
                $($enemies).append($("#pacha"));
                $($enemies).append($("#kuzco"));
                $($enemies).append($("#kronk"));
                characterSelected = true;
            } else if ($(this).attr("id") === "kronk") {
                yourCharacter = $("#kronk");
                $($yourCharacter).append(yourCharacter);
                $($enemies).append($("#pacha"));
                $($enemies).append($("#yzma"));
                $($enemies).append($("#kuzco"));
                characterSelected = true;
            }

            console.log(yourCharacter);
        } else if (characterSelected && defenderSelected === false) {
            defender = $(this);
            $($defender).append(defender);
            defenderSelected = true;
            console.log(defender);
            console.log(yourCharacter);
        }
        else {
        }
    });
}


$("button").on("click", function () {
    if (defenderSelected) {
        console.log(yourCharacter);

        var yourHealth = $yourCharacter.attr("id");
        console.log(yourHealth);
        // kuzcoHP = yourHealth - 10;
        // $kuzcoHP.html(kuzcoHP);
        // console.log(kuzcoHP);
    }
});





// // call functions
startGame();
selectCharacters();
// attack();