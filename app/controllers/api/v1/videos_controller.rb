class Api::V1::VideosController < ApplicationController
  skip_before_filter :verify_authenticity_token,
                     :if => Proc.new { |c| c.request.format == 'application/json' }

  #respond_to :json

  def index
    simple_json_response("FinishedObjects") do
      Video.get_page(params[:page] || 1, params[:count] || 6)
        .order("created_at DESC")
        .collect do |v|
          info = {
            id: v.id,
            link: v.link,
            name: v.name
          }
        end
    end
  end

end