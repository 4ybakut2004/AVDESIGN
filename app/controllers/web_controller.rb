class WebController < ApplicationController
  http_basic_authenticate_with :name => ENV["WEB_USER"], :password => ENV["WEB_PASSWORD"]
end