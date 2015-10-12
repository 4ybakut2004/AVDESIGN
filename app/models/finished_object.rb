# Объекты для показа в таблице.
# Имеют название, тип, краткое описание, полное описание и изображение.
class FinishedObject < ActiveRecord::Base
  has_many :finished_object_images, :dependent => :destroy, :inverse_of => :finished_object

  accepts_nested_attributes_for :finished_object_images, :allow_destroy => true

  has_attached_file :preview, :styles => { :medium => "500x500>", :thumb => "100x100>" }, :default_url => "/static_images/no_photo.png"
  validates_attachment_content_type :preview, :content_type => /\Aimage\/.*\Z/
  validates_attachment :preview, :presence => true

  # Объекты бывают 3х типов - квартира, коттедж и общественное помещение
  enum object_type: [:flat, :cottage, :social]

  validates :object_type, presence: true

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
end
