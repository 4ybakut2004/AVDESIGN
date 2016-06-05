class Api::V1::FinishedObjectsController < ApplicationController
  skip_before_filter :verify_authenticity_token,
                     :if => Proc.new { |c| c.request.format == 'application/json' }

  #respond_to :json

  def index
    simple_json_response("FinishedObjects") do
      FinishedObject.includes(:finished_object_images)
        .get_page(params[:page] || 1, params[:count] || 6)
        .order("created_at DESC")
        .collect do |o|
          info = {
            id: o.id,
            name: o.name,
            object_type: o.object_type,
            short_description: o.short_description,
            preview: o.preview.url(:preview)
          }
        end
    end
  end

  def show
    simple_json_response("FinishedObjectInfo") do
      o = FinishedObject.find(params[:id])
      info = {
        id: o.id,
        name: o.name,
        description: o.description,
        finished_object_images: o.finished_object_images.order("created_at ASC").collect do |oi|
          oi_info = {
            id: oi.id,
            thumb: oi.image.url(:thumb),
            image: oi.image.url
          }
        end
      }
    end
  end

end