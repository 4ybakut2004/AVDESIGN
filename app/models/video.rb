# Видео для раздела "Установка и настройка оборудования"
class Video < ActiveRecord::Base
  validates :link, presence: true

  # Типы видео - установка и настройка оборудования, инструкции, обзоры
  enum video_type: [:installation, :tutorial, :overview]

  PER_PAGE = 6.0

  INSTALLATION = "Установка и настройка оборудования"
  TUTORIAL = "Инструкция"
  OVERVIEW = "Обзор"

  # Необходим в админке для поля ввода
  def video_type_enum
    [INSTALLATION, TUTORIAL, OVERVIEW]
  end

  # Необходим в админке для корректного сохранения модели
  def video_type=(value)
    _value = value
    _value = "installation" if _value == INSTALLATION
    _value = "tutorial" if _value == TUTORIAL
    _value = "overview" if _value == OVERVIEW
    super(_value)
  end

  # Количество страниц
  def self.pages_count
    (Video.all.size.to_f / PER_PAGE).ceil
  end

  def self.installation_pages_count
    (Video.installation.size.to_f / PER_PAGE).ceil
  end

  def self.tutorial_pages_count
    (Video.tutorial.size.to_f / PER_PAGE).ceil
  end

  def self.tutorial_pages_count
    (Video.overview.size.to_f / PER_PAGE).ceil
  end

  def info
    info = {
      id: self.id,
      link: self.link,
      name: self.name
    }
  end
end