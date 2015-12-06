class StaticPagesController < ApplicationController

  def index
    render "layouts/application"
  end

  def home
    render 'static_pages/home', layout: false
  end
end