# Статьи
class Article < ActiveRecord::Base

  validates :title, presence: true
  validates :text, presence: true

  PER_PAGE = 6.0

  # Количество страниц
  def self.pages_count
    (Article.all.size.to_f / PER_PAGE).ceil
  end
end
