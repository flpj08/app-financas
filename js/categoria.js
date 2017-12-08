var app = angular.module('categoriasApp', []);

app.controller('CategoriasController', function ($scope, CategoriasService) {
    $scope.categoria = {};
    listar();

    function listar() {
        CategoriasService.listar().then(function (resposta) {
            $scope.categorias = resposta.data;
        });
    }

    $scope.salvar = function (categoria) {
        CategoriasService.salvar(categoria).then(listar);
        $scope.categoria = {};
    };

    $scope.editar = function (categoria) {
        $scope.categoria = angular.copy(categoria);
    };

    $scope.excluir = function (categoria) {
        CategoriasService.excluir(categoria).then(listar);
    };

    $scope.cancelar = function () {
        $scope.categoria = {};
    };
});

app.service('CategoriasService', function ($http) {
    var api = 'http://localhost:8080/GerenciadorFinanceiro/webresources/categorias';

    this.listar = function () {
        return $http.get(api);
    };

    this.salvar = function (categoria) {
        if (categoria.id) {
            return $http.put(api + '/' + categoria.id, categoria);
        } else {
            return $http.post(api, categoria);
        }
    };

    this.excluir = function (categoria) {
        return $http.delete(api + '/' + categoria.id, categoria);
    };
});