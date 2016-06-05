RailsAdmin.config do |config|
  config.main_app_name = ["Audio Video"]

  config.authorize_with do
    authenticate_or_request_with_http_basic('Login required') do |username, password|
      username == ENV["ADMIN_USER"] &&
      password == ENV["ADMIN_PASSWORD"]
    end
  end

  config.included_models = ["Section", "HeaderImage", "PlanningImage", "ComponentsImage",
    "Sponsor", "Video", "FinishedObject", "FinishedObjectImage", "Article"]

  config.model "Section" do
    object_label_method do
      :name
    end

    weight 1

    list do
      include_fields :name, :description
      sort_by :order

      field :name do
        label "Название"
      end

      field :description do
        label "Описание"
      end
    end

    edit do
      include_fields :name, :description

      field :name do
        label "Название"
        read_only true
      end

      field :description, :ck_editor do
        label "Описание"
      end
    end

    show do
      include_fields :name, :description

      field :name do
        label "Название"
      end

      field :description do
        label "Описание"
      end
    end
  end

  config.model "HeaderImage" do
    object_label_method do
      :id
    end

    weight 2

    list do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    show do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    edit do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end
  end

  config.model "PlanningImage" do
    object_label_method do
      :id
    end

    weight 3

    list do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    show do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    edit do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end
  end

  config.model "ComponentsImage" do
    visible do
      false
    end

    object_label_method do
      :id
    end

    weight 4

    list do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    show do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    edit do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end
  end

  config.model "Sponsor" do
    object_label_method do
      :name
    end

    weight 5

    list do
      include_fields :name, :image

      field :name do
        label "Название"
      end

      field :image do
        label "Изображение"
      end
    end

    show do
      include_fields :name, :image

      field :name do
        label "Название"
      end

      field :image do
        label "Изображение"
      end
    end

    edit do
      include_fields :name, :image

      field :name do
        label "Название"
      end

      field :image do
        label "Изображение"
      end
    end
  end

  config.model "Video" do
    object_label_method do
      :link
    end

    weight 6

    list do
      include_fields :link, :name, :video_type

      field :link do
        label "ID"
      end

      field :name do
        label "Название"
      end

      field :video_type do
        label "Тип видео"
        pretty_value do
          video_types = Video.video_types
          if value == video_types[:installation]
            Video::INSTALLATION
          elsif value == video_types[:tutorial]
            Video::TUTORIAL
          elsif value == video_types[:overview]
            Video::OVERVIEW
          else
            value
          end
        end
      end
    end

    show do
      include_fields :link, :name, :video_type

      field :link do
        label "ID"
      end

      field :name do
        label "Название"
      end

      field :video_type do
        label "Тип видео"
        pretty_value do
          video_types = Video.video_types
          if value == video_types[:installation]
            Video::INSTALLATION
          elsif value == video_types[:tutorial]
            Video::TUTORIAL
          elsif value == video_types[:overview]
            Video::OVERVIEW
          else
            value
          end
        end
      end
    end

    edit do
      include_fields :link, :name, :video_type

      field :link do
        label "ID"
      end

      field :name do
        label "Название"
      end

      field :video_type do
        label "Тип видео"
        formatted_value do
          video_types = Video.video_types
          if value == video_types[:installation]
            Video::INSTALLATION
          elsif value == video_types[:tutorial]
            Video::TUTORIAL
          elsif value == video_types[:overview]
            Video::OVERVIEW
          else
            value
          end
        end
      end
    end
  end

  config.model "FinishedObject" do
    object_label_method do
      :name
    end

    weight 7

    list do
      include_fields :name, :object_type, :preview

      field :name do
        label "Название"
      end

      field :object_type do
        label "Тип объекта"
        pretty_value do
          object_types = FinishedObject.object_types
          if value == object_types[:flat]
            "Квартира"
          elsif value == object_types[:cottage]
            "Коттедж"
          elsif value == object_types[:social]
            "Общественный объект"
          else
            value
          end
        end
      end

      field :preview do
        label "Главное изображение"
      end
    end

    show do
      include_fields :name, :object_type, :preview, :description, :finished_object_images

      field :name do
        label "Название"
      end

      field :object_type do
        label "Тип объекта"
        pretty_value do
          object_types = FinishedObject.object_types
          if value == object_types[:flat]
            "Квартира"
          elsif value == object_types[:cottage]
            "Коттедж"
          elsif value == object_types[:social]
            "Общественный объект"
          else
            value
          end
        end
      end

      field :preview do
        label "Главное изображение"
      end

      field :description do
        label "Полное описание"
      end

      field :finished_object_images do
        label "Изображения"
        pretty_value do
          v = bindings[:view]
          [value].flatten.select(&:present?).collect do |associated|
            amc = polymorphic? ? RailsAdmin.config(associated) : associated_model_config # perf optimization for non-polymorphic associations
            am = amc.abstract_model
            wording = associated.send(amc.object_label_method)
            can_see = !am.embedded? && (show_action = v.action(:show, am, associated))
            can_see ? v.link_to("<img src=\"#{associated.image.url(:thumb)}\" style=\"margin: 5px\">".html_safe, v.url_for(action: show_action.action_name, model_name: am.to_param, id: associated.id), class: 'pjax') : ERB::Util.html_escape(wording)
          end.join("").html_safe
        end
      end
    end

    edit do
      include_fields :name, :object_type, :description, :preview, :finished_object_images

      field :name do
        label "Название"
      end

      field :object_type do
        label "Тип объекта"
        formatted_value do
          object_types = FinishedObject.object_types
          if value == object_types[:flat]
            "Квартира"
          elsif value == object_types[:cottage]
            "Коттедж"
          elsif value == object_types[:social]
            "Общественный объект"
          else
            value
          end
        end
      end

      field :preview do
        label "Главное изображение"
      end

      field :description, :ck_editor do
        label "Полное описание"
      end

      field :finished_object_images do
        label "Изображения"
      end
    end
  end

  config.model "FinishedObjectImage" do
    object_label_method do
      :rails_admin_label
    end

    weight 8
    visible false

    list do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    show do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end

    edit do
      include_fields :image

      field :image do
        label "Изображение"
      end
    end
  end

  config.model "Article" do
    object_label_method do
      :title
    end

    weight 8

    list do
      include_fields :title, :text

      field :title do
        label "Заголовок"
      end

      field :text do
        label "Текст"
      end
    end

    show do
      include_fields :title, :text

      field :title do
        label "Заголовок"
      end

      field :text do
        label "Текст"
      end
    end

    edit do
      include_fields :title, :text

      field :title do
        label "Заголовок"
      end

      field :text, :ck_editor do
        label "Текст"
      end
    end
  end

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except ['Section']
    end
    bulk_delete do
      except ['Section']
    end
    show
    edit
    delete do
      except ['Section']
    end
  end
end
