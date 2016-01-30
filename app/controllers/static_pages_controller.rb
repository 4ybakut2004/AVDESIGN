class StaticPagesController < ApplicationController

  def index
    render "layouts/application"
  end

  def home
    render 'static_pages/home', layout: false
  end

  def home_dialog
    render 'static_pages/_home_dialog', layout: false
  end
end