class Api::V1::MediaLibraryImagesController < ApplicationController
  skip_before_filter :verify_authenticity_token,
                     :if => Proc.new { |c| c.request.format == 'application/json' }

  #respond_to :json

  # Загружает изображение на сервер
  def create
    # Параметры от клиента
    file = image_params[:upload]
    funcNum = params["CKEditorFuncNum"]

    # Параметры ответа
    message = nil
    url = nil

    if file.nil?
      "Выберите файл"
    else
      image = MediaLibraryImage.new(image: file)
      if image.save
        url = image.image.url(:medium)
        message = ""
      else
        message = "Ошибка при загрузке изображения"
      end
    end

    respond_to do |format|
      format.html { render :text => "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction(#{funcNum}, '#{url}', '#{message}');</script>" }
    end
  end

  private

    def image_params
      params.permit(:upload)
    end
end
