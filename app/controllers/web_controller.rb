class WebController < ApplicationController
  http_basic_authenticate_with :name => ENV["WEB_USER"], :password => env["WEB_PASSWORD"]
end