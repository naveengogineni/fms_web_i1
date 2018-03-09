angular.module('app', []);

angular
    .module('app')
    .controller('appCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$http'];



function AppCtrl($scope, $http) {
    $scope.getCurrentPosition = function() {
    cordovaGeolocationService.getCurrentPosition(function(position){
        alert(
            'Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n'
        );
    });
    }; 
    var vm = this;
    vm.fields = [
        {label: 'Name', key: 'name'},
        {label: 'Email', key: 'email'},
        {label: 'Phone', key: 'phone'}
    ];
    vm.record = {};
    vm.records = [];

    vm.handleError = function(response) {
        console.log(response.status + " - " + response.statusText + " - " + response.data);
    }

    vm.getAllRecords = function() {
        $http.get('/records').then(function(response){
            vm.records = response.data;
        }, function(response){
            vm.handleError(response);
        });
    }

    vm.getAllRecords();

    vm.editMode = false;
    vm.saveRecord = function() {
        if(vm.editMode) {
            vm.updateRecord();
        } else {
            vm.addRecord();
        }
    }

    vm.addRecord = function() {
        console.log(vm.record);
        $http.post('/records', vm.record).then(function(response){
            vm.record = {};
            vm.getAllRecords();
        }, function(response){
            vm.handleError(response);
        });
    }

    vm.updateRecord = function() {
        $http.put('/records/' + vm.record._id, vm.record).then(function(response){
            vm.record = {};
            vm.getAllRecords();
            vm.editMode = false;
        }, function(response){
            vm.handleError(response);
        });
    }

    vm.editRecord = function(record) {
        vm.record = record;
        vm.editMode = true;
    }

    vm.deleteRecord = function(recordid) {
        $http.delete('/records/'+recordid).then(function(response){
            console.log("Deleted");
            vm.getAllRecords();
        }, function(response){
            vm.handleError(response);
        })
    }

    vm.cancelEdit = function() {
        vm.editMode = false;
        vm.record = {};
        vm.getAllRecords();
    }

}
