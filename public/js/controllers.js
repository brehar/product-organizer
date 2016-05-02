'use strict';

var app = angular.module('productsApp');

var data = [
    {
        name: "iPad Pro",
        description: "9.7-inch display",
        price: 599,
        imageUrl: 'http://www.bhphotovideo.com/images/images2500x2500/apple_128gb_ipad_pro_wi_fi_1185490.jpg',
        category: 'Electronics'
    },
    {
        name: 'Nineteen Eighty-Four',
        description: 'A dystopian novel by English author George Orwell published in 1949.',
        price: 7.78,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/1984first.jpg/220px-1984first.jpg',
        category: 'Books'
    },
    {
        name: 'Oppland',
        description: '3-drawer chest with 1 door, brown stained ash veneer',
        price: 249,
        imageUrl: 'http://www.ikea.com/us/en/images/products/oppland-drawer-chest-with-door__0324185_PE517292_S4.JPG',
        category: 'Furniture'
    }
];

var categories = ['Electronics', 'Books', 'Furniture'];

app.controller('homeCtrl', function($scope) {
    $scope.products = data;
    $scope.categories = categories;

    $scope.addProduct = function() {
        $scope.products.push($scope.newProduct);
        $scope.newProduct = {};
    };

    $scope.sort = {
        active: '',
        descending: undefined
    };

    $scope.changeSorting = function(column) {
        var sort = $scope.sort;

        if (sort.active == column) {
            sort.descending = !sort.descending;
        } else {
            sort.active = column;
            sort.descending = false;
        }
    };

    $scope.getIcon = function(column) {
        var sort = $scope.sort;

        if (sort.active == column) {
            return sort.descending ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';
        }

        return 'glyphicon-star';
    };
});

app.controller('detailsCtrl', function($scope, $state) {
    $scope.product = data[$state.params.id];
    $scope.categories = categories;

    $scope.removeProduct = function() {
        data.splice($state.params.id, 1);
        $state.go('home');
    };

    $scope.editProduct = function() {
        $scope.productToEdit = angular.copy($scope.product);
    };

    $scope.saveEdit = function() {
        data[$state.params.id] = $scope.productToEdit;
        $scope.productToEdit = null;
        $state.go('home');
    };

    $scope.cancelEdit = function() {
        $scope.productToEdit = null;
    };
});

app.controller('statsCtrl', function($scope) {
    $scope.numProducts = data.length;

    var sumValue = 0;
    
    for (var i = 0; i < data.length; i++) {
        sumValue += data[i].price;
    }
    
    $scope.sum = sumValue;
    
    var summaryData = [];
    
    for (var i = 0; i < categories.length; i++) {
        var totalItems = 0;
        var totalValue = 0;

        for (var j = 0; j < data.length; j++) {
            if (data[j].category === categories[i]) {
                totalItems++;
                totalValue += data[j].price;
            }
        }

        summaryData[i] = {
            name: categories[i],
            items: totalItems,
            value: totalValue
        };
    }
    
    $scope.summary = summaryData;
});