function VideoService($resource) {
    function Video() {
        this.service = $resource('/api/v1/videos/:id.json', {}, {query: {isArray: false}});
    }

    Video.prototype.all = function(page, onSuccessCallback, onErrorCallback) {
        return this.service.query({ page: page }, onSuccessCallback, onErrorCallback);
    };

    return new Video();
}