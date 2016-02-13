class MediaLibraryImage < ActiveRecord::Base
  has_attached_file :image, :styles => { :medium => "600x600>", :thumb => "100x100>" }, :default_url => "/static_images/no_photo.jpg"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  validates_attachment :image, :presence => true
end
