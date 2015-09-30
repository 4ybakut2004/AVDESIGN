# Секции сайта
class Section < ActiveRecord::Base

  validates :name,  presence: true
  validates :key,   presence: true, uniqueness: true
  validates :order, presence: true

  PLANNING = "planning"           # Планирование
  COMPONENTS = "components"       # Подбор компонентов
  INSTALLATION = "installation"   # Установка
  SERVICE = "service"             # Обслуживание
  COOPERATION = "cooperation"     # Сотрудничество

  # Первоначальная настройка таблицы
  def self.init_keys
    Section.find_or_create_by(key: PLANNING)
    Section.find_or_create_by(key: COMPONENTS)
    Section.find_or_create_by(key: INSTALLATION)
    Section.find_or_create_by(key: SERVICE)
    Section.find_or_create_by(key: COOPERATION)
  end

  # Задание заголовков
  def self.init_names
    Section.where(key: PLANNING).first.update_attributes(name: "Проектирование")
    Section.where(key: COMPONENTS).first.update_attributes(name: "Профессиональный подбор компонентов")
    Section.where(key: INSTALLATION).first.update_attributes(name: "Установка и настройка оборудования")
    Section.where(key: SERVICE).first.update_attributes(name: "Гарантийное и сервисное обслуживание")
    Section.where(key: COOPERATION).first.update_attributes(name: "Сотрудничество с организациями")
  end

  # Задание порядка
  def self.init_orders
    Section.where(key: PLANNING).first.update_attributes(order: 1)
    Section.where(key: COMPONENTS).first.update_attributes(order: 2)
    Section.where(key: INSTALLATION).first.update_attributes(order: 3)
    Section.where(key: SERVICE).first.update_attributes(order: 4)
    Section.where(key: COOPERATION).first.update_attributes(order: 5)
  end
end
