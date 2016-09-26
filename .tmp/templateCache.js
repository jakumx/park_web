angular.module('parkWebApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/header.html',
    "<div class=\"navbar\"> <div class=\"navbar-inner\"> <div class=\"left\"> <a href=\"#\" class=\"link icon-only open-panel\"><i class=\"icon icon-form-name\"></i></a> </div> <div class=\"center\"> {{ parkName }} </div> </div> </div>"
  );


  $templateCache.put('views/left_panel.html',
    "<div class=\"page-content\"> <div class=\"row\"> <div ng-if=\"!connectedTwitter\" class=\"col-100\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h1>Usuario</h1> </div> <button ng-click=\"connectButton()\" type=\"button\" class=\"btn btn-primary\">Connect Twitter</button> </div> </div> <div ng-if=\"connectedTwitter\" class=\"col-100\"> <div class=\"content-block-title\"> <img ng-src=\"{{ profileImage }}\" alt=\"\"> {{ profileName }} </div> <button ng-click=\"signOut()\" type=\"button\" class=\"btn btn-primary\">Sign Out</button> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div ng-if=\"!park\"> <div class=\"row\"> <div class=\"col-100\"> <span class=\"progressbar-infinite\"></span> </div> </div> </div> <div ng-if=\"park\"> <div class=\"row\"> <div class=\"col-100\"> <h1>{{ park.name }}</h1> <h2>{{ park.description }}</h2> </div> </div> <div class=\"row no-gutter\"> <div class=\"col-100\"> <ul rn-carousel rn-carousel-auto-slide=\"8\" rn-carousel-transition=\"fadeAndSlide\" rn-carousel-duration=\"2000\"> <li ng-repeat=\"image in park.images\"> <div class=\"layer\"> <img class=\"image\" ng-src=\"{{ image }}\" width=\"100%\"> </div> </li> </ul> </div> </div> <div class=\"content-block\"> <div class=\"row\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h2> Estas son algunas de nuestras atracciones <div class=\"list-block media-list\"> <ul> <li ng-repeat=\"game in games\"> <a href=\"#\" ng-click=\"openImgBrowser(game.id)\" class=\"item-link item-content\"> <div class=\"item-inner\"> <div class=\"item-title-row\"> <div class=\"item-title\"> {{ game.name }} </div> <div class=\"item-after\"> Ver imagenes </div> </div> <div class=\"item-text\"> {{ game.description }} </div> </div> </a> </li> </ul> </div> </h2> </div> </div> </div> <div class=\"row\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h2>Nuestros Usuarios dicen:</h2> </div> <div ng-if=\"rdmSrsFlag\" class=\"list-block media-list\"> <ul> <li ng-repeat=\"user in randomUsers\"> <div class=\"item-content\"> <div class=\"item-media\"> <img ng-src=\"{{ user.picture.medium }}\" alt=\"\"> </div> <div class=\"item-inner\"> <div class=\"item-inner-row\"> <div class=\"item-title\" style=\"text-transform: uppercase\"> {{ user.name.first }} {{ user.name.last }} </div> </div> <div class=\"item-text\"> {{ user.comment }} </div> </div> </div> </li> </ul> </div> <div ng-if=\"!rdmSrsFlag\"> <span class=\"progressbar-infinite\"></span> </div> </div> </div> <div class=\"row no-gutter\"> <div class=\"col-100\"> <div class=\"content-block-title\"> <h2>Nos encontramos en:</h2> </div> </div> <div class=\"col-100\"> <div map-lazy-load=\"https://maps.google.com/maps/api/js\"> <ng-map center=\"{{ park.lat }}, {{ park.lng }}\" zoom=\"5\"> <marker title=\"{{ park.name }}\" position=\"{{ park.lat }}, {{ park.lng }}\"></marker> </ng-map> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/right_panel.html',
    "<div class=\"page-content\"> <div class=\"content-block-title\"> Navegación </div> <div class=\"list-block\"> <ul> <li> <a ui-sref=\"app.locat\">asdfasd</a> <a ui-sref=\"app.locat\" class=\"item-link item-content\"> <span class=\"item-title\"> Ubicaciones </span> </a> </li> <li> <a href=\"\" class=\"item-link item-content\"> <span class=\"item-title\"> Atracciones </span> </a> </li> <li> <a href=\"\" class=\"item-link item-content\"> <span class=\"item-title\"> Contacto </span> </a> </li> </ul> </div> </div>"
  );

}]);
