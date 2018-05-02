$(function(){
    /* variables globales */
var general={
    donut: 0, // nbr de donut
generateur: 0, // generateur de donut
generateurachete : 0 //nbre de generateur achete 
}
 //on met à jour toutes les 5secondes
 setInterval(function(){
     ajour();
 },1000);
 /*
 fonction ajour()
 fonction de mise à jour. 
 elle appelle les differentes fonctions de mise à jour
 */
 
 function ajour(){
    donutajour(); //mise a  jour des donuts
    generateurajour(); //mise à jour des generateurs
    generateurreqajour(); //mise à jour des donuts requis pour acheter un générateur
}

function ajoutdon(){
    ++general.donut;
}

function ajoutgenerateur(){
    var nbrereq = 30 + general.generateurachete * 10;
    if(general.donut>=nbrereq){
        ++general.generateur;
        ++general.generateurachete;
        general.donut-=nbrereq;
    }
}
function donutajour(){
    general.donut+=general.generateur;
    $("#nbredonut").text(general.donut);
}
function generateurreqajour(){
    $("#nbregenerateurreq").text(30 + general.generateurachete * 10);
    }
function generateurajour(){
    general.generateur=general.generateurachete;
    $("#nbregenerateur").text(general.generateur);
}

//action du clique sur donut
$("#donut").click(function(){
    ajoutdon();
})
//action du clique sur le generateur
$("#generateur").click(function(){
    ajoutgenerateur();
})

 });