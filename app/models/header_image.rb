# Картинки в слайдере шапки
class HeaderImage < ActiveRecord::Base
  has_attached_file :image, :styles => { :medium => "1760x316#", :thumb => "100x100>" }, :default_url => "/static_images/no_photo.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates_attachment :image, :presence => true
end
