module ApplicationHelper

  # Унификация ответа от сервера
  def render_response(status, success, info, data, errors)
    render :status => status,
           :json => { :success => success,
                      :info => info,
                      :data => data,
                      :errors => errors }
  end

  # Отправляет ответ клиенту с данными, возвращенными в get_method.
  def simple_json_response(success_info, &get_method)
    get_method ||= lambda{ [] }

    begin
      render_response(200, true, success_info, get_method.call, {})
    rescue UserException => e
      render_response(200, false, e.message, e.data, e.object)
    rescue Exception => e
      render_response(500, false, e.message, nil, {})
    end
  end
end
