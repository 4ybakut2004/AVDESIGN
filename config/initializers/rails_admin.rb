RailsAdmin.config do |config|
  config.main_app_name = ["Audio Video"]

  config.included_models = ["HeaderImage"]

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

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    bulk_delete
    show
    edit
    delete
    show_in_app
  end
end
