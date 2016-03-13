# Изображения раздела планирования
class PlanningImage < ActiveRecord::Base
  has_attached_file :image, :styles => { :medium => "935x660#", :thumb => "308x218#" }, :default_url => "/static_images/no_photo.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates_attachment :image, :presence => true
end
