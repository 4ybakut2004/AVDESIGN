# Видео для раздела "Установка и настройка оборудования"
class Video < ActiveRecord::Base
  validates :link, presence: true

  PER_PAGE = 6.0

  # Количество страниц
  def self.pages_count
    (Video.all.size.to_f / PER_PAGE).ceil
  end
end
