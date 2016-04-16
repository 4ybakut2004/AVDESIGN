class VideosController < WebController

  layout 'static_application'

  def index
    @video_type = params[:video_type] || 'tutorial'
    @page = (params[:page] || 1).to_i
    @pages_count = (Video.where(video_type: Video.video_types[@video_type]).size.to_f / Video::PER_PAGE).ceil
    @videos = Video.where(video_type: Video.video_types[@video_type])
        .get_page(@page, Video::PER_PAGE)
        .order("created_at DESC")
  end
end