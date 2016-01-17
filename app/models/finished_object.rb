# Объекты для показа в таблице.
# Имеют название, тип, краткое описание, полное описание и изображение.
class FinishedObject < ActiveRecord::Base
  has_many :finished_object_images, :dependent => :destroy, :inverse_of => :finished_object

  accepts_nested_attributes_for :finished_object_images, :allow_destroy => true

  has_attached_file :preview, :styles => { :medium => "500x500>", :preview => "400x150>" }, :default_url => "/static_images/no_photo.png"
  validates_attachment_content_type :preview, :content_type => /\Aimage\/.*\Z/
  validates_attachment :preview, :presence => true

  # Объекты бывают 3х типов - квартира, коттедж и общественное помещение
  enum object_type: [:flat, :cottage, :social]

  validates :object_type, presence: true

  PER_PAGE = 6.0

  # Необходим в админке для поля ввода
  def object_type_enum
    ["Квартира", "Коттедж", "Общественный объект"]
  end

  # Необходим в админке для корректного сохранения модели
  def object_type=(value)
    _value = value
    _value = "flat" if _value == "Квартира"
    _value = "cottage" if _value == "Коттедж"
    _value = "social" if _value == "Общественный объект"
    super(_value)
  end

  # Количество страниц
  def self.pages_count
    (FinishedObject.all.size.to_f / PER_PAGE).ceil
  end
end
