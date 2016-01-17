class Api::V1::FinishedObjectsController < ApplicationController
  skip_before_filter :verify_authenticity_token,
                     :if => Proc.new { |c| c.request.format == 'application/json' }

  #respond_to :json

  def index
    simple_json_response("FinishedObjects") do
      FinishedObject.includes(:finished_object_images)
        .get_page(params[:page] || 1, params[:count] || 6)
        .collect do |o|
          info = {
            name: o.name,
            object_type: o.object_type,
            short_description: o.short_description,
            description: o.description,
            preview: o.preview.url(:preview)
          }
        end
    end
  end

end