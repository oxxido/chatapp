import socketFactory from './socket.factory';


const ServicesModule = angular.module('ServicesModule', [])
    .factory('socket', socketFactory)
    ;

export default ServicesModule;
