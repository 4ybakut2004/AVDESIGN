Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # Домашнаяя страница
  root 'static_pages#index'

  # Пути к статическим страничкам
  get 'static_pages/home'
  get 'static_pages/home_dialog'

  resources :videos, only: [:index]
  resources :articles, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      get 'installation_videos' => 'videos#installation_videos', :as => 'installation_videos'

      resources :finished_objects, only: [:index, :show]
      resources :videos, only: [:index]
      resources :media_library_images, only: [:create]
    end
  end

  # По всем путям выдавать домашнюю страницу, так как роутингом управляет angularjs
  get "*path" => "static_pages#index"
end