function FinishedObjectService($resource) {
    function FinishedObject() {
        this.service = $resource('/api/v1/finished_objects/:id.json', {}, {query: {isArray: false}});
    }

    FinishedObject.prototype.all = function(page, onSuccessCallback, onErrorCallback) {
        return this.service.query({ page: page }, onSuccessCallback, onErrorCallback);
    };

    FinishedObject.prototype.get = function(id, onSuccessCallback, onErrorCallback) {
        return this.service.get({ id: id }, onSuccessCallback, onErrorCallback);
    };

    return new FinishedObject();
}