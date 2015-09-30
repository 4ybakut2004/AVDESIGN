RailsAdmin.config do |config|
  config.main_app_name = ["Audio Video"]

  config.included_models = ["HeaderImage", "Section"]

  config.model "HeaderImage" do
    object_label_method do
      :id
    end

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

  config.model "Section" do
    object_label_method do
      :name
    end

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

      field :description do
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
