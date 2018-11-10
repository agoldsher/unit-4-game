var kuzco = {
    name: "Kuzco",
    image: "<img src='assets/images/Kuzco.jpg' height='100em'/>",
    health: 120,
    attack: 8,
    counterAttack: 15,
    box: function () {
        $("#kuzco").html("<h4>" + kuzco.name + "</h4>");
        $("#kuzco").append(kuzco.image);
        $("#kuzco").append("<h5>" + kuzco.health + "</h5>");
    }
}

var pacha = {
    name: "Pacha",
    image: "<img src='assets/images/Pacha.jpg' height='100em'/>",
    health: 100,
    attack: 6,
    counterAttack: 5,
    box: function () {
        $("#pacha").html("<h4>" + pacha.name + "</h4>");
        $("#pacha").append(pacha.image);
        $("#pacha").append("<h5>" + pacha.health + "</h5>");
    }
}

var yzma = {
    name: "Yzma",
    image: "<img src='assets/images/Yzma.jpg' height='100em'/>",
    health: 150,
    attack: 10,
    counterAttack: 10,
    box: function () {
        $("#yzma").html("<h4>" + yzma.name + "</h4>");
        $("#yzma").append(yzma.image);
        $("#yzma").append("<h5>" + yzma.health + "</h5>");
    }
}
var kronk = {
    name: "Kronk",
    image: "<img src='assets/images/Kronk.jpeg' height='100em'/>",
    health: 175,
    attack: 5,
    counterAttack: 25,
    box: function () {
        $("#kronk").html("<h4>" + kronk.name + "</h4>");
        $("#kronk").append(kronk.image);
        $("#kronk").append("<h5>" + kronk.health + "</h5>");
    }
}

var yourCharacter = "";
var $yourCharacter = $("#your-character");
var characterSelected = false;
var $enemies = $("#enemies");
var defender = "";
var $defender = $("#defender")
var defenderSelected = false;
var attackPowerUp = 1;




// set up the characters


kuzco.box()
pacha.box()
yzma.box()
kronk.box()


$('#kuzco, #pacha, #yzma, #kronk').on('click', function () {

    if (characterSelected === false) {

        if ($(this).attr("id") === "kuzco") {
            yourCharacter = kuzco;
            $enemies.append($("#pacha"));
            $enemies.append($("#yzma"));
            $enemies.append($("#kronk"));
        } else if ($(this).attr("id") === "pacha") {
            yourCharacter = pacha;
            $enemies.append($("#kuzco"));
            $enemies.append($("#yzma"));
            $enemies.append($("#kronk"));
        } else if ($(this).attr("id") === "yzma") {
            yourCharacter = yzma;
            $enemies.append($("#pacha"));
            $enemies.append($("#kuzco"));
            $enemies.append($("#kronk"));
        } else if ($(this).attr("id") === "kronk") {
            yourCharacter = kronk;
            $enemies.append($("#pacha"));
            $enemies.append($("#yzma"));
            $enemies.append($("#kuzco"));
        }
        characterSelected = true;
        $(".all-characters").empty();
        $yourCharacter.html("<h4>" + yourCharacter.name + "</h4>");
        $yourCharacter.append(yourCharacter.image);
        $yourCharacter.append("<h5>" + yourCharacter.health + "</h5>");

    } else if (characterSelected && defenderSelected === false) {

        if ($(this).attr("id") === "kuzco") {
            defender = kuzco;
            $("#kuzco").remove();
            $("#defender-text").empty();
        } else if ($(this).attr("id") === "pacha") {
            defender = pacha;
            $("#pacha").remove();
            $("#defender-text").empty();
        } else if ($(this).attr("id") === "yzma") {
            defender = yzma;
            $("#yzma").remove();
            $("#defender-text").empty();
        } else if ($(this).attr("id") === "kronk") {
            defender = kronk;
            $("#kronk").remove();
            $("#defender-text").empty();
        }
        defenderSelected = true;
        $defender.append("<h4>" + defender.name + "</h4>");
        $defender.append(defender.image);
        $defender.append("<h5>" + defender.health + "</h5>");
        // $defender.css("border", "2px solid teal");
    }
});

$('.attack').on('click', function () {
    if (defenderSelected && characterSelected) {
        var yourAttack = yourCharacter.attack * attackPowerUp;
        $("#defender-text").empty();
        $("#defender-text").html("You attacked " + defender.name + " for " + yourAttack + " damage. <br/>")
        $("#defender-text").append(defender.name + " attacked you back for " + defender.counterAttack + " damage.")
        defender.health = defender.health - yourAttack;
        yourCharacter.health = yourCharacter.health - defender.counterAttack;
        attackPowerUp++;
        $yourCharacter.find("h5").html(yourCharacter.health);
        $defender.find("h5").html(defender.health);

        if (defender.health <= 0) {
            $defender.empty();
            $("#defender-text").empty();
            $("#defender-text").html("You beat " + defender.name + "! <br/>");
            $("#defender-text").append("Pick a new defender.");
            defenderSelected = false;

        } else if (yourCharacter.health <= 0) {
            $("#defender-text").empty();
            $("#defender-text").html("You have been defeated!");
            $(".reset").show();
            characterSelected = false;

        }

    }


});

$(".reset").hide();
$(".reset").on('click', function () {
    location.reload();
});
