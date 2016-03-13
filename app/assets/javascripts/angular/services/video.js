function VideoService($resource, $http) {
    function Video() {
        this.service = $resource('/api/v1/videos/:id.json', {}, {query: {isArray: false}});
    }

    Video.prototype.all = function(page, onSuccessCallback, onErrorCallback) {
        return this.service.query({ page: page }, onSuccessCallback, onErrorCallback);
    };

    Video.prototype.installation_videos = function(page, onSuccessCallback, onErrorCallback) {
        return $http.get('/api/v1/installation_videos.json', {params: {page: page}})
                    .then(function(data) {
                      onSuccessCallback(data.data);
                    }, onErrorCallback);
    };

    Video.prototype.toturial_videos = function(page, onSuccessCallback, onErrorCallback) {
        return $http.get('/api/v1/tutorial_videos.json', {params: {page: page}})
                    .then(function(data) {
                      onSuccessCallback(data.data);
                    }, onErrorCallback);
    };

    Video.prototype.overview_videos = function(page, onSuccessCallback, onErrorCallback) {
        return $http.get('/api/v1/overview_videos.json', {params: {page: page}})
                    .then(function(data) {
                      onSuccessCallback(data.data);
                    }, onErrorCallback);
    };

    return new Video();
}