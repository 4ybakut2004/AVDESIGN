class Api::V1::VideosController < ApplicationController
  skip_before_filter :verify_authenticity_token,
                     :if => Proc.new { |c| c.request.format == 'application/json' }

  #respond_to :json

  def index
    simple_json_response("Videos") do
      Video.get_page(params[:page] || 1, params[:count] || Video::PER_PAGE)
        .order("created_at DESC")
        .collect { |v| v.info }
    end
  end

  def installation_videos
    simple_json_response("Videos") do
      Video.installation.get_page(params[:page] || 1, params[:count] || Video::PER_PAGE)
        .order("created_at DESC")
        .collect { |v| v.info }
    end
  end

  def tutorial_videos
    simple_json_response("Videos") do
      Video.tutorial.get_page(params[:page] || 1, params[:count] || Video::PER_PAGE)
        .order("created_at DESC")
        .collect { |v| v.info }
    end
  end

  def overview_videos
    simple_json_response("Videos") do
      Video.overview.get_page(params[:page] || 1, params[:count] || Video::PER_PAGE)
        .order("created_at DESC")
        .collect { |v| v.info }
    end
  end

end