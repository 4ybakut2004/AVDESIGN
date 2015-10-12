# Изображения объектов
class FinishedObjectImage < ActiveRecord::Base
  belongs_to :finished_object, :inverse_of => :finished_object_images

  has_attached_file :image, :styles => { :medium => "500x500>", :thumb => "100x100>" }, :default_url => "/static_images/no_photo.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
  validates_attachment :image, :presence => true

  validates :finished_object_id, presence: true

  def rails_admin_label
    "<img src=\"#{self.image.url(:thumb)}\">".html_safe
  end
end
