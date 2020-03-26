const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
    this.day = null;
    this.where = null;
    this.lengthMiles = null;
    this.loggedInUser = false;
    this.indexOfEditFormToShow = null;

    const controller = this;

    this.signup = function(){
        $http({
            url:'/users',
            method: 'POST',
            data: {
                username: this.signupUsername,
                password: this.signupPassword
            }
        }).then(function(response){
            controller.loggedInUser = response.data;
        })
    }

    this.login = function(){
        $http({
            url:'/session',
            method:'POST',
            data:{
                username: this.loginUsername,
                password: this.loginPassword
            }
        }).then(function(response){
            if(response.data.username){
                controller.loggedInUser = response.data
            } else {
                controller.loginUsername = null;
                controller.loginPassword = null;
            }
        });
    }

    this.logout = function(){
        $http({
            url:'/session',
            method:'DELETE'
        }).then(function(){
            controller.loginUsername = null;
            controller.loginPassword = null;
            controller.signupUsername = null;
            controller.signupPassword = null;
            controller.loggedInUser = false;
        })
    }

    this.createWalk = function(){
        $http({
            method:'POST',
            url:'/walks',
            data: {
                day:this.day,
                lengthMiles:this.lengthMiles,
                where:this.where
            }
        }).then(
            function(response){
                controller.day = null;
                controller.lengthMiles = null;
                controller.where = null;
                controller.getWalks();
            },
            function(error){
                console.log(error);
            }
        )
    }

    this.deleteWalk = function(walk){
        $http({
            method:'DELETE',
            url: '/walks/' + walk._id
        }).then(
            function(){
                controller.getWalks();
            },
            function(error){

            }
        )
    }


    this.editWalk = function(walk){
        $http({
            method:'PUT',
            url:'/walks/'+walk._id,
            data: {
                day: this.updatedDay,
                lengthMiles:this.updatedlengthMiles,
                where:this.updatedwhere,
            }
        }).then(
            function(response){
                controller.day = null;
                controller.lengthMiles = null;
                  controller.where = null;
                controller.getWalks();
            },
            function(error){
                console.log(error);
            }
        )
    }

    this.getWalks = function(){
        $http({
            method:'GET',
            url:'/walks'
        }).then(
            function(response){
                // console.log(this);
                // console.log(controller);
                // console.log(response);
                controller.walks = response.data;
            },
            function(error){

            }
        )
    }

    this.getWalks();

    $http({
        method:'GET',
        url:'/session'
    }).then(function(response){
        if(response.data.username){
            controller.loggedInUser = response.data
        }
    })
}]);
