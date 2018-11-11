// setting up objects for each of the characters
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

// setting up global variables to set the character you will be using and the character that will serve as the defender
var yourCharacter = "";
var defender = "";
// setting up booleans for the selection of characters and the attack button to work properly
var characterSelected = false;
var defenderSelected = false;
// setting up the three areas where the characters should be on the HTML page
var $enemies = $("#enemies");
var $defender = $("#defender")
var $yourCharacter = $("#your-character");
// setting up an power up for your character
var attackPowerUp = 1;




// putting the characters on the page
kuzco.box()
pacha.box()
yzma.box()
kronk.box()

// SELECTING YOU CHARACTER
// when any of the characters are clicked, the character you chose will be selected as your character
// all others will be moved to the enemies spot
// this will cause the characterSelected boolean to be true and no other character can be added to your character
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
        // the area that contained the characters originally is cleared
        // your character will be moved into the appropriate stop
        characterSelected = true;
        $(".all-characters").empty();
        $yourCharacter.html("<h4>" + yourCharacter.name + "</h4>");
        $yourCharacter.append(yourCharacter.image);
        $yourCharacter.append("<h5>" + yourCharacter.health + "</h5>");

        // SELECTING THE DEFENDER
        // if you have selected a character but not a defender, the defenderSelected boolean will be false
        // at this point you can click on the characters in the enemies area, you will set your defender and that character will be emptied from the enemy area
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
        // since you selected a defender, the defenderSelected boolean is true
        // and that character will be moved to the defender spot
        defenderSelected = true;
        $defender.append("<h4>" + defender.name + "</h4>");
        $defender.append(defender.image);
        $defender.append("<h5>" + defender.health + "</h5>");

    }
});
// ATTACKING THE DEFENDER
// if you character and the defender are selected, then you can push the attack button
$('.attack').on('click', function () {
    if (defenderSelected && characterSelected) {
        // everytime you attack your attack power is being multiplied by an integer which is increasing
        // both characters asset are pulled from the object and displayed 
        var yourAttack = yourCharacter.attack * attackPowerUp;
        $("#defender-text").empty();
        $("#defender-text").html("You attacked " + defender.name + " for " + yourAttack + " damage. <br/>")
        $("#defender-text").append(defender.name + " attacked you back for " + defender.counterAttack + " damage.")
        // the health is updated
        defender.health = defender.health - yourAttack;
        yourCharacter.health = yourCharacter.health - defender.counterAttack;
        attackPowerUp++;
        // I had to pull the number from the character information on the HTML, I couldn't seem to change it though the object =(
        // the health is updated on the HTML
        $yourCharacter.find("h5").html(yourCharacter.health);
        $defender.find("h5").html(defender.health);

        // WIN OR LOSE SCENARIOS
        // if the defender health reaches or goes below 0 before you or at the same time as you, the defender spot will be emptied 
        // and you will be prompted to selected a new defender
        if (defender.health <= 0) {
            $defender.empty();
            $("#defender-text").empty();
            $("#defender-text").html("You beat " + defender.name + "! <br/>");
            $("#defender-text").append("Pick a new defender.");
            // you can selected a new defender now that this boolean is false, see "selecting the defender" section
            defenderSelected = false;

            // if your health reaches or goes below 0, then it will tell you that you have been 
            // defeated and show a button to reset
            // the reset will just reload the page
        } else if (yourCharacter.health <= 0) {
            $("#defender-text").empty();
            $("#defender-text").html("You have been defeated!");
            $(".reset").show();
        }

    }


});

$(".reset").hide();
$(".reset").on('click', function () {
    location.reload();
});
