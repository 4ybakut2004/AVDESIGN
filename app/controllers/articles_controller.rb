class ArticlesController < WebController

  layout 'static_application'

  def index
    @page = (params[:page] || 1).to_i
    @pages_count = (Article.all.size.to_f / Article::PER_PAGE).ceil
    @articles = Article.all
        .get_page(@page, Article::PER_PAGE)
        .order("created_at DESC")
  end

  def show
    @article = Article.where(id: params[:id]).first

    redirect_to "/" if @article.nil?
  end
end