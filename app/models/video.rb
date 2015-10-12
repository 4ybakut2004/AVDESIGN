# Видео для раздела "Установка и настройка оборудования"
class Video < ActiveRecord::Base
  validates :link, presence: true
end
