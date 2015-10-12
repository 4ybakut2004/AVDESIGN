# Спонсоры
class Sponsor < ActiveRecord::Base

  has_attached_file :image, :styles => { :medium => "500x500>", :thumb => "100x100>" }, :default_url => "/static_images/no_photo.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates_attachment :image, :presence => true

  validates :name, presence: true
end
