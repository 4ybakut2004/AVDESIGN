module ActiveRecordExtensions
  extend ActiveSupport::Concern

  module ClassMethods

    PerPage = 10

    # Пагинация. Начинается с единицы
    def get_page(pg = 1, per_page = PerPage)
      pg = (pg || 1).to_i
      per_page = (per_page || PerPage).to_i
      self.offset((pg - 1) * per_page).limit(per_page)
    end
  end
end

ActiveRecord::Base.send :include, ActiveRecordExtensions