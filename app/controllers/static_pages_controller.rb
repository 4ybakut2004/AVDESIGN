class StaticPagesController < ApplicationController

  def index
  end

  def home
    render 'static_pages/home', layout: false
  end
end